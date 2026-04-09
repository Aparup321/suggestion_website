import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { buildSuggestions } from "../utils/suggestions"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

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
    <section className="flex flex-col gap-12 w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--hud-cyan)] font-bold mb-2 flex items-center gap-2">
             <span className="w-4 h-[1px] bg-[var(--hud-cyan)]"></span>
             STUDY_GOALS.LOG
          </p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">STUDY <span className="text-[var(--hud-yellow)]">PLAN</span></h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Personalized study tasks based on urgency and priority</p>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="hud-card p-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-5 py-2 border font-bold text-[10px] uppercase tracking-widest transition-all ${!selectedSubjectId
              ? "bg-[var(--hud-cyan)] text-[var(--hud-bg)] shadow-[0_0_15px_var(--hud-cyan)] border-[var(--hud-cyan)]"
              : "bg-white/5 text-slate-500 border-[var(--hud-border)] hover:border-[var(--hud-cyan)]/50 hover:text-white"
            }`}
        >
          ALL_SUBJECTS
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-5 py-2 border font-bold text-[10px] uppercase tracking-widest transition-all ${selectedSubjectId === subject.id
                ? "bg-[var(--hud-cyan)] text-[var(--hud-bg)] shadow-[0_0_15px_var(--hud-cyan)] border-[var(--hud-cyan)]"
                : "bg-white/5 text-slate-500 border-[var(--hud-border)] hover:border-[var(--hud-cyan)]/50 hover:text-white"
              }`}
          >
            {subject.code || subject.id}
          </button>
        ))}
      </div>

      <div className="pb-20">
        <div className="flex flex-row items-center gap-4 mb-8">
          <h3 className="text-xl font-bold text-white tracking-tight leading-none uppercase italic">ACTIVE SUGGESTIONS</h3>
          <div className="h-[1px] flex-1 bg-[var(--hud-border)]"></div>
          <Link
            to="/syllabus"
            className="hud-button text-[10px] py-1 px-4"
          >
            Syllabus Manager
          </Link>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {suggestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="hud-card p-20 text-center space-y-6"
              >
                <div className="w-20 h-20 border border-[var(--hud-yellow)]/30 flex items-center justify-center mx-auto text-4xl filter drop-shadow-[0_0_10px_var(--hud-yellow)]">
                  ☠️
                </div>
                <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">
                  [ NO DATA RECORDED ] <br className="mb-2" />
                  Update your progress in the Syllabus section to generate study tasks
                </p>
              </motion.div>
            ) : (
              suggestions.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to="/syllabus"
                    onClick={() => setSelectedSubject(item.subjectId)}
                    className="group block"
                  >
                    <div className="hud-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 group-hover:border-[var(--hud-cyan)]/50 transition-all">

                      <div className="space-y-4 relative z-10 flex-1">
                        <div className="flex items-center gap-4 w-full">
                          <span className="text-[10px] font-bold text-[var(--hud-bg)] tracking-tighter uppercase px-3 py-0.5 bg-[var(--hud-cyan)] shadow-[0_0_10px_var(--hud-cyan)] whitespace-nowrap">
                            RECOM // 0{index + 1}
                          </span>
                          <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[var(--hud-teal)] border-l border-[var(--hud-border)] pl-4">
                            {item.subjectTitle}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-black text-white group-hover:text-[var(--hud-cyan)] transition-colors tracking-tighter uppercase italic leading-none">
                            {item.topicTitle}
                          </p>
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-tight max-w-2xl leading-relaxed opacity-60">
                            {item.reason}
                          </p>
                        </div>
                      </div>

                      <div className="w-14 h-14 border border-[var(--hud-border)] flex items-center justify-center group-hover:border-[var(--hud-cyan)] transition-all relative">
                        <span className="text-xl group-hover:scale-125 transition-transform">👒</span>
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--hud-cyan)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--hud-cyan)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

