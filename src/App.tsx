import { RightMenu } from "./components/RightMenu"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { RoutinePage } from "./pages/RoutinePage"
import { SyllabusPage } from "./pages/SyllabusPage"
import { SuggestionPage } from "./pages/SuggestionPage"
import { SlashOverlay } from "./components/SlashOverlay"
import "./App.css"

function App() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-shell">
      <SlashOverlay />
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 pt-8 relative z-10">
        <div className="hero-banner mb-10 pr-4 md:pr-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div className="flex flex-col items-start px-2">
              <p className="text-xs uppercase tracking-[0.3em] text-[#00ef8e] font-bold mb-2 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#00ef8e]"></span>
                Grand Line Protocol Initialized
              </p>
              <h1 className="text-4xl md:text-6xl font-zoro font-bold tracking-tighter mb-2">
                Haki <span className="text-gradient">Command</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-xl font-light italic opacity-80">
                "I will be the world's greatest swordsman!" — Routine is the blade, Syllabus is the path.
              </p>
            </div>
            <div className="neo-card px-8 py-6 text-sm text-white font-medium inline-flex flex-col items-start gap-1 border-l-4 border-l-[#00ef8e] border-r-0">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ef8e] animate-pulse shadow-[0_0_10px_#00ef8e]"></div>
                <span className="opacity-60 text-[10px] tracking-widest font-mono">NEW_WORLD_STD</span> 
              </div>
              <span className="font-mono text-3xl font-black tracking-tighter">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div id="zoro-main-layout">
          {/* Main Navigator Sidebar */}
          <aside id="zoro-sidebar" className="z-[99] sidebar-container">
            <RightMenu />
          </aside>

          <main id="zoro-content">
            <Routes>
              <Route path="/" element={<RoutinePage />} />
              <Route path="/routine" element={<RoutinePage />} />
              <Route path="/syllabus" element={<SyllabusPage />} />
              <Route path="/suggestion" element={<SuggestionPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
