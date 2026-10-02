import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#172125",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: "Kishore — Full-Stack Developer | KishoreOS",
  description:
    "Full-Stack Developer building modern web applications, distributed APIs, and Applied AI systems with Next.js, React, Node.js, FastAPI, LLMs, and RAG.",
  keywords: [
    "Kishore",
    "Full-Stack Developer",
    "AI Systems Engineer",
    "Next.js",
    "React",
    "FastAPI",
    "Node.js",
    "Fastify",
    "LangChain",
    "Ollama",
    "RAG",
    "PostgreSQL",
    "KishoreOS",
    "Developer Workstation"
  ],
  authors: [{ name: "Kishore" }],
  creator: "Kishore",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Kishore — Full-Stack Developer",
    description:
      "Full-Stack Developer building web applications and AI systems with Next.js, React, Node.js, FastAPI, LLMs, and RAG.",
    siteName: "KishoreOS"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('kishoreos-theme')||'system';document.documentElement.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t}catch(e){}" }} /></head>
      <body
        suppressHydrationWarning
        className="h-full w-full overflow-hidden bg-[#172125] text-[#f1f0eb] font-sans"
      >
        {children}
      </body>
    </html>
  );
}
