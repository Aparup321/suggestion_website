import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { buildSuggestions } from "../utils/suggestions"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const badge = {
  "study-now": "bg-coral/20 text-coral border border-coral/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]",
  continue: "bg-ocean/20 text-ocean border border-ocean/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]",
  revise: "bg-lime/20 text-lime border border-lime/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]",
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

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])

  const suggestions = buildSuggestions(subjects, routineEntries, now, selectedSubjectId)

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap items-center gap-3 w-full border-b border-white/5 pb-4">
        <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold px-4 pl-0">
          AI Suggestion Matrix
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubject(undefined)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                !selectedSubjectId
                  ? "bg-slate-800 text-white border-ocean shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              } border`}
            >
              All Subjects
            </button>
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase font-semibold transition-all ${
                selectedSubjectId === subject.id
                  ? "bg-slate-800 text-white border-ocean shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  : "bg-slate-900/50 text-slate-400 border-transparent hover:text-slate-200"
              } border`}
            >
              {subject.code || subject.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-plum font-bold">Heuristic Analysis</p>
        <h2 className="text-3xl font-display text-white tracking-tight">Focus Target</h2>
        <p className="text-sm text-slate-400">
          Smart recommendations generated from schedule alignment, urgency, and past study sessions.
        </p>
      </div>

      <div className="neo-card p-8 flex flex-col gap-6 mt-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-2xl font-display text-white tracking-tight">Active Directives</h3>
          <Link
            to="/syllabus"
            className="px-4 py-2 rounded-full text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
          >
            Review Syllabus
          </Link>
        </div>

        <div className="grid gap-4 mt-2">
          {suggestions.length === 0 ? (
            <p className="text-sm text-slate-500 font-mono text-center py-10">
              [ NO DIRECTIVES FOUND ] <br className="mb-2" /> Initialize progress tracking in Syllabus to generate suggestions.
            </p>
          ) : (
            suggestions.map((item, index) => (
              <Link
                to="/syllabus"
                key={item.id}
                onClick={() => setSelectedSubject(item.subjectId)}
                className="group relative flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-2xl border border-white/5 bg-slate-900/40 px-6 py-5 hover:bg-slate-800/50 transition-all overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-ocean/0 via-ocean/50 to-ocean/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-slate-900 px-2 py-0.5 rounded-md border border-white/5">
                      SEQ // 0{index + 1}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-ocean/80">
                      {item.subjectTitle}
                    </span>
                  </div>
                  <p className="text-xl font-medium text-slate-100 mb-1 group-hover:text-white transition-colors">
                    {item.topicTitle}
                  </p>
                  <p className="text-sm text-slate-400">{item.reason}</p>
                </div>
                
                <div className="shrink-0 mt-2 md:mt-0">
                  <span className={`inline-block px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest ${badge[item.type]}`}>
                    {label[item.type]}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
