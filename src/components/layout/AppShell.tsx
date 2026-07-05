import { AdminPanelShell } from '@/components/layout/admin/AdminPanelShell'
import { LayoutSkeleton } from '@/components/layout/LayoutSkeleton'
import { StandardShell } from '@/components/layout/StandardShell'
import { useAuth } from '@/auth/AuthProvider'
import { isManagementUser } from '@/auth/roles'

interface AppShellProps {
  children: React.ReactNode
  bare?: boolean
}

export function AppShell({ children, bare = false }: AppShellProps) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (bare || (!isLoading && !isAuthenticated)) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  if (isLoading) {
    return <LayoutSkeleton />
  }

  if (isManagementUser(user?.roles)) {
    return <AdminPanelShell>{children}</AdminPanelShell>
  }

  return <StandardShell>{children}</StandardShell>
}
