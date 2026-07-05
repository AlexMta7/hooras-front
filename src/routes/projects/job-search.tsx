import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { JobSearchPage } from '@/pages/projects/JobSearchPage'

export const Route = createFileRoute('/projects/job-search')({
  component: () => (
    <RequireAuth>
      <RequireRole roles={['coordinator', 'admin']}>
        <JobSearchPage />
      </RequireRole>
    </RequireAuth>
  ),
})
