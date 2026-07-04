import { Toggle } from '@/components/ui/toggle'
import { Bold } from 'lucide-react'
import { SectionCard } from '@/pages/home/SectionCard'

export function ToggleDemo() {
  return (
    <SectionCard id="toggle" title="Toggle" description="A two-state button that can be either on or off.">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    </SectionCard>
  )
}
