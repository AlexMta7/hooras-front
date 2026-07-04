import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SectionCard } from '@/pages/home/SectionCard'

export function SwitchDemo() {
  return (
    <SectionCard id="switch" title="Switch" description="A control that allows the user to toggle between checked and not checked.">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    </SectionCard>
  )
}
