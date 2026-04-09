import { useEffect, useState } from "react"
import { routineEntries } from "../data/routine"
import { useAppStore } from "../store/useAppStore"
import {
  getNowDay,
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

  const todayLabel = getNowDay(now)

  return (
    <section className="flex flex-col gap-10 w-full animate-in fade-in duration-700">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div className="space-y-1">
           <h2 className="text-4xl font-black hud-text-cyan tracking-wider italic uppercase flex items-center gap-4">
             ROUTINE <span className="text-white">SCHEDULE</span>
             <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--hud-accent-blue)] to-transparent"></div>
           </h2>
           <p className="text-[11px] mono-font text-slate-500 uppercase tracking-[0.3em]">DIGITAL STUDY MANAGEMENT DASHBOARD</p>
        </div>
        
        <div className="flex bg-black/40 border border-[var(--hud-border-gold)] rounded-full p-1 shadow-[0_0_15px_rgba(255,204,0,0.1)]">
          {(["daily", "weekly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-8 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${
                view === item 
                  ? "bg-[var(--hud-accent-yellow)] text-black shadow-[0_0_15px_var(--hud-accent-yellow)]" 
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {item === "daily" ? "Active" : "Weekly"}
            </button>
          ))}
          <div className="px-4 py-2 text-[10px] font-bold text-[var(--hud-accent-yellow)]/60 uppercase tracking-widest border-l border-white/10 ml-2">
             Upcoming
          </div>
        </div>
      </div>

      {/* WEEKLY GRID - ROUNDED PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {days.map((day) => {
            const isToday = todayLabel === day
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
      </div>

      {/* BOTTOM ACTION PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
          {/* BREAK PANEL */}
          <div className="md:col-span-5 hud-panel p-8 border-l-4 border-l-[var(--hud-accent-yellow)] bg-gradient-to-r from-[var(--hud-accent-yellow)]/5 to-transparent overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <span className="text-[10px] font-bold px-3 py-1 bg-[var(--hud-accent-yellow)] text-black uppercase tracking-widest mb-3 inline-block">BREAK</span>
                   <h3 className="text-2xl font-black italic tracking-tight text-white uppercase">BREAK TIME</h3>
                </div>
                <span className="text-[11px] mono-font hud-text-gold font-bold">08:00 - 09:00</span>
             </div>
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 border border-[var(--hud-accent-yellow)]/30 rounded-xl flex items-center justify-center text-3xl bg-black/20 shadow-inner">☕</div>
                <div className="space-y-1">
                   <p className="text-sm font-bold text-slate-300 uppercase letter-spacing-1">BREAK TIME</p>
                   <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                      <span className="hud-text-cyan">📍</span> LOCATION: <span className="text-slate-400">CLASS_1</span>
                   </div>
                </div>
             </div>
          </div>

          {/* UPCOMING SESSION PANEL */}
          <div className="md:col-span-7 hud-panel p-8 border-l-4 border-l-[var(--hud-accent-blue)] bg-gradient-to-r from-[var(--hud-accent-blue)]/5 to-transparent relative overflow-hidden">
             {/* Decorative Corner Icon */}
             <div className="absolute top-4 right-4 text-2xl opacity-20 hud-text-cyan">✦</div>
             
             <div className="flex justify-between items-start mb-6">
                <div>
                   <span className="text-[10px] font-bold px-3 py-1 bg-[var(--hud-accent-blue)] text-black uppercase tracking-widest mb-3 inline-block">SESSION</span>
                   <h3 className="text-2xl font-black italic tracking-tight text-white uppercase">UPCOMING SESSION</h3>
                </div>
                <div className="text-right">
                   <span className="text-[11px] mono-font hud-text-cyan font-bold block">09:00 - 09:00</span>
                   <span className="text-[9px] text-white/40 uppercase tracking-widest">REALTIME_SYNC</span>
                </div>
             </div>
             <div className="space-y-4">
                <p className="text-base font-black text-white uppercase tracking-normal leading-snug">
                   ALGORITHMS // <span className="hud-text-cyan">CLASS_3</span> // 11:00 - 13:00
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex gap-2">
                     <span className="text-[10px] mono-font text-slate-500 uppercase tracking-widest">BREAK TIME</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full border border-[var(--hud-accent-blue)]/40 flex items-center justify-center text-[var(--hud-accent-blue)] animate-[pulse_2s_infinite]">
                        <span className="text-sm">⚛️</span>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black hud-text-cyan uppercase">9:00 - 13:00</p>
                        <p className="text-[9px] mono-font text-slate-500 uppercase">LOCATION: CLASS_1</p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
      </div>
    </section>
  )
}


