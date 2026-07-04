import type { ReactNode } from 'react'

interface SectionCardProps {
  id: string
  title: string
  description: string
  children: ReactNode
}

export function SectionCard({ id, title, description, children }: SectionCardProps) {
  return (
    <section
      id={id}
      className="scroll-mt-[var(--sticky-below-header)] rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm-2)]"
    >
      <h2 className="text-[length:var(--text-subheading)] font-semibold leading-[var(--leading-subheading)] text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-[length:var(--text-body-sm)] leading-[var(--leading-body-sm)] text-muted-foreground">
        {description}
      </p>
      <div className="mt-6">{children}</div>
    </section>
  )
}
