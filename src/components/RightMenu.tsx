import { useAppStore } from "../store/useAppStore"
import { useNavigate } from "react-router-dom"

const items = [
  { id: "routine", label: "Routine", icon: "🛶" },
  { id: "syllabus", label: "Syllabus", icon: "👒" },
  { id: "suggestion", label: "Suggestions", icon: "☠️" },
] as const

export const RightMenu = () => {
  const mode = useAppStore((state) => state.mode)
  const setMode = useAppStore((state) => state.setMode)
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="neo-card w-full !p-4 border-[4px]">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--neo-luffy-red)] font-black px-2 mb-4">QUICK_MENU</p>
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const isActive = mode === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setMode(item.id)
                  navigate(item.id === "routine" ? "/" : `/${item.id}`)
                }}
                className={`w-full px-5 py-4 transition-all flex items-center gap-4 group/item relative border-[3px] shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${isActive
                  ? "bg-[var(--neo-luffy-red)] border-black text-black font-black"
                  : "bg-black/20 border-black/40 text-slate-500 hover:text-white hover:border-[var(--neo-hat-yellow)]"
                  }`}
              >
                <span className={`text-2xl transition-all duration-300 ${isActive ? "text-black scale-110" : "opacity-40 group-hover/item:opacity-100"}`}>
                  {item.icon}
                </span>
                <div className="flex flex-col gap-0.5 text-left">
                  <span className={`text-[9px] tracking-[0.2em] uppercase ${isActive ? "opacity-60" : "opacity-40"}`}>
                    {item.id === "routine" ? "DAILY_SCHEDULE" : "DATA_RESOURCES"}
                  </span>
                  <span className="text-base font-black tracking-wider uppercase leading-none">{item.label}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
