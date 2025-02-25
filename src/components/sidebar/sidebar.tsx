"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SidebarNav } from "./sidebar-nav"
import { ProfileCard } from "./profile-card"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps): React.ReactNode {
  const [collapsed, setCollapsed] = React.useState(false)

  // Toggle sidebar collapse on small screens
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <aside
      className={cn(
        "flex h-screen flex-col justify-between bg-white p-4 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex flex-col gap-8">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-start")}>
          {collapsed ? (
            <span className="text-2xl font-bold text-indigo-600">C</span>
          ) : (
            <span className="text-2xl font-bold text-indigo-600">Contently</span>
          )}
        </div>
        
        <SidebarNav collapsed={collapsed} />
      </div>
      
      <ProfileCard collapsed={collapsed} />
    </aside>
  )
} 