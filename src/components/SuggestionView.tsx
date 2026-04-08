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
    <section className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-10 px-4 md:px-0">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--neo-luffy-red)] font-black">STUDY_GOALS.LOG</p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">STUDY <span className="text-[var(--neo-hat-yellow)]">PLAN</span></h1>
          <p className="text-slate-500 text-sm font-black uppercase tracking-widest">Personalized study tasks based on urgency and priority</p>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center gap-3 px-6 bg-black p-6 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-4">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-5 py-3 border-2 font-black text-[10px] uppercase tracking-widest transition-all ${!selectedSubjectId
              ? "bg-[var(--neo-luffy-red)] text-black border-black shadow-[4px_4px_0px_0px_#000]"
              : "bg-white/5 text-slate-500 border-white/10 hover:border-[var(--neo-luffy-red)] hover:text-[var(--neo-luffy-red)]"
            }`}
        >
          ALL_SUBJECTS
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-5 py-3 border-2 font-black text-[10px] uppercase tracking-widest transition-all ${selectedSubjectId === subject.id
                ? "bg-[var(--neo-luffy-red)] text-black border-black shadow-[4px_4px_0px_0px_#000]"
                : "bg-white/5 text-slate-500 border-white/10 hover:border-[var(--neo-luffy-red)] hover:text-[var(--neo-luffy-red)]"
              }`}
          >
            {subject.code || subject.id}
          </button>
        ))}
      </div>

      <div className="px-4 pb-20">
        <div className="flex flex-row items-center gap-4 mb-8">
          <h3 className="text-xl font-black text-white tracking-tight leading-none uppercase italic">ACTIVE SUGGESTIONS</h3>
          <div className="h-1 flex-1 bg-black"></div>
          <Link
            to="/syllabus"
            className="px-6 py-2 bg-black border-2 border-black text-[10px] uppercase font-black tracking-widest text-[var(--neo-hat-yellow)] shadow-[4px_4px_0px_0px_var(--neo-luffy-red)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Syllabus Manager
          </Link>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {suggestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="brutalist-card p-20 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-[var(--neo-hat-yellow)] border-4 border-black flex items-center justify-center mx-auto shadow-[6px_6px_0px_0px_#000]">
                  <span className="text-4xl">☠️</span>
                </div>
                <p className="text-slate-500 text-sm font-black tracking-widest uppercase">
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
                    <div className="brutalist-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">

                      <div className="space-y-4 relative z-10 flex-1">
                        <div className="flex items-center gap-4 w-full">
                          <span className="text-[10px] font-black text-black tracking-tighter uppercase px-3 py-1 bg-[var(--neo-luffy-red)] border-2 border-black shadow-[3px_3px_0px_0px_#000] whitespace-nowrap">
                            RECOM // 0{index + 1}
                          </span>
                          <span className="text-[11px] uppercase font-black tracking-[0.2em] text-[var(--neo-hat-yellow)] border-l-4 border-black pl-4">
                            {item.subjectTitle}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-3xl font-black text-white group-hover:text-[var(--neo-luffy-red)] transition-colors tracking-tighter uppercase italic leading-none">
                            {item.topicTitle}
                          </p>
                          <p className="text-sm text-slate-400 font-black uppercase tracking-tight max-w-2xl leading-relaxed">
                            {item.reason}
                          </p>
                        </div>
                      </div>

                      <div className="w-16 h-16 border-4 border-black bg-black flex items-center justify-center shadow-[4px_4px_0px_0px_var(--neo-luffy-red)] group-hover:bg-[var(--neo-luffy-red)] transition-all">
                        <span className="text-2xl group-hover:scale-125 transition-transform">👒</span>
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
