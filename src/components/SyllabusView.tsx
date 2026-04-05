import { useAppStore } from "../store/useAppStore"

export const SyllabusView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)
  const updateTopicStatus = useAppStore((state) => state.updateTopicStatus)
  const markStudiedNow = useAppStore((state) => state.markStudiedNow)

  const selected = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap items-center gap-3 w-full border-b border-white/5 pb-4">
        <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold px-4 pl-0">
          Syllabus Tracker
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
              Overview
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
        <p className="text-[10px] uppercase tracking-[0.3em] text-ocean font-bold">Progress Engine</p>
        <h2 className="text-3xl font-display text-white tracking-tight">Syllabus Matrix</h2>
        <p className="text-sm text-slate-400">
          Monitor your study progress, declare focus priorities, and track subject completion.
        </p>
      </div>

      <div className="grid gap-6">
        {(selected ? [selected] : subjects).map((subject) => (
          <div
            key={subject.id}
            className="neo-card p-8 flex flex-col gap-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display text-white tracking-tight">{subject.title}</h3>
                {subject.code && (
                  <span className="text-xs uppercase tracking-widest text-ocean/80 font-mono mt-1 block">
                    MODULE // {subject.code}
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-6">
              {subject.units.map((unit) => (
                <div key={unit.id} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-ocean to-plum opacity-50"></div>
                  
                  <div className="flex items-center justify-between mb-4 pl-2">
                    <p className="text-sm uppercase tracking-widest text-slate-300 font-bold">{unit.title}</p>
                  </div>

                  <div className="grid gap-3">
                    {unit.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 rounded-xl bg-slate-800/40 border border-white/5 px-5 py-4 transition-all hover:bg-slate-800/60"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            {topic.priority === "high" && <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>}
                            {topic.priority === "medium" && <span className="w-2 h-2 rounded-full bg-ocean"></span>}
                            {topic.priority === "low" && <span className="w-2 h-2 rounded-full bg-slate-500"></span>}
                            <p className="text-[10px] uppercase tracking-widest text-slate-400">
                              {topic.priority} PRIORITY
                            </p>
                          </div>
                          <p className="text-base font-medium text-slate-100">{topic.title}</p>
                          <p className="text-[11px] text-slate-500 mt-1 font-mono">
                            {topic.lastStudied
                              ? `LA_SYNC: ${new Date(topic.lastStudied).toLocaleString()}`
                              : "STATUS: UNTRACKED"}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {(["not-started", "in-progress", "done"] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateTopicStatus(subject.id, topic.id, status)}
                              className={`px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest transition-all ${
                                topic.status === status
                                  ? status === "done" 
                                    ? "bg-lime/20 text-lime border border-lime/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                                    : status === "in-progress"
                                      ? "bg-ocean/20 text-ocean border border-ocean/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                                      : "bg-slate-700 text-slate-300 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                  : "bg-slate-900/50 text-slate-500 border border-transparent hover:bg-slate-800 hover:text-slate-300"
                              }`}
                            >
                              {status.replace("-", " ")}
                            </button>
                          ))}
                          
                          <div className="w-px h-6 bg-white/10 mx-1 hidden md:block"></div>

                          <button
                            onClick={() => markStudiedNow(subject.id, topic.id)}
                            className="px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest bg-plum/20 text-plum border border-plum/30 hover:bg-plum/30 hover:shadow-[0_0_10px_rgba(192,132,252,0.3)] transition-all ml-auto xl:ml-0"
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
          </div>
        ))}
      </div>
    </section>
  )
}
