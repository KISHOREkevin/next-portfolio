"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  alphaTarget: number;
  alphaSpeed: number;
  colorRgbDark: string;
}

const DESKTOP_PARTICLES = 22;
const MOBILE_PARTICLES = 10;
const MAX_CONNECT_DIST = 150;
const MAX_CONNECT_ALPHA = 0.18;
const GLOW_RADIUS = 240; // 480px diameter
const CURSOR_LERP = 0.08;

// Tokyo Night / Nordic Aurora particle color palette
const DARK_PARTICLE_COLORS = [
  "6, 182, 212",   // Electric Cyan
  "168, 85, 247",  // Neon Violet
  "56, 189, 248",  // Nordic Sky Blue
  "230, 237, 247", // Starlight White
  "52, 211, 153",  // Aurora Green
];

function createParticle(width: number, height: number, isMobile: boolean): Particle {
  const speed = isMobile
    ? 0.12 + Math.random() * 0.15
    : 0.16 + Math.random() * 0.22;
  const angle = Math.random() * Math.PI * 2;
  const initialAlpha = 0.18 + Math.random() * 0.22;
  const colorIndex = Math.floor(Math.random() * DARK_PARTICLE_COLORS.length);

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: isMobile ? 0.9 + Math.random() * 0.6 : 1.0 + Math.random() * 1.0,
    alpha: initialAlpha,
    alphaTarget: initialAlpha,
    alphaSpeed: 0.003 + Math.random() * 0.003,
    colorRgbDark: DARK_PARTICLE_COLORS[colorIndex],
  };
}

export function AmbientBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const isLightRef = useRef(isLight);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isLightRef.current = isLight;
  }, [isLight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let rafId = 0;
    let isPaused = false;

    const rawCursor = { x: -9999, y: -9999 };
    const smoothCursor = { x: -9999, y: -9999 };

    function initSize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = Array.from({ length: count }, () =>
          createParticle(width, height, isMobile)
        );
      }
    }

    initSize();

    const handleResize = () => {
      initSize();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const handleVisibility = () => {
      isPaused = document.hidden;
      if (!document.hidden) {
        rafId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleMouseMove = (e: MouseEvent) => {
      rawCursor.x = e.clientX;
      rawCursor.y = e.clientY;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    function animate() {
      if (isPaused) return;

      // Safely clear canvas using unscaled coordinates
      ctx!.save();
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.restore();

      const light = isLightRef.current;

      // ── Cursor-Following Radial Glow ─────────────────────────────
      if (!isMobile && glowRef.current && !prefersReduced && rawCursor.x > -1000) {
        smoothCursor.x += (rawCursor.x - smoothCursor.x) * CURSOR_LERP;
        smoothCursor.y += (rawCursor.y - smoothCursor.y) * CURSOR_LERP;
        glowRef.current.style.transform = `translate3d(${smoothCursor.x - GLOW_RADIUS}px, ${smoothCursor.y - GLOW_RADIUS}px, 0)`;
        glowRef.current.style.opacity = "1";
      }

      if (!prefersReduced) {
        // ── Occasional Connection Lines (Desktop only) ─────────────
        if (!isMobile) {
          const lineBaseRgb = light ? "15, 23, 42" : "56, 189, 248";
          for (let i = 0; i < particles.length - 1; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const p1 = particles[i];
              const p2 = particles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < MAX_CONNECT_DIST) {
                const lineAlpha =
                  MAX_CONNECT_ALPHA * Math.pow(1 - dist / MAX_CONNECT_DIST, 2);
                ctx!.beginPath();
                ctx!.moveTo(p1.x, p1.y);
                ctx!.lineTo(p2.x, p2.y);
                ctx!.strokeStyle = `rgba(${lineBaseRgb},${lineAlpha.toFixed(4)})`;
                ctx!.lineWidth = 0.6;
                ctx!.stroke();
              }
            }
          }
        }

        // ── Drifting Particles with Subtle Breathing ──────────────
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          const margin = 20;
          if (p.x < -margin) p.x = width + margin;
          if (p.x > width + margin) p.x = -margin;
          if (p.y < -margin) p.y = height + margin;
          if (p.y > height + margin) p.y = -margin;

          p.alpha += (p.alphaTarget - p.alpha) * p.alphaSpeed;
          if (Math.abs(p.alpha - p.alphaTarget) < 0.008) {
            p.alphaTarget = 0.18 + Math.random() * 0.22;
          }

          const particleRgb = light ? "15, 23, 42" : p.colorRgbDark;

          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${particleRgb},${p.alpha.toFixed(3)})`;
          ctx!.fill();
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="ambient-background pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* 1. Nordic Aurora Atmosphere Ambient Mesh (Tokyo Night gradients) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: isLight
            ? "radial-gradient(circle at 15% 15%, rgba(2, 132, 199, 0.05) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(124, 58, 237, 0.04) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 12% 16%, rgba(6, 182, 212, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 88% 84%, rgba(168, 85, 247, 0.10) 0%, transparent 55%), radial-gradient(ellipse at 50% 12%, rgba(56, 189, 248, 0.05) 0%, transparent 45%)",
        }}
      />

      {/* 2. Starry / Cybernetic Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isLight
            ? "radial-gradient(circle, rgba(15, 23, 42, 0.08) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(56, 189, 248, 0.10) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* 3. Living Particles & Aurora Connection Lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none block"
      />

      {/* 4. Dual-Radial Aurora Cursor-Following Glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: GLOW_RADIUS * 2,
          height: GLOW_RADIUS * 2,
          top: 0,
          left: 0,
          transform: "translate3d(-9999px, -9999px, 0)",
          background: isLight
            ? "radial-gradient(circle at center, rgba(2, 132, 199, 0.08) 0%, rgba(15, 23, 42, 0.02) 45%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(6, 182, 212, 0.14) 0%, rgba(168, 85, 247, 0.07) 38%, rgba(56, 189, 248, 0.02) 60%, transparent 75%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
          willChange: "transform",
        }}
      />
    </div>
  );
}
