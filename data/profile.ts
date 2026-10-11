export interface ProfileData {
  name: string;
  handle: string;
  title: string;
  shortBio: string;
  motto: string;
  fullBio: string[];
  location: string;
  status: string;
  availableForHire: boolean;
  phone: string;
  email: string;
  portfolio: string;
  github: string;
  systemSpecs: {
    os: string;
    kernel: string;
    shell: string;
    environment: string;
    coreStack: string;
    backendEngine: string;
    aiRuntime: string;
    vectorStore: string;
  };
}

export const profileData: ProfileData = {
  name: "A. KISHORE",
  handle: "kishore",
  title: "Full Stack Developer",
  shortBio: "Building full-stack applications, AI-powered systems, and Linux/open-source tooling.",
  motto: "Clean code, resilient architectures, and continuous learning.",
  fullBio: [
    "I am a Full Stack Developer with production experience engineering resilient web applications, scalable backend microservices, and Applied AI systems.",
    "Currently at Wealwin Technologies, I develop and maintain full-stack client solutions, REST APIs, database migrations, and MT5 trading platform workflows using React.js, Node.js, Fastify, Sequelize, and PostgreSQL. Previously at Hashcodex, I engineered fintech and crypto-neobank applications using the MERN stack.",
    "My technical journey includes building full-stack applications and a collaborative video suite at Shrika Institute, Django APIs at Krutanic Solutions, administering Linux servers, and founding Codex Arch—where I engineered a customized keyboard-centric Linux operating system adopted by 10+ beta testers."
  ],
  location: "Madurai, Tamil Nadu, India",
  status: "Available for Full-Stack & AI Roles",
  availableForHire: true,
  phone: "+91 7904702577",
  email: "kishorekevin3289@gmail.com",
  portfolio: "https://kishorekevin.vercel.app/",
  github: "https://github.com/KISHOREkevin",
  systemSpecs: {
    os: "KishoreOS v3.0 (Linux Developer Workstation)",
    kernel: "Linux 6.8.0-custom-x86_64",
    shell: "zsh 5.9 (x86_64-linux)",
    environment: "Next.js 16 • React 19 • Tailwind CSS v4",
    coreStack: "React • Node.js • Python • FastAPI • AI/LLM • Linux",
    backendEngine: "Fastify / Node.js / Express / Django / FastAPI",
    aiRuntime: "Ollama / LangChain / LangGraph / RAG",
    vectorStore: "Vector Databases / PostgreSQL / MongoDB / Redis"
  }
};
