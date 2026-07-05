import { Link } from '@tanstack/react-router'
import { useAuth } from '@/auth/AuthProvider'
import { isStudent, canViewReports } from '@/auth/roles'
import { useStudentProfile, useProgressReport, useProjectReport } from '@/api/hooks'
import { QueryState } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'

function MetricCard({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value ?? '—'}</p>
    </div>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  const studentView = isStudent(user?.roles)
  const reportsView = canViewReports(user?.roles)

  const profileQuery = useStudentProfile(studentView)
  const progressQuery = useProgressReport(reportsView)
  const projectReportQuery = useProjectReport(reportsView)

  const description = studentView
    ? 'Your social hours workspace overview.'
    : reportsView
      ? 'Platform progress and project metrics.'
      : 'Use the navigation menu to access your workspace.'

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader
        title={`Welcome${user?.displayName ? `, ${user.displayName}` : ''}`}
        description={description}
      />

      {studentView ? (
        <QueryState
          isLoading={profileQuery.isLoading}
          isError={profileQuery.isError}
          error={profileQuery.error}
          onRetry={() => void profileQuery.refetch()}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Completed hours" value={profileQuery.data?.completedHours} />
            <MetricCard label="Remaining hours" value={profileQuery.data?.remainingHours} />
            <MetricCard
              label="Required hours"
              value={profileQuery.data?.eligibility?.requiredHours}
            />
            <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
              <p className="text-sm text-muted-foreground">Eligibility</p>
              <div className="mt-3">
                <StatusBadge
                  status={profileQuery.data?.eligibility?.status ?? 'missing_data'}
                  kind="generic"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button asChild variant="secondary">
              <Link to="/profile">View full profile</Link>
            </Button>
          </div>
        </QueryState>
      ) : null}

      {reportsView ? (
        <div className="space-y-8">
          <QueryState
            isLoading={progressQuery.isLoading}
            isError={progressQuery.isError}
            error={progressQuery.error}
            onRetry={() => void progressQuery.refetch()}
          >
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Progress</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <MetricCard label="Total students" value={progressQuery.data?.totalStudents} />
                <MetricCard label="Eligible students" value={progressQuery.data?.eligibleStudents} />
                <MetricCard
                  label="Active assignments"
                  value={progressQuery.data?.activeAssignments}
                />
                <MetricCard
                  label="Completed assignments"
                  value={progressQuery.data?.completedAssignments}
                />
                <MetricCard label="Approved hours" value={progressQuery.data?.approvedHours} />
                <MetricCard label="Pending hour logs" value={progressQuery.data?.pendingHourLogs} />
              </div>
            </section>
          </QueryState>

          <QueryState
            isLoading={projectReportQuery.isLoading}
            isError={projectReportQuery.isError}
            error={projectReportQuery.error}
            onRetry={() => void projectReportQuery.refetch()}
          >
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Projects</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard label="Total projects" value={projectReportQuery.data?.totalProjects} />
                <MetricCard
                  label="Published projects"
                  value={projectReportQuery.data?.publishedProjects}
                />
                <MetricCard
                  label="Scraped pending review"
                  value={projectReportQuery.data?.scrapedPendingReview}
                />
                <MetricCard label="Applications" value={projectReportQuery.data?.applications} />
              </div>
            </section>
          </QueryState>
        </div>
      ) : null}

      {!studentView && !reportsView ? (
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-sm)]">
          <p className="text-muted-foreground">Use the navigation menu to access your workspace.</p>
        </div>
      ) : null}
    </div>
  )
}
