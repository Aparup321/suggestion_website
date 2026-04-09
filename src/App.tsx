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
  const [progress, setProgress] = useState(65)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--hud-bg)] text-white selection:bg-[var(--hud-cyan)] selection:text-[var(--hud-bg)]">
      <SlashOverlay />
      
      {/* HUD DECORATIVE ELEMENTS */}
      <div className="fixed top-4 left-4 text-[10px] mono-font opacity-20 pointer-events-none z-0">
        LAT: 24.3639° N<br />
        LON: 88.6241° E<br />
        SYS_STATUS: OPTIMAL
      </div>
      <div className="fixed bottom-4 right-4 text-[10px] mono-font opacity-20 pointer-events-none z-0 text-right">
        DATA_STREAM: ACTIVE<br />
        CONNECTION: SECURE<br />
        V_0.2.1-STRAW_HAT
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 md:px-10 py-10">
        {/* TOP HUD BAR */}
        <header className="mb-12 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-1 space-y-1">
            <p className="text-[10px] tracking-[0.4em] text-[var(--hud-teal)] font-bold uppercase opacity-80">
              Study Dashboard Active
            </p>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              STRAW HAT <span className="text-[var(--hud-yellow)] block text-2xl not-italic tracking-[0.2em] mt-1 border-t border-[var(--hud-border)] pt-1">DASHBOARD</span>
            </h1>
            <p className="text-[10px] text-slate-500 mono-font uppercase tracking-widest mt-4">
              MODERN STUDY TRACKER // SECTION_C.V2
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="hud-card p-6 flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold tracking-[0.3em] text-white/80">TODAY'S FOCUS & GOALS: <span className="text-[var(--hud-cyan)]">{progress}% Complete</span></span>
              </div>
              <div className="progress-segment">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`progress-block ${i < (progress / 100) * 20 ? 'filled' : ''}`}
                    style={{ transitionDelay: `${i * 20}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex gap-4">
            <div className="hud-card p-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden group">
               {/* Straw Hat Icon Placeholder / Decorative */}
               <div className="w-16 h-16 rounded-full border border-[var(--hud-cyan)] flex items-center justify-center relative">
                  <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]">👒</span>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--hud-cyan)]/30 animate-[spin_10s_linear_infinite]"></div>
               </div>
            </div>
            
            <div className="hud-card p-6 flex-1 flex flex-col justify-center text-center">
              <span className="text-4xl font-black hud-font text-white">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-[10px] tracking-[0.2em] text-[var(--hud-yellow)] font-bold uppercase mt-1">Welcome, User</span>
            </div>
          </div>
        </header>

        {/* MAIN HUD CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3">
             <RightMenu />
          </aside>

          <main className="lg:col-span-9">
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

