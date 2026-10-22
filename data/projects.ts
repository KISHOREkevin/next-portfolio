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
  // 1: FINOWIZ — LIVE MT5 TRADING PLATFORM
  // ==========================================
  {
    id: "finowiz",
    title: "Finowiz — MT5 Trading Platform",
    category: "FinTech / Trading",
    badge: "MERN / MT5 / Copy Trading / Commissions",
    shortDescription:
      "Third-party MT5-integrated trading platform featuring copy trading, affiliate workflows, commission distribution, microservices, and authenticated multi-vendor APIs.",
    fullDescription:
      "Contributed to Finowiz, a live trading platform built with the MERN stack and integrated with MetaTrader 5 (MT5). Worked on copy-trading functionality, commission management, affiliate-related copy trading, and commission distribution workflows. Contributed to microservices integration and resolved issues reported by live users. Also developed multi-vendor API functionality with API-key and signature-based authentication to support authenticated integrations with external vendors.",
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
    liveUrl: "https://www.finowizprime.com/",
    isPlaceholderLinks: true,
  },

  // ==========================================
  // 2: REGULUS — TRADING PLATFORM & PAYMENTS
  // ==========================================
  {
    id: "regulus",
    title: "Regulus — Trading Platform",
    category: "FinTech / Trading Infrastructure",
    badge: "Python / FastAPI / MT5 / NTrader / Payment Gateways",
    shortDescription:
      "Trading platform built with FastAPI and PostgreSQL, featuring MT5 and NTrader integration, alongside multi-gateway payment processing via Rozapay, Smilepay, Letknowpay, and Unipayment.",
    fullDescription:
      "Contributed to Regulus, a comprehensive trading platform engineered with Python, FastAPI, PostgreSQL, and SQLAlchemy. Developed backend services coordinating trading integrations, initially connecting with MetaTrader 5 (MT5) through microservices and later transitioning to NTrader. Built secure deposit, withdrawal, and transaction reconciliation workflows integrating multiple third-party payment gateways, including Rozapay (custom fiat gateway, not Razorpay), Smilepay, Letknowpay, and Unipayment, complete with signature validation, automated webhook handlers, and merchant account settlement.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Payment Gateways",
      "Rozapay",
      "Smilepay",
      "Letknowpay",
      "Unipayment",
      "MetaTrader 5",
      "NTrader",
      "REST APIs",
      "Microservices",
    ],
    keyConcepts: [
      "Multi-gateway payment integration (Rozapay, Smilepay, Letknowpay, Unipayment)",
      "Deposit and withdrawal transaction reconciliation",
      "Automated payment webhook handlers and signature validation",
      "Trading platform backend development with FastAPI",
      "MT5 third-party integration and transition to NTrader",
      "Relational schema persistence with SQLAlchemy and PostgreSQL",
      "Microservices coordination for trading accounts",
    ],
    architecturePoints: [
      "FastAPI provides asynchronous backend REST endpoints for platform functionality.",
      "Payment gateway integration modules interface with Rozapay, Smilepay, Letknowpay, and Unipayment for deposit and withdrawal pipelines.",
      "Automated webhook handlers process payment confirmation callbacks and verify cryptographic signatures.",
      "SQLAlchemy manages relational data access and persistence in PostgreSQL.",
      "The initial trading integration connected the platform to MT5 and was subsequently switched to NTrader.",
      "Microservices connect trading components, payment processors, and backend account services.",
    ],
    githubUrl: undefined,
    liveUrl: "https://app.regulus.org/",
    isPlaceholderLinks: true,
  },

  // ==========================================
  // 3: DOPAMINE — TRADING PLATFORM & PAYMENTS
  // ==========================================
  {
    id: "dopamine-trading",
    title: "Dopamine — Trading Platform",
    category: "FinTech / Trading Infrastructure",
    badge: "Rust Trade Engine / Web3 / Multi-Gateway Payments",
    shortDescription:
      "Trading platform featuring a Rust-powered trade engine and order book, Node.js APIs, blockchain wallet tracking via Ethers.js and Alchemy, and multi-gateway payment processing with Rozapay, Smilepay, Letknowpay, and Unipayment.",
    fullDescription:
      "Dopamine is an internal product of Wealwin Technologies developed with core trading infrastructure engineered from scratch. The platform uses Rust for the high-throughput trade engine, order book management, and trade execution, with Node.js, Express, and MongoDB managing APIs and platform services. Contributed to core deposit and withdrawal infrastructure, implementing multi-currency payment gateway integrations with Rozapay (custom fiat gateway, not Razorpay), Smilepay, Letknowpay, and Unipayment, alongside blockchain wallet integrations via Ethers.js and Alchemy webhooks for real-time transaction monitoring and automated ledger reconciliation.",
    technologies: [
      "Rust",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Payment Gateways",
      "Rozapay",
      "Smilepay",
      "Letknowpay",
      "Unipayment",
      "Ethers.js",
      "Alchemy",
      "Blockchain Integration",
      "Trading Systems",
    ],
    keyConcepts: [
      "High-throughput Rust trade engine architecture",
      "Order book management and trade execution",
      "Multi-gateway payment processing (Rozapay, Smilepay, Letknowpay, Unipayment)",
      "Cryptocurrency and fiat deposit and withdrawal workflows",
      "Blockchain wallet communication via Ethers.js",
      "Alchemy webhooks and real-time on-chain transaction monitoring",
      "REST API development and transaction ledgering in MongoDB",
      "Automated webhook verification and balance reconciliation",
    ],
    architecturePoints: [
      "The trade engine is engineered with Rust for low-latency order matching and order book management.",
      "Payment gateway integration modules interface with Rozapay, Smilepay, Letknowpay, and Unipayment for deposit and withdrawal pipelines.",
      "Blockchain integration service utilizes Ethers.js and Alchemy webhooks to track cryptocurrency transactions on-chain.",
      "Node.js and Express manage secure client APIs, transaction status polling, and balance adjustments in MongoDB.",
      "Automated webhook verification handles payment confirmation callbacks and cryptographic signatures.",
    ],
    githubUrl: undefined,
    liveUrl: undefined,
    isPlaceholderLinks: true,
  },

  // ==========================================
  // 4: AI-POWERED JOB MATCHING SYSTEM
  // ==========================================
  {
    id: "job-matcher",
    title: "AI-Powered Job Matching System",
    category: "AI / LLM",
    badge: "Python / LangChain / Ollama / Vector DB / RAG",
    shortDescription:
      "Production-oriented candidate evaluation system using RAG, local LLM inference via Ollama, LangChain, and vector embeddings for semantic candidate-job matching.",
    fullDescription:
      "Engineered an automated job matching system utilizing Retrieval-Augmented Generation (RAG) and local Large Language Models via Ollama. The pipeline ingests unstructured resumes and job descriptions, normalizes and deduplicates the text, and stores dense vector embeddings in a vector database. LangChain orchestrates semantic similarity search and queries local LLMs to evaluate candidate-job fit, returning structured scoring, skills gap analysis, and interview recommendation insights with zero cloud API inference costs.",
    technologies: [
      "Python",
      "LangChain",
      "Ollama",
      "Vector Databases",
      "Retrieval-Augmented Generation (RAG)",
      "Local LLMs",
      "Semantic Search",
      "Embeddings",
      "FastAPI",
    ],
    keyConcepts: [
      "Retrieval-Augmented Generation (RAG) architecture",
      "Local LLM inference via Ollama for zero-cost evaluation",
      "Vector similarity search and dense embeddings",
      "Document ingestion, normalization, and deduplication",
      "LangChain pipeline orchestration and prompt engineering",
      "Structured JSON extraction from unstructured text",
    ],
    architecturePoints: [
      "Document ingestion module processes PDF/text resumes and job specifications.",
      "Embedding model generates dense vector representations stored in a vector index.",
      "Semantic search retrieves the most relevant candidates based on cosine similarity.",
      "Ollama runs local inference (Llama/Mistral) for candidate evaluation and scoring.",
      "LangChain coordinates prompt templates, memory, and output validation parsers.",
    ],
    githubUrl: "https://github.com/KISHOREkevin/job-matcher",
    liveUrl: undefined,
    isPlaceholderLinks: false,
  },

  // ==========================================
  // 5: CODEX ARCH — CUSTOM MINIMAL LINUX OS
  // ==========================================
  {
    id: "codex-arch",
    title: "Customized Operating System — Codex Arch",
    category: "Systems & Tools",
    badge: "Linux / Systems / Open Source",
    shortDescription:
      "Minimal keyboard-centric Linux OS built with Qtile, Bash, and Python, adopted by 10+ beta testers with automated update scripts reducing setup from hours to under 5 minutes.",
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

  // ==========================================
  // TOP 6: METIERS — SERVICE MARKETPLACE
  // ==========================================
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
    liveUrl: "https://metiers.cd/",
    isPlaceholderLinks: true,
  },

  // ==========================================
  // TOP 7: BROKING BRIDGE — TRADING & LIQUIDITY
  // ==========================================
  {
    id: "broking-bridge",
    title: "Broking Bridge — Trading Infrastructure",
    category: "FinTech / Trading Infrastructure",
    badge: "FastAPI / PostgreSQL / Liquidity / Payment Gateways",
    shortDescription:
      "Broking and liquidity infrastructure coordinating trading operations and multi-gateway client funding via Rozapay, Smilepay, Letknowpay, and Unipayment.",
    fullDescription:
      "Contributed to Broking Bridge, a trading and liquidity infrastructure platform architected on Python, FastAPI, and PostgreSQL. Engineered backend modules supporting broking operations, liquidity provider integrations, and client trade processing. Implemented multi-gateway deposit and settlement pipelines integrating Rozapay (custom fiat gateway, not Razorpay), Smilepay, Letknowpay, and Unipayment payment gateways, enabling streamlined client onboarding, fund routing, automated webhook verification, and account balance reconciliation.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Payment Gateways",
      "Rozapay",
      "Smilepay",
      "Letknowpay",
      "Unipayment",
      "Liquidity Systems",
      "Trading Integrations",
      "REST APIs",
      "Microservices",
    ],
    keyConcepts: [
      "Multi-gateway payment processing (Rozapay, Smilepay, Letknowpay, Unipayment)",
      "Client deposit and settlement workflows",
      "Automated webhook verification and payment callbacks",
      "Broking and liquidity management",
      "Trade-processing coordination and account ledgering",
      "Asynchronous FastAPI backend microservices",
    ],
    architecturePoints: [
      "Payment integration services coordinate deposits and withdrawals through Rozapay, Smilepay, Letknowpay, and Unipayment.",
      "Webhook listeners verify gateway signatures and update client account balances asynchronously.",
      "Liquidity bridging components connect broker platforms with external liquidity providers.",
      "PostgreSQL and SQLAlchemy handle multi-tenant balance records, trade executions, and transaction audit trails.",
    ],
    githubUrl: undefined,
    liveUrl: "https://demo.brokingbridge.com/",
    isPlaceholderLinks: true,
  },

  // ==========================================
  // TOP 8: BITGET — TRADING MODULE
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
    liveUrl: "https://www.bitget.com/",
    isPlaceholderLinks: true,
  },

  // ==========================================
  // TOP 9: FFMPEG VIDEO CONVERTER SUITE
  // ==========================================
  {
    id: "ffmpeg-suite",
    title: "FFmpeg Video Converter Suite",
    category: "Full-Stack",
    badge: "Video Processing / Backend / DevOps",
    shortDescription:
      "Web-based video conversion platform using Node.js, Express, FFmpeg, and Docker for scalable, parallel video processing.",
    fullDescription:
      "Built a web-based video conversion suite that supports 8+ video processing operations, including format conversion, compression, resolution scaling, and GIF extraction. Handled 100+ daily video processing tasks with optimized server resource utilization. Containerized the application using Docker for consistent cross-platform deployment.",
    technologies: [
      "Node.js",
      "Express",
      "FFmpeg",
      "Docker",
      "JavaScript",
      "HTML5",
      "CSS3",
      "REST APIs",
    ],
    keyConcepts: [
      "FFmpeg integration and command execution",
      "Video conversion, compression, and scaling pipelines",
      "Asynchronous job processing",
      "Docker containerization",
      "Server resource management and optimization",
      "RESTful API design for media processing",
    ],
    architecturePoints: [
      "Express handles file upload endpoints and job lifecycle tracking.",
      "FFmpeg processes video files through optimized CLI operations.",
      "Docker ensures consistent runtime environments across development and production.",
      "Temporary file lifecycle management cleans up storage after task completion.",
      "Asynchronous execution avoids blocking the event loop during heavy encoding.",
    ],
    githubUrl: "https://github.com/KISHOREkevin/video-converters",
    liveUrl: "https://video-converters.netlify.app/",
    isPlaceholderLinks: false,
  },

  // ==========================================
  // TOP 10: ECHO — AI AUDIO TRANSCRIPTION
  // ==========================================
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
    githubUrl: "https://github.com/KISHOREkevin/audio-transcriber",
    liveUrl: undefined,
    isPlaceholderLinks: false,
  },

  // ==========================================
  // TOP 11: CAREER CART — JOB CRM PLATFORM
  // ==========================================
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
    githubUrl: "https://github.com/KISHOREkevin/Job-crm-application",
    liveUrl: "https://job-crm-application.onrender.com/",
    isPlaceholderLinks: false,
  },
];
