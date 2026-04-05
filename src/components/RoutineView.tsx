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
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#00ef8e]/60 font-bold">
            Live routine dashboard
            <span className="inline-flex h-2 w-2 rounded-full bg-[#00ef8e] shadow-[0_0_10px_#00ef8e] animate-pulse"></span>
          </div>
          {nextClass && (
            <div className="neo-card px-4 py-2 text-[10px] uppercase font-black tracking-widest bg-[#00ef8e]/10 text-[#00ef8e] border border-[#00ef8e]/20">
              Next class in {Math.max(0, Math.round(nextClass.minutes))} min // {nextClass.entry.title}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 mx-auto md:mx-0">
          {(["daily", "weekly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-6 py-2 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all ${
                view === item 
                  ? "bg-[#00ef8e]/20 text-[#00ef8e] border border-[#00ef8e]/30 shadow-[0_0_15px_rgba(0,239,142,0.1)]" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {view === "daily" ? (
        <div className="space-y-8 px-4">
          <div className="flex flex-col items-end border-r-4 border-[#00ef8e] pr-6 text-right">
            <h3 className="text-3xl font-black text-white tracking-tight leading-none uppercase">{dayLabel(todayLabel)}</h3>
            <p className="text-[10px] font-mono text-slate-500 mt-2 uppercase tracking-widest font-bold">System Time: {now.toLocaleTimeString()}</p>
          </div>
          
          <div className="grid gap-6">
            {grouped
              .find((item) => item.day === todayLabel)
              ?.entries.map((entry) => {
                const isActive = nowMinutes >= toMinutes(entry.start) && nowMinutes <= toMinutes(entry.end)
                return (
                  <div key={entry.id} className="flex flex-col gap-3 group/entry">
                    <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-6 neo-card p-6 md:p-8 hover:bg-black/60 transition-all border-white/5 hover:border-[#00ef8e]/30 relative overflow-visible">
                      <div className={`absolute top-0 right-0 bottom-0 w-1 transition-all duration-500 ${isActive ? "bg-[#00ef8e] shadow-[0_0_15px_#00ef8e]" : "bg-white/5"}`}></div>
                      
                      <div className="text-right space-y-2 flex-1">
                        <p className="text-[10px] font-mono font-bold text-[#00ef8e] tracking-widest uppercase opacity-60">
                          {formatTimeRange(entry.start, entry.end)}
                        </p>
                        <p className="text-2xl font-black text-white group-hover/entry:text-[#00ef8e] transition-colors uppercase tracking-tight">
                          {entry.title}
                        </p>
                        <div className="flex items-center justify-end gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                          <span>{entry.instructor}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20"></span>
                          <span>{entry.room}</span>
                        </div>
                      </div>
                      
                      {entry.group && (
                        <div className="flex md:flex-col items-center justify-end gap-2 shrink-0">
                          <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase">SECTION</span>
                          <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-black text-white/80">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {grouped.map((item) => (
            <div
              key={item.day}
              className="neo-card p-6 space-y-6 flex flex-col items-end text-right border-white/5 overflow-visible"
            >
              <div className="w-full flex items-center justify-end gap-3">
                <h3 className="text-xl font-black text-white/90 tracking-widest uppercase">{item.day}</h3>
                <div className="h-px flex-1 bg-white/5"></div>
              </div>
              
              <div className="w-full space-y-4">
                {item.entries.length === 0 ? (
                  <p className="text-[10px] text-slate-600 font-mono italic tracking-widest uppercase">[ STANDBY MODE ]</p>
                ) : (
                  item.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="group/item relative pr-4 text-right"
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#00ef8e]/20 group-hover/item:bg-[#00ef8e] transition-colors"></div>
                      <p className="text-[9px] font-mono font-bold text-[#00ef8e]/40 group-hover/item:text-[#00ef8e]/60 tracking-tighter uppercase transition-colors">
                        {formatTimeRange(entry.start, entry.end)}
                      </p>
                      <p className="text-sm font-bold text-slate-300 group-hover/item:text-white transition-colors tracking-tight uppercase">
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
