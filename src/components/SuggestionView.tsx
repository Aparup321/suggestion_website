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
    <section className="flex flex-col gap-10 w-full animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] hud-text-cyan font-bold mb-4 flex items-center gap-3">
             <span className="w-4 h-[1px] bg-[var(--hud-accent-blue)]"></span>
             KNOWLEDGE_STREAM.LOG
          </p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">STUDY <span className="hud-text-gold">PLAN</span></h1>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mt-2">Personalized study tasks based on urgency and priority</p>
        </div>
      </div>

      {/* FILTER BUTTONS - PANEL STYLE */}
      <div className="hud-panel p-10 flex flex-wrap items-center gap-6">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-10 py-5 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] transition-all ${!selectedSubjectId
              ? "bg-[var(--hud-accent-blue)] text-black shadow-[0_0_25px_var(--hud-accent-blue)] scale-105"
              : "bg-white/5 text-slate-500 border border-white/10 hover:border-[var(--hud-accent-blue)]/50 hover:text-white"
            }`}
        >
          ALL_SUBJECTS
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-10 py-5 rounded-xl font-black text-[12px] uppercase tracking-[0.2em] transition-all ${selectedSubjectId === subject.id
                ? "bg-[var(--hud-accent-blue)] text-black shadow-[0_0_25px_var(--hud-accent-blue)] scale-105"
                : "bg-white/5 text-slate-500 border border-white/10 hover:border-[var(--hud-accent-blue)]/50 hover:text-white"
              }`}
          >
            {subject.title}
          </button>
        ))}
      </div>

      <div className="pb-20 px-2">
        <div className="flex flex-row items-center gap-6 mb-10">
          <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase italic">ACTIVE_SUGGESTIONS</h3>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          <Link
            to="/syllabus"
            className="px-6 py-2 rounded-full border border-[var(--hud-border-gold)] text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--hud-accent-yellow)]/10 transition-colors"
          >
            Syllabus Manager
          </Link>
        </div>

        <div className="grid gap-8">
          <AnimatePresence mode="popLayout">
            {suggestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="hud-panel p-24 text-center space-y-8"
              >
                <div className="w-24 h-24 border border-[var(--hud-accent-yellow)]/30 rounded-2xl flex items-center justify-center mx-auto text-5xl filter drop-shadow-[0_0_20px_var(--hud-accent-yellow)] bg-black/20">
                  ☠️
                </div>
                <div className="space-y-2">
                   <p className="hud-text-gold text-lg font-black uppercase tracking-[0.2em]">[ NO_DATA_RECORDED ]</p>
                   <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest opacity-60">
                     Update your progress in the Syllabus section to generate study tasks
                   </p>
                </div>
              </motion.div>
            ) : (
              suggestions.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    to="/syllabus"
                    onClick={() => setSelectedSubject(item.subjectId)}
                    className="group block"
                  >
                    <div className="hud-panel p-10 flex flex-col md:flex-row md:items-center justify-between gap-10 group-hover:border-[var(--hud-accent-blue)]/60 group-hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] transition-all">

                      <div className="space-y-6 relative z-10 flex-1">
                        <div className="flex items-center gap-6 w-full">
                          <span className="text-[10px] font-black text-black tracking-[0.2em] uppercase px-4 py-1 bg-[var(--hud-accent-blue)] shadow-[0_0_15px_var(--hud-accent-blue)] rounded-full">
                            RECOM_UNIT // 0{index + 1}
                          </span>
                          <span className="text-lg uppercase font-black tracking-[0.4em] text-[var(--hud-accent-yellow)] border-l border-white/10 pl-6">
                            {item.subjectTitle}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <p className="text-5xl font-black text-white group-hover:hud-text-cyan transition-colors tracking-tighter uppercase italic leading-none">
                            {item.topicTitle}
                          </p>
                          <p className="text-sm text-slate-400 font-bold uppercase tracking-tight max-w-2xl leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                            {item.reason}
                          </p>
                        </div>
                      </div>

                      <div className="w-20 h-20 border-2 border-white/5 rounded-2xl flex items-center justify-center group-hover:border-[var(--hud-accent-blue)]/40 transition-all bg-black/10 relative shadow-inner">
                        <span className="text-4xl group-hover:scale-125 transition-transform filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">👒</span>
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--hud-accent-blue)] rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
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


