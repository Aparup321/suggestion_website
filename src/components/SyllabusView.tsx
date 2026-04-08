import { useAppStore } from "../store/useAppStore"
import { motion } from "framer-motion"

export const SyllabusView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)

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
            <div className="flex flex-col items-start gap-4 border-l-4 border-[#00ef8e] pl-6 mb-12">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white tracking-tight leading-none uppercase font-zoro">{subject.title}</h3>
                <span className="text-[10px] font-mono text-[#00ef8e]/60 font-bold uppercase tracking-widest leading-none">COURSE_CODE // {subject.code || subject.id}</span>
              </div>

              {selectedSubjectId && (subject.objective || subject.outcomes || subject.prerequisites) && (
                <div className="grid md:grid-cols-2 gap-8 w-full mt-6 p-6 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  {subject.objective && (
                    <div className="md:col-span-2 space-y-2 border-b border-white/5 pb-4">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#00ef8e] font-black">COURSE_OBJECTIVE</p>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">{subject.objective}</p>
                    </div>
                  )}
                  {subject.prerequisites && (
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#00ef8e] font-black">PRE_REQUISITES</p>
                      <ul className="space-y-1">
                        {subject.prerequisites.map((req, i) => (
                          <li key={i} className="text-[11px] text-slate-500 font-mono">• {req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {subject.outcomes && (
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#00ef8e] font-black">COURSE_OUTCOMES</p>
                      <ul className="space-y-2">
                        {subject.outcomes.map((co, i) => (
                          <li key={i} className="text-[11px] text-slate-500 leading-normal border-l border-[#00ef8e]/20 pl-3">{co}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-6">
              {subject.units.map((unit) => (
                <div key={unit.id} className="space-y-6 relative group/unit px-4 md:px-0">
                  <div className="flex items-center gap-4 py-4">
                    <div className="h-px w-8 bg-[#00ef8e]/40"></div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#00ef8e]/80 font-black">{unit.title}</p>
                    <div className="h-px flex-1 bg-white/5 group-hover/unit:bg-[#00ef8e]/20 transition-colors"></div>
                  </div>

                   {/* TOPICS LIST */}
                   <div className="grid gap-3 pl-4 md:pl-10">
                     {unit.topics.map((topic) => (
                       <div key={topic.id} className="group/topic flex items-start gap-4 py-1 transition-all">
                         {/* SWORD GLINT BULLET */}
                         <div className="mt-2.5 relative flex-shrink-0">
                           <div className="w-1 h-1 rounded-full bg-[#00ef8e] shadow-[0_0_10px_#00ef8e] group-hover/topic:scale-150 transition-transform" />
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-[#00ef8e]/0 group-hover/topic:bg-[#00ef8e]/40 group-hover/topic:w-8 transition-all duration-500 rounded-full" />
                         </div>
                         
                         <div className="space-y-1">
                           <p className="text-sm md:text-base font-medium text-slate-300 group-hover/topic:text-[#00ef8e] transition-colors tracking-wide uppercase font-zoro">
                             {topic.title}
                           </p>
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
