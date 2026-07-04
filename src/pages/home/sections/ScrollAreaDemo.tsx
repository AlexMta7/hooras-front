import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { SectionCard } from '@/pages/home/SectionCard'

const tags = Array.from({ length: 20 }).map((_, i) => `Tag ${i + 1}`)

export function ScrollAreaDemo() {
  return (
    <SectionCard id="scroll-area" title="Scroll Area" description="Augments native scroll functionality for custom, cross-browser styling.">
      <ScrollArea className="h-[var(--height-scroll-area)] w-[var(--width-scroll-area)] rounded-lg border border-border">
        <div className="p-4">
          <h4 className="mb-4 text-[length:var(--text-body-sm)] font-medium leading-none text-foreground">Tags</h4>
          {tags.map((tag) => (
            <div key={tag}>
              <div className="text-[length:var(--text-body-sm)] text-foreground">{tag}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </SectionCard>
  )
}
