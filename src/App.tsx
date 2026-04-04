import { LeftMenu } from "./components/LeftMenu"
import { ModeHeader } from "./components/ModeHeader"
import { RoutineView } from "./components/RoutineView"
import { SyllabusView } from "./components/SyllabusView"
import { SuggestionView } from "./components/SuggestionView"
import { useEffect, useState } from "react"
import { useAppStore } from "./store/useAppStore"
import "./App.css"

const ViewSwitcher = () => {
  const mode = useAppStore((state) => state.mode)

  if (mode === "routine") return <RoutineView />
  if (mode === "syllabus") return <SyllabusView />
  return <SuggestionView />
}

function App() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-shell">
      <div className="mx-auto w-full max-w-6xl">
        <div className="hero-banner relative overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Your Academic Assistant</p>
              <h1 className="text-4xl md:text-5xl font-display text-ink">
                Routine, Syllabus, Suggestions
              </h1>
              <p className="text-sm md:text-base text-ink/70 max-w-xl">
                The routine keeps time, the syllabus maps the journey, and suggestions guide the next move.
              </p>
            </div>
            <div className="neo-card px-4 py-3 text-sm text-ink/80 bg-white">
              Live time: {now.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-6">
          <LeftMenu />
          <main className="flex flex-col gap-6">
            <ModeHeader />
            <ViewSwitcher />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
