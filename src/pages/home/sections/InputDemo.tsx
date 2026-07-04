import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SectionCard } from '@/pages/home/SectionCard'

export function InputDemo() {
  return (
    <SectionCard id="input" title="Input" description="Displays a form input field or a component that looks like an input field.">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </SectionCard>
  )
}
