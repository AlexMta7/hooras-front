import { PreviewClient } from './preview-client'
import { cn } from '@/lib/utils'

export interface PreviewEditorProps {
  content: string
  className?: string
}

export function PreviewEditor({ content, className }: PreviewEditorProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-muted/60 px-3 py-2', className)}>
      <PreviewClient content={content} />
    </div>
  )
}
