import React from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  color?: "cyan" | "green"
}

export function SectionTitle({ children, className = "", color = "cyan" }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "w-1.5 h-8 rounded-full",
        color === "cyan" ? "bg-primary" : "bg-emerald-500"
      )} />
      <h2 className={cn(
        "text-2xl md:text-3xl font-bold tracking-tight",
        color === "cyan" ? "text-primary" : "text-emerald-600"
      )}>
        {children}
      </h2>
    </div>
  )
}
