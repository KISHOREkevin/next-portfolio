export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  category: "full-stack" | "fintech" | "systems" | "training" | "community";
}

export const experienceData: ExperienceItem[] = [
  {
    id: "wealwin",
    company: "Wealwin Technologies",
    role: "Full Stack Developer",
    period: "Nov 2025 – Present",
    location: "Madurai, Tamil Nadu, India",
    summary: "Engineering production full-stack client solutions, scalable backend microservices, blockchain wallet integrations, and MetaTrader 5 (MT5) / NTrader trading platforms.",
    highlights: [
      "Architect and deploy production full-stack web applications and microservices using React.js, Node.js, Fastify, Sequelize, and PostgreSQL.",
      "Contribute to Dopamine trading platform infrastructure, engineering cryptocurrency deposit and withdrawal workflows integrated with blockchain wallets via Ethers.js and Alchemy webhooks for real-time transaction monitoring.",
      "Engineered multi-gateway payment integrations across Rozapay (custom fiat gateway, not Razorpay), Smilepay, Letknowpay, and Unipayment alongside blockchain wallet workflows for automated deposits, withdrawals, and ledger reconciliation.",
      "Engineer MetaTrader 5 (MT5) and NTrader trading platform integrations across Finowiz and Regulus, coordinating copy-trading, account management, and affiliate commission distribution.",
      "Develop high-security multi-vendor REST APIs with API-key verification and cryptographic signature validation for institutional clients.",
      "Execute relational PostgreSQL schema migrations and maintain robust backend microservices with FastAPI and Python."
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Fastify",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Sequelize",
      "Rust",
      "Payment Gateways",
      "Rozapay",
      "Smilepay",
      "Letknowpay",
      "Unipayment",
      "Ethers.js",
      "Alchemy",
      "MetaTrader 5",
      "NTrader",
      "REST APIs",
      "Microservices",
      "JWT"
    ],
    category: "full-stack"
  },
  {
    id: "hashcodex",
    company: "Hashcodex / Hashcodexperts Infoservices",
    role: "Full Stack Developer",
    period: "July 2025 – October 2025",
    location: "India",
    summary: "Engineered fintech, cryptocurrency, and trading-related web applications using the MERN stack with secure authentication and third-party API integrations.",
    highlights: [
      "Developed and scaled fintech, cryptocurrency, and trading web applications leveraging the MERN stack (React.js, Node.js, Express.js, MongoDB).",
      "Engineered Bitget trading module workflows, connecting interactive chart interactions with backend order matching, execution, and order-closing lifecycles.",
      "Implemented secure JWT authentication, session handling, and consumed high-throughput financial REST APIs.",
      "Diagnosed and resolved production bugs, optimizing trade execution flows and system responsiveness."
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
      "REST APIs",
      "Trading Charts",
      "Order Management",
      "Authentication",
      "Fintech Workflows",
      "Git"
    ],
    category: "fintech"
  },
  {
    id: "krutanic",
    company: "Krutanic Solutions",
    role: "Fullstack Developer Intern",
    period: "November 2024 – January 2025",
    location: "India",
    summary: "Engineered Django APIs for real-world projects and collaborated on a cloud-deployed job portal using Node.js and React on AWS.",
    highlights: [
      "Built 3+ Django APIs for real-world projects, reducing backend response time by 25%.",
      "Collaborated with a team to develop a job portal, integrating Node.js + React with AWS deployment."
    ],
    technologies: [
      "Django",
      "Python",
      "REST APIs",
      "Node.js",
      "React",
      "AWS",
      "API Optimization"
    ],
    category: "full-stack"
  },
  {
    id: "shrika",
    company: "Shrika Institute of Creative Technology",
    role: "Web Developer",
    period: "September 2023 – May 2025",
    location: "India",
    summary: "Developed 5+ full-stack applications with MERN and Django on AWS, built a collaborative video editor suite, and integrated speech-to-text AI APIs.",
    highlights: [
      "Developed and maintained 5+ full-stack applications, including a Job Portal Management System, AI Transcription Tool, Food Ordering Platform, and more using MERN and Django stacks, deployed on AWS.",
      "Built a Video Editor Suite with real-time collaboration features, improving user engagement by 80% and implementing parallel processing to reduce video processing time by 60%, with self-hosting support.",
      "Integrated AI/ML APIs for speech-to-text transcription in the AI Transcription App, reducing manual effort by 90%.",
      "Collaborated with cross-functional teams (UI/UX, QA) to deliver scalable solutions following Agile methodologies."
    ],
    technologies: [
      "MERN Stack",
      "Django",
      "AWS",
      "React",
      "Node.js",
      "Python",
      "FFmpeg",
      "Speech-to-Text AI/ML APIs",
      "Parallel Processing",
      "Agile"
    ],
    category: "full-stack"
  },
  {
    id: "linux-admin",
    company: "Linux Server Administration",
    role: "Linux Server Administrator Intern",
    period: "June 2023 – January 2024",
    location: "India",
    summary: "Administered high-uptime Linux servers, configured secure remote access and networking protocols, and automated tasks with Bash scripts.",
    highlights: [
      "Administered Linux servers, ensuring high performance, security, and uptime via process/log monitoring using tools such as top, ps, and journalctl.",
      "Configured and secured SSH and FTP/SFTP for remote access and file transfers, troubleshooting connectivity issues.",
      "Managed networking including IP/subnets, routing, and DNS using traceroute, dig, netstat, ss, arp, and ip commands.",
      "Automated tasks using Bash scripts."
    ],
    technologies: [
      "Linux",
      "Bash Scripting",
      "SSH",
      "FTP/SFTP",
      "Networking & DNS",
      "top",
      "ps",
      "journalctl",
      "traceroute",
      "dig",
      "netstat",
      "ss"
    ],
    category: "systems"
  },
  {
    id: "codex-arch",
    company: "Codex Arch",
    role: "Community Educator",
    period: "January 2025 – Present",
    location: "Open Source Community",
    summary: "Building and growing the Linux and open-source community through workshops, educational tutorials, and custom Linux OS demonstrations.",
    highlights: [
      "Build and grow the Linux and open-source community through workshops, discussions, and outreach.",
      "Developed a customized operating system to engage users and demonstrate open-source principles.",
      "Create educational content including tutorials, guides, and workshops on Linux, self-hosting, and workflow automation.",
      "Share expertise in open-source tools, Linux troubleshooting, and system optimization through talks and forums."
    ],
    technologies: [
      "Linux",
      "Open Source",
      "Qtile",
      "Python",
      "Bash",
      "System Optimization",
      "Self-Hosting",
      "Technical Workshops"
    ],
    category: "community"
  }
];
