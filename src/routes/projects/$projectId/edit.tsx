import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { ProjectFormPage } from '@/pages/projects/ProjectFormPage'

export const Route = createFileRoute('/projects/$projectId/edit')({
  component: ProjectEditRoute,
})

function ProjectEditRoute() {
  const { projectId } = Route.useParams()
  return (
    <RequireAuth>
      <RequireRole roles={['coordinator', 'admin']}>
        <ProjectFormPage projectId={projectId} />
      </RequireRole>
    </RequireAuth>
  )
}
