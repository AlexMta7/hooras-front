import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { SectionCard } from '@/pages/home/SectionCard'

export function NavigationMenuDemo() {
  return (
    <SectionCard id="navigation-menu" title="Navigation Menu" description="A collection of links for navigating websites.">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px]">
                <li>
                  <NavigationMenuLink asChild>
                    <a className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring" href="#navigation-menu">
                      <div className="text-[length:var(--text-body-sm)] font-medium leading-none text-foreground">Introduction</div>
                      <p className="line-clamp-2 text-[length:var(--text-body-sm)] leading-snug text-muted-foreground">
                        Re-usable components built with Radix UI and Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle())} href="#navigation-menu">
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </SectionCard>
  )
}
