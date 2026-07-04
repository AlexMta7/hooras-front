import {
  PasswordToggleField,
  PasswordToggleFieldInput,
  PasswordToggleFieldToggle,
} from '@/components/ui/password-toggle-field'
import { Label } from '@/components/ui/label'
import { SectionCard } from '@/pages/home/SectionCard'

export function PasswordToggleFieldDemo() {
  return (
    <SectionCard id="password-toggle-field" title="Password Toggle Field" description="A password input with a visibility toggle.">
      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <PasswordToggleField>
            <PasswordToggleFieldInput id="password" placeholder="Enter your password" />
            <PasswordToggleFieldToggle />
          </PasswordToggleField>
        </div>
      </div>
    </SectionCard>
  )
}
