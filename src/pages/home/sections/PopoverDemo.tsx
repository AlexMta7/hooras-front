import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SectionCard } from '@/pages/home/SectionCard'

export function PopoverDemo() {
  return (
    <SectionCard id="popover" title="Popover" description="Displays rich content in a portal, triggered by a button.">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="text-[length:var(--text-body-sm)] font-medium leading-none text-foreground">Dimensions</h4>
              <p className="text-[length:var(--text-body-sm)] text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </SectionCard>
  )
}
