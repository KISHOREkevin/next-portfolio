"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWindowManager } from "@/components/os/WindowManager";
import { profileData } from "@/data/profile";
import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";
import { socialData } from "@/data/social";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import { playTerminalKey } from "@/lib/audio";

interface TerminalEntry {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: React.ReactNode;
}

export function TerminalApp() {
  const { openApp } = useWindowManager();
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: "welcome",
      type: "system",
      content: (
        <div className="space-y-1 text-[#a6adc8]">
          <div><span className="text-[#a6e3a1] font-bold">KishoreOS</span></div>
          <div>Type <span className="text-[#89b4fa] font-semibold">help</span> to view available commands, or <span className="text-[#89b4fa] font-semibold">neofetch</span> for system telemetry.</div>
        </div>
      )
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    setCmdHistory((prev) => [...prev, raw]);
    setHistoryIdx(-1);

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const inputEntry: TerminalEntry = {
      id: `in-${Date.now()}`,
      type: "input",
      content: raw
    };

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1.5 text-[#cdd6f4]">
            <div className="text-[#cba6f7] font-semibold mb-1">Available Shell Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-[#89b4fa] font-semibold">whoami</span> — Developer identity & bio</div>
              <div><span className="text-[#89b4fa] font-semibold">stack</span> — Core engineering technologies</div>
              <div><span className="text-[#89b4fa] font-semibold">projects</span> — Project repository archive</div>
              <div><span className="text-[#89b4fa] font-semibold">experience</span> — Work history & record</div>
              <div><span className="text-[#89b4fa] font-semibold">education</span> — Academic qualifications</div>
              <div><span className="text-[#89b4fa] font-semibold">certifications</span> — Professional certificates</div>
              <div><span className="text-[#89b4fa] font-semibold">skills</span> — Categorized skills matrix</div>
              <div><span className="text-[#89b4fa] font-semibold">contact</span> — Reach out via email/social</div>
              <div><span className="text-[#89b4fa] font-semibold">resume</span> — Open printable CV</div>
              <div><span className="text-[#89b4fa] font-semibold">neofetch</span> — Workstation specs & telemetry</div>
              <div><span className="text-[#89b4fa] font-semibold">ls</span> — List directory contents</div>
              <div><span className="text-[#89b4fa] font-semibold">cat [file]</span> — Print file content</div>
              <div><span className="text-[#89b4fa] font-semibold">open [app]</span> — Launch GUI window</div>
              <div><span className="text-[#89b4fa] font-semibold">clear</span> — Clear terminal output</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="text-[#cdd6f4] space-y-1">
            <div className="font-bold text-[#89b4fa]">{profileData.name}</div>
            <div className="text-[#cba6f7]">{profileData.title} & AI Systems Engineer</div>
            <div className="text-[#a6adc8] text-xs mt-1">{profileData.location}</div>
            <div className="text-[#bac2de] text-xs mt-1">{profileData.shortBio}</div>
          </div>
        );
        break;

      case "stack":
        outputNode = (
          <div className="space-y-1.5 text-xs text-[#cdd6f4]">
            <div className="text-[#cba6f7] font-semibold">CORE TECHNICAL STACK:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
              <div><span className="text-[#89b4fa] font-semibold">Frontend:</span> React, Next.js, TypeScript, Tailwind, HTML/CSS, GTK/Qt</div>
              <div><span className="text-[#89b4fa] font-semibold">Backend:</span> Node.js, Fastify, FastAPI, Express, Django, Sequelize, SQLAlchemy</div>
              <div><span className="text-[#89b4fa] font-semibold">AI / RAG:</span> Ollama, LangChain, LangGraph, Vector Databases, Semantic Search</div>
              <div><span className="text-[#89b4fa] font-semibold">Databases & Cloud:</span> PostgreSQL, MongoDB, Redis, Docker, AWS, Linux</div>
            </div>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-1 text-[#cdd6f4]">
            <div className="font-semibold text-[#89b4fa]">Kishore — Overview:</div>
            <p className="text-xs text-[#a6adc8]">{profileData.shortBio}</p>
            <div className="text-xs text-[#6c7086] pt-1">
              Opening Overview window...
            </div>
          </div>
        );
        setTimeout(() => openApp("about"), 300);
        break;

      case "skills":
        outputNode = (
          <div className="space-y-2 text-xs">
            {skillsData.map((cat) => (
              <div key={cat.id}>
                <span className="text-[#89b4fa] font-semibold">{cat.name}: </span>
                <span className="text-[#bac2de]">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
            <div className="text-[#6c7086] pt-1">Run &apos;open skills&apos; for the interactive GUI matrix.</div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#cba6f7] font-semibold">Project Archive:</div>
            {projectsData.map((proj, idx) => (
              <div key={proj.id} className="text-[#cdd6f4]">
                <span className="text-[#89b4fa] font-semibold">{idx + 1}. {proj.title}</span> ({proj.badge})
                <div className="text-[#a6adc8] pl-4">{proj.shortDescription}</div>
              </div>
            ))}
            <div className="text-[#6c7086] pt-1">Opening Projects window...</div>
          </div>
        );
        setTimeout(() => openApp("projects"), 300);
        break;

      case "experience":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#cba6f7] font-semibold">Work History:</div>
            {experienceData.map((exp) => (
              <div key={exp.id} className="text-[#cdd6f4]">
                <div className="font-semibold text-[#89b4fa]">{exp.company} — {exp.role}</div>
                <div className="text-[#a6adc8] text-xs">{exp.summary}</div>
              </div>
            ))}
            <div className="text-[#6c7086] pt-1">Opening Experience window...</div>
          </div>
        );
        setTimeout(() => openApp("experience"), 300);
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs text-[#cdd6f4]">
            <div><span className="text-[#89b4fa] font-semibold">Email: </span>{socialData.email}</div>
            <div><span className="text-[#89b4fa] font-semibold">GitHub: </span>{socialData.github}</div>
            <div><span className="text-[#89b4fa] font-semibold">LinkedIn: </span>{socialData.linkedin}</div>
            <div className="text-[#6c7086] pt-1">Opening Contact window...</div>
          </div>
        );
        setTimeout(() => openApp("contact"), 300);
        break;

      case "resume":
        outputNode = (
          <div className="text-xs text-[#cdd6f4]">
            <div>Opening Printable CV / Resume window...</div>
          </div>
        );
        setTimeout(() => openApp("resume"), 300);
        break;

      case "neofetch":
      case "system":
        outputNode = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#cdd6f4] py-1">
            <div className="text-[#cba6f7] select-none hidden sm:block">
              <pre>{`       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}</pre>
            </div>
            <div className="space-y-1">
              <div><span className="text-[#89b4fa] font-bold">OS:</span> {profileData.systemSpecs.os}</div>
              <div><span className="text-[#89b4fa] font-bold">Host:</span> Developer Workstation</div>
              <div><span className="text-[#89b4fa] font-bold">Kernel:</span> {profileData.systemSpecs.kernel}</div>
              <div><span className="text-[#89b4fa] font-bold">Uptime:</span> 99.9%</div>
              <div><span className="text-[#89b4fa] font-bold">Shell:</span> zsh 5.9 (x86_64)</div>
              <div><span className="text-[#89b4fa] font-bold">Theme:</span> Catppuccin Mocha</div>
              <div><span className="text-[#89b4fa] font-bold">Stack:</span> {profileData.systemSpecs.coreStack}</div>
              <div><span className="text-[#89b4fa] font-bold">Status:</span> {profileData.status}</div>
            </div>
          </div>
        );
        break;

      case "education":
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#cba6f7] font-semibold">Academic Education:</div>
            {educationData.map((edu) => (
              <div key={edu.id} className="text-[#cdd6f4]">
                <span className="text-[#89b4fa] font-semibold">{edu.degree}</span>
                {edu.field ? ` in ${edu.field}` : ""} — {edu.institution}
                <div className="text-[#a6adc8] pl-2">{edu.period} · {edu.scoreType}: <span className="text-[#a6e3a1]">{edu.score}</span></div>
              </div>
            ))}
          </div>
        );
        break;

      case "certifications":
      case "certs":
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <div className="text-[#cba6f7] font-semibold">Verified Certifications:</div>
            {certificationsData.map((cert) => (
              <div key={cert.id} className="text-[#cdd6f4]">
                • <span className="text-[#89b4fa] font-semibold">{cert.title}</span> — <span className="text-[#a6adc8]">{cert.issuer}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "ls":
        outputNode = (
          <div className="text-xs font-mono text-[#cdd6f4] flex flex-wrap gap-x-3 gap-y-1">
            <span className="text-[#89b4fa]">about.md</span>
            <span className="text-[#89b4fa]">experience.md</span>
            <span className="text-[#89b4fa]">education.md</span>
            <span className="text-[#89b4fa]">certifications.md</span>
            <span className="text-[#89b4fa]">skills.json</span>
            <span className="text-[#cba6f7] font-semibold">projects/</span>
            <span className="text-[#89b4fa]">contact.md</span>
            <span className="text-[#fab387] font-semibold">resume.pdf</span>
            <span className="text-[#a6adc8]">README.md</span>
          </div>
        );
        break;

      case "cat":
        if (!args[0]) {
          outputNode = <span className="text-[#f38ba8] text-xs">Usage: cat [filename] (e.g. cat README.md)</span>;
        } else {
          const filename = args[0].toLowerCase();
          if (filename.includes("readme")) {
            outputNode = (
              <pre className="text-xs text-[#bac2de] whitespace-pre-wrap">
                {`# A. Kishore — Full Stack Developer & AI Systems Engineer
Madurai, Tamil Nadu, India | kishorekevin3289@gmail.com
React, Node.js, Fastify, FastAPI, Python, PostgreSQL, LLMs, RAG, Linux.`}
              </pre>
            );
          } else if (filename.includes("skill")) {
            outputNode = (
              <pre className="text-xs text-[#bac2de] whitespace-pre-wrap">
                {`{"frontend": ["React", "JavaScript", "TypeScript", "Tailwind"], "backend": ["Node.js", "Fastify", "FastAPI", "Express", "Django"], "ai": ["LLMs", "RAG", "LangChain", "Ollama"]}`}
              </pre>
            );
          } else if (filename.includes("edu")) {
            outputNode = (
              <pre className="text-xs text-[#bac2de] whitespace-pre-wrap">
                {`# Education
- B.Tech in Information Technology — Ultra College of Engineering and Technology (2021-2025, CGPA: 8.09)
- TVS Higher Secondary School — HSC: 86.3%, SSLC: 78.4%`}
              </pre>
            );
          } else if (filename.includes("cert")) {
            outputNode = (
              <pre className="text-xs text-[#bac2de] whitespace-pre-wrap">
                {`# Certifications
- AWS Cloud Practitioner — AWS Training
- Linux Server Administration — Cisco NDG
- Fullstack Development — Krutanic Solutions`}
              </pre>
            );
          } else {
            outputNode = (
              <span className="text-[#a6adc8] text-xs">
                Previewing file {filename}. Tip: Run &apos;open [app]&apos; to explore in GUI.
              </span>
            );
          }
        }
        break;

      case "open":
        if (!args[0]) {
          outputNode = <span className="text-[#f38ba8] text-xs">Usage: open [about|projects|experience|skills|contact|resume|files|terminal]</span>;
        } else {
          const target = args[0].toLowerCase();
          openApp(target);
          outputNode = <span className="text-[#a6e3a1] text-xs">Launching [{target}]...</span>;
        }
        break;

      case "github":
        outputNode = <span className="text-[#a6adc8] text-xs">Opening GitHub in new tab...</span>;
        window.open(socialData.github, "_blank");
        break;

      case "linkedin":
        outputNode = <span className="text-[#a6adc8] text-xs">Opening LinkedIn in new tab...</span>;
        window.open(socialData.linkedin, "_blank");
        break;

      case "clear":
        setHistory([]);
        return;

      case "sudo":
        outputNode = <span className="text-[#fab387] text-xs">Permission granted. Workstation session is interactive.</span>;
        break;

      case "echo":
        outputNode = <span className="text-[#cdd6f4] text-xs">{args.join(" ")}</span>;
        break;

      case "date":
        outputNode = <span className="text-[#cdd6f4] text-xs">{new Date().toString()}</span>;
        break;

      default:
        outputNode = (
          <span className="text-[#f38ba8] text-xs">
            command not found: {cmd}. Type <span className="underline font-semibold text-[#89b4fa]">help</span> for supported commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      inputEntry,
      {
        id: `out-${Date.now()}`,
        type: "output",
        content: outputNode
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playTerminalKey();

    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <div
      className="h-full min-h-[440px] md:min-h-0 flex flex-col font-mono text-xs text-[#cdd6f4] bg-[#11111b] rounded-lg p-3.5 sm:p-4 border border-[#313244] shadow-inner select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable Command Log Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 overscroll-contain">
        {history.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.type === "input" ? (
              <div className="flex items-start gap-2 text-[#cdd6f4]">
                <span className="select-none font-semibold shrink-0">
                  <span className="text-[#a6e3a1]">kishore</span>
                  <span className="text-[#6c7086]">@</span>
                  <span className="text-[#89b4fa]">workstation</span>
                  <span className="text-[#6c7086]">:</span>
                  <span className="text-[#cba6f7]">~</span>
                  <span className="text-[#fab387]">$</span>
                </span>
                <span className="text-[#cdd6f4] font-medium min-w-0 break-all">{entry.content}</span>
              </div>
            ) : (
              <div className="pl-3 border-l-2 border-[#313244] my-1 text-[#bac2de] leading-relaxed">
                {entry.content}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Input Row */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#313244] mt-2 select-none">
        <span className="select-none font-semibold shrink-0">
          <span className="text-[#a6e3a1]">kishore</span>
          <span className="text-[#6c7086]">@</span>
          <span className="text-[#89b4fa]">workstation</span>
          <span className="text-[#6c7086]">:</span>
          <span className="text-[#cba6f7]">~</span>
          <span className="text-[#fab387]">$</span>
        </span>
        <div className="relative flex-1 flex items-center min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="terminal-input w-full min-w-0 bg-transparent text-[#cdd6f4] focus:outline-none placeholder:text-[#6c7086] font-mono text-xs caret-[#cba6f7]"
            placeholder="Type 'help', 'stack', 'projects'..."
          />
        </div>
      </div>
    </div>
  );
}
