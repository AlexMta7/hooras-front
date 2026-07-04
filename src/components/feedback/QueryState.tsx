import type { ReactNode } from 'react'
import { AlertCircle, Inbox, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface QueryStateProps {
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  error?: Error | null
  onRetry?: () => void
  loadingMessage?: string
  emptyTitle?: string
  emptyDescription?: string
  children: ReactNode
  className?: string
}

export function QueryState({
  isLoading,
  isError,
  isEmpty,
  error,
  onRetry,
  loadingMessage = 'Loading…',
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'No records match your current filters.',
  children,
  className,
}: QueryStateProps) {
  if (isLoading) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3 py-16', className)}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden />
        <p className="text-muted-foreground">{loadingMessage}</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
        <AlertCircle className="h-8 w-8 text-destructive" aria-hidden />
        <div>
          <p className="font-medium text-foreground">Something went wrong</p>
          <p className="mt-1 text-sm text-muted-foreground">{error?.message ?? 'Unable to load data.'}</p>
        </div>
        {onRetry ? (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
        <Inbox className="h-8 w-8 text-muted-foreground" aria-hidden />
        <div>
          <p className="font-medium text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
        </div>
      </div>
    )
  }

  return children
}
