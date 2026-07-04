import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { SectionCard } from '@/pages/home/SectionCard'

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <SectionCard id="toast" title="Toast" description="A succinct message that is displayed temporarily.">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2026 at 5:57 PM',
          })
        }}
      >
        Show Toast
      </Button>
    </SectionCard>
  )
}
