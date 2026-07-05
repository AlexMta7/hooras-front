import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardList,
  Clock,
  FileText,
  FolderKanban,
  LayoutDashboard,
  ScrollText,
  Settings,
  Shield,
  User,
} from 'lucide-react'
import type { UserRole } from '@/api/types'
import { hasAnyRole } from '@/auth/roles'

export interface NavLinkItem {
  label: string
  to: string
  roles?: UserRole[]
  icon?: LucideIcon
}

export interface NavGroup {
  label: string
  items: NavLinkItem[]
  roles?: UserRole[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Work',
    roles: ['student', 'coordinator', 'faculty_supervisor', 'external_supervisor', 'admin', 'auditor'],
    items: [
      { label: 'Projects', to: '/projects', icon: FolderKanban },
      {
        label: 'Applications',
        to: '/applications',
        roles: ['student', 'coordinator', 'admin'],
        icon: ClipboardList,
      },
      {
        label: 'Assignments',
        to: '/assignments',
        roles: ['student', 'coordinator', 'faculty_supervisor', 'external_supervisor', 'admin'],
        icon: BookOpen,
      },
      {
        label: 'Hour Logs',
        to: '/hour-logs',
        roles: ['student', 'coordinator', 'faculty_supervisor', 'external_supervisor', 'admin'],
        icon: Clock,
      },
    ],
  },
  {
    label: 'Records',
    items: [
      { label: 'Documents', to: '/documents', icon: FileText },
      { label: 'Certificates', to: '/certificates', roles: ['coordinator', 'admin'], icon: ScrollText },
      { label: 'My Profile', to: '/profile', roles: ['student'], icon: User },
    ],
  },
  {
    label: 'Manage',
    roles: ['coordinator', 'admin', 'auditor'],
    items: [
      { label: 'Rules', to: '/rules', roles: ['coordinator', 'admin'], icon: Settings },
      { label: 'Reports', to: '/reports', roles: ['coordinator', 'admin', 'auditor'], icon: BarChart3 },
      { label: 'Modules', to: '/modules', roles: ['admin'], icon: BookOpen },
      { label: 'Providers', to: '/providers', roles: ['admin'], icon: Building2 },
      { label: 'Audit', to: '/audit', roles: ['admin'], icon: Shield },
    ],
  },
]

export const DASHBOARD_NAV_ITEM: NavLinkItem = {
  label: 'Dashboard',
  to: '/',
  icon: LayoutDashboard,
}

export function filterNavGroups(userRoles: UserRole[] | undefined): NavGroup[] {
  return NAV_GROUPS.map((group) => {
    if (group.roles && !hasAnyRole(userRoles, group.roles)) return null

    const items = group.items.filter((item) => !item.roles || hasAnyRole(userRoles, item.roles))
    if (!items.length) return null

    return { ...group, items }
  }).filter((group): group is NavGroup => group !== null)
}

export function flattenNavItems(groups: NavGroup[]): NavLinkItem[] {
  return groups.flatMap((group) => group.items)
}
