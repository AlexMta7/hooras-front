import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { SectionCard } from '@/pages/home/SectionCard'

export function ContextMenuDemo() {
  return (
    <SectionCard id="context-menu" title="Context Menu" description="Displays a menu located at the pointer, triggered by a right-click.">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-full max-w-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted text-[length:var(--text-body-sm)] text-muted-foreground">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-[var(--width-context-menu)]">
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </SectionCard>
  )
}
