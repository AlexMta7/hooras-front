import { AspectRatio } from '@/components/ui/aspect-ratio'
import { SectionCard } from '@/pages/home/SectionCard'

export function AspectRatioDemo() {
  return (
    <SectionCard
      id="aspect-ratio"
      title="Aspect Ratio"
      description="Displays content within a desired ratio."
    >
      <div className="w-[300px]">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
          <div className="flex h-full w-full items-center justify-center text-[length:var(--text-body-sm)] text-muted-foreground">
            16:9
          </div>
        </AspectRatio>
      </div>
    </SectionCard>
  )
}
