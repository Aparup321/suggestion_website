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

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"] as const

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
    .sort((a, b) => a.minutes - b.minutes)[0]

  return (
    <section className="flex flex-col gap-8 w-full max-w-5xl mx-auto py-10 px-4 md:px-0 font-zoro">
      <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-6 px-4">
        <div className="flex flex-col items-end gap-3 w-full">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[var(--neo-luffy-red)]/60 font-black">
            Live Grand Line Navigator
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--neo-luffy-red)] shadow-[0_0_10px_var(--neo-luffy-red)] animate-pulse"></span>
          </div>
          {nextClass && (
            <div className="neo-card px-4 py-2 text-[10px] uppercase font-black tracking-widest bg-[var(--neo-luffy-red)]/10 text-[var(--neo-luffy-red)] border border-[var(--neo-luffy-red)]/20 shadow-[4px_4px_0px_0px_var(--neo-hat-yellow)]">
              Next island in {Math.max(0, Math.round(nextClass.minutes))} min // {nextClass.entry.title}
            </div>
          )}
        </div>
        
        <div className="flex bg-black p-2 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mx-auto md:mx-0">
          {(["daily", "weekly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-8 py-2 text-[10px] uppercase font-black tracking-widest transition-all ${
                view === item 
                  ? "bg-[var(--neo-luffy-red)] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000]" 
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {view === "daily" ? (
        <div className="space-y-8 px-4">
          <div className="flex flex-col items-start border-l-[12px] border-[var(--neo-luffy-red)] pl-8 mb-12">
            <h3 className="text-4xl font-black text-white tracking-tighter leading-none uppercase italic">{dayLabel(todayLabel)}</h3>
            <p className="text-[10px] font-mono text-[var(--neo-hat-yellow)] mt-2 uppercase tracking-widest font-black">PIRATE_TIME: {now.toLocaleTimeString()}</p>
          </div>
          
          <div className="grid gap-6">
            {grouped
              .find((item) => item.day === todayLabel)
              ?.entries.map((entry) => {
                const isActive = nowMinutes >= toMinutes(entry.start) && nowMinutes <= toMinutes(entry.end)
                return (
                  <div key={entry.id} className="flex flex-col gap-3 group/entry">
                    <div className={`brutalist-card p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none overflow-visible relative ${isActive ? "mesh-gradient-luffy" : "bg-black mesh-gradient"}`}>
                      <div className={`absolute top-0 left-0 bottom-0 w-2 transition-all duration-500 ${isActive ? "bg-[var(--neo-hat-yellow)]" : "bg-black"}`}></div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4">
                           <p className={`text-[10px] font-black tracking-widest uppercase ${isActive ? "text-black" : "text-[var(--neo-luffy-red)]"}`}>
                            {formatTimeRange(entry.start, entry.end)}
                          </p>
                          {isActive && <span className="text-[9px] bg-black text-[var(--neo-hat-yellow)] px-2 py-0.5 border border-[var(--neo-hat-yellow)] font-black">ACTIVE</span>}
                        </div>
                        <p className={`text-3xl font-black transition-colors uppercase italic tracking-tighter leading-none ${isActive ? "text-black" : "text-white group-hover/entry:text-[var(--neo-luffy-red)]"}`}>
                          {entry.title}
                        </p>
                        <div className={`flex items-center gap-4 text-[11px] font-black uppercase tracking-tight ${isActive ? "text-black/60" : "text-slate-500"}`}>
                          <span>{entry.room}</span>
                          <span className="w-1.5 h-1.5 bg-current"></span>
                          <span>{entry.instructor}</span>
                        </div>
                      </div>
                      
                      {entry.group && (
                        <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
                          <span className={`text-[10px] font-black tracking-widest uppercase ${isActive ? "text-black/40" : "text-slate-600"}`}>SHIP</span>
                          <span className="px-4 py-1 bg-black border-2 border-black text-[11px] font-black text-white shadow-[4px_4px_0px_0px_var(--neo-hat-yellow)]">
                            {entry.group}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {grouped.map((item) => (
            <div
              key={item.day}
              className="brutalist-card p-8 space-y-8 flex flex-col"
            >
              <div className="w-full flex items-center gap-4">
                <h3 className="text-2xl font-black text-white tracking-widest uppercase italic">{item.day}</h3>
                <div className="h-1 flex-1 bg-black"></div>
              </div>
              
              <div className="w-full space-y-6">
                {item.entries.length === 0 ? (
                  <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase">[ SHORE_LEAVE ]</p>
                ) : (
                  item.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="group/item relative pl-6 space-y-1"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black group-hover/item:bg-[var(--neo-luffy-red)] transition-colors"></div>
                      <p className="text-[10px] font-black text-[var(--neo-luffy-red)]/60 group-hover/item:text-[var(--neo-luffy-red)] tracking-widest uppercase transition-colors">
                        {formatTimeRange(entry.start, entry.end)}
                      </p>
                      <p className="text-base font-black text-slate-300 group-hover/item:text-white transition-colors tracking-tight uppercase leading-tight">
                        {entry.title}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
