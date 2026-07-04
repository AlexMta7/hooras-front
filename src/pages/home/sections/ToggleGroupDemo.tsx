import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Bold, Italic, Underline } from 'lucide-react'
import { SectionCard } from '@/pages/home/SectionCard'

export function ToggleGroupDemo() {
  return (
    <SectionCard id="toggle-group" title="Toggle Group" description="A set of two-state buttons that can be toggled on or off.">
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </SectionCard>
  )
}
