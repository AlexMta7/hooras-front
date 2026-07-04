import { Separator } from '@/components/ui/separator'
import { SectionCard } from '@/pages/home/SectionCard'

export function SeparatorDemo() {
  return (
    <SectionCard id="separator" title="Separator" description="Visually or semantically separates content.">
      <div className="space-y-1">
        <h4 className="text-[length:var(--text-body-sm)] font-medium leading-none text-foreground">Hooras UI</h4>
        <p className="text-[length:var(--text-body-sm)] text-muted-foreground">An open-source component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-[length:var(--text-body-sm)] text-foreground">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </SectionCard>
  )
}
