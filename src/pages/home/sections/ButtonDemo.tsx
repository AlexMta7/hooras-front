import { Button, buttonVariants } from '@/components/ui/button'
import { SectionCard } from '@/pages/home/SectionCard'

export function ButtonDemo() {
  return (
    <SectionCard id="button" title="Button" description="Displays a button or a component that looks like a button.">
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Dark CTA</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="social">Social</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <a className={buttonVariants({ variant: 'outline' })} href="#button">
          Link styled
        </a>
      </div>
    </SectionCard>
  )
}
