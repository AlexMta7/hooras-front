import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SectionCard } from '@/pages/home/SectionCard'

export function DialogDemo() {
  return (
    <SectionCard id="dialog" title="Dialog" description="A window overlaid on either the primary window or another dialog window.">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </SectionCard>
  )
}
