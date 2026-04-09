import { RightMenu } from "./components/RightMenu"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { RoutinePage } from "./pages/RoutinePage"
import { SyllabusPage } from "./pages/SyllabusPage"
import { SuggestionPage } from "./pages/SuggestionPage"
import { SlashOverlay } from "./components/SlashOverlay"
import "./App.css"

const CompassHatLogo = () => (
  <div className="relative w-28 h-28 flex items-center justify-center">
    {/* Outer Tech Ring */}
    <div className="absolute inset-0 rounded-full border border-[var(--hud-accent-blue)] opacity-10"></div>
    <div className="absolute inset-1 rounded-full border-2 border-[var(--hud-accent-blue)] opacity-5 animate-pulse"></div>
    
    {/* Main Compass Ring with Markers */}
    <svg className="absolute inset-0 w-full h-full rotate-45" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" className="text-[var(--hud-accent-blue)] opacity-20" strokeWidth="0.5" strokeDasharray="1 3" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-[var(--hud-accent-blue)] opacity-30" strokeWidth="1" />
      {/* Markers */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <line key={deg} x1="50" y1="8" x2="50" y2="14" transform={`rotate(${deg} 50 50)`} stroke="currentColor" className="text-[var(--hud-accent-blue)]" strokeWidth="1.5" />
      ))}
    </svg>

    {/* Rotating Inner Rings */}
    <div className="absolute inset-4 rounded-full border border-dashed border-[var(--hud-accent-yellow)] opacity-20 animate-[spin_15s_linear_infinite]"></div>
    <div className="absolute inset-6 rounded-full border border-[var(--hud-accent-blue)] opacity-10 animate-[spin_10s_linear_infinite_reverse]"></div>

    {/* Central Straw Hat Graphic */}
    <div className="relative z-10 flex flex-col items-center justify-center">
       <div className="absolute -inset-8 bg-[var(--hud-accent-yellow)] opacity-10 blur-2xl rounded-full"></div>
       <span className="text-5xl filter drop-shadow-[0_0_20px_rgba(255,204,0,0.8)] transform hover:scale-110 transition-transform cursor-pointer">
         👒
       </span>
       {/* Compass Needle */}
       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[var(--hud-accent-yellow)] shadow-[0_0_10px_var(--hud-accent-yellow)] z-20"></div>
    </div>
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


