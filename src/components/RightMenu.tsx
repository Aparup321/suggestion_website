import { useAppStore } from "../store/useAppStore"
import { useNavigate } from "react-router-dom"

const items = [
  { id: "routine", label: "Weekly View", icon: "🗓️", sub: "SCHEDULE_GRID" },
  { id: "syllabus", label: "My Goals", icon: "🎯", sub: "TARGET_LOGS" },
  { id: "syllabus", label: "Curriculum", icon: "📜", sub: "CORE_DATA" },
  { id: "suggestion", label: "Suggestions", icon: "📡", sub: "LIVE_FEED" },
] as const

export const RightMenu = () => {
  const mode = useAppStore((state) => state.mode)
  const setMode = useAppStore((state) => state.setMode)
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="hud-panel w-full p-8 border-l-4 border-l-[var(--hud-accent-blue)]">
        <p className="text-[11px] uppercase tracking-[0.4em] hud-text-cyan font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-[var(--hud-accent-blue)] rounded-full animate-pulse shadow-[0_0_10px_var(--hud-accent-blue)]"></span>
          QUICK_MENU
        </p>
        <div className="flex flex-col gap-4">
          {items.map((item, index) => {
            const isActive = mode === item.id
            return (
              <button
                key={`${item.id}-${index}`}
                onClick={() => {
                  setMode(item.id)
                  navigate(item.id === "routine" ? "/" : `/${item.id}`)
                }}
                className={`w-full px-6 py-4 transition-all flex items-center gap-4 group/item relative menu-item-hud ${isActive
                  ? "active"
                  : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                  }`}
              >
                <div className="flex-1 flex flex-col items-start">
                  <span className={`text-[9px] mono-font tracking-[0.3em] uppercase mb-1 ${isActive ? "hud-text-cyan" : "text-slate-500"}`}>
                    {item.sub}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl transition-all ${isActive ? "scale-110 filter drop-shadow-[0_0_8px_var(--hud-accent-blue)]" : "opacity-40"}`}>{item.icon}</span>
                    <span className={`text-base font-bold tracking-wider uppercase leading-none ${isActive ? "text-white" : "text-slate-400"}`}>
                      {item.label}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="hud-panel p-6 opacity-60 hover:opacity-100 transition-opacity">
        <p className="text-[10px] mono-font hud-text-gold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
           <span className="w-1.5 h-1.5 bg-[var(--hud-accent-yellow)] rounded-full animate-ping"></span>
           SYSTEM_LOGS
        </p>
        <div className="space-y-2">
          <p className="text-[10px] text-slate-500 font-mono flex gap-2">
            <span className="text-[var(--hud-accent-blue)] font-bold">[ OK ]</span> GPS_LOCK_STABLE
          </p>
          <p className="text-[10px] text-slate-500 font-mono flex gap-2">
            <span className="text-[var(--hud-accent-blue)] font-bold">[ OK ]</span> SYNCING_CLOUD_RESOURCES
          </p>
          <p className="text-[10px] text-slate-500 font-mono flex gap-2">
            <span className="text-[var(--hud-accent-blue)] font-bold">[ OK ]</span> SECTION_C_V2_LOADED
          </p>
        </div>
      </div>
    </div>
  )
}


