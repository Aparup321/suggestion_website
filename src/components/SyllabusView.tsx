import { useAppStore } from "../store/useAppStore"
import { motion } from "framer-motion"

export const SyllabusView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)

  const selected = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <section className="flex flex-col gap-12 w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--hud-cyan)] font-bold mb-2 flex items-center gap-2">
             <span className="w-4 h-[1px] bg-[var(--hud-cyan)]"></span>
             SYLLABUS_TRACKER.SYS
          </p>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-4">
            SYLLABUS <span className="text-[var(--hud-yellow)]">MODULES</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Track your learning progress and subject content</p>
        </div>
      </div>

      {/* SUBJECT FILTER */}
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
            {subject.title}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {(selected ? [selected] : subjects).map((subject) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-start gap-4 border-l-4 border-[var(--hud-cyan)] pl-8">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white tracking-tight leading-none uppercase italic">{subject.title}</h3>
                <span className="text-[10px] mono-font text-[var(--hud-yellow)] font-bold uppercase tracking-widest leading-none">SUBJECT_CODE // {subject.code || subject.id}</span>
              </div>

              {selectedSubjectId && (subject.objective || subject.outcomes || subject.prerequisites) && (
                <div className="grid md:grid-cols-2 gap-8 w-full mt-8 p-6 hud-card border-none bg-[var(--hud-bg-dark)]/50">
                  {subject.objective && (
                    <div className="md:col-span-2 space-y-2 border-b border-[var(--hud-border)] pb-4">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--hud-cyan)] font-bold">SUBJECT_OBJECTIVE</p>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">{subject.objective}</p>
                    </div>
                  )}
                  {subject.prerequisites && (
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--hud-cyan)] font-bold">PREREQUISITES</p>
                      <ul className="space-y-1">
                        {subject.prerequisites.map((req, i) => (
                          <li key={i} className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[var(--hud-yellow)]"></span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {subject.outcomes && (
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--hud-cyan)] font-bold">LEARNING_OUTCOMES</p>
                      <ul className="space-y-2">
                        {subject.outcomes.map((co, i) => (
                          <li key={i} className="text-[10px] text-slate-400 font-medium leading-snug border-l-2 border-[var(--hud-border)] pl-3 py-1">
                            {co}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-6">
              {subject.units.map((unit) => (
                <div key={unit.id} className="space-y-6 hud-card p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-8 bg-[var(--hud-cyan)]"></div>
                    <p className="text-xs uppercase tracking-[0.4em] text-[var(--hud-yellow)] font-bold">{unit.title}</p>
                    <div className="h-[1px] flex-1 bg-[var(--hud-border)]"></div>
                  </div>

                  <div className="grid gap-3 pl-4">
                    {unit.topics.map((topic, i) => (
                      <div key={topic.id} className="flex items-center gap-4 py-2 border-b border-[var(--hud-border)] last:border-0 group">
                        <div className="w-8 h-8 border border-[var(--hud-cyan)]/30 flex items-center justify-center font-bold text-[var(--hud-cyan)] text-[10px] group-hover:bg-[var(--hud-cyan)]/10 transition-all">
                          {i + 1}
                        </div>
                        <p className="text-base font-bold text-slate-200 group-hover:text-[var(--hud-cyan)] transition-colors tracking-tight uppercase italic">
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

