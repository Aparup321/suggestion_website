import { useEffect, useMemo, useState } from "react"
import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { dayOrder, formatTimeRange, getNowDay, getNowMinutes, toMinutes, getMinutesUntil } from "../utils/time"
import { motion, AnimatePresence } from "framer-motion"

export const RoutinePage = () => {
  const view = useAppStore((state) => state.view)
  const setView = useAppStore((state) => state.setView)
  const setMode = useAppStore((state) => state.setMode)

  const [index, setIndex] = useState(0)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    setMode("routine")
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [setMode])

  const frames = useMemo(() => {
    const sorted = [...routineEntries].sort((a, b) => {
      const dO = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
      const dayDiff = dO.indexOf(a.day) - dO.indexOf(b.day)
      if (dayDiff !== 0) return dayDiff
      return toMinutes(a.start) - toMinutes(b.start)
    })

    const result: { day: string; start: string; end: string; entries: typeof routineEntries }[] = []
    sorted.forEach((entry) => {
      const last = result[result.length - 1]
      if (last && last.day === entry.day && last.start === entry.start) {
        last.entries.push(entry)
      } else {
        result.push({ day: entry.day, start: entry.start, end: entry.end, entries: [entry] })
      }
    })
    return result
  }, [])

  const today = getNowDay(now)
  const todayFrames = useMemo(() => frames.filter((f) => f.day === today), [frames, today])
  const isHoliday = today === "SUN" || today === "SAT" || todayFrames.length === 0

  useEffect(() => {
    if (view === "daily" && todayFrames.length > 0) {
      const nowMin = getNowMinutes(now)
      const currentIndex = todayFrames.findIndex(
        (f) => nowMin >= toMinutes(f.start) && nowMin <= toMinutes(f.end)
      )
      const nextIndex = todayFrames.findIndex((f) => toMinutes(f.start) > nowMin)

      if (currentIndex >= 0) setIndex(currentIndex)
      else if (nextIndex >= 0) setIndex(nextIndex)
      else setIndex(todayFrames.length - 1)
    }
  }, [view, todayFrames, now])

  const days = ["MON", "TUE", "WED", "THU", "FRI"] as const

  return (
    <section className="flex flex-col gap-10 w-full animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div className="space-y-1">
           <h2 className="text-4xl font-black hud-text-cyan tracking-wider italic uppercase flex items-center gap-4">
             ROUTINE <span className="text-white">SCHEDULE</span>
             <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--hud-accent-blue)] to-transparent"></div>
           </h2>
           <p className="text-[11px] mono-font text-slate-500 uppercase tracking-[0.3em]">DIGITAL STUDY OPS COMMAND CENTER</p>
        </div>
        
        <div className="flex bg-black/40 border border-[var(--hud-border-gold)] rounded-full p-1 shadow-[0_0_15px_rgba(255,204,0,0.1)]">
          {(["daily", "weekly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v)
                setIndex(0)
              }}
              className={`px-8 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${
                view === v 
                  ? "bg-[var(--hud-accent-yellow)] text-black shadow-[0_0_15px_var(--hud-accent-yellow)]" 
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {v === "daily" ? "Live" : "Weekly"}
            </button>
          ))}
          <div className="px-4 py-2 text-[10px] font-bold text-[var(--hud-accent-yellow)]/60 uppercase tracking-widest border-l border-white/10 ml-2">
             Mission_Grid
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "weekly" ? (
          <motion.div 
            key="weekly"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 px-2"
          >
            {days.map((day) => {
              const isToday = today === day
              const dayEntries = routineEntries.filter(e => e.day === day)
              
              return (
                <div key={day} className={`hud-panel p-6 flex flex-col gap-6 ${isToday ? 'border-[var(--hud-accent-blue)] shadow-[0_0_25px_rgba(0,242,255,0.2)]' : ''}`}>
                   <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                      <span className={`text-sm font-black tracking-[0.2em] ${isToday ? 'hud-text-cyan' : 'text-slate-400'}`}>{day}</span>
                      {isToday && <div className="w-2 h-2 rounded-full bg-[var(--hud-accent-blue)] animate-pulse shadow-[0_0_10px_var(--hud-accent-blue)]"></div>}
                   </div>
                   <div className="space-y-5">
                      {dayEntries.length === 0 ? (
                        <p className="text-[10px] text-slate-600 uppercase mono-font tracking-widest italic opacity-40">NO_DATA_STREAM</p>
                      ) : (
                        dayEntries.map((entry) => (
                          <div key={entry.id} className="group/entry cursor-default">
                             <p className="text-sm font-bold text-white group-hover:hud-text-cyan transition-all line-clamp-3 leading-[1.4] uppercase tracking-tight">
                                {entry.title}
                             </p>
                          </div>
                        ))
                      )}
                   </div>
                </div>
              )
            })}
          </motion.div>
        ) : (
          /* DAILY VIEW */
          <motion.div 
            key="daily"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 px-2"
          >
             {isHoliday ? (
                <div className="col-span-12 hud-panel p-24 text-center space-y-8 bg-black/20">
                   <div className="w-24 h-24 border border-[var(--hud-accent-yellow)]/30 rounded-2xl flex items-center justify-center mx-auto text-5xl filter drop-shadow-[0_0_20px_var(--hud-accent-yellow)]">
                      ☠️
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">NO MISSIONS DETECTED</h3>
                      <p className="hud-text-gold text-sm font-black uppercase tracking-[0.3em]">RELAX, CREW. IT'S A HOLIDAY.</p>
                   </div>
                </div>
             ) : (
                <>
                  {/* CURRENT SESSION */}
                  <div className="md:col-span-7 space-y-8">
                     {todayFrames.map((frame, i) => {
                        const isActive = i === index
                        if (!isActive) return null
                        const isBreak = frame.entries.some(e => e.subjectId === "break")
                        
                        return (
                           <div key={i} className="hud-panel p-10 border-l-4 border-l-[var(--hud-accent-blue)] relative overflow-hidden h-full flex flex-col justify-center">
                              <div className="absolute top-4 right-8 font-black hud-text-cyan opacity-20 text-xs">LIVE_FEED_0{i+1}</div>
                              <span className="text-[11px] font-black px-4 py-1.5 bg-[var(--hud-accent-blue)] text-black uppercase tracking-widest inline-block mb-6 rounded-full self-start">
                                 {isBreak ? "REST_CYCLE" : "ACTIVE_MISSION"}
                              </span>
                              <div className="space-y-6">
                                 <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    {frame.entries[0].title}
                                 </h3>
                                 <div className="flex items-center gap-8 py-6 border-y border-white/5">
                                    <div>
                                       <p className="text-[10px] font-black hud-text-gold uppercase tracking-[0.2em]">TIME_WINDOW</p>
                                       <p className="text-2xl font-black text-white italic">{formatTimeRange(frame.start, frame.end)}</p>
                                    </div>
                                    <div className="w-[1px] h-10 bg-white/10"></div>
                                    <div>
                                       <p className="text-[10px] font-black hud-text-gold uppercase tracking-[0.2em]">LOCATION</p>
                                       <p className="text-2xl font-black text-white italic">{frame.entries[0].room || "N/A"}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     })}
                  </div>

                  {/* NEXT / SIDE PANELS */}
                  <div className="md:col-span-5 space-y-8">
                     <div className="hud-panel p-8 border-l-4 border-l-[var(--hud-accent-yellow)]">
                        <p className="text-[10px] font-black hud-text-gold uppercase tracking-[0.4em] mb-6">UPCOMING_EVENTS</p>
                        <div className="space-y-6">
                           {todayFrames.slice(index + 1, index + 3).map((frame, i) => (
                              <div key={i} className="flex flex-col gap-2 group cursor-pointer border-b border-white/5 pb-4 last:border-0">
                                 <p className="text-xs font-black hud-text-cyan tracking-widest uppercase">{frame.start}</p>
                                 <p className="text-lg font-black text-white/80 group-hover:text-white uppercase italic leading-tight transition-colors">
                                    {frame.entries[0].title}
                                 </p>
                              </div>
                           ))}
                           {todayFrames.slice(index + 1).length === 0 && (
                              <p className="text-xs font-black text-slate-600 uppercase italic">NO FURTHER MISSIONS TODAY_</p>
                           )}
                        </div>
                     </div>
                     
                     {/* STATS DECOR */}
                     <div className="hud-panel p-8 bg-gradient-to-br from-[var(--hud-accent-blue)]/5 to-transparent">
                        <p className="text-[10px] font-black hud-text-cyan uppercase tracking-[0.4em] mb-4">SYSTEM_STATUS</p>
                        <div className="flex items-end gap-3 h-12">
                           {[20, 45, 10, 80, 40, 90, 30, 60, 20].map((h, i) => (
                              <div key={i} className="flex-1 bg-[var(--hud-accent-blue)]/20 rounded-t-sm relative group">
                                 <div className="absolute bottom-0 left-0 right-0 bg-[var(--hud-accent-blue)] transition-all duration-1000" style={{ height: `${h}%` }}></div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                </>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM ACTION PANELS - ONLY IN WEEKLY */}
      {view === "weekly" && (
         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
             {/* BREAK PANEL */}
             <div className="md:col-span-5 hud-panel p-8 border-l-4 border-l-[var(--hud-accent-yellow)] bg-gradient-to-r from-[var(--hud-accent-yellow)]/5 to-transparent overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <span className="text-[10px] font-bold px-3 py-1 bg-[var(--hud-accent-yellow)] text-black uppercase tracking-widest mb-3 inline-block">BREAK_SYS</span>
                      <h3 className="text-2xl font-black italic tracking-tight text-white uppercase">RECOVERY CYCLE</h3>
                   </div>
                   <span className="text-[11px] mono-font hud-text-gold font-bold">08:00 - 09:00</span>
                </div>
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 border border-[var(--hud-accent-yellow)]/30 rounded-xl flex items-center justify-center text-3xl bg-black/20 shadow-inner">☕</div>
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-300 uppercase letter-spacing-1">MISSION_REST_TIME</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                         <span className="hud-text-cyan">📍</span> COORD: <span className="text-slate-400">BASE_1</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* UPCOMING SESSION PANEL */}
             <div className="md:col-span-7 hud-panel p-8 border-l-4 border-l-[var(--hud-accent-blue)] bg-gradient-to-r from-[var(--hud-accent-blue)]/5 to-transparent relative overflow-hidden">
                <div className="absolute top-4 right-4 text-2xl opacity-20 hud-text-cyan">✦</div>
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <span className="text-[10px] font-bold px-3 py-1 bg-[var(--hud-accent-blue)] text-black uppercase tracking-widest mb-3 inline-block">LOG_ENTRY</span>
                      <h3 className="text-2xl font-black italic tracking-tight text-white uppercase">NEXT_SEQUENCE</h3>
                   </div>
                   <div className="text-right">
                      <span className="text-[11px] mono-font hud-text-cyan font-bold block">09:00 - 13:00</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-base font-black text-white uppercase tracking-normal leading-snug">
                      CORE_SEQUENCING // <span className="hud-text-cyan">LAB_03</span> // SYNC_ACTIVE
                   </p>
                   <div className="flex items-center justify-between border-t border-white/5 pt-4">
                     <div className="flex gap-2">
                        <span className="text-[10px] mono-font text-slate-500 uppercase tracking-widest">REALTIME_READY</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-[var(--hud-accent-blue)]/40 flex items-center justify-center text-[var(--hud-accent-blue)] animate-[pulse_2s_infinite]">
                           <span className="text-sm">⚛️</span>
                        </div>
                     </div>
                   </div>
                </div>
             </div>
         </div>
      )}
    </section>
  )
}

