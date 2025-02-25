"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Calendar, 
  Settings 
} from "lucide-react"

interface SidebarNavProps {
  collapsed: boolean
}

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function SidebarNav({ collapsed }: SidebarNavProps): React.ReactNode {
  const pathname = usePathname()
  
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ]

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive 
                ? "bg-indigo-100 text-indigo-700" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <span className={cn(isActive ? "text-indigo-700" : "text-gray-500")}>
              {item.icon}
            </span>
            
            {!collapsed && (
              <span className="ml-3">{item.title}</span>
            )}
          </Link>
        )
      })}
    </nav>
  )
} 