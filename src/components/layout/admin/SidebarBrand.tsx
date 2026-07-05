import { Link } from '@tanstack/react-router'
import { GalleryVerticalEnd } from 'lucide-react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuth } from '@/auth/AuthProvider'
import { hasRole } from '@/auth/roles'

export function SidebarBrand() {
  const { user } = useAuth()
  const isAdmin = hasRole(user?.roles, 'admin')

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link to="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Hooras</span>
              <span className="truncate text-xs text-muted-foreground">
                {isAdmin ? 'Administration' : 'Coordination'}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
