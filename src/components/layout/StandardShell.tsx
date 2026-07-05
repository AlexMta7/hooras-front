import { Link } from '@tanstack/react-router'
import { AppNavbar } from '@/components/layout/AppNavbar'
import { MobileNav } from '@/components/layout/MobileNav'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { UserMenu } from '@/components/layout/UserMenu'

interface StandardShellProps {
  children: React.ReactNode
}

export function StandardShell({ children }: StandardShellProps) {
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
            <UserMenu />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
