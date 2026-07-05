import { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { canManageProjects, usesStudentApi } from '@/auth/roles'
import {
  useApplications,
  useApproveApplication,
  useRejectApplication,
} from '@/api/hooks'
import type { ApplicationStatus } from '@/api/types'
import { SelectField } from '@/components/forms'
import { QueryState, ConfirmDialog } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
import { Editor } from '@/components/editor'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'

const STATUS_OPTIONS: { label: string; value: ApplicationStatus | '' }[] = [
  { label: 'All statuses', value: '' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Waitlisted', value: 'waitlisted' },
  { label: 'Cancelled', value: 'cancelled' },
]

export function ApplicationsPage() {
  const { user } = useAuth()
  const canReview = canManageProjects(user?.roles)
  const studentScope = usesStudentApi(user?.roles)

  const [status, setStatus] = useState<ApplicationStatus | ''>('')
  const applicationsQuery = useApplications(status ? { status } : undefined, { studentScope })
  const approveMutation = useApproveApplication()
  const rejectMutation = useRejectApplication()

  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const handleApprove = async (applicationId: string) => {
    try {
      await approveMutation.mutateAsync(applicationId)
      toastMutationSuccess('Application approved')
    } catch (error) {
      toastMutationError(error)
    }
  }

  const handleReject = async () => {
    if (!rejectId) return
    try {
      await rejectMutation.mutateAsync({ applicationId: rejectId, reason: rejectReason })
      toastMutationSuccess('Application rejected')
      setRejectId(null)
      setRejectReason('')
    } catch (error) {
      toastMutationError(error)
    }
  }

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader
        title="Applications"
        description={
          canReview
            ? 'Review and manage project applications.'
            : 'Track your submitted project applications.'
        }
      />

      <div className="mb-6 max-w-xs">
        <SelectField
          label="Status"
          name="status"
          value={status}
          options={STATUS_OPTIONS}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus | '')}
        />
      </div>

      <QueryState
        isLoading={applicationsQuery.isLoading}
        isError={applicationsQuery.isError}
        error={applicationsQuery.error}
        isEmpty={!applicationsQuery.data?.length}
        onRetry={() => void applicationsQuery.refetch()}
        emptyTitle="No applications found"
      >
        <div className="space-y-4">
          {applicationsQuery.data?.map((application) => (
            <article
              key={application.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {!studentScope ? (
                      <h2 className="font-semibold text-foreground">{application.studentRef}</h2>
                    ) : null}
                    <StatusBadge status={application.status} kind="application" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Project {application.projectId}
                  </p>
                  {application.motivation ? (
                    <div className="mt-3 text-sm text-muted-foreground line-clamp-3">
                      {application.motivation.replace(/<[^>]+>/g, '')}
                    </div>
                  ) : null}
                </div>
                {canReview && application.status === 'submitted' ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => void handleApprove(application.id)}
                      disabled={approveMutation.isPending}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setRejectId(application.id)}
                    >
                      Reject
                    </Button>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </QueryState>

      <ConfirmDialog
        open={Boolean(rejectId)}
        onOpenChange={(open) => {
          if (!open) {
            setRejectId(null)
            setRejectReason('')
          }
        }}
        title="Reject application"
        description="Provide an optional reason for the student."
        confirmLabel="Reject"
        variant="destructive"
        isLoading={rejectMutation.isPending}
        onConfirm={handleReject}
      >
        <Editor
          label="Reason"
          name="reason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </ConfirmDialog>
    </div>
  )
}
