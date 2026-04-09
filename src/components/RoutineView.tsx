import { useEffect, useMemo, useState } from "react"
import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import {
  dayLabel,
  formatTimeRange,
  getMinutesUntil,
  getNowDay,
  getNowMinutes,
  toMinutes,
} from "../utils/time"

const days = ["MON", "TUE", "WED", "THU", "FRI"] as const

export const RoutineView = () => {
  const view = useAppStore((state) => state.view)
  const setView = useAppStore((state) => state.setView)

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const grouped = useMemo(
    () =>
      days.map((day) => ({
        day,
        entries: routineEntries.filter((entry) => entry.day === day),
      })),
    []
  )

  const todayLabel = getNowDay(now)
  const nowMinutes = getNowMinutes(now)
  const nextClass = [...routineEntries]
    .map((entry) => ({ entry, minutes: getMinutesUntil(now, entry.day, entry.start) }))
    .filter(item => item.minutes > 0)
    .sort((a, b) => a.minutes - b.minutes)[0]

  return (
    <section className="flex flex-col gap-8 w-full">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
           <h2 className="text-3xl font-black text-[var(--hud-cyan)] tracking-wider italic uppercase">
             ROUTINE <span className="text-white">SCHEDULE</span>
           </h2>
           <p className="text-[10px] mono-font text-slate-500 uppercase tracking-[0.2em]">DIGITAL STUDY MANAGEMENT DASHBOARD</p>
        </div>
        
        <div className="flex bg-[var(--hud-bg-dark)] border border-[var(--hud-border)] p-1">
          {(["daily", "weekly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-6 py-2 text-[10px] uppercase font-bold tracking-widest transition-all ${
                view === item 
                  ? "bg-[var(--hud-cyan)] text-[var(--hud-bg-dark)] shadow-[0_0_10px_var(--hud-cyan)]" 
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {item === "daily" ? "Active" : "Weekly"}
            </button>
          ))}
        </div>
      </div>

      {/* WEEKLY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {days.map((day) => {
            const isToday = todayLabel === day
            const dayEntries = routineEntries.filter(e => e.day === day)
            
            return (
              <div key={day} className={`hud-card p-4 flex flex-col gap-4 ${isToday ? 'border-[var(--hud-cyan)] shadow-[0_0_20px_rgba(0,242,255,0.1)]' : ''}`}>
                 <div className="border-b border-[var(--hud-border)] pb-2 flex justify-between items-center">
                    <span className={`text-xs font-bold tracking-widest ${isToday ? 'text-[var(--hud-cyan)]' : 'text-slate-400'}`}>{day}</span>
                    {isToday && <div className="w-1.5 h-1.5 rounded-full bg-[var(--hud-cyan)] animate-pulse"></div>}
                 </div>
                 <div className="space-y-4">
                    {dayEntries.length === 0 ? (
                      <p className="text-[9px] text-slate-600 uppercase mono-font tracking-tighter italic opacity-40">NO_DATA</p>
                    ) : (
                      dayEntries.map((entry, i) => (
                        <div key={entry.id} className="group/entry cursor-default">
                           <p className="text-[11px] font-bold text-white group-hover:text-[var(--hud-cyan)] transition-colors line-clamp-2 leading-tight uppercase">
                              {entry.title}
                           </p>
                        </div>
                      ))
                    )}
                 </div>
              </div>
            )
          })}
      </div>

      {/* BOTTOM PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* BREAK PANEL */}
          <div className="hud-card p-6 border-l-4 border-l-[var(--hud-yellow)] bg-gradient-to-r from-[var(--hud-yellow)]/5 to-transparent">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <span className="text-[9px] font-bold px-2 py-0.5 bg-[var(--hud-yellow)] text-black uppercase tracking-widest mb-2 inline-block">BREAK</span>
                   <h3 className="text-xl font-bold italic tracking-tight text-white uppercase mt-1">BREAK TIME</h3>
                </div>
                <span className="text-[10px] mono-font text-[var(--hud-yellow)]">08:00 - 09:00</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[var(--hud-yellow)]/30 flex items-center justify-center text-xl">☕</div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-slate-300 uppercase letter-spacing-1">BREAK</p>
                   <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="text-[var(--hud-cyan)]">📍</span> LOCATION: CLASS_1
                   </div>
                </div>
             </div>
          </div>

          {/* UPCOMING SESSION PANEL */}
          {nextClass && (
            <div className="hud-card p-6 border-l-4 border-l-[var(--hud-cyan)]">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-[var(--hud-cyan)] text-black uppercase tracking-widest mb-2 inline-block">UPCOMING</span>
                    <h3 className="text-xl font-bold italic tracking-tight text-white uppercase mt-1">UPCOMING SESSION</h3>
                  </div>
                  <span className="text-[10px] mono-font text-[var(--hud-cyan)]">
                    {nextClass.entry.start} - {nextClass.entry.end}
                  </span>
               </div>
               <div className="space-y-3">
                  <p className="text-sm font-bold text-white uppercase tracking-tight">
                    {nextClass.entry.title} // {nextClass.entry.room} // {nextClass.entry.start} - {nextClass.entry.end}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] mono-font text-slate-500 uppercase tracking-widest">BREAK TIME</span>
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full border border-[var(--hud-cyan)]/30 flex items-center justify-center text-[var(--hud-cyan)] animate-pulse">
                          ⚙️
                       </div>
                       <div className="text-right">
                          <p className="text-[8px] mono-font text-slate-400">9:00 - 13:00</p>
                          <p className="text-[8px] mono-font text-slate-500">CLASS_1</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
      </div>
    </section>
  )
}

