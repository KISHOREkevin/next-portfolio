export interface SystemCommand {
  command: string;
  description: string;
  usage?: string;
  category: "navigation" | "system" | "social" | "tools";
  actionType: "open_app" | "download" | "external" | "terminal_only";
  targetAppId?: string;
  externalUrl?: string;
}

export const systemCommands: SystemCommand[] = [
  {
    command: "about",
    description: "Open Overview (developer background & bio)",
    category: "navigation",
    actionType: "open_app",
    targetAppId: "about"
  },
  {
    command: "projects",
    description: "Browse Project Directory (AI, Full-Stack & Systems)",
    category: "navigation",
    actionType: "open_app",
    targetAppId: "projects"
  },
  {
    command: "experience",
    description: "Review Work Experience & history",
    category: "navigation",
    actionType: "open_app",
    targetAppId: "experience"
  },
  {
    command: "skills",
    description: "Survey Technical Skills & competencies matrix",
    category: "navigation",
    actionType: "open_app",
    targetAppId: "skills"
  },
  {
    command: "terminal",
    description: "Open Interactive Terminal",
    category: "tools",
    actionType: "open_app",
    targetAppId: "terminal"
  },
  {
    command: "files",
    description: "Browse filesystem (/home/kishore)",
    category: "tools",
    actionType: "open_app",
    targetAppId: "files"
  },
  {
    command: "contact",
    description: "Open Contact & Communication application",
    category: "navigation",
    actionType: "open_app",
    targetAppId: "contact"
  },
  {
    command: "resume",
    description: "Open Printable CV / Resume (Experience, Education, Certifications)",
    category: "navigation",
    actionType: "open_app",
    targetAppId: "resume"
  },
  {
    command: "education",
    description: "Review Education (B.Tech IT, TVS School)",
    category: "system",
    actionType: "open_app",
    targetAppId: "resume"
  },
  {
    command: "certifications",
    description: "Review Certifications (AWS, Cisco NDG, Krutanic)",
    category: "system",
    actionType: "open_app",
    targetAppId: "resume"
  },
  {
    command: "stack",
    description: "Display core production technologies",
    category: "system",
    actionType: "terminal_only"
  },
  {
    command: "neofetch",
    description: "Display Workstation specifications and telemetry",
    category: "system",
    actionType: "open_app",
    targetAppId: "system-info"
  },
  {
    command: "github",
    description: "Open GitHub profile in a new tab",
    category: "social",
    actionType: "external",
    externalUrl: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/KISHOREkevin"
  },
  {
    command: "portfolio",
    description: "Open Live Portfolio in a new tab",
    category: "social",
    actionType: "external",
    externalUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://kishorekevin.netlify.app/"
  }
];
