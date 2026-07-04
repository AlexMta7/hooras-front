import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { ProjectsPage } from '@/pages/projects/ProjectsPage'

export const Route = createFileRoute('/projects/')({
  component: () => (
    <RequireAuth>
      <ProjectsPage />
    </RequireAuth>
  ),
})
