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
    <div className="fixed top-8 right-8 z-[100] flex flex-col items-end gap-3">
      {/* 3 Dashes Hamburger Icon */}
      <div className="flex flex-col gap-1.5 items-end pr-2 pb-1 opacity-70">
        <div className="w-8 h-[3px] bg-gradient-to-r from-ocean to-plum rounded-full"></div>
        <div className="w-6 h-[3px] bg-gradient-to-r from-ocean to-plum rounded-full"></div>
        <div className="w-10 h-[3px] bg-gradient-to-r from-ocean to-plum rounded-full"></div>
      </div>

      <div className="relative group">
        {/* Subtle glowing color-graded backdrop for the menu */}
        <div className="absolute -inset-1 bg-gradient-to-b from-ocean/20 to-plum/20 rounded-3xl blur-md opacity-50 group-hover:opacity-75 transition duration-500"></div>

        <div className="relative bg-slate-900/70 w-[260px] backdrop-blur-2xl rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.7)] border border-white/10 p-3 flex flex-col gap-2">
          {items.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setMode(item.id)
                navigate(item.id === "routine" ? "/" : `/${item.id}`)
              }}
              className={`text-left px-5 py-4 rounded-2xl transition-all flex items-center justify-between gap-4 ${mode === item.id
                ? "bg-gradient-to-r from-ocean/20 to-plum/20 border border-ocean/40 shadow-[0_0_20px_rgba(56,189,248,0.2)] text-white font-semibold"
                : "bg-white/5 border border-transparent text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="text-lg font-display tracking-widest">{item.label}</span>
              <span className={`text-xl ${mode === item.id ? "text-gradient opacity-100" : "opacity-50"}`}>
                {item.icon}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
