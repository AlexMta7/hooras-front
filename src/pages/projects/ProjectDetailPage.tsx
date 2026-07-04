import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useAuth } from '@/auth/AuthProvider'
import { canManageProjects, isStudent } from '@/auth/roles'
import {
  useProject,
  useProjectApplications,
  usePublishProject,
  useArchiveProject,
  useCreateApplication,
} from '@/api/hooks'
import { QueryState } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PreviewEditor, Editor } from '@/components/editor'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'

interface ProjectDetailPageProps {
  projectId: string
}

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const { user } = useAuth()
  const student = isStudent(user?.roles)
  const canManage = canManageProjects(user?.roles)

  const projectQuery = useProject(projectId)
  const applicationsQuery = useProjectApplications(projectId)
  const publishMutation = usePublishProject()
  const archiveMutation = useArchiveProject()
  const applyMutation = useCreateApplication(projectId)

  const [applyOpen, setApplyOpen] = useState(false)
  const [motivation, setMotivation] = useState('')

  const handlePublish = async () => {
    try {
      await publishMutation.mutateAsync(projectId)
      toastMutationSuccess('Project published')
    } catch (error) {
      toastMutationError(error)
    }
  }

  const handleArchive = async () => {
    try {
      await archiveMutation.mutateAsync(projectId)
      toastMutationSuccess('Project archived')
    } catch (error) {
      toastMutationError(error)
    }
  }

  const handleApply = async () => {
    try {
      await applyMutation.mutateAsync({ motivation })
      toastMutationSuccess('Application submitted')
      setApplyOpen(false)
      setMotivation('')
    } catch (error) {
      toastMutationError(error, 'Unable to submit application.')
    }
  }

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <QueryState
        isLoading={projectQuery.isLoading}
        isError={projectQuery.isError}
        error={projectQuery.error}
        onRetry={() => void projectQuery.refetch()}
      >
        {projectQuery.data ? (
          <>
            <PageHeader
              title={projectQuery.data.title}
              description={projectQuery.data.organizationName}
              actions={
                <div className="flex flex-wrap gap-2">
                  {student ? (
                    <Button onClick={() => setApplyOpen(true)}>Apply</Button>
                  ) : null}
                  {canManage ? (
                    <>
                      <Button asChild variant="secondary">
                        <Link to="/projects/$projectId/edit" params={{ projectId }}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handlePublish}
                        disabled={publishMutation.isPending}
                      >
                        Publish
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleArchive}
                        disabled={archiveMutation.isPending}
                      >
                        Archive
                      </Button>
                    </>
                  ) : null}
                </div>
              }
            />

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <StatusBadge status={projectQuery.data.status} kind="project" />
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground">
                {projectQuery.data.sourceType.replace(/_/g, ' ')}
              </span>
            </div>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Description</h2>
              <PreviewEditor content={projectQuery.data.description} />
            </section>

            {canManage ? (
              <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Applications</h2>
                <QueryState
                  isLoading={applicationsQuery.isLoading}
                  isError={applicationsQuery.isError}
                  error={applicationsQuery.error}
                  isEmpty={!applicationsQuery.data?.length}
                  emptyTitle="No applications yet"
                  onRetry={() => void applicationsQuery.refetch()}
                >
                  <ul className="space-y-3">
                    {applicationsQuery.data?.map((application) => (
                      <li
                        key={application.id}
                        className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                      >
                        <div>
                          <p className="font-medium text-foreground">{application.studentRef}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(application.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <StatusBadge status={application.status} kind="application" />
                      </li>
                    ))}
                  </ul>
                </QueryState>
              </section>
            ) : null}
          </>
        ) : null}
      </QueryState>

      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle>Apply to project</DialogTitle>
          </DialogHeader>
          <Editor
            label="Motivation"
            name="motivation"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Explain why you want to join this project…"
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setApplyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={applyMutation.isPending}>
              {applyMutation.isPending ? 'Submitting…' : 'Submit application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
