import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { dayOrder, formatTimeRange, getNowDay, getNowMinutes, toMinutes } from "../utils/time"
import { motion, useMotionValue } from "framer-motion"

const formatDay = (day: string) => day

export const RoutinePage = () => {
  const setMode = useAppStore((state) => state.setMode)
  const [index, setIndex] = useState(0)
  const dragX = useMotionValue(0)

  useEffect(() => {
    setMode("routine")
  }, [setMode])

  const entries = useMemo(() => {
    return [...routineEntries].sort((a, b) => {
      const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
      if (dayDiff !== 0) return dayDiff
      return toMinutes(a.start) - toMinutes(b.start)
    })
  }, [])

  useEffect(() => {
    const today = getNowDay(new Date())
    const nowMinutes = getNowMinutes(new Date())
    const startIndex = entries.findIndex(
      (entry) => entry.day === today && toMinutes(entry.start) >= nowMinutes
    )
    if (startIndex >= 0) setIndex(startIndex)
  }, [entries])

  const shiftCarousel = (delta: number) => {
    setIndex((prev) => {
      const nextIndex = prev + delta
      if (nextIndex < 0) return 0
      if (nextIndex >= entries.length) return entries.length - 1
      return nextIndex
    })
    // Reset drag x visually if needed (usually framer auto-recovers on state change, but to be safe)
    dragX.set(0)
  }

  const handleDragEnd = (_event: any, info: any) => {
    const swipe = info.offset.x
    const velocity = info.velocity.x
    const swipeThreshold = 50
    const velocityThreshold = 400

    if (swipe < -swipeThreshold || velocity < -velocityThreshold) {
      shiftCarousel(1) // swipe left -> go to next item
    } else if (swipe > swipeThreshold || velocity > velocityThreshold) {
      shiftCarousel(-1) // swipe right -> go to prev item
    }
    // Regardless of what happens, spring the physical coordinate back to 0 so the active element snaps center.
    dragX.stop()
    dragX.set(0)
  }

  if (entries.length === 0) return null

  // We want to calculate the display for each card. We'll render entries around `index` +/- 2.
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap items-center gap-3 w-full border-b border-white/5 pb-4">
        <Link
          to="/"
          className="neo-button px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <span className="text-xl leading-none -mt-1">&larr;</span> Back to Home
        </Link>
        <div className="ml-auto text-xs uppercase tracking-widest text-slate-500 font-semibold px-4">
          Visual Timeline
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-ocean font-bold">Class Schedule</p>
        <h2 className="text-3xl font-display text-white tracking-tight">Timeline View</h2>
        <p className="text-sm text-slate-400">
          Swipe the center card to navigate forwards and backwards through your schedule.
        </p>
      </div>

      <div className="relative min-h-[460px] flex items-center justify-center p-8 neo-card overflow-hidden w-full mt-2">
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ocean/5 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Carousel Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {entries.map((entry, i) => {
            const diff = i - index
            
            // Only render cards close to the index to save DOM
            if (Math.abs(diff) > 2) return null

            const isActive = diff === 0
            // Center is 0, Prev is pushed left
            const baseX = diff * 520
            const zIndex = 20 - Math.abs(diff)
            const scale = isActive ? 1 : 0.85
            const opacity = isActive ? 1 : 0.35
            const blur = isActive ? "blur(0px)" : Math.abs(diff) === 1 ? "blur(4px)" : "blur(8px)"

            return (
              <motion.div
                key={entry.id}
                className="absolute w-[560px] pointer-events-auto"
                initial={false}
                animate={{
                  x: baseX,
                  scale,
                  opacity,
                  filter: blur,
                  zIndex
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 25,
                  mass: 0.8
                }}
                // Only attach drag listeners to the currently active center card
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={isActive ? handleDragEnd : undefined}
                style={{ x: isActive ? dragX : 0 }} // Bind the framer motion drag value live
              >
                <div 
                  className={`p-10 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col gap-8 select-none ${
                    isActive ? "cursor-grab active:cursor-grabbing border-white/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="inline-block bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      <span className="text-[10px] uppercase tracking-widest text-ocean font-bold">
                        {formatDay(entry.day)}
                      </span>
                    </div>
                    <span className="text-[12px] uppercase tracking-[0.1em] text-slate-300 font-medium bg-slate-900/80 px-3 py-1 rounded-md border border-white/5">
                      {formatTimeRange(entry.start, entry.end)}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-display text-white tracking-tight leading-tight text-left">
                      {entry.title}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Room</span>
                      <span className="font-semibold text-slate-200 text-sm">{entry.room ?? "TBA"}</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Instructor</span>
                      <span className="font-semibold text-slate-200 text-sm line-clamp-1">{entry.instructor ?? "TBA"}</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Group</span>
                      <span className="font-semibold text-slate-200 text-sm">{entry.group ?? "All"}</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Type</span>
                      <span className="font-semibold text-ocean text-sm">{entry.type ?? "Class"}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-500">
                    <span>Card {i + 1} of {entries.length}</span>
                    {isActive && (
                      <span className="text-lime/70 animate-pulse">Swipe &rarr;</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Navigation Arrows for clickability over the UI */}
        <div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-50 pointer-events-none">
          {index > 0 && (
            <button 
              onClick={() => shiftCarousel(-1)}
              className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors shadow-xl -ml-4"
            >
              &larr;
            </button>
          )}
        </div>
        <div className="absolute inset-y-0 right-0 w-16 flex items-center justify-center z-50 pointer-events-none">
          {index < entries.length - 1 && (
            <button 
              onClick={() => shiftCarousel(1)}
              className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/80 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors shadow-xl -mr-4"
            >
              &rarr;
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
