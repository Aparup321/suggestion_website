import { useAppStore } from "../store/useAppStore"
import { motion } from "framer-motion"

export const SyllabusView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)

  const selected = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <section className="flex flex-col gap-10 w-full animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] hud-text-cyan font-bold mb-4 flex items-center gap-3">
             <span className="w-4 h-[1px] bg-[var(--hud-accent-blue)]"></span>
             SYLLABUS_ENGINE.SYS
          </p>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">
            SYLLABUS <span className="hud-text-gold">MODULES</span>
          </h1>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mt-2">Track your learning progress and subject content</p>
        </div>
      </div>

      {/* SUBJECT FILTER - PANEL STYLE */}
      <div className="hud-panel p-8 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${!selectedSubjectId
              ? "bg-[var(--hud-accent-blue)] text-black shadow-[0_0_20px_var(--hud-accent-blue)]"
              : "bg-white/5 text-slate-500 border border-white/10 hover:border-[var(--hud-accent-blue)]/50 hover:text-white"
            }`}
        >
          ALL_SUBJECTS
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${selectedSubjectId === subject.id
                ? "bg-[var(--hud-accent-blue)] text-black shadow-[0_0_20px_var(--hud-accent-blue)]"
                : "bg-white/5 text-slate-500 border border-white/10 hover:border-[var(--hud-accent-blue)]/50 hover:text-white"
              }`}
          >
            {subject.title}
          </button>
        ))}
      </div>

      <div className="space-y-20 px-2 pb-20">
        {(selected ? [selected] : subjects).map((subject) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
          >
            <div className="flex flex-col items-start gap-6 border-l-4 border-[var(--hud-accent-blue)] pl-10 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[var(--hud-accent-blue)] via-[var(--hud-accent-blue)] to-transparent opacity-40 blur-[2px]"></div>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-white tracking-tighter leading-none uppercase italic">{subject.title}</h3>
                <span className="text-xs mono-font hud-text-gold font-bold uppercase tracking-[0.3em] leading-none">SUBJECT_CODE // {subject.code || subject.id}</span>
              </div>

              {selectedSubjectId && (subject.objective || subject.outcomes || subject.prerequisites) && (
                <div className="grid md:grid-cols-2 gap-10 w-full mt-10 p-10 hud-panel border-none bg-black/30">
                  {subject.objective && (
                    <div className="md:col-span-2 space-y-4 border-b border-white/5 pb-8">
                      <p className="text-[10px] uppercase tracking-[0.4em] hud-text-cyan font-bold">CORE_OBJECTIVE</p>
                      <p className="text-base text-slate-300 font-bold leading-relaxed">{subject.objective}</p>
                    </div>
                  )}
                  {subject.prerequisites && (
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-[0.4em] hud-text-cyan font-bold">PREREQUISITES</p>
                      <ul className="space-y-3">
                        {subject.prerequisites.map((req, i) => (
                          <li key={i} className="text-[11px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-3">
                            <span className="w-2 h-2 bg-[var(--hud-accent-yellow)] shadow-[0_0_8px_var(--hud-accent-yellow)]"></span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {subject.outcomes && (
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase tracking-[0.4em] hud-text-cyan font-bold">LEARNING_OUTCOMES</p>
                      <ul className="space-y-4">
                        {subject.outcomes.map((co, i) => (
                          <li key={i} className="text-[11px] text-slate-400 font-bold leading-snug border-l-2 border-white/10 pl-6 py-1 hover:border-[var(--hud-accent-blue)] transition-colors">
                            {co}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-10">
              {subject.units.map((unit) => (
                <div key={unit.id} className="space-y-8 hud-panel p-10 group/unit">
                  <div className="flex items-center gap-6">
                    <div className="h-[2px] w-12 bg-[var(--hud-accent-blue)] shadow-[0_0_10px_var(--hud-accent-blue)]"></div>
                    <p className="text-lg uppercase tracking-[0.3em] hud-text-gold font-black italic">{unit.title}</p>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>

                  <div className="grid gap-4 pl-10">
                    {unit.topics.map((topic, i) => (
                      <div key={topic.id} className="flex items-center gap-8 py-4 border-b border-white/5 last:border-0 group/topic transition-all hover:pl-4">
                        <div className="w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center font-black hud-text-cyan text-xs group-hover/topic:border-[var(--hud-accent-blue)]/50 group-hover/topic:bg-[var(--hud-accent-blue)]/10 transition-all">
                          {i + 1}
                        </div>
                        <p className="text-xl font-bold text-slate-100 group-hover/topic:text-white transition-colors tracking-tight uppercase italic leading-none">
                          {topic.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


