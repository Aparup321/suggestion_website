import { LeftMenu } from "./components/LeftMenu"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { RoutinePage } from "./pages/RoutinePage"
import { SyllabusPage } from "./pages/SyllabusPage"
import { SuggestionPage } from "./pages/SuggestionPage"
import "./App.css"

function App() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-shell">
      {/* Floating Navigator */}
      <LeftMenu />

      <div className="mx-auto w-full max-w-4xl pt-8 relative z-10">
        <div className="hero-banner mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">System Initialized</p>
              <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-2">
                Study <span className="text-gradient font-bold">Command</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-xl font-light">
                Routine keeps the clock. Syllabus holds the map. Suggestions dictate the next move.
              </p>
            </div>
            <div className="neo-card px-5 py-3 text-sm text-white font-medium inline-flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-lime animate-pulse"></div>
              <span className="opacity-80">SYS_TIME</span> 
              <span className="font-mono">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <main className="flex flex-col gap-6">
          <Routes>
            <Route path="/" element={<RoutinePage />} />
            <Route path="/routine" element={<RoutinePage />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/suggestion" element={<SuggestionPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
