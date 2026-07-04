import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { SectionCard } from '@/pages/home/SectionCard'

export function HoverCardDemo() {
  return (
    <SectionCard id="hover-card" title="Hover Card" description="For sighted users to preview content available behind a link.">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@hooras</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <h4 className="text-[length:var(--text-body-sm)] font-semibold text-foreground">Hooras</h4>
            <p className="text-[length:var(--text-body-sm)] text-muted-foreground">
              Building accessible design systems with Radix and Tailwind.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </SectionCard>
  )
}
