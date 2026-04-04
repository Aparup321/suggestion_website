export type TopicStatus = "not-started" | "in-progress" | "done"

export type Topic = {
  id: string
  title: string
  status: TopicStatus
  priority: "high" | "medium" | "low"
  lastStudied?: string
}

export type Unit = {
  id: string
  title: string
  topics: Topic[]
}

export type Subject = {
  id: string
  title: string
  code?: string
  units: Unit[]
}

export type RoutineEntry = {
  id: string
  day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT"
  start: string
  end: string
  subjectId: string
  title: string
  room?: string
  instructor?: string
  group?: string
  type?: "T" | "P" | "Lab"
}

export type SuggestionType = "study-now" | "continue" | "revise"

export type SuggestionItem = {
  id: string
  subjectId: string
  subjectTitle: string
  topicId: string
  topicTitle: string
  type: SuggestionType
  reason: string
  nextClassInMinutes?: number
}
