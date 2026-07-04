import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppShell } from '@/components/layout/AppShell'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AppShell>
          <Outlet />
        </AppShell>
        <Toaster />
        {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
      </TooltipProvider>
    </ThemeProvider>
  )
}
