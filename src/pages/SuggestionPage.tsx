import { useEffect } from "react"
import { SuggestionView } from "../components/SuggestionView"
import { useAppStore } from "../store/useAppStore"

export const SuggestionPage = () => {
  const setMode = useAppStore((state) => state.setMode)

  useEffect(() => {
    setMode("suggestion")
  }, [setMode])

  return <SuggestionView />
}
