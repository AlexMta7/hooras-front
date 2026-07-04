import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { ReportsPage } from '@/pages/reports/ReportsPage'

export const Route = createFileRoute('/reports')({
  component: () => (
    <RequireAuth>
      <RequireRole roles={['coordinator', 'admin', 'auditor']}>
        <ReportsPage />
      </RequireRole>
    </RequireAuth>
  ),
})
