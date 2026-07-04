import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { ApplicationsPage } from '@/pages/applications/ApplicationsPage'

export const Route = createFileRoute('/applications')({
  component: () => (
    <RequireAuth>
      <RequireRole roles={['student', 'coordinator', 'admin']}>
        <ApplicationsPage />
      </RequireRole>
    </RequireAuth>
  ),
})
