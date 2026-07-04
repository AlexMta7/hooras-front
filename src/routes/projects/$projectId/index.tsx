import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { ProjectDetailPage } from '@/pages/projects/ProjectDetailPage'

export const Route = createFileRoute('/projects/$projectId/')({
  component: ProjectDetailRoute,
})

function ProjectDetailRoute() {
  const { projectId } = Route.useParams()
  return (
    <RequireAuth>
      <ProjectDetailPage projectId={projectId} />
    </RequireAuth>
  )
}
