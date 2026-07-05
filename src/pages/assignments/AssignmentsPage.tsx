import { useState } from 'react'
import { useAuth } from '@/auth/AuthProvider'
import { usesStudentApi } from '@/auth/roles'
import { useAssignments, useSetAssignmentSupervisor, type StudentAssignment } from '@/api/hooks'
import { TextField } from '@/components/forms'
import { QueryState, ConfirmDialog } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'

function assignmentTitle(assignment: StudentAssignment, studentScope: boolean): string {
  if (studentScope && assignment.project?.title) {
    return assignment.project.title
  }
  return assignment.projectId
}

export function AssignmentsPage() {
  const { user } = useAuth()
  const studentScope = usesStudentApi(user?.roles)

  const assignmentsQuery = useAssignments(undefined, { studentScope })
  const supervisorMutation = useSetAssignmentSupervisor()

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [supervisorRef, setSupervisorRef] = useState('')

  const handleSetSupervisor = async () => {
    if (!selectedId || !supervisorRef.trim()) return
    try {
      await supervisorMutation.mutateAsync({
        assignmentId: selectedId,
        supervisorRef: supervisorRef.trim(),
      })
      toastMutationSuccess('Supervisor updated')
      setSelectedId(null)
      setSupervisorRef('')
    } catch (error) {
      toastMutationError(error)
    }
  }

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader
        title="Assignments"
        description={
          studentScope
            ? 'View your active project assignments.'
            : 'View project assignments and manage supervisors.'
        }
      />

      <QueryState
        isLoading={assignmentsQuery.isLoading}
        isError={assignmentsQuery.isError}
        error={assignmentsQuery.error}
        isEmpty={!assignmentsQuery.data?.length}
        onRetry={() => void assignmentsQuery.refetch()}
        emptyTitle="No assignments found"
      >
        <div className="space-y-4">
          {assignmentsQuery.data?.map((assignment) => {
            const studentAssignment = assignment as StudentAssignment
            return (
            <article
              key={assignment.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-foreground">
                      {studentScope
                        ? assignmentTitle(studentAssignment, studentScope)
                        : assignment.studentRef}
                    </h2>
                    <StatusBadge status={assignment.status} />
                  </div>
                  {!studentScope ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Project {assignment.projectId}
                    </p>
                  ) : null}
                  {studentAssignment.project?.organizationName ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {studentAssignment.project.organizationName}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm text-muted-foreground">
                    Supervisor: {assignment.supervisorRef ?? 'Not assigned'}
                  </p>
                </div>
                {!studentScope ? (
                  <Button size="sm" variant="secondary" onClick={() => setSelectedId(assignment.id)}>
                    Set supervisor
                  </Button>
                ) : null}
              </div>
            </article>
            )
          })}
        </div>
      </QueryState>

      {!studentScope ? (
        <ConfirmDialog
          open={Boolean(selectedId)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedId(null)
              setSupervisorRef('')
            }
          }}
          title="Set supervisor"
          description="Enter the supervisor reference for this assignment."
          confirmLabel="Save"
          isLoading={supervisorMutation.isPending}
          onConfirm={handleSetSupervisor}
        >
          <TextField
            label="Supervisor reference"
            name="supervisorRef"
            value={supervisorRef}
            onChange={(e) => setSupervisorRef(e.target.value)}
          />
        </ConfirmDialog>
      ) : null}
    </div>
  )
}
