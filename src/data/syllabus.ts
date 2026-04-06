import type { Subject } from "../types"

export const subjects: Subject[] = [
  {
    id: "rme",
    title: "Research Methodology",
    code: "MCA20407",
    units: [
      {
        id: "rme-u1",
        title: "Module 1: Foundations of research",
        topics: [
          {
            id: "rme-1-1",
            title: "Meaning, Objectives, Motivation, Utility",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-1-2",
            title: "Concept of theory, empiricism, deductive and inductive theory",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-1-3",
            title: "Characteristics of scientific method",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-1-4",
            title: "Language of research – Concept, Construct, Definition, Variable",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-1-5",
            title: "Research Process",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-1-6",
            title: "Qualitative and Quantitative Research",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
      {
        id: "rme-u2",
        title: "Module 2: Research design",
        topics: [
          {
            id: "rme-2-1",
            title: "Concept and Importance in Research",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-2-2",
            title: "Features of a good research design",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-2-3",
            title: "Exploratory Research Design – concept, types and uses",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-2-4",
            title: "Descriptive Research Designs – concept, types and uses",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-2-5",
            title: "Experimental Design: Concept of Independent & Dependent variables",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
      {
        id: "rme-u3",
        title: "Module 3: Measurement and scaling",
        topics: [
          {
            id: "rme-3-1",
            title: "Concept of measurement – Validity and Reliability",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-3-2",
            title: "Levels of measurement – Nominal, Ordinal, Interval, ratio",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-3-3",
            title: "Sampling concepts: population, frame, error, size",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-3-4",
            title: "Probability sampling – simple, systematic, stratified, multi-stage",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-3-5",
            title: "Practical considerations in sampling and sample size",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
      {
        id: "rme-u4",
        title: "Module 4: Publication Ethics",
        topics: [
          {
            id: "rme-4-1",
            title: "Publication ethics – definition, introduction and importance",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-4-2",
            title: "Conflicts of interest & Publication misconduct",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-4-3",
            title: "Authorship, contributorship, complaints and appeals",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-4-4",
            title: "Predatory publishers and Techniques of paraphrasing",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
      {
        id: "rme-u5",
        title: "Module 5: Tools and techniques for research and paper writing",
        topics: [
          {
            id: "rme-5-1",
            title: "Reference management software (Zotero/Mendeley)",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-5-2",
            title: "Software for paper formatting (LaTeX/MS Office)",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-5-3",
            title: "Layout of a research paper & Journals in CS",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-5-4",
            title: "Impact factor & ethical issues related to publishing",
            status: "not-started",
            priority: "medium",
          },
          {
            id: "rme-5-5",
            title: "Plagiarism detection software",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
    ],
  },
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
  {
    id: "spm",
    title: "Software Project Management",
    code: "MCA20408A",
    units: [
      {
        id: "spm-u1",
        title: "Unit 1: Agile and Waterfall",
        topics: [
          {
            id: "spm-1",
            title: "Estimations",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "cs",
    title: "Cyber Security",
    code: "MCA20408B",
    units: [
      {
        id: "cs-u1",
        title: "Unit 1: Basics",
        topics: [
          {
            id: "cs-1",
            title: "Network Security",
            status: "not-started",
            priority: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "mooc",
    title: "MOOC",
    code: "MCA20408C",
    units: [
      {
        id: "mooc-u1",
        title: "Unit 1: Online Course",
        topics: [
          {
            id: "mooc-1",
            title: "General Progress",
            status: "not-started",
            priority: "low",
          },
        ],
      },
    ],
  },
]
