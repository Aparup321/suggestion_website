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
    objective: "To understand the fundamental principles of software project management, including project planning, estimation, risk management, and team organization, and to apply these principles to manage projects effectively within constraints.",
    prerequisites: ["Software Engineering Fundamentals", "Management Principles"],
    outcomes: [
      "CO1: Apply project management concepts and techniques to software development projects.",
      "CO2: Perform cost-benefit analysis and strategic assessment for project selection.",
      "CO3: Estimate software effort using various models like COCOMO and Function Point analysis.",
      "CO4: Develop activity plans and manage risks using tools like PERT and CPM.",
      "CO5: Understand resource allocation and team management strategies."
    ],
    units: [
      {
        id: "spm-u1",
        title: "Module 1: Introduction and Software Project Planning [9H]",
        topics: [
          { id: "spm-1-1", title: "Introduction to Software Project Management", status: "not-started", priority: "medium" },
          { id: "spm-1-2", title: "Project Evaluation and Programme Management", status: "not-started", priority: "medium" },
          { id: "spm-1-3", title: "An Overview of Project Planning", status: "not-started", priority: "medium" },
          { id: "spm-1-4", title: "Selection of an Appropriate Project Approach", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "spm-u2",
        title: "Module 2: Project Evaluation and Programme Management [9H]",
        topics: [
          { id: "spm-2-1", title: "Strategic Assessment and Technical Assessment", status: "not-started", priority: "medium" },
          { id: "spm-2-2", title: "Cost-Benefit Analysis and Cash Flow Forecasting", status: "not-started", priority: "medium" },
          { id: "spm-2-3", title: "Cost-benefit Evaluation Techniques", status: "not-started", priority: "medium" },
          { id: "spm-2-4", title: "Risk Evaluation", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "spm-u3",
        title: "Module 3: Software Effort Estimation [9H]",
        topics: [
          { id: "spm-3-1", title: "Problems with Over- and Under-Estimates", status: "not-started", priority: "medium" },
          { id: "spm-3-2", title: "Software Effort Estimation Techniques", status: "not-started", priority: "medium" },
          { id: "spm-3-3", title: "Albrecht Function Point Analysis", status: "not-started", priority: "medium" },
          { id: "spm-3-4", title: "COCOMO Model & Expert Judgment", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "spm-u4",
        title: "Module 4: Activity Planning and Risk Management [9H]",
        topics: [
          { id: "spm-4-1", title: "Objectives of Activity Planning", status: "not-started", priority: "medium" },
          { id: "spm-4-2", title: "Project Schedules and Sequencing", status: "not-started", priority: "medium" },
          { id: "spm-4-3", title: "Network Planning Models (PERT/CPM)", status: "not-started", priority: "medium" },
          { id: "spm-4-4", title: "Risk Management: Identification, Analysis, and Mitigation", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "spm-u5",
        title: "Module 5: Resource Allocation and Monitoring [9H]",
        topics: [
          { id: "spm-5-1", title: "Nature of Resources & Identifying Requirements", status: "not-started", priority: "medium" },
          { id: "spm-5-2", title: "Scheduling Resources & Creating Critical Paths", status: "not-started", priority: "medium" },
          { id: "spm-5-3", title: "Monitoring and Control & Visualizing Progress", status: "not-started", priority: "medium" },
          { id: "spm-5-4", title: "Managing People and Organizing Teams", status: "not-started", priority: "medium" },
        ],
      },
    ],
  },
  {
    id: "cs",
    title: "Cyber Security",
    code: "MCA20408B",
    objective: "The main objective is the process of discovering possible vulnerabilities within a system, application, website. It aims to protect the system from unauthorized access and possible weaknesses within the network infrastructure and helps to improve the configuration of an application.",
    prerequisites: ["Fundamental knowledge of computer Network", "System"],
    outcomes: [
      "CO1: Define and understand the information security basics, then apply them to various penetration testing methods with a focus on network scanning and enumeration.",
      "CO2: Choose and estimate several network attacks by involving several methodologies and simulating those attack techniques to keep the focus on security measures.",
      "CO3: Understand, and employ various types of web server attack methodology along with cloud computing concepts, and analyses these to eliminate the risks and threats related to them."
    ],
    units: [
      {
        id: "cs-u1",
        title: "Module 1: Information Security Basics [9H]",
        topics: [
          { id: "cs-1-1", title: "Elements of information security", status: "not-started", priority: "medium" },
          { id: "cs-1-2", title: "Security challenges", status: "not-started", priority: "medium" },
          { id: "cs-1-3", title: "Hacking concepts", status: "not-started", priority: "medium" },
          { id: "cs-1-4", title: "Phases of hacking", status: "not-started", priority: "medium" },
          { id: "cs-1-5", title: "Vulnerability research", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "cs-u2",
        title: "Module 2: Introduction to Penetration Testing [9H]",
        topics: [
          { id: "cs-2-1", title: "Penetration testing concepts (what, why & how we do pen test)", status: "not-started", priority: "medium" },
          { id: "cs-2-2", title: "Penetration testing methodology", status: "not-started", priority: "medium" },
          { id: "cs-2-3", title: "Types of penetration testing", status: "not-started", priority: "medium" },
          { id: "cs-2-4", title: "Tools and techniques used in penetration testing", status: "not-started", priority: "medium" },
          { id: "cs-2-5", title: "Limitations of penetration testing tools", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "cs-u3",
        title: "Module 3: Network Scanning and Enumeration [9H]",
        topics: [
          { id: "cs-3-1", title: "Network scanning techniques and scanning countermeasures", status: "not-started", priority: "medium" },
          { id: "cs-3-2", title: "Enumeration techniques and enumeration countermeasures", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "cs-u4",
        title: "Module 4: Attacks [9H]",
        topics: [
          { id: "cs-4-1", title: "System hacking methodology & covering tracks", status: "not-started", priority: "medium" },
          { id: "cs-4-2", title: "Different types of Trojans, Trojan analysis, and Trojan Countermeasures", status: "not-started", priority: "medium" },
          { id: "cs-4-3", title: "Working of viruses, Virus analysis, computer worms, and malware analysis", status: "not-started", priority: "medium" },
          { id: "cs-4-4", title: "Packet sniffing techniques and how to defend against sniffing", status: "not-started", priority: "medium" },
          { id: "cs-4-5", title: "Social Engineering techniques, identity theft, and countermeasures", status: "not-started", priority: "medium" },
          { id: "cs-4-6", title: "DoS/DDoS attack techniques, botnets, and countermeasures", status: "not-started", priority: "medium" },
          { id: "cs-4-7", title: "Session hijacking techniques and countermeasures", status: "not-started", priority: "medium" },
        ],
      },
      {
        id: "cs-u5",
        title: "Module 5: Web Server Attacks [9H]",
        topics: [
          { id: "cs-5-1", title: "Different types of web server attacks and methodology", status: "not-started", priority: "medium" },
          { id: "cs-5-2", title: "Case studies on SQL injection attacks and detection tools", status: "not-started", priority: "medium" },
          { id: "cs-5-3", title: "Cloud computing concepts, threats, attacks, and security techniques", status: "not-started", priority: "medium" },
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
