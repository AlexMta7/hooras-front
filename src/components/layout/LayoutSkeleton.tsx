import { Skeleton } from '@/components/ui/skeleton'

export function LayoutSkeleton() {
  return (
    <div className="flex min-h-svh w-full bg-sidebar p-2">
      <aside className="hidden w-sidebar shrink-0 rounded-xl border border-border bg-card p-2 shadow-sm md:flex md:flex-col md:gap-2">
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="space-y-2 px-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
        <div className="mt-auto px-2 pb-2">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </aside>
      <div className="flex min-h-[calc(100svh-1rem)] flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
