import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionCard } from '@/pages/home/SectionCard'

export function AccordionDemo() {
  return (
    <SectionCard
      id="accordion"
      title="Accordion"
      description="Vertically stacked sections that expand and collapse."
    >
      <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionCard>
  )
}
