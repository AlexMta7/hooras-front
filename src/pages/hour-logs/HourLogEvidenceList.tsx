import type { HourLogEvidence } from '@/api/types'
import { openAuthenticatedFile } from '@/api/files'
import { toastMutationError } from '@/lib/mutations'
import { FileText } from 'lucide-react'

interface HourLogEvidenceListProps {
  evidence: HourLogEvidence[]
}

export function HourLogEvidenceList({ evidence }: HourLogEvidenceListProps) {
  if (!evidence.length) return null

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Evidence
      </p>
      <ul className="flex flex-wrap gap-2">
        {evidence.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() =>
                void openAuthenticatedFile(item.storageRef, (error) =>
                  toastMutationError(error, 'Unable to open evidence file.'),
                )
              }
              className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{item.fileName}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
