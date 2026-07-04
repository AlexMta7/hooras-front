import {
  OneTimePasswordField,
  OneTimePasswordFieldInput,
} from '@/components/ui/one-time-password-field'
import { SectionCard } from '@/pages/home/SectionCard'

export function OneTimePasswordFieldDemo() {
  return (
    <SectionCard id="one-time-password-field" title="One-Time Password Field" description="A field for entering one-time passwords.">
      <OneTimePasswordField className="flex gap-2">
        <OneTimePasswordFieldInput />
        <OneTimePasswordFieldInput />
        <OneTimePasswordFieldInput />
        <OneTimePasswordFieldInput />
        <OneTimePasswordFieldInput />
        <OneTimePasswordFieldInput />
      </OneTimePasswordField>
    </SectionCard>
  )
}
