import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { buildSuggestions } from "../utils/suggestions"
import { useEffect, useState } from "react"

const badge = {
  "study-now": "bg-[#ff7ad9] text-ink",
  continue: "bg-[#6ae6ff] text-ink",
  revise: "bg-[#9ad66f] text-ink",
}

const label = {
  "study-now": "Study Now",
  continue: "Continue Learning",
  revise: "Quick Revision",
}

export const SuggestionView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)
  const setMode = useAppStore((state) => state.setMode)

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])

  const suggestions = buildSuggestions(subjects, routineEntries, now, selectedSubjectId)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-ink/60">Filter by subject (optional)</div>
        <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubject(undefined)}
              className={`px-4 py-2 rounded-full text-sm border-2 border-ink ${
                !selectedSubjectId
                  ? "bg-ink text-[#fff9df]"
                  : "bg-white"
              } neo-button`}
            >
            All
          </button>
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
                className={`px-4 py-2 rounded-full text-sm border-2 border-ink ${
                  selectedSubjectId === subject.id
                    ? "bg-ink text-[#fff9df]"
                    : "bg-white"
                } neo-button`}
              >
              {subject.title}
            </button>
          ))}
        </div>
      </div>

      <div className="neo-card p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-display text-ink">Suggested for you</h3>
            <p className="text-sm text-ink/60">
              Built from routine, syllabus progress, and focus balance.
            </p>
          </div>
          <button
            onClick={() => setMode("syllabus")}
            className="px-4 py-2 rounded-full text-sm border-2 border-ink bg-white neo-button"
          >
            Open syllabus
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          {suggestions.length === 0 ? (
            <p className="text-sm text-ink/60">No suggestions yet. Add progress in syllabus.</p>
          ) : (
            suggestions.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedSubject(item.subjectId)
                  setMode("syllabus")
                }}
                className="text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border-2 border-ink bg-white px-4 py-4 hover:-translate-y-0.5 transition"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Suggestion {index + 1}</p>
                  <p className="text-lg font-semibold text-ink">
                    {item.subjectTitle} - {item.topicTitle}
                  </p>
                  <p className="text-sm text-ink/60">{item.reason}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] ${badge[item.type]}`}>
                  {label[item.type]}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
