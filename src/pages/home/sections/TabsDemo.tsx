import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionCard } from '@/pages/home/SectionCard'

export function TabsDemo() {
  return (
    <SectionCard id="tabs" title="Tabs" description="A set of layered sections of content known as tab panels.">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-[length:var(--text-body-sm)] text-muted-foreground">Make changes to your account here.</p>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-[length:var(--text-body-sm)] text-muted-foreground">Change your password here.</p>
        </TabsContent>
      </Tabs>
    </SectionCard>
  )
}
