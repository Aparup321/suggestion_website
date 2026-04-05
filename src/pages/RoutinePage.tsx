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

  // Group entries into "Frames" (Simultaneous classes in one card)
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

  // Auto-focus on current class in Daily View
  useEffect(() => {
    if (view === "daily" && todayFrames.length > 0) {
      const nowMin = getNowMinutes(now)
      const currentIndex = todayFrames.findIndex(
        (f) => nowMin >= toMinutes(f.start) && nowMin <= toMinutes(f.end)
      )
      const nextIndex = todayFrames.findIndex((f) => toMinutes(f.start) > nowMin)
      
      if (currentIndex >= 0) {
        setIndex(currentIndex)
      } else if (nextIndex >= 0) {
        setIndex(nextIndex)
      } else {
        setIndex(todayFrames.length - 1)
      }
    }
  }, [view, todayFrames, now])

  const shiftCarousel = (delta: number, length: number) => {
    setIndex((prev) => {
      const next = prev + delta
      return Math.max(0, Math.min(next, length - 1))
    })
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
    <section className="flex flex-col gap-6 w-full">
      {/* HEADER TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-900/50 rounded-xl border border-white/5 flex gap-1">
            {(["daily", "weekly"] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setView(v)
                  setIndex(0)
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  view === v 
                    ? "bg-ocean text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]" 
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold hidden md:block">
          {view === "daily" ? `Timeline // ${today}` : "Full Week Schedule"}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "daily" ? (
          todayFrames.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center p-20 neo-card text-center gap-4 mt-8"
            >
              <div className="text-6xl">🌴</div>
              <h2 className="text-3xl font-display text-white">Let's chill!</h2>
              <p className="text-slate-400 max-w-xs">Monday is your off day. No classes scheduled today. Enjoy your holiday!</p>
            </motion.div>
          ) : (
            <motion.div 
              key="daily"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="relative min-h-[480px] flex items-center justify-center overflow-hidden w-full"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {todayFrames.map((frame, i) => {
                  const diff = i - index
                  if (Math.abs(diff) > 2) return null
                  const isActive = diff === 0
                  const isPast = diff < 0
                  const nowMin = getNowMinutes(now)
                  const isCurrent = nowMin >= toMinutes(frame.start) && nowMin <= toMinutes(frame.end)
                  
                  // Check if any entry in the frame is a break
                  const isBreak = frame.entries.some(e => e.subjectId === "break")

                  return (
                    <motion.div
                      key={frame.day + frame.start}
                      className="absolute w-[580px] pointer-events-auto"
                      animate={{
                        x: diff * 600,
                        scale: isActive ? 1 : 0.85,
                        opacity: isActive ? 1 : 0.3,
                        filter: isActive ? "blur(0px)" : "blur(4px)",
                        zIndex: 20 - Math.abs(diff)
                      }}
                      drag={isActive ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, info) => handleDragEnd(e, info, todayFrames.length)}
                      style={{ x: isActive ? dragX : diff * 600 }}
                    >
                      <div className={`p-8 rounded-3xl backdrop-blur-xl border flex flex-col gap-6 shadow-2xl transition-colors ${
                        isCurrent 
                          ? isBreak ? "bg-lime/10 border-lime/40 shadow-lime/5" : "bg-ocean/10 border-ocean/40 shadow-ocean/5" 
                          : isBreak ? "bg-slate-900/40 border-white/5 opacity-80" : "bg-slate-900/60 border-white/10"
                      }`}>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            isCurrent 
                              ? isBreak ? "bg-lime text-black" : "bg-ocean text-white" 
                              : "bg-white/5 text-slate-400"
                          }`}>
                            {isBreak ? "Break Mode" : isCurrent ? "Active Now" : isPast ? "Completed" : "Incoming"}
                          </div>
                          <span className="font-mono text-sm text-slate-200">{formatTimeRange(frame.start, frame.end)}</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {frame.entries.map((entry, entryIdx) => (
                            <div key={entry.id} className={`flex flex-col gap-2 ${entryIdx > 0 ? "pt-4 border-t border-white/5" : ""}`}>
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  {isBreak && <span className="text-2xl">☕</span>}
                                  <h3 className={`text-2xl font-display ${isBreak ? "text-lime font-medium" : "text-white"}`}>
                                    {entry.title}
                                  </h3>
                                </div>
                                {entry.group && <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-ocean font-bold">{entry.group}</span>}
                              </div>
                              
                              {!isBreak && (
                                <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-400 uppercase tracking-widest">
                                  <div><span className="text-slate-600 block mb-1">Room</span> {entry.room}</div>
                                  <div><span className="text-slate-600 block mb-1">Instructor</span> {entry.instructor || "--"}</div>
                                </div>
                              )}
                              {isBreak && (
                                <p className="text-sm text-slate-400 italic">Time to recharge and grab a snack.</p>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex justify-between items-center text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                          <span>Frame {i + 1} / {todayFrames.length}</span>
                          {isActive && index < todayFrames.length - 1 && <span className="animate-pulse text-ocean">Swipe for next &rarr;</span>}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )
        ) : (
          <motion.div 
            key="weekly"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid gap-8"
          >
            {dayOrder.map((day) => {
              const dayFrames = frames.filter(f => f.day === day)
              if (dayFrames.length === 0) return null
              return (
                <div key={day} className="flex flex-col gap-4">
                  <h3 className="text-xl font-display text-white border-l-4 border-plum pl-4">{day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayFrames.map(frame => (
                      <div key={frame.start} className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col gap-3">
                        <span className="text-[10px] font-mono text-ocean opacity-70">{formatTimeRange(frame.start, frame.end)}</span>
                        {frame.entries.map(entry => (
                          <div key={entry.id} className="flex flex-col">
                            <span className="text-sm font-semibold text-white">{entry.title}</span>
                            <span className="text-[10px] text-slate-500 uppercase">{entry.room} {entry.group ? `// ${entry.group}` : ""}</span>
                          </div>
                        ))}
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
