import { useAppStore } from "../store/useAppStore"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const items = [
  { id: "routine", label: "Routine", icon: "⚔" },
  { id: "syllabus", label: "Syllabus", icon: "⛩" },
  { id: "suggestion", label: "Strategy", icon: "☸" },
] as const

export const RightMenu = () => {
  const mode = useAppStore((state) => state.mode)
  const setMode = useAppStore((state) => state.setMode)
  const navigate = useNavigate()

  return (
    <div className="fixed top-6 right-6 z-[999] flex flex-col items-end gap-2">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ef8e]/30 to-[#00703c]/30 rounded-2xl blur-sm opacity-40 group-hover:opacity-100 transition duration-500"></div>

        <div className="relative bg-black/95 w-[240px] backdrop-blur-3xl rounded-2xl shadow-2xl border border-[#00ef8e]/20 p-2 flex flex-col gap-1.5">
          {items.map((item) => {
            const isActive = mode === item.id
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMode(item.id)
                  navigate(item.id === "routine" ? "/" : `/${item.id}`)
                }}
                className={`text-left px-5 py-4 rounded-xl transition-all flex items-center justify-between gap-4 group/item ${isActive
                  ? "bg-[#00ef8e]/10 border border-[#00ef8e]/20 text-white font-bold shadow-[0_0_15px_rgba(0,239,142,0.1)]"
                  : "text-slate-500 hover:text-[#00ef8e]/80"
                  }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[10px] tracking-[0.3em] uppercase opacity-40 group-hover/item:opacity-60 transition-opacity`}>
                    {item.id === "routine" ? "SANTORYU" : "GRAND_LINE"}
                  </span>
                  <span className="text-sm font-zoro tracking-wider">{item.label}</span>
                </div>
                <span className={`text-2xl transition-all duration-300 ${isActive ? "text-[#00ef8e] scale-110 drop-shadow-[0_0_8px_#00ef8e]" : "opacity-20 scale-90"}`}>
                  {item.icon}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-8 bg-[#00ef8e] rounded-full shadow-[0_0_10px_#00ef8e]"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
