import { useRouterState } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { UserMenu } from '@/components/layout/UserMenu'
import {
  DASHBOARD_NAV_ITEM,
  filterNavGroups,
  flattenNavItems,
} from '@/components/layout/nav-config'
import { useAuth } from '@/auth/AuthProvider'
import type { UserRole } from '@/api/types'

function getPageLabel(pathname: string, userRoles: UserRole[] | undefined) {
  const groups = filterNavGroups(userRoles)
  const items = [DASHBOARD_NAV_ITEM, ...flattenNavItems(groups)]

  const match = items.find((item) => {
    if (item.to === '/') return pathname === '/'
    return pathname === item.to || pathname.startsWith(`${item.to}/`)
  })

  return match?.label ?? 'Dashboard'
}

export function AdminHeader() {
  const { user } = useAuth()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const pageLabel = getPageLabel(pathname, user?.roles)

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h2 className="text-[length:var(--text-body)] font-semibold text-foreground">{pageLabel}</h2>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
