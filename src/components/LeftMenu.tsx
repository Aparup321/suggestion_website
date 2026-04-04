import { useAppStore } from "../store/useAppStore"

const items = [
  { id: "routine", label: "Routine", subtitle: "Daily / Weekly" },
  { id: "syllabus", label: "Syllabus", subtitle: "Subject to Units" },
  { id: "suggestion", label: "Suggestion", subtitle: "Smart Recommendations" },
] as const

export const LeftMenu = () => {
  const mode = useAppStore((state) => state.mode)
  const setMode = useAppStore((state) => state.setMode)

  return (
    <aside className="w-full lg:w-64 neo-card p-6 bg-[#fff9df]">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-ink/70">Navigator</p>
          <h2 className="text-3xl font-display text-ink">Study Command</h2>
        </div>
        <nav className="flex flex-col gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`text-left px-4 py-3 rounded-2xl border-2 border-ink transition ${
                mode === item.id
                  ? "bg-ink text-[#fff9df] shadow-[3px_3px_0_#10131a]"
                  : "bg-white hover:-translate-y-0.5"
              }`}
            >
              <div className="text-sm uppercase tracking-[0.2em] opacity-70">
                {item.label}
              </div>
              <div className="text-base font-semibold">{item.subtitle}</div>
            </button>
          ))}
        </nav>
        <div className="rounded-2xl border-2 border-dashed border-ink/60 p-4 text-sm text-ink">
          Routine keeps the clock, syllabus shows the map, suggestions guide the next move.
        </div>
      </div>
    </aside>
  )
}
