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
      <div className="hud-card w-full p-6 border-l-4 border-l-[var(--hud-cyan)]">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--hud-cyan)] font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--hud-cyan)] animate-pulse"></span>
          QUICK_MENU
        </p>
        <div className="flex flex-col gap-3">
          {items.map((item, index) => {
            const isActive = mode === item.id
            return (
              <button
                key={`${item.id}-${index}`}
                onClick={() => {
                  setMode(item.id)
                  navigate(item.id === "routine" ? "/" : `/${item.id}`)
                }}
                className={`w-full px-4 py-3 transition-all flex items-center gap-4 group/item relative border ${isActive
                  ? "bg-[var(--hud-cyan)]/10 border-[var(--hud-cyan)] text-white shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                  : "bg-transparent border-[var(--hud-border)] text-slate-400 hover:border-[var(--hud-cyan)]/50 hover:text-white"
                  }`}
              >
                {isActive && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--hud-cyan)] shadow-[0_0_10px_var(--hud-cyan)]"></div>
                )}
                <div className="flex-1 flex flex-col items-start">
                  <span className={`text-[9px] mono-font tracking-[0.2em] uppercase mb-0.5 ${isActive ? "text-[var(--hud-cyan)]" : "text-slate-500"}`}>
                    {item.sub}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-lg opacity-80">{item.icon}</span>
                    <span className="text-sm font-bold tracking-wider uppercase leading-none">{item.label}</span>
                  </div>
                </div>
                {isActive && (
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--hud-cyan)] animate-ping"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="hud-card p-6 opacity-60 hover:opacity-100 transition-opacity">
        <p className="text-[9px] mono-font text-[var(--hud-yellow)] uppercase tracking-widest mb-2">SYSTEM_LOGS</p>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 font-mono">[01:54:27] GPS_LOCK_STABLE</p>
          <p className="text-[10px] text-slate-500 font-mono">[01:54:28] SYNCING_CLOUD_DATA...</p>
        </div>
      </div>
    </div>
  )
}

