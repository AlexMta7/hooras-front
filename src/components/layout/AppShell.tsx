import { Link } from '@tanstack/react-router'
import { LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AppNavbar } from '@/components/layout/AppNavbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useAuth } from '@/auth/AuthProvider'
import { hasRole } from '@/auth/roles'

interface AppShellProps {
  children: React.ReactNode
  bare?: boolean
}

function getInitials(name?: string, email?: string) {
  const source = name || email || 'U'
  return source
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function AppShell({ children, bare = false }: AppShellProps) {
  const { user, logout, isAuthenticated, isLoading } = useAuth()

  if (bare || (!isLoading && !isAuthenticated)) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 h-[var(--nav-height)] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-full max-w-[var(--page-max-width)] items-center gap-4 px-4 sm:px-10">
          <MobileNav />
          <Link
            to="/"
            className="shrink-0 text-[length:var(--text-body-lg)] font-semibold text-foreground"
          >
            Hooras
          </Link>
          <div className="hidden flex-1 lg:flex">
            <AppNavbar />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2 rounded-lg">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {getInitials(user?.displayName, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[140px] truncate sm:inline">
                    {user?.displayName ?? user?.email ?? 'Account'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.displayName ?? 'Signed in'}</span>
                    {user?.email ? (
                      <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                    ) : null}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hasRole(user?.roles, 'student') ? (
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
