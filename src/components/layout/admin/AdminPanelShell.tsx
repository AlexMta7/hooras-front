import { AppSidebar } from '@/components/layout/admin/AppSidebar'
import { AdminHeader } from '@/components/layout/admin/AdminHeader'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

interface AdminPanelShellProps {
  children: React.ReactNode
}

export function AdminPanelShell({ children }: AdminPanelShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex flex-1 flex-col gap-4 overflow-auto p-4 sm:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
