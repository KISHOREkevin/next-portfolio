export interface VirtualFile {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  extension?: "md" | "json" | "sh" | "ts" | "pdf";
  size: string;
  modified: string;
  openAppId?: string;
  content?: string;
  children?: VirtualFile[];
}

export const fileSystemTree: VirtualFile[] = [
  {
    id: "home",
    name: "home",
    path: "/home",
    type: "directory",
    size: "4.0 KB",
    modified: "Oct 02 2026",
    children: [
      {
        id: "user-kishore",
        name: "kishore",
        path: "/home/kishore",
        type: "directory",
        size: "4.0 KB",
        modified: "Oct 02 2026",
        children: [
          {
            id: "readme-md",
            name: "README.md",
            path: "/home/kishore/README.md",
            type: "file",
            extension: "md",
            size: "1.9 KB",
            modified: "Oct 02 2026",
            openAppId: "about",
            content: `# A. Kishore — Full Stack Developer & AI Systems Engineer

Welcome to KishoreOS.
Personal developer environment backing full-stack web applications, Applied AI systems, and Linux tooling.

- Role: Full Stack Developer (React, Node.js, Fastify, FastAPI, PostgreSQL, MERN)
- AI Focus: Large Language Models, RAG Architectures, LangChain, Ollama, Vector Databases
- Open Source: Linux System Administration, Qtile custom desktop (Codex Arch)
- Location: Madurai, Tamil Nadu, India
- Email: kishorekevin3289@gmail.com
- Portfolio: https://kishorekevin.netlify.app/
- GitHub: https://github.com/KISHOREkevin

Use the bottom taskbar or launcher to inspect applications.`
          },
          {
            id: "about-md",
            name: "about.md",
            path: "/home/kishore/about.md",
            type: "file",
            extension: "md",
            size: "2.6 KB",
            modified: "Oct 02 2026",
            openAppId: "about",
            content: `# About — A. Kishore

Full Stack Developer & AI Systems Engineer based in Madurai, Tamil Nadu, India.

## Professional Trajectory
1. **Wealwin Technologies** (Nov 2025 – Present): Full Stack Developer working on React.js, Node.js, Fastify, Sequelize, PostgreSQL, REST APIs, and MT5/MetaTrader trading platform workflows.
2. **Hashcodex / Hashcodexperts Infoservices** (July 2025 – Oct 2025): MERN Stack Developer building cryptocurrency, fintech, and trading applications.
3. **Krutanic Solutions** (Nov 2024 – Jan 2025): Fullstack Developer Intern building Django REST APIs and job portal integration.
4. **Shrika Institute of Creative Technology** (Sep 2023 – May 2025): Web Developer developing 5+ applications including collaborative Video Editor Suite and AI Speech-to-Text transcription.
5. **Linux Server Administration** (June 2023 – Jan 2024): Intern administering high-uptime Linux servers, SSH/SFTP, DNS, and networking.
6. **Codex Arch** (Jan 2025 – Present): Community Educator building minimal Linux OS with Qtile/Python/Bash adopted by 10+ beta testers.`
          },
          {
            id: "experience-md",
            name: "experience.md",
            path: "/home/kishore/experience.md",
            type: "file",
            extension: "md",
            size: "3.8 KB",
            modified: "Oct 02 2026",
            openAppId: "experience",
            content: `# Professional Experience

- **Wealwin Technologies** | Full Stack Developer (Nov 2025 – Present)
  * React.js, Node.js, Fastify, Sequelize, PostgreSQL/SQL, JWT, Redux, REST APIs
  * MT5 trading account management, database migrations, production debugging

- **Hashcodex / Hashcodexperts Infoservices** | Full Stack Developer (July 2025 – Oct 2025)
  * MERN stack (React.js, Node.js, Express.js, MongoDB), fintech & crypto trading apps

- **Krutanic Solutions** | Fullstack Developer Intern (Nov 2024 – Jan 2025)
  * Built 3+ Django APIs reducing backend response time by 25%; AWS deployment

- **Shrika Institute of Creative Technology** | Web Developer (Sep 2023 – May 2025)
  * 5+ full-stack apps (MERN/Django), Video Editor Suite with parallel processing (60% faster), AI transcription

- **Linux Server Administration** | Linux Server Administrator Intern (June 2023 – Jan 2024)
  * Linux servers, SSH, FTP/SFTP, DNS/routing, process/log monitoring (top, ps, journalctl)

- **Codex Arch** | Community Educator (Jan 2025 – Present)
  * Linux workshops, educational tutorials, custom minimal OS with Qtile/Python/Bash`
          },
          {
            id: "education-md",
            name: "education.md",
            path: "/home/kishore/education.md",
            type: "file",
            extension: "md",
            size: "1.4 KB",
            modified: "Oct 02 2026",
            openAppId: "resume",
            content: `# Education History

- **Bachelor of Technology in Information Technology**
  * Ultra College of Engineering and Technology (May 2021 – May 2025)
  * CGPA: 8.09 / 10

- **Higher Secondary Certificate (HSC)**
  * TVS Higher Secondary School (April 2020 – June 2021)
  * Score: 86.3%

- **Secondary School Leaving Certificate (SSLC)**
  * TVS Higher Secondary School (April 2018 – April 2019)
  * Score: 78.4%`
          },
          {
            id: "certifications-md",
            name: "certifications.md",
            path: "/home/kishore/certifications.md",
            type: "file",
            extension: "md",
            size: "1.1 KB",
            modified: "Oct 02 2026",
            openAppId: "resume",
            content: `# Professional Certifications

- **AWS Cloud Practitioner** — AWS Training
- **Linux Server Administration** — Cisco NDG
- **Fullstack Development** — Krutanic Solutions`
          },
          {
            id: "skills-json",
            name: "skills.json",
            path: "/home/kishore/skills.json",
            type: "file",
            extension: "json",
            size: "2.9 KB",
            modified: "Oct 02 2026",
            openAppId: "skills",
            content: `{
  "frontend": ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind", "Bootstrap", "GTK/Qt", "React Native", "Expo"],
  "backend": ["Node.js", "Express", "Fastify", "Django", "FastAPI", "REST API Development", "Sequelize", "SQLAlchemy", "Pydantic"],
  "databases": ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "Redis"],
  "ai_llm": ["LLMs", "RAG", "LangChain", "LangGraph", "Ollama", "Local LLMs", "Embeddings", "Vector Databases", "Semantic Search"],
  "devops_cloud": ["Docker", "AWS", "Git", "GitHub", "Linux", "Bash Scripting"],
  "systems": ["Networks", "Firebase", "Appwrite", "Supabase", "Cloud Computing", "System Design", "Operating Systems"],
  "languages": ["Python", "JavaScript", "C", "Java", "Lua"]
}`
          },
          {
            id: "projects-dir",
            name: "projects",
            path: "/home/kishore/projects",
            type: "directory",
            size: "4.0 KB",
            modified: "Oct 02 2026",
            openAppId: "projects",
            children: [
              {
                id: "job-matcher-md",
                name: "job-matcher.md",
                path: "/home/kishore/projects/job-matcher.md",
                type: "file",
                extension: "md",
                size: "2.1 KB",
                modified: "Oct 02 2026",
                openAppId: "projects",
                content: `# AI-Powered Job Matching System
- Category: AI / RAG / Developer Tool
- Stack: Python, LangChain, Ollama, Embeddings, Vector Database, RAG, Semantic Search
- Features: Document processing, resume parsing, semantic similarity search, job deduplication, structured LLM outputs.`
              },
              {
                id: "codex-arch-md",
                name: "codex-arch.md",
                path: "/home/kishore/projects/codex-arch.md",
                type: "file",
                extension: "md",
                size: "2.2 KB",
                modified: "Oct 02 2026",
                openAppId: "projects",
                content: `# Customized Operating System — Codex Arch
- Category: Linux / Systems / Open Source
- Stack: Linux, Qtile, Python, Bash, GTK, Qt, Neovim, Rofi, Picom, Git
- Highlights: Adopted by 10+ beta testers; automated shell updates (40% maintenance cut); Git dotfiles sync (< 5 min setup).`
              },
              {
                id: "ffmpeg-suite-md",
                name: "ffmpeg-suite.md",
                path: "/home/kishore/projects/ffmpeg-suite.md",
                type: "file",
                extension: "md",
                size: "1.8 KB",
                modified: "Oct 02 2026",
                openAppId: "projects",
                content: `# FFmpeg Video Converter Suite
- Category: Video Processing / Backend / DevOps
- Stack: FFmpeg, Node.js, Docker, Parallel Processing
- Highlights: 8+ media operations, handles 100+ concurrent operations daily, 40% performance gain, 35% resource reduction.`
              },
              {
                id: "echo-transcription-md",
                name: "echo-transcription.md",
                path: "/home/kishore/projects/echo-transcription.md",
                type: "file",
                extension: "md",
                size: "1.9 KB",
                modified: "Oct 02 2026",
                openAppId: "projects",
                content: `# Audio Transcription Application — Echo
- Category: AI / Audio / Backend
- Stack: Django, AssemblyAI, Redis, Celery, Cloudinary, Speech-to-Text, Python
- Highlights: 95% multilingual transcription accuracy, 1TB+ audio processed, 40% queue time reduction via Redis caching.`
              },
              {
                id: "career-cart-md",
                name: "career-cart.md",
                path: "/home/kishore/projects/career-cart.md",
                type: "file",
                extension: "md",
                size: "2.0 KB",
                modified: "Oct 02 2026",
                openAppId: "projects",
                content: `# Job Portal Management System — Career Cart
- Category: Full Stack / SaaS / Job Platform
- Stack: React, Node.js, Express, MongoDB, JWT, AWS EC2, CI/CD
- Highlights: 500+ applications tracked, role-based auth, 40% faster load speeds, 99.5% uptime on AWS EC2.`
              }
            ]
          },
          {
            id: "contact-md",
            name: "contact.md",
            path: "/home/kishore/contact.md",
            type: "file",
            extension: "md",
            size: "1.2 KB",
            modified: "Oct 02 2026",
            openAppId: "contact",
            content: `# Contact Coordinates

- Name: A. KISHORE
- Email: kishorekevin3289@gmail.com
- Phone: +91 7904702577
- Location: Madurai, Tamil Nadu, India
- Portfolio: https://kishorekevin.netlify.app/
- GitHub: https://github.com/KISHOREkevin`
          },
          {
            id: "resume-pdf",
            name: "resume.pdf",
            path: "/home/kishore/resume.pdf",
            type: "file",
            extension: "pdf",
            size: "142 KB",
            modified: "Oct 02 2026",
            openAppId: "resume",
            content: "PDF Binary Document — Open Resume App to inspect formatted profile with Education and Certifications."
          }
        ]
      }
    ]
  }
];
