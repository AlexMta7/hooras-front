import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { SectionCard } from '@/pages/home/SectionCard'

const repoItemClass =
  'rounded-lg border border-border bg-muted px-4 py-3 text-[length:var(--text-body-sm)] text-foreground'

export function CollapsibleDemo() {
  const [open, setOpen] = useState(false)

  return (
    <SectionCard id="collapsible" title="Collapsible" description="An interactive component which expands and collapses a panel.">
      <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-[length:var(--text-body-sm)] font-semibold text-foreground">@hooras starred 3 repositories</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className={repoItemClass}>@radix-ui/primitives</div>
        <CollapsibleContent className="space-y-2">
          <div className={repoItemClass}>@tanstack/router</div>
          <div className={repoItemClass}>tailwindcss/tailwindcss</div>
        </CollapsibleContent>
      </Collapsible>
    </SectionCard>
  )
}
