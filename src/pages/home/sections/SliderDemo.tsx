import { Slider } from '@/components/ui/slider'
import { SectionCard } from '@/pages/home/SectionCard'

export function SliderDemo() {
  return (
    <SectionCard id="slider" title="Slider" description="An input where the user selects a value from within a given range.">
      <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
    </SectionCard>
  )
}
