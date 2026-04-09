import { RightMenu } from "./components/RightMenu"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { RoutinePage } from "./pages/RoutinePage"
import { SyllabusPage } from "./pages/SyllabusPage"
import { SuggestionPage } from "./pages/SuggestionPage"
import { SlashOverlay } from "./components/SlashOverlay"
import "./App.css"

const CompassHatLogo = () => (
  <div className="relative w-32 h-32 flex items-center justify-center group cursor-crosshair">
    {/* Animated Radar/Compass Background */}
    <div className="absolute inset-0 rounded-full border border-[var(--hud-accent-blue)] opacity-10 scale-110"></div>
    <div className="absolute inset-0 rounded-full border-2 border-[var(--hud-accent-blue)] opacity-5 animate-pulse"></div>

    {/* Intricate Hub SVG */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="ring-grad" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="transparent" />
          <stop offset="100%" stopColor="var(--hud-accent-blue)" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {/* Outer Ring with Notches */}
      <circle cx="50" cy="50" r="48" fill="url(#ring-grad)" stroke="currentColor" className="text-[var(--hud-accent-blue)] opacity-20" strokeWidth="0.5" />
      {[...Array(12)].map((_, i) => (
        <line 
          key={i} 
          x1="50" y1="2" x2="50" y2="8" 
          transform={`rotate(${i * 30} 50 50)`} 
          stroke="currentColor" 
          className="text-[var(--hud-accent-blue)]" 
          strokeWidth="1.5" 
          opacity="0.4"
        />
      ))}
      {/* Inner Rotating Ring */}
      <g className="animate-[spin_20s_linear_infinite]">
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" className="text-[var(--hud-accent-blue)]" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />
        <path d="M50 15 L53 25 L47 25 Z" fill="var(--hud-accent-yellow)" className="shadow-[0_0_10px_var(--hud-accent-yellow)]" />
      </g>
    </svg>

    {/* Center Hat Container */}
    <div className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center bg-[var(--hud-bg-base)]/80 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,242,255,0.1)]">
       <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Scanner Line Effect */}
          <div className="w-full h-[1px] bg-[var(--hud-accent-blue)] shadow-[0_0_10px_var(--hud-accent-blue)] opacity-50 absolute animate-[scan_3s_linear_infinite]"></div>
       </div>
       <span className="text-5xl filter drop-shadow-[0_0_15px_rgba(255,204,0,0.8)] transform group-hover:scale-110 transition-transform duration-500">
         👒
       </span>
    </div>
  </div>
)


function App() {
  const [now, setNow] = useState(() => new Date())
  const progress = 65

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--hud-bg-base)] text-white selection:bg-[var(--hud-accent-blue)] selection:text-[var(--hud-bg-base)] overflow-x-hidden">
      <SlashOverlay />
      


      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 md:px-12 py-10">
        {/* HIGH-FIDELITY HUD TOP BAR */}
        <header className="flex flex-col xl:flex-row gap-8 mb-12">
          {/* PANEL 1: BRANDING */}
          <div className="hud-panel p-10 flex-shrink-0 xl:w-[400px]">
             <p className="text-[12px] tracking-[0.6em] hud-text-cyan font-black uppercase mb-6 flex items-center gap-4">
                <span className="w-2 h-2 bg-[var(--hud-accent-blue)] rounded-full animate-ping"></span>
                STUDY_OPS_HUB
             </p>
             <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tight text-white uppercase italic leading-none opacity-90">
                  STRAW HAT
                </h1>
                <h2 className="text-6xl font-black hud-slant tracking-tighter italic">DASHBOARD</h2>
             </div>
             <div className="mt-8 flex items-center gap-6">
                <div className="h-[2px] w-12 bg-white/20"></div>
                <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em]">
                   MODERN_STUDY_INTERFACE_V3
                </p>
             </div>
          </div>

          {/* PANEL 2: FOCUS (The large center part) */}
          <div className="hud-panel p-10 flex-1 flex flex-col md:flex-row items-center gap-12">
             <div className="flex-1 space-y-8 w-full">
                <div className="flex justify-between items-center">
                   <div className="hud-dial-container">
                      <div className="w-6 h-6 border-2 border-[var(--hud-accent-blue)] border-t-transparent rounded-full animate-spin"></div>

                   </div>
                   <span className="text-[10px] mono-font opacity-40 uppercase tracking-widest">LIVE_DATA_FEED</span>
                </div>
                
                {/* HIGH-Fidelity Segmented BAR */}
                <div className="flex gap-2.5 h-10 w-full">
                   {Array.from({ length: 18 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 transition-all duration-1000 transform ${i < (progress / 100) * 18 
                          ? 'bg-[var(--hud-accent-blue)] shadow-[0_0_20px_var(--hud-accent-blue)] scale-y-100' 
                          : 'bg-white/5 opacity-10 scale-y-90'}`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      ></div>
                   ))}
                </div>
             </div>

             <div className="shrink-0 scale-110">
                <CompassHatLogo />
             </div>
          </div>

          {/* PANEL 3: TIME-CLOCK */}
          <div className="hud-panel p-10 xl:w-[320px] flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-20 text-[10px] hud-text-gold">ID:882-SH</div>
             <div className="px-10 py-5 rounded-2xl bg-black/40 border border-[var(--hud-border-gold)] shadow-[inset_0_0_25px_rgba(255,204,0,0.15)] mb-4">
                <span className="text-5xl font-black hud-title tracking-widest text-white italic">
                  {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
             </div>
             <div className="space-y-1">
                <p className="text-[12px] hud-text-gold font-black uppercase tracking-[0.4em] italic">
                   AUTHORIZED_USER
                </p>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--hud-accent-yellow)] to-transparent opacity-20"></div>
             </div>
          </div>
        </header>

        {/* MAIN HUD CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <aside className="lg:col-span-3">
             <RightMenu />
          </aside>

          <main className="lg:col-span-9 rounded-[40px] p-1 bg-gradient-to-b from-white/5 to-transparent">
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
