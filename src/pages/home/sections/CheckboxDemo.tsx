import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { SectionCard } from '@/pages/home/SectionCard'

export function CheckboxDemo() {
  return (
    <SectionCard id="checkbox" title="Checkbox" description="A control that allows the user to toggle between checked and not checked.">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </SectionCard>
  )
}
