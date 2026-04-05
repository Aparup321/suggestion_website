import { useAppStore } from "../store/useAppStore"
import { motion } from "framer-motion"

export const SyllabusView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)
  const updateTopicStatus = useAppStore((state) => state.updateTopicStatus)
  const markStudiedNow = useAppStore((state) => state.markStudiedNow)

  const selected = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <section className="flex flex-col gap-10 w-full max-w-5xl mx-auto py-4">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-ocean font-bold">PROGRESS_ENGINE.SYS</p>
          <h1 className="text-4xl font-black tracking-tight text-white">SYLLABUS <span className="text-gradient">MATRIX</span></h1>
          <p className="text-slate-500 text-sm font-medium">Monitor study nodes and track module completion status</p>
        </div>
      </div>

      {/* SUBJECT FILTER */}
      <div className="flex flex-wrap items-center gap-2 px-4 bg-slate-900/40 p-3 rounded-2xl border border-white/5 mx-4">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-5 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
            !selectedSubjectId
              ? "bg-ocean/20 text-ocean border border-ocean/30 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          OVERVIEW
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-5 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
              selectedSubjectId === subject.id
                ? "bg-ocean/20 text-ocean border border-ocean/30 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {subject.code || subject.id}
          </button>
        ))}
      </div>

      <div className="space-y-12 px-4">
        {(selected ? [selected] : subjects).map((subject) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col gap-2 border-l-4 border-ocean pl-6">
              <h3 className="text-3xl font-black text-white tracking-tight leading-none">{subject.title}</h3>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-ocean/60 font-bold uppercase tracking-widest">MODULE_ID // {subject.code || subject.id}</span>
              </div>
            </div>

            <div className="grid gap-6">
              {subject.units.map((unit) => (
                <div key={unit.id} className="neo-card p-6 md:p-8 space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <span className="text-6xl font-black italic">{unit.title.charAt(0)}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/5"></div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-black">{unit.title}</p>
                    <div className="h-px flex-1 bg-white/5"></div>
                  </div>

                  <div className="grid gap-4">
                    {unit.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-white/10 transition-all hover:bg-slate-950/60 group/topic"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              topic.priority === "high" ? "bg-amber shadow-[0_0_10px_rgba(245,158,11,0.4)]" :
                              topic.priority === "medium" ? "bg-ocean" : "bg-slate-700"
                            }`} />
                            <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">{topic.priority} PRIORITY</span>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-lg font-bold text-white group-hover/topic:text-ocean transition-colors">{topic.title}</p>
                            <p className="text-[10px] text-slate-600 font-mono font-bold uppercase tracking-tighter">
                              {topic.lastStudied
                                ? `LAST_SYNC: ${new Date(topic.lastStudied).toLocaleString()}`
                                : "STATUS: UNINITIALIZED"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 lg:bg-slate-900/50 lg:p-2 lg:rounded-xl">
                          {(["not-started", "in-progress", "done"] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateTopicStatus(subject.id, topic.id, status)}
                              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                topic.status === status
                                  ? status === "done" 
                                    ? "bg-emerald/10 text-emerald ring-1 ring-emerald/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                    : status === "in-progress"
                                      ? "bg-ocean/10 text-ocean ring-1 ring-ocean/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                                      : "bg-slate-800 text-slate-200 ring-1 ring-white/10"
                                  : "text-slate-600 hover:text-slate-300"
                              }`}
                            >
                              {status.replace("-", " ")}
                            </button>
                          ))}
                          
                          <div className="hidden lg:block w-px h-4 bg-white/10 mx-2"></div>

                          <button
                            onClick={() => markStudiedNow(subject.id, topic.id)}
                            className="px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest bg-plum/10 text-plum ring-1 ring-plum/20 hover:bg-plum/20 hover:shadow-[0_0_15px_rgba(192,132,252,0.15)] transition-all"
                          >
                            Mark Studied
                          </button>
                        </div>
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
