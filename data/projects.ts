
export interface ProjectItem {
  id: string;
  title: string;
  category:
    | "AI / LLM"
    | "Full-Stack"
    | "Systems & Tools"
    | "FinTech / Trading"
    | "Full-Stack / Marketplace"
    | "FinTech / Trading Infrastructure";
  badge: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  keyConcepts: string[];
  architecturePoints: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPlaceholderLinks: boolean;
}

export const projectsData: ProjectItem[] = [
  // ==========================================
  // EXISTING PERSONAL PROJECTS — PRESERVED
  // ==========================================
  // ==========================================
  // HASHCODEX — COMPANY PROJECT
  // ==========================================
  {
    id: "bitget-trading",
    title: "Bitget — Trading Module",
    category: "FinTech / Trading",
    badge: "Hashcodex / Chart Integration / Order Lifecycle",
    shortDescription:
      "Trading module connecting chart-based trading workflows with order matching, execution, and order-closing operations.",
    fullDescription:
      "Worked on the Bitget project at Hashcodex, contributing to its trading module. Worked on integrating trading charts with the application and connecting chart interactions to trading workflows. Contributed to order matching, execution-related flows, and order-closing functionality, helping connect the trading interface with the underlying order-management logic.",
    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Trading APIs",
      "Chart Integration",
      "Order Management",
    ],
    keyConcepts: [
      "Trading chart integration",
      "Chart-to-order workflow integration",
      "Order matching workflows",
      "Order execution lifecycle",
      "Order closing and status updates",
      "Frontend and backend trading integration",
    ],
    architecturePoints: [
      "The trading interface connects chart-related interactions with application trading workflows.",
      "Order-management logic supports matching and order lifecycle operations.",
      "Application integrations connect trading requests with relevant backend functionality.",
      "Order status changes are reflected in the corresponding application workflows.",
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    isPlaceholderLinks: true,
  },

  // ==========================================
  // WEALWIN TECHNOLOGIES — COMPANY PROJECTS
  // ==========================================
  {
    id: "finowiz",
    title: "Finowiz — MT5 Trading Platform",
    category: "FinTech / Trading",
    badge: "MERN / MT5 / Copy Trading / Commissions",
    shortDescription:
      "Third-party MT5-integrated trading platform featuring copy trading, affiliate workflows, commission distribution, microservices, and authenticated multi-vendor APIs.",
    fullDescription:
      "Contributed to Finowiz, a trading platform built with the MERN stack and integrated with MetaTrader 5 (MT5). Worked on copy-trading functionality, commission management, affiliate-related copy trading, and commission distribution workflows. Contributed to microservices integration and resolved issues reported by live users. Also developed multi-vendor API functionality with API-key and signature-based authentication to support authenticated integrations with external vendors.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "MERN Stack",
      "MetaTrader 5",
      "Third-Party APIs",
      "Microservices",
      "API Key Authentication",
      "Signature-Based Authentication",
    ],
    keyConcepts: [
      "MetaTrader 5 third-party trading integration",
      "Copy-trading workflows",
      "Commission management and distribution",
      "Affiliate copy-trading functionality",
      "Microservices integration",
      "Multi-vendor API development",
      "API-key authentication",
      "Request signature verification",
      "Live-user issue investigation and resolution",
    ],
    architecturePoints: [
      "The MERN application integrates with MT5 for trading-related functionality.",
      "Copy-trading workflows coordinate trade-related operations across connected accounts.",
      "Commission management handles commission-related business logic and distribution.",
      "Affiliate workflows connect copy-trading relationships with commission operations.",
      "Microservices integrate separate platform capabilities.",
      "Multi-vendor APIs authenticate requests using API keys and signatures.",
      "Production issue resolution addresses problems reported by live platform users.",
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    isPlaceholderLinks: true,
  },

  {
    id: "metiers",
    title: "Metiers — Multi-Provider Service Marketplace",
    category: "Full-Stack / Marketplace",
    badge: "Fastify / Sequelize / PostgreSQL",
    shortDescription:
      "Service marketplace that lets customers order services from multiple providers across cleaning, gardening, plumbing, and other categories.",
    fullDescription:
      "Contributed to Metiers, a multi-provider service marketplace designed to connect customers with service providers offering cleaning, gardening, plumbing, and other services. Developed backend functionality using Node.js, Fastify, Sequelize, and PostgreSQL, working on API development, relational data operations, and the backend workflows required to support a service marketplace.",
    technologies: [
      "Node.js",
      "Fastify",
      "Sequelize",
      "PostgreSQL",
      "SQL",
      "REST APIs",
      "JavaScript",
    ],
    keyConcepts: [
      "Multi-provider service marketplace",
      "Service discovery and ordering",
      "Provider-oriented business workflows",
      "REST API development with Fastify",
      "Relational database modeling",
      "ORM-based database operations with Sequelize",
      "PostgreSQL integration",
    ],
    architecturePoints: [
      "Fastify provides the backend API layer for marketplace operations.",
      "Sequelize manages relational models and database interactions.",
      "PostgreSQL stores structured marketplace data.",
      "API endpoints support service-related operations and customer orders.",
      "Backend modules organize marketplace business logic and persistence.",
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    isPlaceholderLinks: true,
  },

  {
    id: "regulus",
    title: "Regulus — Trading Platform",
    category: "FinTech / Trading Infrastructure",
    badge: "Python / FastAPI / MT5 / NTrader",
    shortDescription:
      "Trading platform built with FastAPI and PostgreSQL, initially integrated with MT5 and later transitioned to NTrader.",
    fullDescription:
      "Contributed to Regulus, a trading platform built using Python, FastAPI, PostgreSQL, and SQLAlchemy. Worked on a trading architecture initially integrated with the MT5 third-party platform through microservices. The trading integration was later switched from MT5 to NTrader. Contributed to backend services and integrations supporting the platform's trading workflows.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "REST APIs",
      "Microservices",
      "MetaTrader 5",
      "NTrader",
    ],
    keyConcepts: [
      "Trading platform backend development",
      "MT5 third-party integration",
      "Transition from MT5 to NTrader",
      "Microservices integration",
      "FastAPI endpoint development",
      "PostgreSQL persistence",
      "SQLAlchemy ORM",
      "Trading workflow coordination",
    ],
    architecturePoints: [
      "FastAPI provides backend endpoints for platform functionality.",
      "SQLAlchemy manages relational data access and persistence in PostgreSQL.",
      "The initial trading integration connected the platform to MT5.",
      "The third-party trading integration was subsequently switched to NTrader.",
      "Microservices connect the relevant trading components and backend responsibilities.",
      "Backend services coordinate application workflows with the configured trading integration.",
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    isPlaceholderLinks: true,
  },

  {
    id: "regulus-liquidity",
    title: "Regulus Liquidity — Trade Processing System",
    category: "FinTech / Trading Infrastructure",
    badge: "Queues / Workers / Concurrent Trading",
    shortDescription:
      "Liquidity infrastructure using queues and background workers to handle trade-closing and trade-filling operations for multiple users.",
    fullDescription:
      "Worked on Regulus Liquidity, the liquidity-focused component of the Regulus trading ecosystem. Contributed to queue-based processing and background workers designed to handle trade-closing and trade-filling operations for multiple users. The asynchronous processing approach helps move trade operations out of the immediate request path and supports the handling of multiple trading tasks.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Queues",
      "Background Workers",
      "Asynchronous Processing",
      "Microservices",
      "Trading Infrastructure",
    ],
    keyConcepts: [
      "Liquidity and trade-processing infrastructure",
      "Queue-based task processing",
      "Background worker implementation",
      "Trade-closing workflows",
      "Trade-filling workflows",
      "Concurrent operations across multiple users",
      "Asynchronous backend processing",
    ],
    architecturePoints: [
      "Backend services coordinate liquidity-related trading operations.",
      "Queues organize trade-processing tasks for asynchronous execution.",
      "Background workers process trade-closing and trade-filling operations.",
      "Multiple users' trading tasks can be handled through queued workflows.",
      "Asynchronous processing reduces the need to perform all work within a single synchronous request.",
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    isPlaceholderLinks: true,
  },

  {
    id: "broking-bridge",
    title: "Broking Bridge — Trading Infrastructure",
    category: "FinTech / Trading Infrastructure",
    badge: "FastAPI / PostgreSQL / Liquidity",
    shortDescription:
      "Broking and liquidity infrastructure following an architecture similar to Regulus Liquidity for coordinating trading operations.",
    fullDescription:
      "Contributed to Broking Bridge, a trading infrastructure project with an architecture and functionality similar to Regulus Liquidity. Worked within backend services supporting broking, liquidity-related integrations, and trade-processing workflows. The system follows a similar architectural approach to Regulus Liquidity, focusing on coordinating trading operations across connected components.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "REST APIs",
      "Microservices",
      "Trading Integrations",
      "Liquidity Systems",
      "Trade Processing",
    ],
    keyConcepts: [
      "Broking and liquidity workflows",
      "Trading component integration",
      "Backend API development",
      "Trade-processing coordination",
      "Relational data persistence",
      "Architecture similar to Regulus Liquidity",
    ],
    architecturePoints: [
      "Backend API services coordinate broking and liquidity-related workflows.",
      "Trading integration components connect relevant platform services.",
      "Trade-processing workflows coordinate operations across connected components.",
      "The overall architecture follows an approach similar to Regulus Liquidity.",
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    isPlaceholderLinks: true,
  },
  {
    id: "job-matcher",
    title: "AI-Powered Job Matching System",
    category: "AI / LLM",
    badge: "AI / RAG / Developer Tool",
    shortDescription:
      "Production-oriented RAG job matching platform using Python, LangChain, Ollama, vector database, and semantic similarity search.",
    fullDescription:
      "Built a production-oriented RAG-based job matching system using Python, LangChain, Ollama, embeddings, and a vector database. Implemented document processing and resume parsing to extract structured candidate data. Used embeddings and semantic similarity search to retrieve relevant job listings for a given profile. Implemented job ingestion, data cleaning, normalization, deduplication, vector storage, and retrieval pipelines. Ran local LLMs via Ollama and implemented structured LLM outputs to power AI-based job matching.",
    technologies: [
      "Python",
      "LangChain",
      "Ollama",
      "LLMs",
      "Embeddings",
      "Vector Database",
      "RAG",
      "Semantic Search",
    ],
    keyConcepts: [
      "Resume parsing and structured candidate data extraction",
      "Semantic similarity search via vector embeddings",
      "Job ingestion, normalization, and deduplication pipeline",
      "Local LLM inference via Ollama for privacy and offline execution",
      "Retrieval-Augmented Generation (RAG) for contextual evaluation",
      "Structured LLM outputs for candidate-job alignment",
    ],
    architecturePoints: [
      "Document ingestion parses candidate resumes into structured schema representations.",
      "Vector embeddings are generated and stored in a vector collection.",
      "Semantic retrieval matches candidate profiles against job requirements.",
      "Local LLMs orchestrated via LangChain evaluate contextual alignment and generate structured match results.",
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false,
  },

  {
    id: "codex-arch",
    title: "Customized Operating System — Codex Arch",
    category: "Systems & Tools",
    badge: "Linux / Systems / Open Source",
    shortDescription:
      "Minimal keyboard-centric Linux OS built with Qtile, Bash, and Python, adopted by 10+ beta testers with automated update scripts.",
    fullDescription:
      "Created a keyboard-centric, minimal OS with Qtile, Bash, and Python. Adopted as the primary OS by 10+ beta testers. Automated system updates via shell scripts, reducing manual maintenance time by 40%. Engineered system-wide dotfiles for Linux. Scripted volume and brightness controls and Neovim IDE setup. Built keyboard-centric workflows using Qtile. Integrated 20+ open-source tools, including Rofi and Picom. Built custom Music Player and Pomodoro Timer tools using Python, GTK, and Qt. Automated configuration synchronization via Git, reducing setup time from hours to under 5 minutes for new deployments.",
    technologies: [
      "Linux",
      "Qtile",
      "Python",
      "Bash",
      "GTK",
      "Qt",
      "Neovim",
      "Rofi",
      "Picom",
      "Git",
    ],
    keyConcepts: [
      "Adopted as the primary OS by 10+ beta testers",
      "Automated updates reducing manual maintenance by 40%",
      "System-wide Linux dotfiles and Neovim configuration",
      "Keyboard-centric tiling workflows with Qtile",
      "Integration of 20+ open-source tools",
      "Custom GTK and Qt applications",
      "Git-based setup automation reducing deployment setup to under 5 minutes",
    ],
    architecturePoints: [
      "Qtile handles dynamic tiling, keyboard shortcuts, and desktop widgets.",
      "Modular shell scripts automate updates, package synchronization, and system maintenance.",
      "GTK and Qt provide lightweight desktop applications.",
      "A centralized dotfile repository with Git bootstrapping simplifies fresh installations.",
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false,
  },

  {
    id: "ffmpeg-suite",
    title: "FFmpeg Video Converter Suite",
    category: "Full-Stack",
    badge: "Video Processing / Backend / DevOps",
    shortDescription:
      "Multi-feature video suite handling 100+ concurrent operations daily, with parallel processing and Docker-based optimization.",
    fullDescription:
      "Built a multi-feature video processing tool with 8+ functions, including conversion, compression, GIF creation, and media extraction, using FFmpeg and Node.js. Designed to handle 100+ concurrent operations daily. Optimized performance through parallel processing and Docker containerization, reducing resource usage through more efficient processing workflows.",
    technologies: [
      "FFmpeg",
      "Node.js",
      "Docker",
      "Parallel Processing",
      "JavaScript",
      "Backend",
    ],
    keyConcepts: [
      "Multiple media operations including conversion and compression",
      "Concurrent media-processing workflows",
      "Parallel processing pipelines",
      "Docker containerization",
      "Resource-aware processing",
    ],
    architecturePoints: [
      "Node.js orchestrates media-processing operations.",
      "FFmpeg handles video and audio transformations.",
      "Parallel processing enables multiple media jobs to run efficiently.",
      "Docker provides a consistent runtime environment.",
      "Processing workloads are organized to reduce resource contention.",
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false,
  },

  {
    id: "echo-transcription",
    title: "Audio Transcription Application — Echo",
    category: "AI / LLM",
    badge: "AI / Audio / Backend",
    shortDescription:
      "AI speech-to-text application using AssemblyAI, Cloudinary, Redis, and Celery for asynchronous transcription workflows.",
    fullDescription:
      "Integrated the AssemblyAI speech-to-text API for multilingual transcription. Used Cloudinary for audio asset storage and Django for backend processing. Implemented asynchronous Celery tasks and Redis-based coordination to improve transcription job handling and reduce queue waiting times.",
    technologies: [
      "Django",
      "AssemblyAI",
      "Redis",
      "Celery",
      "Cloudinary",
      "Speech-to-Text",
      "Python",
      "AI/ML",
    ],
    keyConcepts: [
      "Speech-to-text API integration",
      "Multilingual transcription workflows",
      "Audio asset storage and processing",
      "Asynchronous task execution with Celery",
      "Redis-based task coordination and status management",
    ],
    architecturePoints: [
      "Django REST APIs coordinate audio uploads and transcription requests.",
      "Cloudinary manages uploaded audio assets.",
      "Celery workers process transcription jobs asynchronously.",
      "Redis supports background-task coordination and fast status lookups.",
      "AssemblyAI performs speech-to-text processing.",
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false,
  },

  {
    id: "career-cart",
    title: "Job Portal Management System — Career Cart",
    category: "Full-Stack",
    badge: "Full Stack / SaaS / Job Platform",
    shortDescription:
      "MERN job portal with employer job management, application tracking, JWT authentication, and AWS deployment.",
    fullDescription:
      "Developed a full-stack job portal management system using the MERN stack. Enabled employers to post jobs and track applications. Implemented JWT authentication and role-based access. Optimized MongoDB queries and React rendering to improve application performance. Deployed on AWS EC2 with CI/CD workflows.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "AWS EC2",
      "CI/CD",
      "MERN Stack",
    ],
    keyConcepts: [
      "Job posting and application tracking",
      "JWT authentication and role-based authorization",
      "MongoDB query optimization",
      "Optimized React rendering",
      "AWS deployment and CI/CD",
      "Employer and applicant dashboards",
    ],
    architecturePoints: [
      "React provides the employer and applicant interfaces.",
      "Express handles REST APIs, authentication, and authorization middleware.",
      "MongoDB stores job postings, user information, and application records.",
      "AWS EC2 hosts the deployed application.",
      "CI/CD workflows streamline application deployment.",
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false,
  },

  
];
