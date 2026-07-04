import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { ProjectFormPage } from '@/pages/projects/ProjectFormPage'

export const Route = createFileRoute('/projects/new')({
  component: () => (
    <RequireAuth>
      <RequireRole roles={['coordinator', 'admin']}>
        <ProjectFormPage />
      </RequireRole>
    </RequireAuth>
  ),
})
