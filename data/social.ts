export interface SocialLink {
  id: string;
  name: string;
  label: string;
  url: string;
  icon: string;
  isPlaceholder: boolean;
}

export const socialData = {
  email: process.env.NEXT_PUBLIC_EMAIL || "kishorekevin3289@gmail.com",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/KISHOREkevin",
  portfolio: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://kishorekevin.netlify.app/",
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 7904702577",
  location: "Madurai, Tamil Nadu, India",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/placeholder-kishore",
  resumePath: "/resume.pdf",
  links: [
    {
      id: "github",
      name: "GitHub",
      label: "github.com/KISHOREkevin",
      url: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/KISHOREkevin",
      icon: "Github",
      isPlaceholder: false
    },
    {
      id: "portfolio",
      name: "Portfolio",
      label: "kishorekevin.netlify.app",
      url: process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://kishorekevin.netlify.app/",
      icon: "Globe",
      isPlaceholder: false
    },
    {
      id: "email",
      name: "Email",
      label: process.env.NEXT_PUBLIC_EMAIL || "kishorekevin3289@gmail.com",
      url: `mailto:${process.env.NEXT_PUBLIC_EMAIL || "kishorekevin3289@gmail.com"}`,
      icon: "Mail",
      isPlaceholder: false
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      label: "linkedin.com/in/profile",
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/placeholder-kishore",
      icon: "Linkedin",
      isPlaceholder: !process.env.NEXT_PUBLIC_LINKEDIN_URL
    }
  ]
};
