import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import { dayOrder, formatTimeRange, getNowDay, getNowMinutes, toMinutes } from "../utils/time"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"

const formatDay = (day: string) => day

export const RoutinePage = () => {
  const setMode = useAppStore((state) => state.setMode)
  const [index, setIndex] = useState(0)
  const [likes, setLikes] = useState(0)
  const [passes, setPasses] = useState(0)
  const [streak, setStreak] = useState(0)
  
  const controls = useAnimation()
  const x = useMotionValue(0)
  
  // Left swipe = Study (Like), Right swipe = Pass
  const rotate = useTransform(x, [-200, 200], [-10, 10])
  
  // Opacities for the stamps based on drag distance
  const studyOpacity = useTransform(x, [-100, -20], [1, 0])
  const passOpacity = useTransform(x, [20, 100], [0, 1])

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

  const clampIndex = (next: number) => {
    if (next < 0) return entries.length - 1
    if (next >= entries.length) return 0
    return next
  }

  const applyDecision = async (delta: number, action: "like" | "pass", exitX: number) => {
    await controls.start({ 
      x: exitX, 
      opacity: 0, 
      rotate: exitX > 0 ? 20 : -20,
      transition: { duration: 0.3, ease: "easeOut" } 
    })
    
    setIndex((prev) => clampIndex(prev + delta))
    if (action === "like") {
      setLikes((value) => value + 1)
      setStreak((value) => value + 1)
    } else {
      setPasses((value) => value + 1)
      setStreak(0)
    }

    controls.set({ x: 0, opacity: 1, rotate: 0 })
    x.set(0)
  }

  const handleDragEnd = (_event: any, info: any) => {
    const swipe = info.offset.x
    const velocity = info.velocity.x
    const swipeThreshold = 80
    const velocityThreshold = 500

    if (swipe < -swipeThreshold || velocity < -velocityThreshold) {
      applyDecision(1, "like", -600) // swipe left -> study
    } else if (swipe > swipeThreshold || velocity > velocityThreshold) {
      applyDecision(-1, "pass", 600) // swipe right -> pass
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
    }
  }

  const current = entries[index]
  const next = entries[clampIndex(index + 1)]

  if (!current) return null

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap items-center gap-3 w-full">
        <Link
          to="/"
          className="neo-button px-5 py-2.5 text-sm"
        >
          &larr; Back to Home
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <div className="neo-card px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            Study <span className="text-white font-bold ml-1">{likes}</span>
          </div>
          <div className="neo-card px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            Pass <span className="text-white font-bold ml-1">{passes}</span>
          </div>
          <div className="neo-card px-4 py-2 text-xs uppercase tracking-[0.2em] text-lime shadow-[0_0_15px_rgba(74,222,128,0.2)] border-lime/30">
            Streak <span className="text-white font-bold ml-1">{streak}</span>
          </div>
        </div>
      </div>

      <div className="neo-card p-6 flex flex-wrap items-center gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ocean font-bold mb-1">Interactive Mode</p>
          <h2 className="text-3xl font-display text-white tracking-tight">Class Match</h2>
          <p className="text-sm text-slate-400 mt-1">
            Swipe left to commit to studying. Swipe right to pass.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            className="neo-button px-5 py-2.5 text-sm hover:text-coral hover:border-coral/50"
            onClick={() => applyDecision(-1, "pass", 600)}
          >
            Skip Class
          </button>
          <button
            className="neo-button px-5 py-2.5 text-sm hover:text-lime hover:border-lime/50"
            onClick={() => applyDecision(1, "like", -600)}
          >
            Study Now
          </button>
        </div>
      </div>

      <div className="relative min-h-[440px] flex items-center justify-center p-8 neo-card overflow-hidden">
        {/* Background Radial Glow inside the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ocean/10 blur-[100px] pointer-events-none rounded-full"></div>

        {/* Background Hint Strings */}
        <div className="absolute left-8 top-8 text-[11px] uppercase tracking-[0.3em] text-slate-500 font-semibold select-none">
          &larr; Swipe Left to Study
        </div>
        <div className="absolute right-8 top-8 text-[11px] uppercase tracking-[0.3em] text-slate-500 font-semibold select-none">
          Swipe Right to Pass &rarr;
        </div>

        {/* The Next Card (underneath) */}
        {next && (
          <div className="absolute w-[calc(100%-4rem)] max-w-xl z-0">
            <div className="stack-card scale-[0.94] translate-y-6 opacity-40">
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    {formatDay(next.day)}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 text-right">
                    {formatTimeRange(next.start, next.end)}
                  </span>
                </div>
                <h3 className="text-3xl font-display text-white tracking-tight">{next.title}</h3>
              </div>
            </div>
          </div>
        )}

        {/* The Top Card (Draggable) */}
        <motion.div
           className="absolute w-[calc(100%-4rem)] max-w-xl z-10 cursor-grab active:cursor-grabbing"
           style={{ x, rotate }}
           drag="x"
           dragConstraints={{ left: 0, right: 0 }}
           dragElastic={0.8}
           onDragEnd={handleDragEnd}
           animate={controls}
        >
          <div className="neo-card p-8 min-h-[280px] bg-slate-900/60 transition-none hover:transform-none hover:shadow-glass hover:bg-slate-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10 backdrop-blur-xl">
             
             {/* Stamps */}
             <motion.div 
                className="absolute top-8 right-8 z-20 pointer-events-none"
                style={{ opacity: studyOpacity }}
             >
                <div className="border-[3px] border-lime text-lime text-3xl font-display px-6 py-2 rounded-xl rotate-[15deg] uppercase tracking-widest bg-slate-900/40 backdrop-blur-sm shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                   Study
                </div>
             </motion.div>

             <motion.div 
                className="absolute top-8 left-8 z-20 pointer-events-none"
                style={{ opacity: passOpacity }}
             >
                <div className="border-[3px] border-coral text-coral text-3xl font-display px-6 py-2 rounded-xl -rotate-[15deg] uppercase tracking-widest bg-slate-900/40 backdrop-blur-sm shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                   Pass
                </div>
             </motion.div>

            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-ocean font-semibold">
                {formatDay(current.day)}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                {formatTimeRange(current.start, current.end)}
              </span>
            </div>
            
            <h3 className="text-3xl font-display text-white tracking-tight mb-5">{current.title}</h3>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-slate-300">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Room</span>
                <span className="font-medium text-white">{current.room ?? "TBA"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Instructor</span>
                <span className="font-medium text-white line-clamp-1">{current.instructor ?? "TBA"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Group</span>
                <span className="font-medium text-white">{current.group ?? "All"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Type</span>
                <span className="font-medium text-ocean">{current.type ?? "Class"}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Card {index + 1} of {entries.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
