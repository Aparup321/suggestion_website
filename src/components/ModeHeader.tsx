import { useAppStore } from "../store/useAppStore"

const titles = {
  routine: {
    title: "Routine",
    subtitle: "What is happening now",
  },
  syllabus: {
    title: "Syllabus",
    subtitle: "What exists to study",
  },
  suggestion: {
    title: "Suggestion",
    subtitle: "What you should do next",
  },
}

export const ModeHeader = () => {
  const mode = useAppStore((state) => state.mode)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const subjects = useAppStore((state) => state.subjects)

  const selection = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <header className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.4em] text-ink/60">Academic Assistant</p>
      <div className="flex flex-wrap items-end gap-3">
        <h1 className="text-4xl md:text-5xl font-display text-ink">{titles[mode].title}</h1>
        <span className="text-sm md:text-base text-ink/70">{titles[mode].subtitle}</span>
      </div>
      {selection && (
        <p className="text-sm text-ink/70">
          Filtering by <span className="font-semibold">{selection.title}</span>
        </p>
      )}
    </header>
  )
}
