import { useStudentProfile, useRefreshProfile, useDocumentRequirements } from '@/api/hooks'
import { useAuth } from '@/auth/AuthProvider'
import { usesStudentApi } from '@/auth/roles'
import { getStoredToken } from '@/api/client'
import { QueryState } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
import { PreviewEditor } from '@/components/editor'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'
import { DocumentRequirementCard } from '@/pages/documents/DocumentRequirementCard'

export function ProfilePage() {
  const { user } = useAuth()
  const studentScope = usesStudentApi(user?.roles)
  const profileQuery = useStudentProfile()
  const refreshMutation = useRefreshProfile()
  const documentsQuery = useDocumentRequirements({ studentScope: true })

  const uploadHeaders = (() => {
    const token = getStoredToken()
    return token ? { Authorization: `Bearer ${token}` } : undefined
  })()

  const handleRefresh = async () => {
    try {
      await refreshMutation.mutateAsync()
      toastMutationSuccess('Profile refreshed', 'Academic data was synced from the provider.')
    } catch (error) {
      toastMutationError(error, 'Unable to refresh profile.')
    }
  }

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader
        title="My Profile"
        description="Academic profile, eligibility, and required documents."
        actions={
          <Button onClick={handleRefresh} disabled={refreshMutation.isPending}>
            {refreshMutation.isPending ? 'Refreshing…' : 'Refresh'}
          </Button>
        }
      />

      <QueryState
        isLoading={profileQuery.isLoading}
        isError={profileQuery.isError}
        error={profileQuery.error}
        onRetry={() => void profileQuery.refetch()}
      >
        {profileQuery.data ? (
          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
              <h2 className="text-lg font-semibold text-foreground">Academic profile</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Name</dt>
                  <dd className="font-medium text-foreground">
                    {profileQuery.data.academicProfile.displayName ?? '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Program</dt>
                  <dd className="font-medium text-foreground">
                    {profileQuery.data.academicProfile.programName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Faculty</dt>
                  <dd className="font-medium text-foreground">
                    {profileQuery.data.academicProfile.facultyName ?? '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="font-medium capitalize text-foreground">
                    {profileQuery.data.academicProfile.academicStatus}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Progress</dt>
                  <dd className="font-medium text-foreground">
                    {profileQuery.data.academicProfile.progressPercentage ?? '—'}%
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">GPA</dt>
                  <dd className="font-medium text-foreground">
                    {profileQuery.data.academicProfile.gpa ?? '—'}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-foreground">Eligibility</h2>
                <StatusBadge status={profileQuery.data.eligibility.status} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Completed hours</p>
                  <p className="text-xl font-semibold">{profileQuery.data.completedHours ?? 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining hours</p>
                  <p className="text-xl font-semibold">{profileQuery.data.remainingHours ?? 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Required hours</p>
                  <p className="text-xl font-semibold">
                    {profileQuery.data.eligibility.requiredHours}
                  </p>
                </div>
              </div>
              {profileQuery.data.eligibility.explanation ? (
                <div className="mt-4">
                  <PreviewEditor content={profileQuery.data.eligibility.explanation} />
                </div>
              ) : null}
            </section>

            {(documentsQuery.data?.length ?? 0) > 0 ? (
              <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
                <h2 className="text-lg font-semibold text-foreground">Required documents</h2>
                <div className="mt-4 space-y-4">
                  {documentsQuery.data?.map((req) => (
                    <DocumentRequirementCard
                      key={req.id}
                      requirement={req}
                      canManage={false}
                      studentScope={studentScope}
                      uploadHeaders={uploadHeaders}
                      onUploadComplete={() => {
                        void documentsQuery.refetch()
                        void profileQuery.refetch()
                      }}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {profileQuery.data.recommendedProjectCategories?.length ? (
              <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
                <h2 className="text-lg font-semibold text-foreground">Recommended categories</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profileQuery.data.recommendedProjectCategories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full bg-muted px-3 py-1 text-sm text-foreground"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </QueryState>
    </div>
  )
}
