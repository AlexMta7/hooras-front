import { cn } from '@/lib/utils'

const projectStatusStyles: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  pending_review: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  published: 'bg-primary/10 text-primary',
  accepting_applications: 'bg-primary/15 text-primary',
  in_execution: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  closed: 'bg-muted text-muted-foreground',
  archived: 'bg-muted text-muted-foreground',
  rejected: 'bg-destructive/15 text-destructive',
  cancelled: 'bg-muted text-muted-foreground',
  suspended: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
}

const applicationStatusStyles: Record<string, string> = {
  submitted: 'bg-primary/10 text-primary',
  approved: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  rejected: 'bg-destructive/15 text-destructive',
  cancelled: 'bg-muted text-muted-foreground',
  waitlisted: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
}

const approvalStatusStyles: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  approved: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  rejected: 'bg-destructive/15 text-destructive',
}

function formatLabel(value: string) {
  return value.replace(/_/g, ' ')
}

interface StatusBadgeProps {
  status: string
  kind?: 'project' | 'application' | 'approval' | 'generic'
  className?: string
}

export function StatusBadge({ status, kind = 'generic', className }: StatusBadgeProps) {
  const styleMap =
    kind === 'project'
      ? projectStatusStyles
      : kind === 'application'
        ? applicationStatusStyles
        : kind === 'approval'
          ? approvalStatusStyles
          : {}

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        styleMap[status] ?? 'bg-muted text-muted-foreground',
        className,
      )}
    >
      {formatLabel(status)}
    </span>
  )
}
