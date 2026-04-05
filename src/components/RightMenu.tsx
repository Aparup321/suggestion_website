import { useAppStore } from "../store/useAppStore"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const items = [
  { id: "routine", label: "Routine", icon: "⌘" },
  { id: "syllabus", label: "Syllabus", icon: "⚲" },
  { id: "suggestion", label: "Suggestion", icon: "✧" },
] as const

export const RightMenu = () => {
  const mode = useAppStore((state) => state.mode)
  const setMode = useAppStore((state) => state.setMode)
  const navigate = useNavigate()

  return (
    <div className="fixed top-6 right-6 z-[999] flex flex-col items-end gap-2" style={{ left: 'auto', right: '24px' }}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-ocean/30 to-plum/30 rounded-2xl blur-sm opacity-40 group-hover:opacity-100 transition duration-500"></div>

        <div className="relative bg-slate-950/95 w-[240px] backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/10 p-2 flex flex-col gap-1.5">
          {items.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setMode(item.id)
                navigate(item.id === "routine" ? "/" : `/${item.id}`)
              }}
              className={`text-left px-6 py-4 rounded-xl transition-all flex items-center justify-between gap-4 ${mode === item.id
                ? "bg-white/10 border border-white/10 text-white font-black"
                : "text-slate-500 hover:text-slate-200"
                }`}
            >
              <span className="text-sm uppercase tracking-[0.2em]">{item.label}</span>
              <span className={`text-xl ${mode === item.id ? "text-ocean opacity-100" : "opacity-30"}`}>
                {item.icon}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
