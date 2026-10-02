export const profile = {
  name: "Mork Sathim",
  role: "Full-Stack Developer",
  availability: "Available for new projects",
  description:
    "Specializing in building robust backend architectures (Spring Boot, Next.js server pipelines, microservices) and clean, high-performance responsive frontend interfaces and native iOS apps.",
  stats: [
    { label: "Years Exp", value: "2+", colorClass: "text-emerald-400" },
    { label: "Projects Built", value: "12+", colorClass: "text-cyan-400" },
    { label: "Languages", value: "4", colorClass: "text-violet-300" },
  ],
  coreStackLabel: "Core Stack",
  coreStack: "Next.js + Spring + Swift",
  avatarSrc: "/images/profile.jpg",
};

export type Project = {
  statusLabel: string;
  statusVariant: "active" | "production";
  group: string;
  rightTag: string;
  title: string;
  description: string;
  role: { heading: string; text: string }[];
  highlightTags: string[];
  mutedTags: string[];
  actions: { label: string; variant: "primary" | "outline" | "ghost" }[];
};

export const projects: Project[] = [
  {
    statusLabel: "Active / Team Project",
    statusVariant: "active",
    group: "KSHRD Project",
    rightTag: "Live Sync",
    title: "RAG Craft",
    description:
      "Enterprise multimodal Retrieval-Augmented Generation (RAG) platform crafted with a collaborative engineering team. Microservices architecture driven by Spring Boot backends, responsive Next.js frontend web platform, and native mobile clients in Swift (iOS) and Kotlin (Android / AOS).",
    role: [
      {
        heading: "My Role & Responsibilities:",
        text: "Architected Spring Boot microservices backend infrastructure, API gateways, Next.js frontend web interface, and native iOS client in Swift.",
      },
      {
        heading: "Team Collaboration:",
        text: "AOS (Android) app engineered in Kotlin by Android team engineer.",
      },
    ],
    highlightTags: ["Spring Boot (Microservices)", "Next.js (Frontend)", "Swift (iOS)"],
    mutedTags: ["Kotlin (AOS - Team)", "Python / RAG", "Vector DB", "REST / WebSocket"],
    actions: [
      { label: "View Architecture", variant: "primary" },
      { label: "Team Workspace", variant: "outline" },
      { label: "Repo", variant: "ghost" },
    ],
  },
  {
    statusLabel: "Production",
    statusVariant: "production",
    group: "KSHRD Project",
    rightTag: "Full-Stack",
    title: "HRD EventHub",
    description:
      "Full-stack ticketing & event discovery platform engineered with responsive Next.js frontend, secure Spring Boot, PostgreSQL, Docker containers, and high-speed Redis session caching. Supports concurrent ticket reservation and dynamic QR passes.",
    role: [
      {
        heading: "Role:",
        text: "Frontend Developer & UI Architect (Next.js & ShadCN).",
      },
    ],
    highlightTags: ["Next.js", "Spring Boot", "PostgreSQL", "Docker", "Redis"],
    mutedTags: [],
    actions: [
      { label: "Live Demo", variant: "primary" },
      { label: "Source Repo", variant: "outline" },
    ],
  },
];

export type SkillGroup = {
  icon: "server" | "monitor" | "smartphone" | "brain";
  title: string;
  description: string;
  tags: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    icon: "server",
    title: "Backend & Cloud",
    description: "High-scale transactional backends & relational data stores.",
    tags: ["Java & Spring Boot", "PostgreSQL & Redis", "Spring Cloud & REST", "Docker Containers"],
  },
  {
    icon: "monitor",
    title: "Frontend & UI",
    description: "Pixel-crafted interfaces with type-safe state hydration.",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui Design", "React & TS", "WebSocket"],
  },
  {
    icon: "smartphone",
    title: "Mobile Engineering",
    description: "Cross-platform client solutions and native iOS builds.",
    tags: ["Swift (Native iOS)", "SwiftUI & Combine", "Flutter & Dart", "Mobile UI State", "WebSocket"],
  },
  {
    icon: "brain",
    title: "AI & Tooling",
    description: "RAG pipelines, local LLMs, and CI workflows.",
    tags: ["RAG", "Ollama Local LLM", "Embeddings Pipelines", "Python Scripting"],
  },
];

export const experience = [
  {
    period: "Present",
    tag: "Team Project",
    title: "RAG Craft",
    subtitle: "Core Backend & iOS Engineer",
    description:
      "Engineered Spring Boot microservices backend architecture, Next.js frontend client, and native Swift iOS app in close collaboration with the team's Kotlin AOS engineer.",
  },
  {
    period: "April, 2026",
    tag: "Frontend Team",
    title: "HRD EventHub",
    subtitle: "Frontend Developer & UI Architect",
    description:
      "Spearheaded responsive Next.js frontend development with Tailwind CSS, shadcn/ui components, and real-time ticketing state integration.",
  },
  {
    period: "2021 - 2026",
    tag: "Instructional",
    title: "Language & Tech Instructor",
    subtitle: "Chinese Language Teacher & Tutor",
    description:
      "Multi-year daily instruction in spoken and written Mandarin Chinese.",
  },
];

export const education = [
  {
    tag: "Graduated",
    title: "Royal University of Phnom Penh (RUPP)",
    subtitle: "Bachelor of Computer Science",
    description:
      "Focused on core computer science, algorithm design, software architecture, and relational systems.",
  },
  {
    tag: "Intensive Program",
    title: "Korean Software HRD Center (KSHRD)",
    subtitle: "Basic & Advanced Course",
    description:
      "Full-stack curriculum: Spring Boot microservices, Next.js, Docker orchestration, Swift iOS, and AI engineering.",
  },
];

export const languages = [
  { name: "Khmer", level: "Native", percent: 100 },
  { name: "Chinese", level: "Fluent / Instructor", percent: 85 },
  { name: "English", level: "Pre-Intermediate", percent: 40 },
  { name: "Korean", level: "TOPIK 1B Certified", percent: 30 },
];

export type ContactMethod = {
  icon: "mail" | "send" | "linkedin" | "github" | "facebook";
  label: string;
  handle: string;
  description: string;
  actionLabel: string;
  href: string;
};

export const contactMethods: ContactMethod[] = [
  {
    icon: "mail",
    label: "Gmail",
    handle: "sathim.dev@gmail.com",
    description: "Direct & project inquiries, client collaboration",
    actionLabel: "Send an Email",
    href: "mailto:sathim35@gmail.com",
  },
  {
    icon: "send",
    label: "Telegram",
    handle: "@sathim",
    description: "Instant messaging, quick syncs & dev updates",
    actionLabel: "Open Chat",
    href: "https://t.me/MST_Tim",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    handle: "Mork Sathim",
    description: "Professional career network & endorsements",
    actionLabel: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/mork-sathim-537962264",
  },
  {
    icon: "github",
    label: "GitHub",
    handle: "@Sathimmo",
    description: "Public repositories, microservices code & OSS",
    actionLabel: "Explore Repositories",
    href: "https://github.com/Sathimmo",
  },
  {
    icon: "facebook",
    label: "Facebook",
    handle: "Mork Sathim",
    description: "Community activities, developer events & social updates",
    actionLabel: "Visit Profile",
    href: "https://www.facebook.com/sathim.smt2/",
  },
];

export const footer = {
  initials: "MS",
  credit: "Designed & Built by Mork Sathim",
  stack: "Next.js 14 • Swift • Spring Boot • Tailwind CSS",
};
