import { useAppStore } from "../store/useAppStore"
import { useNavigate } from "react-router-dom"

const items = [
  { id: "routine", label: "Weekly View", icon: "🗓️", sub: "SCHEDULE_GRID" },
  { id: "syllabus", label: "Curriculum", icon: "📜", sub: "CORE_DATA" },
  { id: "suggestion", label: "Suggestions", icon: "📡", sub: "LIVE_FEED" },
] as const

export const RightMenu = () => {
  const mode = useAppStore((state) => state.mode)
  const setMode = useAppStore((state) => state.setMode)
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="hud-panel w-full p-10 border-l-4 border-l-[var(--hud-accent-blue)]">
        <p className="text-[13px] uppercase tracking-[0.5em] hud-text-cyan font-black mb-10 flex items-center gap-4">
          <span className="w-2.5 h-2.5 bg-[var(--hud-accent-blue)] rounded-full animate-pulse shadow-[0_0_12px_var(--hud-accent-blue)]"></span>
          QUICK_MENU
        </p>
        <div className="flex flex-col gap-5">
          {items.map((item, index) => {
            const isActive = mode === item.id
            return (
              <button
                key={`${item.id}-${index}`}
                onClick={() => {
                  setMode(item.id)
                  navigate(item.id === "routine" ? "/" : `/${item.id}`)
                }}
                className={`w-full px-8 py-6 transition-all flex items-center gap-5 group/item relative menu-item-hud ${isActive
                  ? "active scale-[1.02]"
                  : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:scale-[1.01]"
                  }`}
              >
                <div className="flex-1 flex flex-col items-start text-left">
                  <span className={`text-[11px] mono-font tracking-[0.4em] uppercase mb-2 ${isActive ? "hud-text-cyan" : "text-slate-500"}`}>
                    {item.sub}
                  </span>
                  <div className="flex items-center gap-5">
                    <span className={`text-3xl transition-all duration-300 ${isActive ? "scale-125 filter drop-shadow-[0_0_10px_var(--hud-accent-blue)]" : "opacity-40"}`}>{item.icon}</span>
                    <span className={`text-xl font-black tracking-widest uppercase leading-none ${isActive ? "text-white" : "text-slate-400"}`}>
                      {item.label}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>


    </div>
  )
}


