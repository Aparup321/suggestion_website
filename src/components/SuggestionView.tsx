import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { buildSuggestions } from "../utils/suggestions"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const badgeStyles = {
  "study-now": "bg-amber/10 text-amber ring-1 ring-amber/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
  continue: "bg-[#00ef8e]/10 text-[#00ef8e] ring-1 ring-[#00ef8e]/20 shadow-[0_0_15px_rgba(0,239,142,0.1)]",
  revise: "bg-[#00703c]/10 text-[#00ef8e] ring-1 ring-[#00703c]/20 shadow-[0_0_15px_rgba(0,112,60,0.1)]",
}

const label = {
  "study-now": "Focus Study",
  continue: "Active Study",
  revise: "Revision",
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
    <section className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-10 px-4 md:px-0 font-zoro">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#00ef8e] font-bold">STUDY_PRIORITY.LOG</p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase font-zoro">FOCUS <span className="text-[#00ef8e]">OBJECTIVES</span></h1>
          <p className="text-slate-500 text-sm font-medium">Data-driven priority targets generated from schedule urgency and logic</p>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center gap-2 px-6 bg-black/40 p-4 rounded-2xl border border-[#00ef8e]/10 mx-4 backdrop-blur-md">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-5 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
            !selectedSubjectId
              ? "bg-[#00ef8e]/20 text-[#00ef8e] border border-[#00ef8e]/30 shadow-[0_0_15px_rgba(0,239,142,0.15)]"
              : "text-slate-500 hover:text-[#00ef8e]/60"
          }`}
        >
          ALL_CHAPTERS
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-5 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
              selectedSubjectId === subject.id
                ? "bg-[#00ef8e]/20 text-[#00ef8e] border border-[#00ef8e]/30 shadow-[0_0_15px_rgba(0,239,142,0.15)]"
                : "text-slate-500 hover:text-[#00ef8e]/60"
            }`}
          >
            {subject.code || subject.id}
          </button>
        ))}
      </div>

      <div className="px-4 pb-20">
        <div className="flex flex-row items-center gap-4 mb-8">
          <h3 className="text-xl font-bold text-white tracking-tight leading-none uppercase font-zoro">ACTIVE DIRECTIVES</h3>
          <div className="h-px flex-1 bg-white/5"></div>
          <Link
            to="/syllabus"
            className="px-4 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest text-[#00ef8e]/60 border border-[#00ef8e]/20 hover:border-[#00ef8e]/60 hover:text-[#00ef8e] transition-all font-sans"
          >
            Syllabus Viewer
          </Link>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {suggestions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="neo-card p-20 text-center space-y-4 border-[#00ef8e]/10"
              >
                <span className="text-4xl font-zoro">⚔️</span>
                <p className="text-slate-500 text-sm font-mono tracking-widest uppercase">
                  [ NO DATA RECORDED ] <br className="mb-2" /> 
                  Update your progress in the Syllabus section to generate objectives
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
                    className="group relative block"
                  >
                    <div className="neo-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all hover:border-[#00ef8e]/40 hover:bg-black/80 overflow-visible group/card relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00ef8e]/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      
                      <div className="shrink-0 relative z-10 px-2 lg:px-4">
                        <div className={`px-5 py-2.5 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all group-hover:scale-105 ${badgeStyles[item.type]}`}>
                          {label[item.type]}
                        </div>
                      </div>

                      <div className="space-y-4 relative z-10 px-2 flex-1">
                        <div className="flex items-center gap-4 w-full">
                          <span className="text-[10px] font-black text-[#00ef8e] tracking-tighter uppercase px-2 py-1 bg-[#00ef8e]/10 rounded border border-[#00ef8e]/20 whitespace-nowrap">
                            STEP // 0{index + 1}
                          </span>
                          <span className="text-[11px] uppercase font-black tracking-[0.2em] text-slate-400 border-l border-white/10 pl-4">
                            {item.subjectTitle}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-black text-white group-hover/card:text-[#00ef8e] transition-colors tracking-tight uppercase font-zoro">
                            {item.topicTitle}
                          </p>
                          <p className="text-sm text-slate-500 font-medium max-w-2xl group-hover/card:text-slate-400 transition-colors tracking-tight">
                            {item.reason}
                          </p>
                        </div>
                      </div>

                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-[#00ef8e]/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full translate-x-1/2 translate-y-1/2" />
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
