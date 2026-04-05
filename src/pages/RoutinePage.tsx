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
  const isHoliday = today === "SUN" || today === "MON" || todayFrames.length === 0

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
    <section className="flex flex-col gap-8 w-full max-w-5xl mx-auto py-4">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
            ROUTINE <span className="text-ocean text-xs font-mono font-medium tracking-[0.4em] bg-ocean/10 px-3 py-1 rounded-full border border-ocean/20">CORE.CMD</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Automatic Class Management System for Section C</p>
        </div>
        
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/5 shadow-inner self-start md:self-end">
          {(["daily", "weekly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v)
                setIndex(0)
              }}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                view === v 
                  ? "bg-ocean/20 text-ocean shadow-[0_0_20px_rgba(56,189,248,0.15)] ring-1 ring-ocean/30" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "daily" ? (
          isHoliday ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="neo-card p-16 text-center space-y-6 mt-12 bg-gradient-to-br from-slate-900/60 to-slate-950/80 mx-4"
            >
              <div className="w-24 h-24 bg-plum/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-plum/20">
                <span className="text-5xl">🏝️</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-display text-white font-bold tracking-tight">Let's chill!</h2>
                <p className="text-slate-400 text-lg max-w-sm mx-auto">Today is a holiday ({today}). No classes scheduled. Time to recharge your battery!</p>
              </div>
              <button onClick={() => setView("weekly")} className="text-plum text-xs font-bold uppercase tracking-[0.3em] bg-plum/10 px-6 py-3 rounded-xl border border-plum/20 hover:bg-plum/20 transition-all">
                Preview Weekly Calendar
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="daily-carousel"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="relative min-h-[520px] flex items-center justify-center overflow-visible px-4"
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
                    className="absolute w-full max-w-[500px]"
                    animate={{
                      x: diff * 520,
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.4,
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                      zIndex: isActive ? 50 : 20 - Math.abs(diff)
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => handleDragEnd(e, info, todayFrames.length)}
                    style={{ x: isActive ? dragX : diff * 520 }}
                  >
                    <div className={`p-8 rounded-[32px] backdrop-blur-2xl border-2 transition-all duration-700 ${
                      isCurrent 
                        ? isBreak ? "bg-amber/5 border-amber/20" : "bg-ocean/10 border-ocean/30 shadow-[0_30px_60px_-15px_rgba(56,189,248,0.25)]" 
                        : isPast ? "bg-slate-900/40 border-white/[0.03] grayscale opacity-60" : "bg-slate-900/60 border-white/[0.08]"
                    }`}>
                      <div className="flex justify-between items-center mb-10">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${
                          isBreak ? "bg-amber/20 text-amber" : 
                          isCurrent ? "bg-ocean text-white" : "bg-white/5 text-slate-500"
                        }`}>
                          {isBreak ? "RECHARGE" : isCurrent ? "ACTIVE NOW" : isPast ? "COMPLETED" : "INCOMING"}
                        </div>
                        <span className="font-mono text-sm font-bold text-slate-300 opacity-80">{formatTimeRange(frame.start, frame.end)}</span>
                      </div>

                      <div className="space-y-8">
                        {frame.entries.map((entry, entryIdx) => (
                          <div key={entry.id} className={`${entryIdx > 0 ? "pt-8 border-t border-white/5" : ""} relative`}>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                  <h3 className={`text-2xl font-bold tracking-tight leading-none ${isBreak ? "text-amber" : "text-white"}`}>
                                    {isBreak && <span className="mr-3">☕</span>}{entry.title}
                                  </h3>
                                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-widest">{entry.subjectId.toUpperCase()}</p>
                                </div>
                                {entry.group && <span className="text-[10px] bg-sky-500/10 text-sky-400 px-3 py-1 rounded-lg border border-sky-500/20 font-black">{entry.group}</span>}
                              </div>

                              {!isBreak && (
                                <div className="grid grid-cols-2 gap-6 pt-2">
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-600 tracking-widest uppercase">Room</span>
                                    <p className="text-slate-300 text-xs font-semibold">{entry.room}</p>
                                  </div>
                                  <div className="space-y-1 text-right">
                                    <span className="text-[9px] font-black text-slate-600 tracking-widest uppercase">Instructor</span>
                                    <p className="text-slate-300 text-xs font-semibold truncate">{entry.instructor || "Common"}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {todayFrames.map((_, dotIdx) => (
                            <div key={dotIdx} className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === index ? "w-8 bg-ocean" : "w-1.5 bg-white/10"}`} />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">SEQ // {index + 1}</span>
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
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="space-y-12 px-4 pb-20"
          >
            {dayOrder.map((day) => {
              const dayFrames = frames.filter(f => f.day === day)
              if (dayFrames.length === 0) return null
              const isToday = day === today

              return (
                <div key={day} className={`relative flex flex-col gap-6 pl-8 border-l-2 transition-colors ${isToday ? "border-ocean" : "border-white/5"}`}>
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ring-4 ${isToday ? "bg-ocean ring-ocean/20" : "bg-slate-800 ring-slate-950"}`} />
                  <div className="flex items-center gap-4">
                    <h3 className={`text-2xl font-black italic tracking-tighter ${isToday ? "text-ocean" : "text-slate-200"}`}>{day}</h3>
                    {isToday && <span className="bg-ocean/10 text-ocean text-[10px] px-2 py-0.5 rounded border border-ocean/20 font-black">TODAY</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayFrames.map(frame => (
                      <div key={frame.start} className="neo-card p-5 space-y-4 hover:border-ocean/20">
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-[10px] font-mono text-ocean font-bold">{formatTimeRange(frame.start, frame.end)}</span>
                        </div>
                        <div className="space-y-3">
                          {frame.entries.map(entry => (
                            <div key={entry.id} className="flex flex-col gap-1 first:pt-0 pt-3 border-t border-white/5 first:border-0">
                              <span className="text-sm font-bold text-white group-hover:text-ocean transition-colors">{entry.title}</span>
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{entry.room}</span>
                                {entry.group && <span className="text-[8px] text-ocean/60 font-bold">{entry.group}</span>}
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
