import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { normalizeContent } from '@/lib/editor/normalize-content'
import { highlightCodeBlocksInHtmlClient } from '@/lib/shiki/highlight-html.client'

export interface PreviewClientProps {
  content: string
  className?: string
}

export function PreviewClient({ content, className }: PreviewClientProps) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    const normalized = normalizeContent(content)

    if (!normalized) {
      setHtml(null)
      return
    }

    let cancelled = false

    highlightCodeBlocksInHtmlClient(normalized).then((highlighted) => {
      if (!cancelled) {
        setHtml(highlighted)
      }
    })

    return () => {
      cancelled = true
    }
  }, [content])

  if (!html) {
    return (
      <div className={cn('qwerty-preview text-sm text-muted-foreground', className)}>
        {content.trim() ? 'Loading preview…' : null}
      </div>
    )
  }

  return (
    <div
      className={cn('qwerty-preview', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
