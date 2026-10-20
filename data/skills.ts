
export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: "Core Production" | "Deep Experience" | "Specialized" | "Proficient";
    highlight?: boolean;
    tag: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    description: "Responsive, accessible, and high-performance user interfaces and client applications.",
    skills: [
      { name: "React", level: "Core Production", highlight: true, tag: "Framework" },
      { name: "JavaScript", level: "Core Production", highlight: true, tag: "Language" },
      { name: "TypeScript", level: "Core Production", highlight: true, tag: "Language" },
      { name: "HTML/CSS", level: "Core Production", highlight: true, tag: "Foundation" },
      { name: "Tailwind", level: "Core Production", highlight: true, tag: "Styling" },
      { name: "Bootstrap", level: "Deep Experience", tag: "Styling" },
      { name: "GTK/Qt", level: "Specialized", highlight: true, tag: "Desktop UI" },
      { name: "React Native", level: "Deep Experience", tag: "Mobile" },
      { name: "Expo", level: "Deep Experience", tag: "Mobile" }
    ]
  },
  {
    id: "backend",
    name: "Backend",
    description: "Scalable APIs, asynchronous services, trading infrastructure, and production server-side architectures.",
    skills: [
      { name: "Node.js", level: "Core Production", highlight: true, tag: "Runtime" },
      { name: "Express", level: "Core Production", highlight: true, tag: "Framework" },
      { name: "Fastify", level: "Core Production", highlight: true, tag: "Framework" },
      { name: "Django", level: "Core Production", highlight: true, tag: "Framework" },
      { name: "FastAPI", level: "Core Production", highlight: true, tag: "Framework" },
      { name: "Rust", level: "Deep Experience", highlight: true, tag: "Systems / Trade Engine" },
      { name: "REST API Development", level: "Core Production", highlight: true, tag: "Architecture" },
      { name: "Sequelize", level: "Core Production", tag: "ORM" },
      { name: "SQLAlchemy", level: "Core Production", tag: "ORM" },
      { name: "Pydantic", level: "Core Production", tag: "Validation" },
      { name: "Async Programming", level: "Core Production", tag: "Concurrency" },
      { name: "FFmpeg", level: "Deep Experience", tag: "Media Processing" },
      { name: "Celery", level: "Deep Experience", tag: "Background Tasks" }
    ]
  },
  {
    id: "databases",
    name: "Databases",
    description: "Relational modeling, document storage, caching, and query optimization.",
    skills: [
      { name: "SQL", level: "Core Production", highlight: true, tag: "Relational" },
      { name: "NoSQL", level: "Core Production", tag: "Database" },
      { name: "MongoDB", level: "Core Production", highlight: true, tag: "Document Store" },
      { name: "PostgreSQL", level: "Core Production", highlight: true, tag: "Relational" },
      { name: "Redis", level: "Deep Experience", highlight: true, tag: "In-Memory / Cache" }
    ]
  },
  {
    id: "ai",
    name: "AI / LLM",
    description: "Applied artificial intelligence, retrieval pipelines, local inference, and agentic workflows.",
    skills: [
      { name: "Large Language Models (LLMs)", level: "Core Production", highlight: true, tag: "LLMs" },
      { name: "Retrieval-Augmented Generation (RAG)", level: "Core Production", highlight: true, tag: "Architecture" },
      { name: "LangChain", level: "Core Production", highlight: true, tag: "Orchestration" },
      { name: "LangGraph", level: "Specialized", tag: "Agent Workflows" },
      { name: "Ollama", level: "Core Production", highlight: true, tag: "Inference" },
      { name: "Local LLMs", level: "Core Production", highlight: true, tag: "Systems" },
      { name: "Embeddings", level: "Core Production", tag: "NLP" },
      { name: "Vector Databases", level: "Core Production", highlight: true, tag: "Storage" },
      { name: "Semantic Search", level: "Core Production", tag: "Information Retrieval" },
      { name: "Prompt Engineering", level: "Core Production", tag: "Methodology" },
      { name: "AI Agents / Agentic AI", level: "Deep Experience", highlight: true, tag: "Autonomous" }
    ]
  },
  {
    id: "blockchain",
    name: "Blockchain & Trading",
    description: "Blockchain wallet integration, transaction monitoring, and trading platform workflows.",
    skills: [
      { name: "Ethers.js", level: "Deep Experience", highlight: true, tag: "Blockchain Library" },
      { name: "Blockchain Integration", level: "Deep Experience", highlight: true, tag: "Web3" },
      { name: "Alchemy", level: "Deep Experience", tag: "Webhooks / Monitoring" },
      { name: "Cryptocurrency Deposits & Withdrawals", level: "Deep Experience", highlight: true, tag: "Transaction Workflows" },
      { name: "Order Book Management", level: "Deep Experience", tag: "Trading Systems" },
      { name: "Trade Execution", level: "Deep Experience", tag: "Trading Systems" },
      { name: "MT5 / MetaTrader Integration", level: "Deep Experience", tag: "Trading Integration" }
    ]
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    description: "Containerization, cloud infrastructure, version control, and Linux systems.",
    skills: [
      { name: "Docker", level: "Core Production", highlight: true, tag: "Containerization" },
      { name: "AWS", level: "Core Production", highlight: true, tag: "Cloud / EC2 / Deployments" },
      { name: "Git", level: "Core Production", highlight: true, tag: "Version Control" },
      { name: "GitHub", level: "Core Production", highlight: true, tag: "Collaboration" },
      { name: "Linux", level: "Core Production", highlight: true, tag: "OS / Shell" },
      { name: "Bash Scripting", level: "Core Production", highlight: true, tag: "Automation" },
      { name: "Cloudinary", level: "Deep Experience", tag: "Media Storage" },
      { name: "CI/CD", level: "Deep Experience", tag: "Deployment Automation" }
    ]
  },
  {
    id: "systems",
    name: "Systems",
    description: "Networking, operating systems, cloud backends, and system architecture.",
    skills: [
      { name: "Networks", level: "Deep Experience", tag: "Infrastructure" },
      { name: "Firebase", level: "Deep Experience", tag: "BaaS" },
      { name: "Appwrite", level: "Proficient", tag: "BaaS" },
      { name: "Supabase", level: "Deep Experience", tag: "BaaS" },
      { name: "Cloud Computing", level: "Deep Experience", tag: "Architecture" },
      { name: "System Design", level: "Deep Experience", highlight: true, tag: "Architecture" },
      { name: "Operating Systems", level: "Core Production", highlight: true, tag: "Systems" },
      { name: "Qtile", level: "Deep Experience", tag: "Linux Window Manager" },
      { name: "Neovim", level: "Deep Experience", tag: "Developer Tooling" },
      { name: "SSH / SFTP", level: "Deep Experience", tag: "Remote Administration" }
    ]
  },
  {
    id: "languages",
    name: "Programming Languages",
    description: "Languages used across web development, AI applications, automation, and systems programming.",
    skills: [
      { name: "Python", level: "Core Production", highlight: true, tag: "Backend / AI" },
      { name: "JavaScript", level: "Core Production", highlight: true, tag: "Web / Runtime" },
      { name: "Rust", level: "Deep Experience", highlight: true, tag: "Systems / Trading" },
      { name: "C", level: "Deep Experience", tag: "Systems" },
      { name: "Java", level: "Proficient", tag: "Object-Oriented" },
      { name: "Lua", level: "Specialized", tag: "Scripting / Config" }
    ]
  },
  {
    id: "problem_solving",
    name: "Problem Solving",
    description: "Algorithmic thinking, data structures, debugging, and computational optimization.",
    skills: [
      { name: "Data Structures", level: "Core Production", highlight: true, tag: "Computer Science" },
      { name: "Algorithms", level: "Core Production", highlight: true, tag: "Computer Science" },
      { name: "Competitive Programming", level: "Deep Experience", tag: "Problem Solving" },
      { name: "Production Debugging", level: "Core Production", highlight: true, tag: "Troubleshooting" },
      { name: "Performance Optimization", level: "Deep Experience", tag: "Optimization" }
    ]
  },
  {
    id: "soft_skills",
    name: "Soft Skills",
    description: "Professional collaboration, engineering discipline, and technical communication.",
    skills: [
      { name: "Communication", level: "Core Production", tag: "Interpersonal" },
      { name: "Collaboration", level: "Core Production", tag: "Teamwork" },
      { name: "Problem Solving", level: "Core Production", highlight: true, tag: "Analytical" },
      { name: "Troubleshooting", level: "Core Production", highlight: true, tag: "Engineering" },
      { name: "Documentation", level: "Core Production", tag: "Engineering" },
      { name: "Teamwork", level: "Core Production", tag: "Interpersonal" },
      { name: "Adaptability", level: "Core Production", tag: "Agile" },
      { name: "Public Speaking", level: "Deep Experience", tag: "Community" },
      { name: "Strategic Thinking", level: "Deep Experience", tag: "Leadership" }
    ]
  }
];
