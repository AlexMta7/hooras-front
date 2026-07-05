import { cn } from '@/lib/utils'

interface AdminContentProps {
  children: React.ReactNode
  className?: string
}

export function AdminContent({ children, className }: AdminContentProps) {
  return (
    <div
      data-slot="admin-content"
      className={cn('flex flex-1 flex-col gap-4 overflow-auto', className)}
    >
      {children}
    </div>
  )
}
