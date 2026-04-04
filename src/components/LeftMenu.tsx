import { useState, useRef, useEffect } from "react"
import { useAppStore } from "../store/useAppStore"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const items = [
  { id: "routine", label: "Routine", icon: "⌘" },
  { id: "syllabus", label: "Syllabus", icon: "⚲" },
  { id: "suggestion", label: "Suggestion", icon: "✧" },
] as const

export const LeftMenu = () => {
  const mode = useAppStore((state) => state.mode)
  const setMode = useAppStore((state) => state.setMode)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="fixed top-8 left-8 z-[100]" ref={menuRef}>
      <motion.button
        className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg flex items-center justify-center text-slate-300 hover:text-white border border-white/10 outline-none transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-14 left-0 mt-3 bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-2 w-60 flex flex-col gap-1 overflow-hidden"
          >
            <div className="px-3 pb-2 pt-2 mb-1 border-b border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Navigation</p>
            </div>
            
            {items.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => {
                  setMode(item.id)
                  navigate(item.id === "routine" ? "/" : `/${item.id}`)
                  setIsOpen(false)
                }}
                className={`text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 ${
                  mode === item.id
                    ? "bg-ocean/20 text-ocean shadow-[0_0_15px_rgba(56,189,248,0.15)] font-medium"
                    : "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`text-sm ${mode === item.id ? "opacity-100" : "opacity-60"}`}>{item.icon}</span>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
