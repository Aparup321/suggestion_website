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
          <h1 className="text-5xl font-black italic tracking-tighter text-white flex items-center gap-4">
            ROUTINE <span className="text-[var(--neo-luffy-red)] text-xs font-black tracking-[0.4em] bg-black px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_var(--neo-hat-yellow)]">Routine Dashboard</span>
          </h1>
          <p className="text-slate-500 text-sm font-black uppercase tracking-widest">Grand Line Class Management Dashboard</p>
        </div>

        <div className="flex bg-black p-2 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] self-start md:self-end">
          {(["daily", "weekly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v)
                setIndex(0)
              }}
              className={`px-8 py-3 text-xs font-black uppercase tracking-widest transition-all ${view === v
                  ? "bg-[var(--neo-luffy-red)] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000]"
                  : "text-slate-500 hover:text-white"
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="neo-card p-20 text-center space-y-8 mt-12 bg-black mesh-gradient mx-4 border-black shadow-[16px_16px_0px_0px_var(--neo-luffy-red)]"
            >
              <div className="w-32 h-32 bg-[var(--neo-hat-yellow)] border-4 border-black flex items-center justify-center mx-auto shadow-[8px_8px_0px_0px_#000]">
                <span className="text-7xl">🍖</span>
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">No Adventure Today</h2>
                <p className="text-slate-400 text-xl font-bold max-w-sm mx-auto uppercase">Today is a holiday ({today}). Time to eat meat and rest.</p>
              </div>
              <button onClick={() => setView("weekly")} className="bg-[var(--neo-luffy-red)] text-black text-sm font-black uppercase tracking-[0.3em] px-10 py-5 border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                Preview Log Pose
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
                    className="absolute w-full max-w-[520px]"
                    animate={{
                      x: diff * 550,
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.3,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                      zIndex: isActive ? 50 : 20 - Math.abs(diff)
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => handleDragEnd(e, info, todayFrames.length)}
                    style={{ x: isActive ? dragX : diff * 550 }}
                  >
                    <div className={`p-10 md:p-14 border-[6px] transition-all duration-300 relative overflow-visible ${isCurrent
                        ? isBreak ? "bg-amber-400 border-black shadow-[12px_12px_0px_0px_#000] mesh-gradient" : "bg-black mesh-gradient-luffy border-black shadow-[15px_15px_0px_0px_#000]"
                        : isPast ? "bg-[#0a0a0a] border-black/40 grayscale opacity-60 shadow-none" : "bg-black mesh-gradient border-black shadow-[10px_10px_0px_0px_#000]"
                      }`}>
                      
                      <div className="flex justify-between items-center mb-12">
                        <div className={`px-6 py-2 border-4 border-black text-xs font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#000] ${isBreak ? "bg-white text-black" :
                            isCurrent ? "bg-white text-black" : "bg-black text-slate-500"
                          }`}>
                          {isBreak ? "MEAT" : isCurrent ? "ACTIVE" : isPast ? "DONE" : "NEXT"}
                        </div>
                        <span className={`font-black text-sm md:text-base border-b-4 ${isCurrent ? "border-black text-black" : "border-[var(--neo-luffy-red)] text-[var(--neo-luffy-red)]"}`}>{formatTimeRange(frame.start, frame.end)}</span>
                      </div>

                      <div className="space-y-10">
                        {frame.entries.map((entry, entryIdx) => (
                          <div key={entry.id} className={`${entryIdx > 0 ? "pt-10 border-t-4 border-black/10" : ""} relative`}>
                            <div className="flex flex-col gap-6">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                  <h3 className={`text-3xl font-black leading-none uppercase italic ${isCurrent ? "text-black" : "text-white"}`}>
                                    {entry.title}
                                  </h3>
                                  <p className={`text-[12px] font-black uppercase tracking-widest flex items-center gap-3 ${isCurrent ? "text-black/60" : "text-[var(--neo-hat-yellow)]"}`}>
                                    <span className={`w-4 h-1 ${isCurrent ? "bg-black/40" : "bg-[var(--neo-hat-yellow)]"}`}></span>
                                    {entry.subjectId}
                                  </p>
                                </div>
                                {entry.group && <span className="text-[12px] bg-black text-white px-4 py-1 border-2 border-black font-black uppercase">{entry.group}</span>}
                              </div>

                              {!isBreak && (
                                  <div className={`grid grid-cols-2 gap-8 pt-4 border-t-2 ${isCurrent ? "border-black/20" : "border-white/10"}`}>
                                    <div className="space-y-1">
                                      <span className={`text-[10px] font-black tracking-widest uppercase block ${isCurrent ? "text-black/40" : "text-slate-600"}`}>Ship</span>
                                      <p className={`text-base font-black italic uppercase ${isCurrent ? "text-black" : "text-slate-300"}`}>{entry.room}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                      <span className={`text-[10px] font-black tracking-widest uppercase block ${isCurrent ? "text-black/40" : "text-slate-600"}`}>Captain</span>
                                      <p className={`text-base font-black italic uppercase ${isCurrent ? "text-black" : "text-slate-300"}`}>{entry.instructor || "COMMON"}</p>
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
                            <div key={dotIdx} className={`h-4 border-2 border-black transition-all ${dotIdx === index ? "w-12 bg-white" : "w-4 bg-black/20"}`} />
                          ))}
                        </div>
                        <span className={`text-xs font-black uppercase tracking-widest ${isCurrent ? "text-black" : "text-slate-600"}`}>LOG_{index + 1}</span>
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
            className="space-y-16 px-4 pb-24"
          >
            {dayOrder.map((day) => {
              const dayFrames = frames.filter(f => f.day === day)
              if (dayFrames.length === 0) return null
              const isToday = day === today

              return (
                <div key={day} className={`relative flex flex-col gap-8 pl-12 border-l-[8px] ml-4 ${isToday ? "border-[var(--neo-hat-yellow)]" : "border-black"}`}>
                  <div className={`absolute -left-[24px] top-0 w-10 h-10 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center ${isToday ? "bg-[var(--neo-luffy-red)]" : "bg-[#1a1a1a]"}`}>
                    <div className="w-2 h-2 bg-black"></div>
                  </div>
                  <div className="flex items-center gap-6">
                    <h3 className={`text-4xl font-black italic tracking-tighter uppercase ${isToday ? "text-[var(--neo-luffy-red)]" : "text-white"}`}>{day}</h3>
                    {isToday && <span className="bg-black text-[var(--neo-hat-yellow)] text-xs px-4 py-1 border-2 border-[var(--neo-hat-yellow)] font-black shadow-[4px_4px_0px_0px_var(--neo-luffy-red)]">ACTIVE</span>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {dayFrames.map(frame => (
                      <div key={frame.start} className="bg-black mesh-gradient border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-sm font-black text-[var(--neo-luffy-red)] bg-black px-3 py-1 border border-[var(--neo-luffy-red)]">{formatTimeRange(frame.start, frame.end)}</span>
                        </div>
                        <div className="space-y-6">
                          {frame.entries.map(entry => (
                            <div key={entry.id} className="flex flex-col gap-2 pt-4 border-t-2 border-black/20 first:pt-0 first:border-0">
                              <span className="text-xl font-black text-white uppercase italic leading-tight">{entry.title}</span>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{entry.room}</span>
                                {entry.group && <span className="text-[10px] text-[var(--neo-hat-yellow)] font-black border border-[var(--neo-hat-yellow)] px-2 uppercase">{entry.group}</span>}
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
