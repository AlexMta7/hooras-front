# Hooras Design System — Full Reference

> Navy ink on cool marble.

**Themes:** light and dark (navy-based)

The Hooras UI uses deep navy ink (#0b3558) everywhere text appears — headings, buttons, icons, links — which softens the entire interface into something warmer and more editorial than a typical SaaS landing page. A single vivid blue (#006bff) carries every primary action, while decorative pink and cyan blobs bleed from behind product mockups to add warmth without clutter. Components stay restrained: thin 1px hairline borders, subtle blue-tinted shadows, generous 24px card radii, and 8px button corners that feel intentional rather than pill-soft. Dark mode inverts the canvas and card surfaces to deep navy while preserving the same action color and component structure.

## Tokens — Brand Colors

Static accent colors (same in both themes):

| Name | Value | Token | Role |
|------|-------|-------|------|
| Signal Blue | `#006bff` | `--color-signal-blue` | Primary CTA fill, active nav, link accents, selected states |
| Carbon | `#0a0a0a` | `--color-carbon` | Pure-black text fallback, logo glyph, icon fill |
| Coral Magenta | `#e55cff` | `--color-coral-magenta` | Decorative accent blob — atmosphere only |
| Sky Cyan | `#0099ff` | `--color-sky-cyan` | Decorative accent blob — atmosphere only |
| Deep Cobalt | `#004eba` | `--color-deep-cobalt` | Badge text on Pebble fills, info labels |

Theme-aware brand colors (values swap via `--brand-*` aliases):

| Name | Light | Dark | Token | Role |
|------|-------|------|-------|------|
| Ink Navy | `#0b3558` | `#f8f9fb` | `--color-ink-navy` | Primary text, headings, icons, dark CTA backgrounds |
| Slate Gray | `#476788` | `#a6bbd1` | `--color-slate-gray` | Secondary body copy, helper text, muted labels |
| Mist Gray | `#a6bbd1` | `#6b8aa8` | `--color-mist-gray` | Disabled text, inactive labels, light icon strokes |
| Cloud | `#f8f9fb` | `#071f33` | `--color-cloud` | Page canvas, footer background |
| Paper | `#ffffff` | `#0a2a47` | `--color-paper` | Card surfaces, elevated panels |
| Pebble | `#f0f3f8` | `#143d5c` | `--color-pebble` | Input fills, badge backgrounds, hover washes |
| Hairline | `#d4e0ed` | `#476788` | `--color-hairline` | Borders, dividers, link underline defaults |

## Tokens — Light Theme

Applied via `:root` when `<html class="light">`.

| Role | Value | Semantic class | Brand alias |
|------|-------|----------------|-------------|
| Canvas | `#f8f9fb` | `bg-background` | `bg-cloud` |
| Card | `#ffffff` | `bg-card` | `bg-paper` |
| Primary text | `#0b3558` | `text-foreground` | `text-ink-navy` |
| Secondary text | `#476788` | `text-muted-foreground` | `text-slate-gray` |
| Input fill | `#f0f3f8` | `bg-muted` | `bg-pebble` |
| Border | `#d4e0ed` | `border-border` | `border-hairline` |
| Overlay | `rgba(11,53,88,0.6)` | `bg-overlay` | — |
| Primary CTA | `#006bff` | `bg-primary` | `bg-signal-blue` |
| Secondary button | `#0b3558` | `bg-secondary` | `bg-ink-navy` |
| Focus ring | `#006bff` | `ring-ring` | — |

### Light shadows

- `--shadow-sm`: blue-tinted, subtle lift
- `--shadow-sm-2`: blue-tinted, elevated cards
- `--shadow-sm-3`: blue-tinted, buttons

## Tokens — Dark Theme

Applied via `.dark` when `<html class="dark">`.

| Role | Value | Semantic class | Brand alias |
|------|-------|----------------|-------------|
| Canvas | `#071f33` | `bg-background` | `bg-cloud` |
| Card | `#0a2a47` | `bg-card` | `bg-paper` |
| Primary text | `#f8f9fb` | `text-foreground` | `text-ink-navy` |
| Secondary text | `#a6bbd1` | `text-muted-foreground` | `text-slate-gray` |
| Input fill | `#143d5c` | `bg-muted` | `bg-pebble` |
| Border | `#476788` | `border-border` | `border-hairline` |
| Overlay | `rgba(7,31,51,0.8)` | `bg-overlay` | — |
| Primary CTA | `#006bff` | `bg-primary` | `bg-signal-blue` |
| Secondary button | `#143d5c` | `bg-secondary` | — |
| Focus ring | `#006bff` | `ring-ring` | — |

### Dark shadows

Higher alpha for visibility on navy backgrounds. Same token names (`--shadow-sm`, `--shadow-sm-2`, `--shadow-sm-3`) resolve to dark-appropriate values via CSS variables.

## Tokens — Typography

### Manrope — All interface text

Weights: 400, 500, 600, 700. Token: `--font-gilroy` (legacy name, maps to Manrope).

| Role | Size | Line Height | Weight |
|------|------|-------------|--------|
| caption | 12px | 1.5 | 500 |
| body-sm | 14px | 1.4 | 500 |
| body | 16px | 1.0 | 400 |
| button | 18px | 1.6 | 600 |
| body-lg | 20px | 1.4 | 500 |
| subheading | 28px | 1.4 | 600 |
| heading-sm | 38px | 1.21 | 700 |
| heading | 50px | 1.2 | 700 |
| heading-lg | 68px | 1.2 | 700 |
| display | 80px | 1.2 | 700 |

## Tokens — Spacing & Shapes

**Base unit:** 8px. **Density:** comfortable.

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 56 | 56px | `--spacing-56` |
| 64 | 64px | `--spacing-64` |
| 72 | 72px | `--spacing-72` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| cards | 24px | `--radius-cards` |
| small | 4px | `--radius-small` |
| badges | 9999px | `--radius-badges` |
| inputs | 8px | `--radius-inputs` |
| buttons | 8px | `--radius-buttons` |
| productCards | 16px | `--radius-productcards` |

### Shadows

| Name | Token |
|------|-------|
| sm | `--shadow-sm` |
| sm-2 | `--shadow-sm-2` |
| sm-3 | `--shadow-sm-3` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 48–64px
- **Card padding:** 24px
- **Element gap:** 8–16px

## Components

Use semantic classes so components adapt to both themes automatically.

### Primary CTA Button
Background `#006bff`, text `#ffffff` at 18px weight 600, border-radius 8px, padding 6px 16px (compact) or 10px 16px (comfortable). No border.

### Dark CTA Button
Light: background `#0b3558`. Dark: background `#143d5c`. Text `#ffffff` at 18px weight 600, border-radius 8px.

### Ghost Text Link
`text-foreground` at 14–18px weight 500–600, no background, no border, no padding. Underline optional on hover.

### Outlined White Button
Color `#ffffff`, border 1px solid `#ffffff`, border-radius 4px, no background fill. For use on dark hero sections only.

### Social Sign-In Button
Full-width with provider logo left, text right. Light variant: card bg, foreground text, 1px hairline border. Dark variant: ink-navy bg, paper text, no border. Padding 12px 16px, border-radius 8px.

### Elevated Product Card
`bg-card`, border-radius 16px. Three-layer theme-aware shadow (`--shadow-sm-2`). Often sits in front of Coral Magenta or Sky Cyan decorative blob.

### Feature Accordion Item
Active: heading `text-foreground` at 18–20px weight 600 with Signal Blue icon. Inactive: heading `text-mist-gray` at 16px weight 400.

### Pill Badge
Background `#e6f0ff`, text `#004eba` at 12px weight 500, border-radius 50px, padding 4px 8px.

### Trust Logo Strip
Single row of monochrome partner logos in Mist Gray, evenly spaced, centered.

### Widget Panel Card
`bg-card`, border-radius 16px. Multi-column layout for interactive panels.

### Section Header Block
H2 at 50–68px weight 700 in `text-foreground`, centered. Subtext at 16px weight 400 in `text-muted-foreground`, max-width ~640px.

### Footer
Background `bg-background`, padding 40px horizontal. Link columns in `text-foreground` at 14px weight 500, headings at 12px weight 600 uppercase in `text-muted-foreground`.

## Surfaces

| Level | Name | Light | Dark | Purpose |
|-------|------|-------|------|---------|
| 0 | Canvas | `#f8f9fb` | `#071f33` | Page background, footer surface |
| 1 | Card | `#ffffff` | `#0a2a47` | Elevated cards, widget panels, feature panels |
| 2 | Input Fill | `#f0f3f8` | `#143d5c` | Form inputs, badge backgrounds, hover washes |
| 3 | Dark Surface | `#0b3558` | `#143d5c` | Dark CTA buttons, inverse sections |
| 4 | Accent Surface | `#006bff` | `#006bff` | Primary action fills, selected/active states |

## Elevation

Light mode (blue-tinted):

- **Elevated Product Card:** `rgba(71, 103, 136, 0.04) 0px 4px 5px 0px, rgba(71, 103, 136, 0.03) 0px 8px 15px 0px, rgba(71, 103, 136, 0.08) 0px 30px 50px 0px`
- **Link card with icon:** `rgba(71, 103, 136, 0.04) 0px 4px 5px 0px, rgba(71, 103, 136, 0.03) 0px 4px 10px 0px, rgba(71, 103, 136, 0.05) 0px 10px 20px 0px`
- **Button:** `rgba(71, 103, 136, 0.04) 0px 4px 5px 0px, rgba(71, 103, 136, 0.03) 0px 8px 15px 0px, rgba(71, 103, 136, 0.06) 0px 15px 30px 0px`

Dark mode uses higher-alpha shadows defined in `globals.css` for visibility on navy backgrounds.

## Imagery

Product screenshots on card surfaces with generous rounded corners. Decorative blob shapes in Coral Magenta (#e55cff) or Sky Cyan (#0099ff), slightly offset and blurred. No photography. Icons: line-style, 1.5–2px stroke, foreground or Signal Blue.

## Layout

Max-width 1200px centered. Hero: two-column split. Trust logo strip below hero. Section gaps 48–64px. Navigation: 64px sticky top bar.

## Design Influences

Editorial SaaS aesthetic: navy ink typography, blue-tinted elevation, single vivid blue primary action, white-card-on-cool-gray surfaces, and generous radii.

## Implementation

Tokens are defined in `src/styles/globals.css`:

- `@theme` maps brand colors to `--brand-*` alias variables
- `:root` / `.dark` set semantic tokens (`--background`, `--primary`, etc.) and brand aliases
- shadcn utilities (`bg-background`, `text-foreground`) bridge via `@theme inline`
- Theme switching: `ThemeProvider` in `src/components/theme/ThemeProvider.tsx`
- Theme flash prevention: inline script in `index.html` reads `localStorage['hooras-theme']`
