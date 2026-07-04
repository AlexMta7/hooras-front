import { useEffect, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/auth/AuthProvider'

interface RequireAuthProps {
  children: ReactNode
  redirectTo?: string
}

export function RequireAuth({ children, redirectTo = '/login' }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void navigate({ to: redirectTo })
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading session…</p>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return children
}
