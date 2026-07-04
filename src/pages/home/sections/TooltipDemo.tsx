import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { SectionCard } from '@/pages/home/SectionCard'

export function TooltipDemo() {
  return (
    <SectionCard id="tooltip" title="Tooltip" description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </SectionCard>
  )
}
