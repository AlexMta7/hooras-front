import { Link, useRouterState } from '@tanstack/react-router'
import {
  DASHBOARD_NAV_ITEM,
  filterNavGroups,
} from '@/components/layout/nav-config'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuth } from '@/auth/AuthProvider'
import { hasRole } from '@/auth/roles'

export function AppSidebar() {
  const { user } = useAuth()
  const groups = filterNavGroups(user?.roles)
  const isAdmin = hasRole(user?.roles, 'admin')
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/'
    return pathname === to || pathname.startsWith(`${to}/`)
  }

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-sm font-bold">H</span>
                </div>
                <div className="grid flex-1 text-left text-[length:var(--text-body-sm)] leading-tight">
                  <span className="truncate font-semibold">Hooras</span>
                  <span className="truncate text-[length:var(--text-caption)] text-muted-foreground">
                    {isAdmin ? 'Administration' : 'Coordination'}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(DASHBOARD_NAV_ITEM.to)}
                  tooltip={DASHBOARD_NAV_ITEM.label}
                >
                  <Link to={DASHBOARD_NAV_ITEM.to}>
                    {DASHBOARD_NAV_ITEM.icon ? <DASHBOARD_NAV_ITEM.icon /> : null}
                    <span>{DASHBOARD_NAV_ITEM.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.to)}
                      tooltip={item.label}
                    >
                      <Link to={item.to}>
                        {item.icon ? <item.icon /> : null}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
