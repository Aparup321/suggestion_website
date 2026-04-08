import { useAppStore } from "../store/useAppStore"
import { motion } from "framer-motion"

export const SyllabusView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)

  const selected = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <section className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-10 px-4 md:px-0">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--neo-luffy-red)] font-black">SYLLABUS_TRACKER.SYS</p>
          <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase flex items-center gap-4">SYLLABUS <span className="text-[var(--neo-hat-yellow)]">MODULES</span></h1>
          <p className="text-slate-500 text-sm font-black uppercase tracking-wider">Track your learning progress and subject content</p>
        </div>
      </div>

      {/* SUBJECT FILTER */}
      <div className="flex flex-wrap items-center gap-3 px-6 bg-black p-6 border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-4">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-6 py-3 border-2 font-black text-[11px] uppercase tracking-widest transition-all ${!selectedSubjectId
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
            className={`px-6 py-3 border-2 font-black text-[11px] uppercase tracking-widest transition-all ${selectedSubjectId === subject.id
                ? "bg-[var(--neo-luffy-red)] text-black border-black shadow-[4px_4px_0_0_#000] -translate-x-1 -translate-y-1"
                : "bg-white/5 text-slate-500 border-white/10 hover:border-[var(--neo-luffy-red)] hover:text-[var(--neo-luffy-red)]"
              }`}
          >
            {subject.title}
          </button>
        ))}
      </div>

      <div className="space-y-16 px-4">
        {(selected ? [selected] : subjects).map((subject) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-start gap-4 border-l-[12px] border-[var(--neo-luffy-red)] pl-8 mb-12">
              <div className="space-y-1">
                <h3 className="text-4xl font-black text-white tracking-tight leading-none uppercase italic">{subject.title}</h3>
                <span className="text-[11px] font-mono text-[var(--neo-hat-yellow)] font-black uppercase tracking-widest leading-none">SUBJECT_CODE // {subject.code || subject.id}</span>
              </div>

              {selectedSubjectId && (subject.objective || subject.outcomes || subject.prerequisites) && (
                <div className="grid md:grid-cols-2 gap-8 w-full mt-8 p-8 bg-black mesh-gradient border-[4px] border-black shadow-[12px_12px_0px_0px_#000]">
                  {subject.objective && (
                    <div className="md:col-span-2 space-y-3 border-b-2 border-black pb-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--neo-luffy-red)] font-black">SUBJECT_OBJECTIVE</p>
                      <p className="text-base text-slate-300 font-bold leading-relaxed">{subject.objective}</p>
                    </div>
                  )}
                  {subject.prerequisites && (
                    <div className="space-y-3">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--neo-luffy-red)] font-black">PREREQUISITES</p>
                      <ul className="space-y-2">
                        {subject.prerequisites.map((req, i) => (
                          <li key={i} className="text-xs text-slate-400 font-black uppercase tracking-tighter flex items-center gap-2">
                            <span className="w-2 h-2 bg-[var(--neo-hat-yellow)]"></span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {subject.outcomes && (
                    <div className="space-y-3">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--neo-luffy-red)] font-black">LEARNING_OUTCOMES</p>
                      <ul className="space-y-3">
                        {subject.outcomes.map((co, i) => (
                          <li key={i} className="text-xs text-slate-400 font-bold leading-snug border-l-4 border-black pl-4 bg-black/40 py-2">
                            {co}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-8">
              {subject.units.map((unit) => (
                <div key={unit.id} className="space-y-8 relative px-4 md:px-0 bg-black mesh-gradient border-2 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
                  <div className="flex items-center gap-6">
                    <div className="h-1 w-12 bg-[var(--neo-luffy-red)]"></div>
                    <p className="text-sm uppercase tracking-[0.4em] text-[var(--neo-hat-yellow)] font-black">{unit.title}</p>
                    <div className="h-1 flex-1 bg-black"></div>
                  </div>

                  <div className="grid gap-4 pl-4 md:pl-12">
                    {unit.topics.map((topic) => (
                      <div key={topic.id} className="flex items-center gap-6 py-3 border-b border-black/20 last:border-0 group">
                        <div className="w-10 h-10 bg-black border-2 border-[var(--neo-luffy-red)] flex items-center justify-center font-black text-[var(--neo-hat-yellow)] text-xs shadow-[3px_3px_0px_0px_var(--neo-luffy-red)] group-hover:scale-110 transition-transform">
                          👒
                        </div>
                        <p className="text-lg font-black text-slate-200 group-hover:text-[var(--neo-luffy-red)] transition-colors tracking-tight uppercase italic">
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
