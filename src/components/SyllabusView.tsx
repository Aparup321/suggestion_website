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
    <section className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-10 px-4 md:px-0 font-zoro">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#00ef8e] font-bold">SYLLABUS_TRACKER.NAV</p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase font-zoro">SYLLABUS <span className="text-[#00ef8e]">MATRIX</span></h1>
          <p className="text-slate-500 text-sm font-medium">Monitor study nodes and track module completion status</p>
        </div>
      </div>

      {/* SUBJECT FILTER */}
      <div className="flex flex-wrap items-center gap-2 px-6 bg-black/40 p-4 rounded-2xl border border-[#00ef8e]/10 mx-4 backdrop-blur-md">
        <button
          onClick={() => setSelectedSubject(undefined)}
          className={`px-5 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
            !selectedSubjectId
              ? "bg-[#00ef8e]/20 text-[#00ef8e] border border-[#00ef8e]/30 shadow-[0_0_15px_rgba(0,239,142,0.2)]"
              : "text-slate-500 hover:text-[#00ef8e]/60"
          }`}
        >
          MODULES
        </button>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`px-5 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
              selectedSubjectId === subject.id
                ? "bg-[#00ef8e]/20 text-[#00ef8e] border border-[#00ef8e]/30 shadow-[0_0_15px_rgba(0,239,142,0.2)]"
                : "text-slate-500 hover:text-[#00ef8e]/60"
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
            <div className="flex flex-col items-start gap-2 border-l-4 border-[#00ef8e] pl-6">
              <h3 className="text-3xl font-black text-white tracking-tight leading-none uppercase font-zoro">{subject.title}</h3>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-[#00ef8e]/60 font-bold uppercase tracking-widest">COURSE_CODE // {subject.code || subject.id}</span>
              </div>
            </div>

            <div className="grid gap-6">
              {subject.units.map((unit) => (
                <div key={unit.id} className="neo-card p-6 md:p-8 space-y-6 relative overflow-visible group/unit">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transform group-hover/unit:rotate-12 transition-transform duration-700">
                    <span className="text-8xl font-black italic">⚔️</span>
                  </div>
                  
                  <div className="flex items-center gap-4 py-4">
                    <div className="h-px flex-1 bg-white/5 group-hover/unit:bg-[#00ef8e]/20 transition-colors"></div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#00ef8e]/80 font-black px-4">{unit.title}</p>
                    <div className="h-px flex-1 bg-white/5 group-hover/unit:bg-[#00ef8e]/20 transition-colors"></div>
                  </div>

                  <div className="grid gap-4">
                    {unit.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 p-8 md:p-10 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00ef8e]/30 transition-all hover:bg-black/60 group/topic relative overflow-visible"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00ef8e]/5 to-transparent opacity-0 group-hover/topic:opacity-100 transition-opacity"></div>
                        
                        <div className="space-y-4 relative z-10 px-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              topic.priority === "high" ? "bg-amber shadow-[0_0_10px_rgba(245,158,11,0.4)]" :
                              topic.priority === "medium" ? "bg-[#00ef8e]" : "bg-slate-700"
                            }`} />
                            <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">{topic.priority} PRIORITY</span>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm sm:text-base md:text-lg font-bold text-white group-hover/topic:text-[#00ef8e] transition-colors leading-tight">{topic.title}</p>
                            <p className="text-[9px] sm:text-[10px] text-slate-600 font-mono font-bold uppercase tracking-tighter">
                              {topic.lastStudied
                                ? `LAST_STUDIED: ${new Date(topic.lastStudied).toLocaleString()}`
                                : "STATUS: NOT_STARTED"}
                            </p>
                          </div>
                        </div>

                        <div className="w-full lg:w-auto relative z-10 mt-8 lg:mt-0">
                          <div className="grid grid-cols-2 lg:flex lg:flex-row items-center gap-3 lg:bg-black/50 lg:p-2 lg:rounded-xl">
                            {(["not-started", "in-progress", "done"] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => updateTopicStatus(subject.id, topic.id, status)}
                                className={`px-2 py-3 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${
                                  topic.status === status
                                    ? status === "done" 
                                      ? "bg-[#00ef8e]/20 text-[#00ef8e] ring-1 ring-[#00ef8e]/40 shadow-[0_0_15px_rgba(0,239,142,0.2)]"
                                      : status === "in-progress"
                                        ? "bg-amber/10 text-amber ring-1 ring-amber/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                                        : "bg-slate-800 text-slate-200 ring-1 ring-white/10"
                                    : "text-slate-600 hover:text-slate-300 hover:bg-white/5"
                                }`}
                              >
                                {status.replace("-", " ")}
                              </button>
                            ))}
                            
                            <button
                              onClick={() => markStudiedNow(subject.id, topic.id)}
                              className="col-span-2 lg:col-auto px-4 py-3 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-widest bg-[#00ef8e]/10 text-[#00ef8e] ring-1 ring-[#00ef8e]/20 hover:bg-[#00ef8e]/20 hover:shadow-[0_0_15px_rgba(0,239,142,0.3)] transition-all font-sans"
                            >
                              MARK COMPLETED
                            </button>
                          </div>
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
