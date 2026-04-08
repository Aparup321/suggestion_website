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
      <div className="mx-auto w-full max-w-7xl px-4 md:px-12 pt-12 relative z-10">
        <div className="hero-banner mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 relative z-10">
            <div className="flex flex-col items-start px-2">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--neo-luffy-red)] font-black mb-4 flex items-center gap-4">
                <span className="w-12 h-1 bg-[var(--neo-luffy-red)]"></span>
                Study Dashboard Active
              </p>
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-4 text-white uppercase leading-none">
                STRAW HAT <span className="text-[var(--neo-hat-yellow)] border-b-8 border-black">DASHBOARD</span>
              </h1>
              <p className="text-sm md:text-lg text-slate-400 max-w-2xl font-black uppercase tracking-widest opacity-80">
                Modern Study Tracker // SECTION_C.V2
              </p>
            </div>
            <div className="neo-card !py-8 !px-10 bg-black mesh-gradient-vibrant border-black border-[6px] shadow-[12px_12px_0px_0px_#000] text-black">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-4 h-4 bg-black border-2 border-white shadow-[2px_2px_0px_0px_#000]"></div>
                <span className="text-[12px] tracking-[0.4em] font-black uppercase text-black/60">CURRENT_TIME</span> 
              </div>
              <span className="font-black text-6xl md:text-7xl tracking-tighter leading-none italic text-black">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div id="zoro-main-layout" className="pb-24">
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
