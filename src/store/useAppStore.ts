import { create } from "zustand"
import { subjects as defaultSubjects } from "../data/syllabus"
import type { Subject, TopicStatus } from "../types"

type Mode = "routine" | "syllabus" | "suggestion"
type View = "daily" | "weekly"

type AppState = {
  mode: Mode
  view: View
  selectedSubjectId?: string
  subjects: Subject[]
  setMode: (mode: Mode) => void
  setView: (view: View) => void
  setSelectedSubject: (subjectId?: string) => void
  updateTopicStatus: (subjectId: string, topicId: string, status: TopicStatus) => void
  markStudiedNow: (subjectId: string, topicId: string) => void
}

const loadSubjects = (): Subject[] => {
  const stored = localStorage.getItem("study-subjects")
  if (!stored) return defaultSubjects
  try {
    const subjects = JSON.parse(stored) as Subject[]
    // Modernization: If Research Methodology exists but has old structure, replace it.
    const rmIndex = subjects.findIndex(s => s.id === "rme")
    if (rmIndex !== -1) {
      const rmSubject = subjects[rmIndex]
      const freshRM = defaultSubjects.find(s => s.id === "rme")
      if (freshRM && rmSubject.units.length < freshRM.units.length) {
        subjects[rmIndex] = freshRM
        saveSubjects(subjects)
      }
    }
    
    // Modernization: If Cyber Security exists but has old structure, replace it.
    const csIndex = subjects.findIndex(s => s.id === "cs")
    if (csIndex !== -1) {
      const csSubject = subjects[csIndex]
      const freshCS = defaultSubjects.find(s => s.id === "cs")
      if (freshCS && csSubject.units.length < freshCS.units.length) {
        subjects[csIndex] = freshCS
        saveSubjects(subjects)
      }
    } else {
      // If CS is missing entirely
      const freshCS = defaultSubjects.find(s => s.id === "cs")
      if (freshCS) {
        subjects.push(freshCS)
        saveSubjects(subjects)
      }
    }
    return subjects
  } catch {
    return defaultSubjects
  }
}

const saveSubjects = (subjects: Subject[]) => {
  localStorage.setItem("study-subjects", JSON.stringify(subjects))
}

export const useAppStore = create<AppState>((set) => ({
  mode: "routine",
  view: "daily",
  selectedSubjectId: undefined,
  subjects: loadSubjects(),
  setMode: (mode) => set({ mode }),
  setView: (view) => set({ view }),
  setSelectedSubject: (subjectId) => set({ selectedSubjectId: subjectId }),
  updateTopicStatus: (subjectId, topicId, status) =>
    set((state) => {
      const subjects = state.subjects.map((subject) => {
        if (subject.id !== subjectId) return subject
        return {
          ...subject,
          units: subject.units.map((unit) => ({
            ...unit,
            topics: unit.topics.map((topic) =>
              topic.id === topicId ? { ...topic, status } : topic
            ),
          })),
        }
      })
      saveSubjects(subjects)
      return { subjects }
    }),
  markStudiedNow: (subjectId, topicId) =>
    set((state) => {
      const now = new Date().toISOString()
      const subjects = state.subjects.map((subject) => {
        if (subject.id !== subjectId) return subject
        return {
          ...subject,
          units: subject.units.map((unit) => ({
            ...unit,
            topics: unit.topics.map((topic) =>
              topic.id === topicId ? { ...topic, lastStudied: now } : topic
            ),
          })),
        }
      })
      saveSubjects(subjects)
      return { subjects }
    }),
}))
