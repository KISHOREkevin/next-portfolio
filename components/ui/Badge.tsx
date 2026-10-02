import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "mauve"
    | "blue"
    | "teal"
    | "green"
    | "peach"
    | "red"
    | "yellow"
    | "tech"
    | "accent"
    | "success";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#313244] text-[#cdd6f4] border-[#45475a]",
    outline: "bg-transparent text-[#a6adc8] border-[#45475a] hover:border-[#585b70]",
    secondary: "bg-[#181825] text-[#a6adc8] border-[#313244]",
    mauve: "bg-[#cba6f7]/15 text-[#cba6f7] border-[#cba6f7]/30 font-medium",
    blue: "bg-[#89b4fa]/15 text-[#89b4fa] border-[#89b4fa]/30",
    teal: "bg-[#94e2d5]/15 text-[#94e2d5] border-[#94e2d5]/30",
    green: "bg-[#a6e3a1]/15 text-[#a6e3a1] border-[#a6e3a1]/30",
    peach: "bg-[#fab387]/15 text-[#fab387] border-[#fab387]/30",
    red: "bg-[#f38ba8]/15 text-[#f38ba8] border-[#f38ba8]/30",
    yellow: "bg-[#f9e2af]/15 text-[#f9e2af] border-[#f9e2af]/30",
    tech: "bg-[#181825] text-[#bac2de] border-[#313244] font-mono text-[11px]",
    accent: "bg-[#cba6f7]/15 text-[#cba6f7] border-[#cba6f7]/30 font-medium",
    success: "bg-[#a6e3a1]/15 text-[#a6e3a1] border-[#a6e3a1]/30 font-medium"
  };

  const sizeStyles = {
    sm: "px-1.5 py-0.5 text-[11px] font-mono",
    md: "px-2 py-0.5 text-xs font-mono"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border tracking-tight transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
