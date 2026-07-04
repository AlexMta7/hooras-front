import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { HourLogsPage } from '@/pages/hour-logs/HourLogsPage'

export const Route = createFileRoute('/hour-logs')({
  component: () => (
    <RequireAuth>
      <RequireRole
        roles={['student', 'coordinator', 'faculty_supervisor', 'external_supervisor', 'admin']}
      >
        <HourLogsPage />
      </RequireRole>
    </RequireAuth>
  ),
})
