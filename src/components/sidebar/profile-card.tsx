import { UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  collapsed: boolean
}

export function ProfileCard({ collapsed }: ProfileCardProps): React.ReactNode {
  return (
    <div className={cn(
      "flex items-center rounded-md bg-gray-50 p-3",
      collapsed ? "justify-center" : "justify-between"
    )}>
      <UserButton />
      
      {!collapsed && (
        <div className="ml-3 flex flex-col">
          <span className="text-sm font-medium text-gray-700">Profile</span>
          <span className="text-xs text-gray-500">Account Settings</span>
        </div>
      )}
    </div>
  )
} 