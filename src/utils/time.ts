import type { RoutineEntry } from "../types"

export const dayOrder: Array<RoutineEntry["day"]> = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
]

export const dayLabel = (day: RoutineEntry["day"]) => day

export const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

export const getNowMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes()

export const getNowDay = (date: Date): RoutineEntry["day"] => {
  const day = date.getDay()
  const map: Record<number, RoutineEntry["day"]> = {
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
  }
  return map[day] ?? "MON"
}

export const formatTimeRange = (start: string, end: string) => `${start} - ${end}`

export const getMinutesUntil = (date: Date, day: RoutineEntry["day"], start: string) => {
  const nowMinutes = getNowMinutes(date)
  const today = getNowDay(date)
  const dayIndex = dayOrder.indexOf(day)
  const todayIndex = dayOrder.indexOf(today)
  const startMinutes = toMinutes(start)
  const dayDiff = (dayIndex - todayIndex + dayOrder.length) % dayOrder.length
  if (dayDiff === 0 && startMinutes < nowMinutes) {
    return startMinutes - nowMinutes + dayOrder.length * 24 * 60
  }
  return dayDiff * 24 * 60 + (startMinutes - nowMinutes)
}
