import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from '@/components/ui/toolbar'
import { Bold, Italic, Underline } from 'lucide-react'
import { SectionCard } from '@/pages/home/SectionCard'

export function ToolbarDemo() {
  return (
    <SectionCard id="toolbar" title="Toolbar" description="A container for grouping a set of controls.">
      <Toolbar className="w-full max-w-md" aria-label="Formatting options">
        <ToolbarToggleGroup type="multiple" aria-label="Text formatting">
          <ToolbarToggleItem value="bold" aria-label="Bold">
            <Bold className="h-4 w-4" />
          </ToolbarToggleItem>
          <ToolbarToggleItem value="italic" aria-label="Italic">
            <Italic className="h-4 w-4" />
          </ToolbarToggleItem>
          <ToolbarToggleItem value="underline" aria-label="Underline">
            <Underline className="h-4 w-4" />
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarButton>Save</ToolbarButton>
      </Toolbar>
    </SectionCard>
  )
}
