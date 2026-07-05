import { Skeleton } from '@/components/ui/skeleton'

export function LayoutSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-[var(--nav-height)] items-center gap-4 border-b border-border px-4 sm:px-10">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-6 w-24" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
      <div className="mx-auto max-w-[var(--page-max-width)] space-y-6 px-4 py-10 sm:px-10">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full rounded-3xl" />
        <Skeleton className="h-48 w-full rounded-3xl" />
      </div>
    </div>
  )
}
