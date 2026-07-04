import type { ReactNode } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { hasAnyRole } from '@/auth/roles'
import type { UserRole } from '@/api/types'
import { PageHeader } from '@/components/layout/PageHeader'

interface RequireRoleProps {
  children: ReactNode
  roles: UserRole[]
  fallback?: ReactNode
}

export function RequireRole({ children, roles, fallback }: RequireRoleProps) {
  const { user } = useAuth()
  const allowed = hasAnyRole(user?.roles, roles)

  if (!allowed) {
    return (
      fallback ?? (
        <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
          <PageHeader title="Not authorized" description="You do not have permission to view this page." />
        </div>
      )
    )
  }

  return children
}
