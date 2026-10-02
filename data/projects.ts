export interface ProjectItem {
  id: string;
  title: string;
  category: "AI / LLM" | "Full-Stack" | "Systems & Tools";
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
  {
    id: "job-matcher",
    title: "AI-Powered Job Matching System",
    category: "AI / LLM",
    badge: "AI / RAG / Developer Tool",
    shortDescription: "Production-oriented RAG job matching platform using Python, LangChain, Ollama, vector database, and semantic similarity search.",
    fullDescription: "Built a production-oriented, RAG-based job matching system using Python, LangChain, Ollama, embeddings, and a vector database. Implemented document processing and resume parsing to extract structured candidate data. Used embeddings and semantic similarity search to retrieve relevant job listings for a given profile. Implemented job ingestion, data cleaning/normalization, deduplication, vector storage, and retrieval pipelines. Ran local LLMs via Ollama and implemented structured LLM outputs to power AI-based job matching.",
    technologies: [
      "Python",
      "LangChain",
      "Ollama",
      "LLMs",
      "Embeddings",
      "Vector Database",
      "RAG",
      "Semantic Search"
    ],
    keyConcepts: [
      "Resume parsing & structured candidate data extraction",
      "Semantic similarity search via vector embeddings",
      "Job ingestion, normalization, and deduplication pipeline",
      "Local LLM inference via Ollama for privacy & offline execution",
      "Retrieval-Augmented Generation (RAG) for contextual evaluation",
      "Structured LLM outputs powering candidate-job alignment matrices"
    ],
    architecturePoints: [
      "Document ingestion pipeline parses candidate resumes into structured schema representations.",
      "Vector embeddings are generated and stored in a high-dimensional vector collection.",
      "Semantic retrieval executes similarity matching between candidate profiles and job requirements.",
      "Local LLMs orchestrated via LangChain evaluate contextual alignment and generate structured match scores."
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false
  },
  {
    id: "codex-arch",
    title: "Customized Operating System — Codex Arch",
    category: "Systems & Tools",
    badge: "Linux / Systems / Open Source",
    shortDescription: "Minimal keyboard-centric Linux OS built with Qtile, Bash, and Python, adopted by 10+ beta testers with automated update scripts.",
    fullDescription: "Created a keyboard-centric, minimal OS with Qtile, Bash, and Python. Adopted as the primary OS by 10+ beta testers. Automated system updates via shell scripts, reducing manual maintenance time by 40%. Engineered system-wide dotfiles for Linux. Scripted volume/brightness controls and Neovim IDE setup. Built keyboard-centric workflows using the Qtile Python library. Integrated 20+ open-source tools including Rofi and Picom. Built custom tools including a Music Player and Pomodoro Timer using Python, GTK, and Qt. Automated configuration synchronization via Git, reducing setup time from hours to under 5 minutes for new deployments.",
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
      "Git"
    ],
    keyConcepts: [
      "Adopted as the primary OS by 10+ beta testers",
      "System update automation via shell scripts reducing maintenance by 40%",
      "Engineered system-wide Linux dotfiles and Neovim IDE setup",
      "Keyboard-centric tiling workflow orchestrations with Qtile",
      "Integrated 20+ open-source tools including Rofi and Picom",
      "Custom GTK & Qt tools: Music Player and Pomodoro Timer",
      "Git sync reducing new deployment setup from hours to under 5 minutes"
    ],
    architecturePoints: [
      "Qtile window manager handles dynamic tiling, keybindings, and multi-monitor status widgets.",
      "Modular shell scripts automate routine updates, package synchronization, and system health checks.",
      "GTK and Qt frameworks provide lightweight UI accessories integrated directly into the desktop.",
      "Centralized dotfile repository with automated Git bootstrapping enables fresh installs in under 5 minutes."
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false
  },
  {
    id: "ffmpeg-suite",
    title: "FFmpeg Video Converter Suite",
    category: "Full-Stack",
    badge: "Video Processing / Backend / DevOps",
    shortDescription: "Multi-feature video suite handling 100+ concurrent operations daily, achieving 40% performance gain via parallel processing and Docker.",
    fullDescription: "Built a multi-feature video processing tool with 8+ functions including conversion, compression, GIF creation, and more using FFmpeg and Node.js. Handles 100+ concurrent operations daily. Optimized performance by 40% through parallel processing and Docker containerization. Reduced resource usage by 35%.",
    technologies: [
      "FFmpeg",
      "Node.js",
      "Docker",
      "Parallel Processing",
      "JavaScript",
      "Backend"
    ],
    keyConcepts: [
      "8+ media operations: conversion, compression, GIF creation, extraction",
      "Handles 100+ concurrent operations daily",
      "40% performance optimization via parallel processing pipelines",
      "35% resource consumption reduction",
      "Containerized deployment architecture using Docker"
    ],
    architecturePoints: [
      "Node.js asynchronous worker pool orchestrates multiple FFmpeg transcoding threads.",
      "Parallel processing engine breaks media transformation jobs into concurrent chunks.",
      "Dockerized container isolates multimedia libraries, ensuring reproducible performance across platforms.",
      "Resource-constrained processing queues prevent CPU/RAM starvation during peak concurrency."
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false
  },
  {
    id: "echo-transcription",
    title: "Audio Transcription Application — Echo",
    category: "AI / LLM",
    badge: "AI / Audio / Backend",
    shortDescription: "AI speech-to-text system reaching 95% multilingual accuracy, processing 1TB+ audio files with 40% queue time reduction via Redis & Celery.",
    fullDescription: "Integrated AssemblyAI speech-to-text API achieving 95% accuracy for multilingual transcription. Processed 1TB+ audio files via Cloudinary. Implemented Django backend optimizations. Reduced transcription queue times by 40% through Redis caching and asynchronous Celery tasks.",
    technologies: [
      "Django",
      "AssemblyAI",
      "Redis",
      "Celery",
      "Cloudinary",
      "Speech-to-Text",
      "Python",
      "AI/ML"
    ],
    keyConcepts: [
      "95% accuracy on multilingual speech-to-text transcription",
      "1TB+ audio files processed via Cloudinary asset pipelines",
      "40% reduction in queue waiting times",
      "Asynchronous background execution using Celery workers",
      "Redis caching layer for rapid status lookups and job deduplication"
    ],
    architecturePoints: [
      "Django REST API receives media upload payloads and coordinates transcription tasks.",
      "Cloudinary handles media storage, CDN caching, and audio format normalization.",
      "Celery workers ingest asynchronous jobs and communicate with AssemblyAI speech-to-text APIs.",
      "Redis in-memory store acts as message broker and fast status cache for pending/completed transcriptions."
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false
  },
  {
    id: "career-cart",
    title: "Job Portal Management System — Career Cart",
    category: "Full-Stack",
    badge: "Full Stack / SaaS / Job Platform",
    shortDescription: "MERN job portal tracking 500+ applications with 99.5% uptime on AWS EC2, and 40% faster load speeds through query optimization.",
    fullDescription: "Developed a full-stack job portal management system using the MERN stack. Enabled employers to post jobs and track 500+ applications. Implemented JWT authentication and role-based access. Optimized MongoDB queries and React rendering, improving load speeds by 40%. Deployed on AWS EC2 with CI/CD pipelines. Achieved 99.5% uptime.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "AWS EC2",
      "CI/CD",
      "MERN Stack"
    ],
    keyConcepts: [
      "Tracking 500+ job applications with employer candidate management",
      "JWT authentication and granular role-based authorization",
      "40% load speed improvement via MongoDB indexing & React optimizations",
      "99.5% service uptime maintained on AWS EC2 with automated CI/CD",
      "Responsive applicant and employer dashboards"
    ],
    architecturePoints: [
      "React client interface with component-level state and optimized virtual DOM rendering.",
      "Express backend handles RESTful endpoints, JWT validation, and authorization middleware.",
      "Indexed MongoDB collections ensure sub-second candidate search queries across 500+ records.",
      "AWS EC2 instance configured with automated CI/CD deployment pipelines for high reliability (99.5% uptime)."
    ],
    githubUrl: "https://github.com/KISHOREkevin",
    liveUrl: undefined,
    isPlaceholderLinks: false
  }
];
