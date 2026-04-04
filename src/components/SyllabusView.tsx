import { useAppStore } from "../store/useAppStore"

export const SyllabusView = () => {
  const subjects = useAppStore((state) => state.subjects)
  const selectedSubjectId = useAppStore((state) => state.selectedSubjectId)
  const setSelectedSubject = useAppStore((state) => state.setSelectedSubject)
  const updateTopicStatus = useAppStore((state) => state.updateTopicStatus)
  const markStudiedNow = useAppStore((state) => state.markStudiedNow)

  const selected = subjects.find((subject) => subject.id === selectedSubjectId)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-sm text-ink/60">Select subject to drill down</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubject(undefined)}
              className={`px-4 py-2 rounded-full text-sm border-2 border-ink ${
                !selectedSubjectId
                  ? "bg-ink text-[#fff9df]"
                  : "bg-white"
              } neo-button`}
            >
              All Subjects
            </button>
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`px-4 py-2 rounded-full text-sm border-2 border-ink ${
                  selectedSubjectId === subject.id
                    ? "bg-ink text-[#fff9df]"
                    : "bg-white"
                } neo-button`}
              >
                {subject.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {(selected ? [selected] : subjects).map((subject) => (
        <div
          key={subject.id}
          className="neo-card p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-display text-ink">{subject.title}</h3>
            {subject.code && (
              <span className="text-xs uppercase tracking-[0.2em] text-ink/60">
                {subject.code}
              </span>
            )}
          </div>
          <div className="mt-4 grid gap-5">
            {subject.units.map((unit) => (
              <div key={unit.id} className="rounded-2xl border-2 border-ink bg-[#fff1a8] p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-ink/60">{unit.title}</p>
                <div className="mt-3 grid gap-3">
                  {unit.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl bg-white border-2 border-ink px-4 py-3"
                    >
                      <div>
                        <p className="text-sm text-ink/60">{topic.priority} priority</p>
                        <p className="text-base font-semibold text-ink">{topic.title}</p>
                        <p className="text-xs text-ink/50">
                          {topic.lastStudied
                            ? `Last studied ${new Date(topic.lastStudied).toLocaleString()}`
                            : "Not studied yet"}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {(["not-started", "in-progress", "done"] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => updateTopicStatus(subject.id, topic.id, status)}
                            className={`px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] border-2 border-ink ${
                              topic.status === status
                                ? "bg-ink text-[#fff9df]"
                                : "bg-white text-ink"
                            } neo-button`}
                          >
                            {status.replace("-", " ")}
                          </button>
                        ))}
                        <button
                          onClick={() => markStudiedNow(subject.id, topic.id)}
                          className="px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] border-2 border-ink bg-[#9ad66f] text-ink neo-button"
                        >
                          studied now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
