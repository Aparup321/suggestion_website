import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export const SlashOverlay = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Initial slash on load
    const timer = setTimeout(() => setIsVisible(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Screen Flash */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white"
          />
          
          {/* Main diagonal slash */}
          <motion.div
            initial={{ x: '-120%', y: '120%', scaleX: 3, opacity: 1 }}
            animate={{ x: '120%', y: '-120%', opacity: 0.8 }}
            transition={{ duration: 0.35, ease: "circOut" }}
            className="absolute w-[300%] h-6 bg-white blur-[1px] shadow-[0_0_60px_var(--neo-luffy-red)] transform -rotate-45"
          />
          
          {/* Luffy Red trail */}
          <motion.div
            initial={{ x: '-120%', y: '120%', scaleX: 2, opacity: 0.5 }}
            animate={{ x: '120%', y: '-120%', opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut", delay: 0.05 }}
            className="absolute w-[250%] h-20 bg-[var(--neo-luffy-red)] blur-[40px] transform -rotate-45"
          />

          {/* Secondary Yellow cuts */}
          <motion.div
            initial={{ x: '-120%', y: '80%', scaleX: 2, opacity: 0.7 }}
            animate={{ x: '120%', y: '-160%', opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut", delay: 0.1 }}
            className="absolute w-[200%] h-2 bg-white blur-[1px] shadow-[0_0_30px_var(--neo-hat-yellow)] transform -rotate-40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
