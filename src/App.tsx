import { RightMenu } from "./components/RightMenu"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { RoutinePage } from "./pages/RoutinePage"
import { SyllabusPage } from "./pages/SyllabusPage"
import { SuggestionPage } from "./pages/SuggestionPage"
import { SlashOverlay } from "./components/SlashOverlay"
import "./App.css"

const CompassHatLogo = () => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    {/* Outer Glowing Ring */}
    <div className="absolute inset-0 rounded-full border-2 border-[var(--hud-accent-blue)] opacity-20 animate-pulse"></div>
    {/* Compass Ring */}
    <div className="absolute inset-2 rounded-full border border-[var(--hud-accent-blue)] opacity-40">
       {[0, 90, 180, 270].map(deg => (
         <div key={deg} className="absolute inset-0 flex items-start justify-center" style={{ transform: `rotate(${deg}deg)` }}>
            <div className="w-[1px] h-2 bg-[var(--hud-accent-blue)]"></div>
         </div>
       ))}
    </div>
    {/* Compass Dial */}
    <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-dashed border-[var(--hud-accent-blue)]/20 rounded-full"></div>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-[var(--hud-accent-yellow)] shadow-[0_0_10px_var(--hud-accent-yellow)]"></div>
    </div>
    {/* The Hat */}
    <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,204,0,0.6)] z-10">👒</span>
  </div>
)

function App() {
  const [now, setNow] = useState(() => new Date())
  const [progress, setProgress] = useState(65)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--hud-bg-base)] text-white selection:bg-[var(--hud-accent-blue)] selection:text-[var(--hud-bg-base)]">
      <SlashOverlay />
      
      {/* HUD DECORATIVE ELEMENTS */}
      <div className="fixed top-6 left-6 text-[10px] mono-font opacity-20 pointer-events-none z-0">
        // SYSTEM_COORD_ACTIVE<br />
        LAT: 24.3639° N<br />
        LON: 88.6241° E
      </div>
      <div className="fixed bottom-6 right-6 text-[10px] mono-font opacity-20 pointer-events-none z-0 text-right">
        [ DATA_STREAM_STABLE ]<br />
        V_0.2.1-STRAW_HAT
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 md:px-12 py-10">
        {/* HIGH-FIDELITY HUD TOP BAR */}
        <header className="header-container">
          {/* PANEL 1: BRANDING */}
          <div className="hud-panel p-8 flex flex-col justify-center">
             <p className="text-[10px] tracking-[0.4em] hud-text-cyan font-bold uppercase mb-4">
                STUDY DASHBOARD ACTIVE
             </p>
             <div className="flex flex-col">
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                  STRAW HAT
                </h1>
                <h2 className="text-5xl font-black hud-slant mt-1">DASHBOARD</h2>
             </div>
             <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-700"></span>
                MODERN STUDY TRACKER // SECTION C_V2
             </p>
          </div>

          {/* PANEL 2: FOCUS & STATUS */}
          <div className="hud-panel p-8 flex items-center gap-10">
             <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">
                   <div className="hud-dial-container">
                      <div className="hud-meter"></div>
                      <div className="hud-meter opacity-50"></div>
                      <span className="text-[11px] font-bold tracking-[0.3em] text-white/90 uppercase ml-2">
                        TODAY'S FOCUS & GOALS: <span className="hud-text-cyan">{progress}% Complete</span>
                      </span>
                   </div>
                </div>
                {/* LARGE SEGMENTED PROGRESS BAR */}
                <div className="flex gap-2 h-8">
                   {Array.from({ length: 15 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 transition-all duration-700 ${i < (progress / 100) * 15 ? 'bg-[var(--hud-accent-blue)] shadow-[0_0_15px_var(--hud-accent-blue)]' : 'bg-white/5 opacity-20'}`}
                      ></div>
                   ))}
                </div>
             </div>

             <div className="shrink-0">
                <CompassHatLogo />
             </div>
          </div>

          {/* PANEL 3: TIME & USER */}
          <div className="hud-panel p-8 flex flex-col items-center justify-center text-center">
             <div className="bg-black/40 px-8 py-4 rounded-xl border border-[var(--hud-border-gold)] shadow-[inset_0_0_10px_rgba(255,204,0,0.1)]">
                <span className="text-5xl font-black hud-title tracking-widest text-white">
                  {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
             </div>
             <p className="text-[11px] hud-text-gold font-bold uppercase tracking-[0.3em] mt-4">
                Welcome, User
             </p>
          </div>
        </header>

        {/* MAIN HUD CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <aside className="lg:col-span-3">
             <RightMenu />
          </aside>

          <main className="lg:col-span-9 bg-black/10 rounded-[30px] p-2">
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


