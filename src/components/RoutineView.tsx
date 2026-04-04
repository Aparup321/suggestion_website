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
    <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-ink/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#ff7ad9]"></span>
            Live routine dashboard
          </div>
          {nextClass && (
            <div className="neo-card px-3 py-2 text-xs uppercase tracking-[0.2em] bg-white">
              Next class in {Math.max(0, Math.round(nextClass.minutes))} min - {nextClass.entry.title}
            </div>
          )}
        <div className="ml-auto flex items-center gap-2 neo-card p-1 bg-white">
          {(["daily", "weekly"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                view === item ? "bg-ink text-[#fff9df]" : "text-ink/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {view === "daily" ? (
        <div className="neo-card p-6">
          <h3 className="text-xl font-display text-ink">{dayLabel(todayLabel)}</h3>
          <p className="text-sm text-ink/60">Current time: {now.toLocaleTimeString()}</p>
          <div className="mt-4 grid gap-4">
            {grouped
              .find((item) => item.day === todayLabel)
              ?.entries.map((entry) => {
                const isActive = nowMinutes >= toMinutes(entry.start) && nowMinutes <= toMinutes(entry.end)
                return (
                  <div key={entry.id} className="flex flex-col gap-2">
                    <div
                      className={`h-1 rounded-full border-2 border-ink ${
                        isActive ? "bg-[#9ad66f]" : "bg-[#fff9df]"
                      }`}
                    ></div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl border-2 border-ink bg-[#fff9df] px-4 py-3">
                      <div>
                        <p className="text-sm text-ink/70">{formatTimeRange(entry.start, entry.end)}</p>
                        <p className="text-lg font-semibold text-ink">{entry.title}</p>
                        <p className="text-sm text-ink/60">
                          {entry.room} - {entry.instructor}
                        </p>
                      </div>
                      <div className="text-sm text-ink/80">{entry.group ?? ""}</div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {grouped.map((item) => (
            <div
              key={item.day}
              className="neo-card p-5"
            >
              <h3 className="text-lg font-display text-ink">{item.day}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {item.entries.length === 0 ? (
                  <p className="text-sm text-ink/60">No classes scheduled.</p>
                ) : (
                  item.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-2xl border-2 border-ink bg-[#fff9df] px-4 py-3"
                    >
                      <p className="text-xs text-ink/60">{formatTimeRange(entry.start, entry.end)}</p>
                      <p className="text-sm font-semibold text-ink">{entry.title}</p>
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
