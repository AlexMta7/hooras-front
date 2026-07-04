import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 h-[var(--nav-height)] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-full max-w-[var(--page-max-width)] items-center justify-between px-4 sm:px-10">
          <Link
            to="/"
            className="text-[length:var(--text-body-lg)] font-semibold text-foreground"
          >
            Hooras UI
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Button size="sm" variant="secondary" aria-disabled="true" className="hidden sm:inline-flex">
              Get started
            </Button>
            <Button size="sm" aria-disabled="true">
              Sign up
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
