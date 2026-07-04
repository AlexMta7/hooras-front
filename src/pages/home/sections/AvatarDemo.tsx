import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SectionCard } from '@/pages/home/SectionCard'

export function AvatarDemo() {
  return (
    <SectionCard id="avatar" title="Avatar" description="An image element with a fallback.">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
      </div>
    </SectionCard>
  )
}
