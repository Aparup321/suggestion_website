import type { RoutineEntry, Subject, SuggestionItem, Topic } from "../types"
import { getMinutesUntil } from "./time"

const flattenTopics = (subjects: Subject[]) =>
  subjects.flatMap((subject) =>
    subject.units.flatMap((unit) =>
      unit.topics.map((topic) => ({ subject, unit, topic }))
    )
  )

const minutesSince = (date: Date, iso?: string) => {
  if (!iso) return Number.POSITIVE_INFINITY
  const last = new Date(iso).getTime()
  return Math.max(0, (date.getTime() - last) / 60000)
}

const priorityWeight: Record<Topic["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
}

const statusWeight: Record<Topic["status"], number> = {
  "not-started": 3,
  "in-progress": 4,
  done: 1,
}

export const buildSuggestions = (
  subjects: Subject[],
  routine: RoutineEntry[],
  now: Date,
  selectedSubjectId?: string
) => {
  const base = flattenTopics(subjects).filter(({ subject }) =>
    selectedSubjectId ? subject.id === selectedSubjectId : true
  )

  const upcoming = routine
    .map((entry) => ({ entry, minutes: getMinutesUntil(now, entry.day, entry.start) }))
    .sort((a, b) => a.minutes - b.minutes)

  const upcomingSubjects = new Map<string, number>()
  upcoming.slice(0, 4).forEach(({ entry, minutes }) => {
    upcomingSubjects.set(entry.subjectId, minutes)
  })

  const ranked = base
    .map(({ subject, topic }) => {
      const soon = upcomingSubjects.get(subject.id)
      const lastStudiedMins = minutesSince(now, topic.lastStudied)
      const isRevision = topic.status === "done" && lastStudiedMins > 24 * 60 * 2
      const isContinue = topic.status === "in-progress"
      const isNew = topic.status === "not-started"

      let score = statusWeight[topic.status] * 10 + priorityWeight[topic.priority] * 6
      if (soon !== undefined) score += Math.max(0, 180 - soon) / 6
      if (isContinue) score += 12
      if (isRevision) score += 6

      return {
        subject,
        topic,
        score,
        soon,
        kind: isRevision ? "revise" : isContinue ? "continue" : "study-now",
      }
    })
    .sort((a, b) => b.score - a.score)

  const selected: SuggestionItem[] = []
  const subjectUsage = new Map<string, number>()

  for (const item of ranked) {
    const used = subjectUsage.get(item.subject.id) ?? 0
    if (selected.length >= 6) break
    if (used >= 2) continue
    subjectUsage.set(item.subject.id, used + 1)

    const reason = item.soon !== undefined
      ? `Next class in ${Math.round(item.soon)} min`
      : item.kind === "continue"
        ? "Incomplete topic"
        : item.kind === "revise"
          ? "Revise after gap"
          : "Start this topic"

    selected.push({
      id: `${item.subject.id}-${item.topic.id}`,
      subjectId: item.subject.id,
      subjectTitle: item.subject.title,
      topicId: item.topic.id,
      topicTitle: item.topic.title,
      type: item.kind,
      reason,
      nextClassInMinutes: item.soon,
    })
  }

  return selected
}
