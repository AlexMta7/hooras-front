import { Progress } from '@/components/ui/progress'
import { SectionCard } from '@/pages/home/SectionCard'

export function ProgressDemo() {
  return (
    <SectionCard id="progress" title="Progress" description="Displays an indicator showing the completion progress of a task.">
      <Progress value={66} className="w-[60%]" />
    </SectionCard>
  )
}
