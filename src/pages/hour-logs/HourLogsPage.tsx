import { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { isStudent, canManageProjects } from '@/auth/roles'
import {
  useHourLogs,
  useCreateHourLog,
  useApproveHourLog,
  useRejectHourLog,
  useAssignments,
} from '@/api/hooks'
import type { ApprovalStatus } from '@/api/types'
import {
  SelectField,
  CalendarField,
  TimeField,
  NumberField,
  UploadField,
  type UploadFieldItem,
} from '@/components/forms'
import { Editor } from '@/components/editor'
import { QueryState, ConfirmDialog } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'

const STATUS_OPTIONS: { label: string; value: ApprovalStatus | '' }[] = [
  { label: 'All statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
]

const CATEGORY_OPTIONS = [
  { label: 'Community', value: 'community' },
  { label: 'Environmental', value: 'environmental' },
  { label: 'Disciplinary', value: 'disciplinary' },
  { label: 'Research', value: 'research' },
  { label: 'Administrative', value: 'administrative' },
  { label: 'Other', value: 'other' },
]

export function HourLogsPage() {
  const { user } = useAuth()
  const student = isStudent(user?.roles)
  const canReview = canManageProjects(user?.roles)

  const [status, setStatus] = useState<ApprovalStatus | ''>('')
  const hourLogsQuery = useHourLogs(status ? { status } : undefined)
  const assignmentsQuery = useAssignments()
  const createMutation = useCreateHourLog()
  const approveMutation = useApproveHourLog()
  const rejectMutation = useRejectHourLog()

  const [showForm, setShowForm] = useState(false)
  const [assignmentId, setAssignmentId] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [durationHours, setDurationHours] = useState(1)
  const [category, setCategory] = useState('community')
  const [description, setDescription] = useState('')
  const [evidence, setEvidence] = useState<UploadFieldItem[]>([])

  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const assignmentOptions =
    assignmentsQuery.data?.map((a) => ({
      label: `${a.studentRef} — ${a.projectId}`,
      value: a.id,
    })) ?? []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync({
        assignmentId,
        date,
        startTime: startTime || undefined,
        endTime: endTime || undefined,
        durationHours,
        category: category as 'community',
        description,
        evidenceIds: evidence.filter((f) => f.status === 'done').map((f) => f.id),
      })
      toastMutationSuccess('Hour log submitted')
      setShowForm(false)
    } catch (error) {
      toastMutationError(error)
    }
  }

  const handleApprove = async (hourLogId: string) => {
    try {
      await approveMutation.mutateAsync(hourLogId)
      toastMutationSuccess('Hour log approved')
    } catch (error) {
      toastMutationError(error)
    }
  }

  const handleReject = async () => {
    if (!rejectId) return
    try {
      await rejectMutation.mutateAsync({ hourLogId: rejectId, reason: rejectReason })
      toastMutationSuccess('Hour log rejected')
      setRejectId(null)
      setRejectReason('')
    } catch (error) {
      toastMutationError(error)
    }
  }

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader
        title="Hour Logs"
        description="Submit and review social hours activity."
        actions={
          student ? (
            <Button onClick={() => setShowForm((v) => !v)}>
              {showForm ? 'Hide form' : 'Submit hours'}
            </Button>
          ) : undefined
        }
      />

      <div className="mb-6 max-w-xs">
        <SelectField
          label="Status"
          name="status"
          value={status}
          options={STATUS_OPTIONS}
          onChange={(e) => setStatus(e.target.value as ApprovalStatus | '')}
        />
      </div>

      {showForm && student ? (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">Submit hour log</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Assignment"
              name="assignmentId"
              value={assignmentId}
              options={assignmentOptions}
              onChange={(e) => setAssignmentId(String(e.target.value))}
            />
            <CalendarField
              label="Date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TimeField
              label="Start time"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <TimeField
              label="End time"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <NumberField
              label="Duration (hours)"
              name="durationHours"
              value={durationHours}
              min={0.5}
              step={0.5}
              onChange={(e) => setDurationHours(e.target.value)}
            />
            <SelectField
              label="Category"
              name="category"
              value={category}
              options={CATEGORY_OPTIONS}
              onChange={(e) => setCategory(String(e.target.value))}
            />
          </div>
          <div className="mt-4">
            <Editor
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <UploadField
              label="Evidence"
              name="evidence"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-4" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Submitting…' : 'Submit'}
          </Button>
        </form>
      ) : null}

      <QueryState
        isLoading={hourLogsQuery.isLoading}
        isError={hourLogsQuery.isError}
        error={hourLogsQuery.error}
        isEmpty={!hourLogsQuery.data?.length}
        onRetry={() => void hourLogsQuery.refetch()}
        emptyTitle="No hour logs found"
      >
        <div className="space-y-4">
          {hourLogsQuery.data?.map((log) => (
            <article
              key={log.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-foreground">{log.date}</h2>
                    <StatusBadge status={log.status} kind="approval" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {log.durationHours}h — {log.category}
                  </p>
                </div>
                {canReview && log.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => void handleApprove(log.id)}>
                      Approve
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setRejectId(log.id)}>
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
        title="Reject hour log"
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
