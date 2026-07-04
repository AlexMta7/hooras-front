import {
  AccordionDemo,
  AlertDialogDemo,
  AspectRatioDemo,
  AvatarDemo,
  ButtonDemo,
  CheckboxDemo,
  CollapsibleDemo,
  ContextMenuDemo,
  DialogDemo,
  DropdownMenuDemo,
  HoverCardDemo,
  InputDemo,
  MenubarDemo,
  NavigationMenuDemo,
  OneTimePasswordFieldDemo,
  PasswordToggleFieldDemo,
  PopoverDemo,
  ProgressDemo,
  RadioGroupDemo,
  ScrollAreaDemo,
  SelectDemo,
  SeparatorDemo,
  SliderDemo,
  SwitchDemo,
  TabsDemo,
  ToastDemo,
  ToggleDemo,
  ToggleGroupDemo,
  ToolbarDemo,
  TooltipDemo,
} from '@/pages/home/sections'

const NAV_ITEMS = [
  { id: 'accordion', label: 'Accordion' },
  { id: 'alert-dialog', label: 'Alert Dialog' },
  { id: 'aspect-ratio', label: 'Aspect Ratio' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'button', label: 'Button' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'collapsible', label: 'Collapsible' },
  { id: 'context-menu', label: 'Context Menu' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'dropdown-menu', label: 'Dropdown Menu' },
  { id: 'hover-card', label: 'Hover Card' },
  { id: 'input', label: 'Input' },
  { id: 'menubar', label: 'Menubar' },
  { id: 'navigation-menu', label: 'Navigation Menu' },
  { id: 'one-time-password-field', label: 'OTP Field' },
  { id: 'password-toggle-field', label: 'Password Field' },
  { id: 'popover', label: 'Popover' },
  { id: 'progress', label: 'Progress' },
  { id: 'radio-group', label: 'Radio Group' },
  { id: 'scroll-area', label: 'Scroll Area' },
  { id: 'select', label: 'Select' },
  { id: 'separator', label: 'Separator' },
  { id: 'slider', label: 'Slider' },
  { id: 'switch', label: 'Switch' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'toast', label: 'Toast' },
  { id: 'toggle', label: 'Toggle' },
  { id: 'toggle-group', label: 'Toggle Group' },
  { id: 'toolbar', label: 'Toolbar' },
  { id: 'tooltip', label: 'Tooltip' },
] as const

export function HomePage() {
  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-8 sm:px-10 sm:py-12">
      <div className="mb-12 text-center sm:mb-16">
        <h1 className="text-[length:var(--text-heading-sm)] font-bold leading-[var(--leading-heading-sm)] text-foreground sm:text-[length:var(--text-heading)] sm:leading-[var(--leading-heading)]">
          Hooras UI
        </h1>
        <p className="mx-auto mt-4 max-w-[640px] text-[length:var(--text-body)] text-muted-foreground">
          Accessible components built with Radix and Tailwind — styled with the Hooras design system
        </p>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        <aside className="lg:w-[var(--sidebar-width)] lg:shrink-0">
          <nav className="sticky top-[var(--sticky-below-header)] max-h-[calc(100vh-var(--sticky-below-header)-1rem)] overflow-y-auto rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-sm)]">
            <p className="mb-3 text-[length:var(--text-caption)] font-semibold uppercase tracking-wider text-muted-foreground">
              Components
            </p>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block rounded-lg px-2 py-1.5 text-[length:var(--text-body-sm)] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <AccordionDemo />
          <AlertDialogDemo />
          <AspectRatioDemo />
          <AvatarDemo />
          <ButtonDemo />
          <CheckboxDemo />
          <CollapsibleDemo />
          <ContextMenuDemo />
          <DialogDemo />
          <DropdownMenuDemo />
          <HoverCardDemo />
          <InputDemo />
          <MenubarDemo />
          <NavigationMenuDemo />
          <OneTimePasswordFieldDemo />
          <PasswordToggleFieldDemo />
          <PopoverDemo />
          <ProgressDemo />
          <RadioGroupDemo />
          <ScrollAreaDemo />
          <SelectDemo />
          <SeparatorDemo />
          <SliderDemo />
          <SwitchDemo />
          <TabsDemo />
          <ToastDemo />
          <ToggleDemo />
          <ToggleGroupDemo />
          <ToolbarDemo />
          <TooltipDemo />
        </div>
      </div>
    </div>
  )
}
