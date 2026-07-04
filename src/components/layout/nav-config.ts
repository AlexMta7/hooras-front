import type { UserRole } from '@/api/types'
import { hasAnyRole } from '@/auth/roles'

export interface NavLinkItem {
  label: string
  to: string
  roles?: UserRole[]
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
      { label: 'Projects', to: '/projects' },
      {
        label: 'Applications',
        to: '/applications',
        roles: ['student', 'coordinator', 'admin'],
      },
      {
        label: 'Assignments',
        to: '/assignments',
        roles: ['student', 'coordinator', 'faculty_supervisor', 'external_supervisor', 'admin'],
      },
      {
        label: 'Hour Logs',
        to: '/hour-logs',
        roles: ['student', 'coordinator', 'faculty_supervisor', 'external_supervisor', 'admin'],
      },
    ],
  },
  {
    label: 'Records',
    items: [
      { label: 'Documents', to: '/documents' },
      { label: 'Certificates', to: '/certificates', roles: ['coordinator', 'admin'] },
      { label: 'My Profile', to: '/profile', roles: ['student'] },
    ],
  },
  {
    label: 'Manage',
    roles: ['coordinator', 'admin', 'auditor'],
    items: [
      { label: 'Rules', to: '/rules', roles: ['coordinator', 'admin'] },
      { label: 'Reports', to: '/reports', roles: ['coordinator', 'admin', 'auditor'] },
      { label: 'Modules', to: '/modules', roles: ['admin'] },
      { label: 'Providers', to: '/providers', roles: ['admin'] },
      { label: 'Audit', to: '/audit', roles: ['admin'] },
    ],
  },
]

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
