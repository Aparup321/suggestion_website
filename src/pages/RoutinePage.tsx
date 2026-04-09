import { useEffect, useMemo, useState } from "react"
import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { dayOrder, formatTimeRange, getNowDay, getNowMinutes, toMinutes } from "../utils/time"
import { motion, useMotionValue, AnimatePresence } from "framer-motion"

export const RoutinePage = () => {
  const view = useAppStore((state) => state.view)
  const setView = useAppStore((state) => state.setView)
  const setMode = useAppStore((state) => state.setMode)

  const [index, setIndex] = useState(0)
  const [now, setNow] = useState(() => new Date())
  const dragX = useMotionValue(0)

  useEffect(() => {
    setMode("routine")
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [setMode])

  const frames = useMemo(() => {
    const sorted = [...routineEntries].sort((a, b) => {
      const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
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

  const shiftCarousel = (delta: number, length: number) => {
    setIndex((prev) => Math.max(0, Math.min(prev + delta, length - 1)))
    dragX.set(0)
  }

  const handleDragEnd = (_: any, info: any, length: number) => {
    const swipe = info.offset.x
    if (swipe < -50) shiftCarousel(1, length)
    else if (swipe > 50) shiftCarousel(-1, length)
    dragX.stop()
    dragX.set(0)
  }

  return (
    <section className="flex flex-col gap-10 w-full animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div className="space-y-1">
           <h2 className="text-4xl font-black hud-text-cyan tracking-wider italic uppercase flex items-center gap-4">
             ROUTINE <span className="text-white">SCHEDULE</span>
             <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--hud-accent-blue)] to-transparent"></div>
           </h2>
           <p className="text-[11px] mono-font text-slate-500 uppercase tracking-[0.3em]">DIGITAL MISSION DATA STREAM</p>
        </div>
        
        <div className="flex bg-black/40 border border-[var(--hud-border-gold)] rounded-full p-1 shadow-[0_0_15px_rgba(255,204,0,0.1)]">
          {(["daily", "weekly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v)
                setIndex(0)
              }}
              className={`px-8 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${view === v
                  ? "bg-[var(--hud-accent-yellow)] text-black shadow-[0_0_15px_var(--hud-accent-yellow)]"
                  : "text-slate-500 hover:text-white"
                }`}
            >
              {v === "daily" ? "Live" : "Weekly"}
            </button>
          ))}

        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "daily" ? (
          isHoliday ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="hud-panel p-20 text-center space-y-8 mt-12 bg-black/20"
            >
              <div className="w-32 h-32 border border-[var(--hud-accent-yellow)]/30 rounded-2xl flex items-center justify-center mx-auto text-7xl filter drop-shadow-[0_0_20px_var(--hud-accent-yellow)]">
                ☠️
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">No Missions Today</h2>
                <p className="hud-text-gold text-lg font-black uppercase tracking-[0.2em]">Enjoy your shore leave.</p>
              </div>
              <button 
                onClick={() => setView("weekly")} 
                className="px-8 py-4 bg-[var(--hud-accent-yellow)] text-black rounded-full font-black uppercase tracking-widest shadow-[0_0_20px_var(--hud-accent-yellow)] hover:scale-105 transition-transform"
              >
                View Weekly Log
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="daily-carousel"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="relative min-h-[550px] flex items-center justify-center overflow-visible px-4"
            >
              {todayFrames.map((frame, i) => {
                const diff = i - index
                if (Math.abs(diff) > 2) return null
                const isActive = diff === 0
                const nowMin = getNowMinutes(now)
                const isCurrent = nowMin >= toMinutes(frame.start) && nowMin <= toMinutes(frame.end)
                const isPast = nowMin > toMinutes(frame.end)
                const isBreak = frame.entries.some(e => e.subjectId === "break")

                return (
                  <motion.div
                    key={frame.day + frame.start}
                    className="absolute w-full max-w-[550px]"
                    animate={{
                      x: diff * 580,
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.3,
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                      zIndex: isActive ? 50 : 20 - Math.abs(diff)
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => handleDragEnd(e, info, todayFrames.length)}
                    style={{ x: isActive ? dragX : diff * 580 }}
                  >
                    <div className={`hud-panel p-10 md:p-14 transition-all duration-300 relative border-2 ${isCurrent
                        ? isBreak ? 'border-[var(--hud-accent-yellow)] shadow-[0_0_30px_rgba(255,204,0,0.15)]' : 'border-[var(--hud-accent-blue)] shadow-[0_0_40px_rgba(0,242,255,0.2)]'
                        : isPast ? 'opacity-40 grayscale scale-95 border-white/5 shadow-none' : 'border-white/10'
                      }`}>
                      
                      {/* SCANLINE EFFECT FOR ACTIVE CARD */}
                      {isActive && <div className="absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none">
                         <div className="w-full h-[1px] bg-[var(--hud-accent-blue)] shadow-[0_0_15px_var(--hud-accent-blue)] opacity-20 absolute animate-[scan_6s_linear_infinite]"></div>
                      </div>}

                      <div className="flex justify-between items-center mb-12">
                        <div className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${isBreak ? 'bg-[var(--hud-accent-yellow)] text-black' :
                            isCurrent ? 'bg-[var(--hud-accent-blue)] text-black' : 'bg-white/5 text-slate-500 border border-white/10'
                          }`}>
                          {isBreak ? "REST_CYCLE" : isCurrent ? "ACTIVE" : isPast ? "COMPLETED" : "UPCOMING"}
                        </div>
                        <span className={`font-black text-xl italic tracking-tighter ${isCurrent ? 'hud-text-cyan' : 'text-white/40'}`}>{formatTimeRange(frame.start, frame.end)}</span>
                      </div>

                      <div className="space-y-10">
                        {frame.entries.map((entry, entryIdx) => (
                          <div key={entry.id} className={`${entryIdx > 0 ? "pt-10 border-t border-white/10" : ""} relative`}>
                            <div className="flex flex-col gap-6">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-3">
                                  <h3 className={`text-4xl font-black leading-none uppercase italic tracking-tighter ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                                    {entry.title}
                                  </h3>
                                  <div className="flex items-center gap-4">
                                     <p className={`text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-3 ${isCurrent ? 'hud-text-gold' : 'text-slate-600'}`}>
                                       <span className={`w-6 h-[2px] ${isCurrent ? 'bg-[var(--hud-accent-yellow)]' : 'bg-slate-700'}`}></span>
                                       {entry.subjectId}
                                     </p>
                                     {entry.group && <span className="text-[10px] hud-text-cyan border border-[var(--hud-accent-blue)]/30 px-3 py-0.5 rounded-md font-black uppercase">{entry.group}</span>}
                                  </div>
                                </div>
                              </div>

                              {!isBreak && (
                                  <div className={`grid grid-cols-2 gap-10 pt-6 border-t border-white/5`}>
                                    <div className="space-y-2">
                                      <span className={`text-[10px] font-black tracking-[0.4em] uppercase block ${isCurrent ? 'hud-text-cyan/60' : 'text-slate-700'}`}>LOCATION</span>
                                      <p className={`text-xl font-black italic uppercase ${isCurrent ? 'text-white' : 'text-slate-500'}`}>{entry.room}</p>
                                    </div>
                                    <div className="space-y-2 text-right">
                                      <span className={`text-[10px] font-black tracking-[0.4em] uppercase block ${isCurrent ? 'hud-text-cyan/60' : 'text-slate-700'}`}>INSTRUCTOR</span>
                                      <p className={`text-xl font-black italic uppercase ${isCurrent ? 'text-white' : 'text-slate-500'}`}>{entry.instructor || "UNIDENTIFIED"}</p>
                                    </div>
                                  </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-14 flex items-center justify-between">
                        <div className="flex gap-2">
                          {todayFrames.map((_, dotIdx) => (
                            <div key={dotIdx} className={`h-1.5 transition-all duration-300 rounded-full ${dotIdx === index ? "w-10 bg-[var(--hud-accent-blue)]" : "w-2 bg-white/10"}`} />
                          ))}
                        </div>
                        <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${isCurrent ? 'hud-text-cyan' : 'text-slate-700'}`}>FRAME_0{index + 1}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )
        ) : (
          <motion.div
            key="weekly-timeline"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-16 px-4 md:px-12 pb-24"
          >
            {dayOrder.map((day) => {
              const dayFrames = frames.filter(f => f.day === day)
              if (dayFrames.length === 0) return null
              const isToday = day === today

              return (
                <div key={day} className={`relative flex flex-col gap-10 pl-16 border-l-2 ml-4 ${isToday ? 'border-[var(--hud-accent-blue)]' : 'border-white/10'}`}>
                  {/* Timeline Marker */}
                  <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-2 ${isToday ? 'bg-black border-[var(--hud-accent-blue)] shadow-[0_0_15px_var(--hud-accent-blue)]' : 'bg-slate-900 border-white/20'}`}>
                    {isToday && <div className="absolute inset-1 bg-[var(--hud-accent-blue)] rounded-full animate-pulse"></div>}
                  </div>

                  <div className="flex items-center gap-8">
                    <h3 className={`text-5xl font-black italic tracking-tighter uppercase ${isToday ? 'hud-text-cyan' : 'text-white/40'}`}>{day}</h3>
                    {isToday && <span className="px-4 py-1.5 rounded-full bg-[var(--hud-accent-blue)] text-black text-[10px] font-black tracking-widest uppercase">CURRENT_SYS</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {dayFrames.map(frame => (
                      <div key={frame.start} className="hud-panel p-8 border border-white/5 hover:border-[var(--hud-accent-blue)]/30 group transition-all">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[11px] font-black hud-text-gold tracking-[0.2em] uppercase">{formatTimeRange(frame.start, frame.end)}</span>
                        </div>
                        <div className="space-y-6">
                          {frame.entries.map(entry => (
                            <div key={entry.id} className="flex flex-col gap-3 pt-6 border-t border-white/5 first:pt-0 first:border-0 relative">
                              <span className="text-xl font-black text-white group-hover:hud-text-cyan uppercase italic leading-tight transition-colors tracking-tighter">{entry.title}</span>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{entry.room}</span>
                                {entry.group && <span className="text-[10px] hud-text-cyan font-black border border-[var(--hud-accent-blue)]/20 px-3 py-0.5 rounded-md uppercase">{entry.group}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}


