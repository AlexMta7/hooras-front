import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useAuth } from '@/auth/AuthProvider'
import { canManageProjects, isStudent } from '@/auth/roles'
import { useProjects, type ProjectFilters } from '@/api/hooks'
import type { ProjectStatus, ProjectSourceType } from '@/api/types'
import { SelectField } from '@/components/forms'
import { QueryState } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
const STUDENT_VISIBLE_STATUSES: ProjectStatus[] = [
  'published',
  'accepting_applications',
  'in_execution',
]

const STATUS_OPTIONS: { label: string; value: ProjectStatus | '' }[] = [
  { label: 'All statuses', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Accepting applications', value: 'accepting_applications' },
  { label: 'In execution', value: 'in_execution' },
  { label: 'Closed', value: 'closed' },
  { label: 'Archived', value: 'archived' },
]

const SOURCE_OPTIONS: { label: string; value: ProjectSourceType | '' }[] = [
  { label: 'All sources', value: '' },
  { label: 'College created', value: 'college_created' },
  { label: 'Scraped', value: 'scraped' },
]

export function ProjectsPage() {
  const { user } = useAuth()
  const student = isStudent(user?.roles)
  const canManage = canManageProjects(user?.roles)

  const [status, setStatus] = useState<ProjectStatus | ''>('')
  const [sourceType, setSourceType] = useState<ProjectSourceType | ''>('')
  const [category, setCategory] = useState('')

  const filters: ProjectFilters = {
    ...(status ? { status } : {}),
    ...(sourceType ? { sourceType } : {}),
    ...(category ? { category } : {}),
  }

  const projectsQuery = useProjects(filters)

  const visibleProjects = useMemo(() => {
    const items = projectsQuery.data ?? []
    if (!student) return items
    return items.filter((project) => STUDENT_VISIBLE_STATUSES.includes(project.status))
  }, [projectsQuery.data, student])

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader
        title="Projects"
        description="Browse and manage social hours projects."
        actions={
          canManage ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link to="/projects/job-search">
                  <Search className="mr-2 h-4 w-4" />
                  Find jobs
                </Link>
              </Button>
              <Button asChild>
                <Link to="/projects/new">New project</Link>
              </Button>
            </div>
          ) : undefined
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {!student ? (
          <SelectField
            label="Status"
            name="status"
            value={status}
            options={STATUS_OPTIONS}
            onChange={(e) => setStatus(e.target.value as ProjectStatus | '')}
          />
        ) : null}
        <SelectField
          label="Source"
          name="sourceType"
          value={sourceType}
          options={SOURCE_OPTIONS}
          onChange={(e) => setSourceType(e.target.value as ProjectSourceType | '')}
        />
        <SelectField
          label="Category"
          name="category"
          value={category}
          options={[{ label: 'All categories', value: '' }]}
          placeholder="Category filter"
          onChange={(e) => setCategory(String(e.target.value))}
        />
      </div>

      <QueryState
        isLoading={projectsQuery.isLoading}
        isError={projectsQuery.isError}
        error={projectsQuery.error}
        isEmpty={!visibleProjects.length}
        onRetry={() => void projectsQuery.refetch()}
        emptyTitle="No projects found"
        emptyDescription="Try adjusting your filters or check back later."
      >
        <div className="grid gap-4">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">{project.title}</h2>
                    <StatusBadge status={project.status} kind="project" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{project.organizationName}</p>
                  {project.location ? (
                    <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/projects/$projectId" params={{ projectId: project.id }}>
                    View details
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </QueryState>
    </div>
  )
}
