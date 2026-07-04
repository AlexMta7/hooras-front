import { useProgressReport, useProjectReport } from '@/api/hooks'
import { QueryState } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'

function MetricCard({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value ?? '—'}</p>
    </div>
  )
}

export function ReportsPage() {
  const progressQuery = useProgressReport()
  const projectReportQuery = useProjectReport()

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader title="Reports" description="Platform progress and project metrics." />

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
              <MetricCard label="Active assignments" value={progressQuery.data?.activeAssignments} />
              <MetricCard label="Completed assignments" value={progressQuery.data?.completedAssignments} />
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
              <MetricCard label="Published projects" value={projectReportQuery.data?.publishedProjects} />
              <MetricCard label="Scraped pending review" value={projectReportQuery.data?.scrapedPendingReview} />
              <MetricCard label="Applications" value={projectReportQuery.data?.applications} />
            </div>
          </section>
        </QueryState>
      </div>
    </div>
  )
}
