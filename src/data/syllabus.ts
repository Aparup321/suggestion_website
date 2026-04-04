import type { Subject } from "../types"

export const subjects: Subject[] = [
  {
    id: "ml",
    title: "Machine Learning",
    code: "MCA27502",
    units: [
      {
        id: "ml-u1",
        title: "Unit 1: Foundations",
        topics: [
          {
            id: "ml-1",
            title: "Supervised vs Unsupervised",
            status: "not-started",
            priority: "high",
          },
          {
            id: "ml-2",
            title: "Regression Basics",
            status: "in-progress",
            priority: "high",
          },
        ],
      },
      {
        id: "ml-u2",
        title: "Unit 2: Models",
        topics: [
          {
            id: "ml-3",
            title: "Decision Trees",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "ml-4",
            title: "KNN and SVM",
            status: "done",
            priority: "medium",
            lastStudied: "2026-04-03T16:20:00.000Z",
          },
        ],
      },
    ],
  },
  {
    id: "ood",
    title: "Object Oriented Design using Java",
    code: "MCA27501",
    units: [
      {
        id: "ood-u1",
        title: "Unit 1: OOP Core",
        topics: [
          {
            id: "ood-1",
            title: "Classes and Objects",
            status: "in-progress",
            priority: "high",
          },
          {
            id: "ood-2",
            title: "Inheritance",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
      {
        id: "ood-u2",
        title: "Unit 2: Design Principles",
        topics: [
          {
            id: "ood-3",
            title: "SOLID",
            status: "done",
            priority: "low",
            lastStudied: "2026-03-31T13:10:00.000Z",
          },
          {
            id: "ood-4",
            title: "UML Diagrams",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "dsa",
    title: "Data Structure and Algorithm",
    code: "MCA27500",
    units: [
      {
        id: "dsa-u1",
        title: "Unit 1: Data Structures",
        topics: [
          {
            id: "dsa-1",
            title: "Arrays and Linked Lists",
            status: "not-started",
            priority: "high",
          },
          {
            id: "dsa-2",
            title: "Stacks and Queues",
            status: "in-progress",
            priority: "high",
          },
        ],
      },
      {
        id: "dsa-u2",
        title: "Unit 2: Algorithms",
        topics: [
          {
            id: "dsa-3",
            title: "Sorting",
            status: "done",
            priority: "medium",
            lastStudied: "2026-04-02T18:30:00.000Z",
          },
          {
            id: "dsa-4",
            title: "Searching",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "rme",
    title: "Research Methodology and Ethics",
    code: "MCA20407",
    units: [
      {
        id: "rme-u1",
        title: "Unit 1: Research Basics",
        topics: [
          {
            id: "rme-1",
            title: "Research Process",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-2",
            title: "Ethics in Research",
            status: "done",
            priority: "low",
            lastStudied: "2026-03-30T10:00:00.000Z",
          },
        ],
      },
    ],
  },
  {
    id: "laravel",
    title: "PHP with Laravel Lab",
    code: "MCA29503",
    units: [
      {
        id: "laravel-u1",
        title: "Unit 1: Laravel Basics",
        topics: [
          {
            id: "laravel-1",
            title: "Routing",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "laravel-2",
            title: "Controllers",
            status: "in-progress",
            priority: "high",
          },
        ],
      },
    ],
  },
  {
    id: "ai-tools",
    title: "Basic AI Tools & Applications",
    code: "6BWUVAC01",
    units: [
      {
        id: "ai-u1",
        title: "Unit 1: Tooling",
        topics: [
          {
            id: "ai-1",
            title: "Prompting Basics",
            status: "done",
            priority: "low",
            lastStudied: "2026-04-01T12:00:00.000Z",
          },
          {
            id: "ai-2",
            title: "Productivity Workflows",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "aptitude",
    title: "Aptitude",
    code: "APTI-201",
    units: [
      {
        id: "apt-u1",
        title: "Unit 1: Practice",
        topics: [
          {
            id: "apt-1",
            title: "Quant Basics",
            status: "not-started",
            priority: "low",
          },
          {
            id: "apt-2",
            title: "Verbal Reasoning",
            status: "done",
            priority: "low",
            lastStudied: "2026-03-29T09:30:00.000Z",
          },
        ],
      },
    ],
  },
]
