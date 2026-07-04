import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { AssignmentsPage } from '@/pages/assignments/AssignmentsPage'

export const Route = createFileRoute('/assignments')({
  component: () => (
    <RequireAuth>
      <RequireRole
        roles={['student', 'coordinator', 'faculty_supervisor', 'external_supervisor', 'admin']}
      >
        <AssignmentsPage />
      </RequireRole>
    </RequireAuth>
  ),
})
