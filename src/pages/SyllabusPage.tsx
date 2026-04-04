import { useEffect } from "react"
import { SyllabusView } from "../components/SyllabusView"
import { useAppStore } from "../store/useAppStore"

export const SyllabusPage = () => {
  const setMode = useAppStore((state) => state.setMode)

  useEffect(() => {
    setMode("syllabus")
  }, [setMode])

  return <SyllabusView />
}
