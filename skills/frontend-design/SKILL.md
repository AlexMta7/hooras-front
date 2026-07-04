---
name: frontend-design
description: >-
  UI/UX design guidelines for the Hooras frontend. Use when designing or
  implementing interfaces, tokens, components, layout, or light/dark theming.
---

# Hooras Design System

> Navy ink on cool marble.

**Themes:** light and dark (navy-based)

The Hooras UI is a quiet, confident workspace: a near-white canvas with generous breathing room, crisp white product cards floating on cool stone-gray, and all typography rendered in deep navy ink rather than pure black. Dark mode inverts to a deep navy canvas with cloud-colored text while preserving Signal Blue for primary actions.

## When to Use

Read this skill before any UI work in `src/`. Tokens live in `src/styles/globals.css`. Font: **Manrope** (loaded in `index.html`).

## Principles

1. **Ink over black** — All text uses Ink Navy or Slate Gray via semantic classes, never pure black.
2. **Single action color** — Signal Blue (`#006bff`) for primary CTAs only; Ink Navy for secondary dark buttons.
3. **Elevation via blue shadows** — No neutral black shadows in light mode; use `--shadow-sm`, `--shadow-sm-2`, `--shadow-sm-3`.
4. **Editorial typography** — Large display headings (50–80px), Manrope font family.
5. **Generous space** — 8px base unit, comfortable density, 1200px max page width.

## Semantic vs Brand Classes

**Prefer semantic classes in components** — they flip automatically with the theme:

| Semantic class | Brand alias (also theme-aware) | Role |
|----------------|-------------------------------|------|
| `bg-background` | `bg-cloud` | Page canvas |
| `bg-card` | `bg-paper` | Elevated surfaces |
| `text-foreground` | `text-ink-navy` | Primary text |
| `text-muted-foreground` | `text-slate-gray` | Secondary text |
| `bg-muted` | `bg-pebble` | Input fills, hover washes |
| `border-border` | `border-hairline` | Borders and dividers |
| `bg-overlay` | — | Modal/popover scrim |

Brand aliases (`bg-cloud`, `text-ink-navy`, etc.) map to the same `--brand-*` variables and flip with the theme. Never use static hex values or `bg-black/*` overlays in component `className` strings.

## Light Theme

Applied via `:root` on `<html class="light">`.

| Role | Value | Semantic class |
|------|-------|----------------|
| Canvas | `#f8f9fb` | `bg-background` |
| Card | `#ffffff` | `bg-card` |
| Primary text | `#0b3558` | `text-foreground` |
| Secondary text | `#476788` | `text-muted-foreground` |
| Input fill | `#f0f3f8` | `bg-muted` |
| Border | `#d4e0ed` | `border-border` |
| Overlay | `rgba(11,53,88,0.6)` | `bg-overlay` |
| Primary CTA | `#006bff` | `bg-primary` |
| Shadows | Blue-tinted (`--shadow-sm`, `--shadow-sm-2`, `--shadow-sm-3`) | `shadow-[var(--shadow-sm-2)]` |

## Dark Theme

Applied via `.dark` on `<html class="dark">`.

| Role | Value | Semantic class |
|------|-------|----------------|
| Canvas | `#071f33` | `bg-background` |
| Card | `#0a2a47` | `bg-card` |
| Primary text | `#f8f9fb` | `text-foreground` |
| Secondary text | `#a6bbd1` | `text-muted-foreground` |
| Input fill | `#143d5c` | `bg-muted` |
| Border | `#476788` | `border-border` |
| Overlay | `rgba(7,31,51,0.8)` | `bg-overlay` |
| Primary CTA | `#006bff` | `bg-primary` |
| Shadows | Higher-alpha dark shadows for visibility on navy | `shadow-[var(--shadow-sm-2)]` |

## Theme Mechanism

- Theme toggled via `ThemeProvider` on `<html class="light|dark">`.
- Preference persisted in `localStorage['hooras-theme']`.
- Flash prevention: inline script in `index.html` applies the saved theme before paint.
- Primary CTA stays Signal Blue (`#006bff`) in both modes.
- Test every new component in both themes before shipping.

## Quick Color Reference

Theme-aware tokens only — values below are light-mode defaults; brand aliases flip in dark mode.

| Role | Token / Class | Light value |
|------|---------------|-------------|
| Primary text | `text-ink-navy` / `--color-ink-navy` | `#0b3558` |
| Secondary text | `text-slate-gray` / `--color-slate-gray` | `#476788` |
| Canvas | `bg-cloud` / `--color-cloud` | `#f8f9fb` |
| Card surface | `bg-paper` / `--color-paper` | `#ffffff` |
| Border | `border-hairline` / `--color-hairline` | `#d4e0ed` |
| Primary CTA | `bg-signal-blue` / `--color-signal-blue` | `#006bff` |
| Dark CTA | `bg-ink-navy` | `#0b3558` (light) / `#143d5c` (dark secondary) |
| Input fill | `bg-pebble` / `--color-pebble` | `#f0f3f8` |
| Decorative blobs | `bg-coral-magenta`, `bg-sky-cyan` | atmosphere only |

## Typography

| Role | Size | Weight | Tailwind pattern |
|------|------|--------|------------------|
| Body | 16px | 400 | `text-[length:var(--text-body)]` |
| Body sm / labels | 14px | 500 | `text-[length:var(--text-body-sm)] font-medium` |
| Button | 18px | 600 | `text-[length:var(--text-button)] font-semibold` |
| Subheading | 28px | 600 | `text-[length:var(--text-subheading)] font-semibold` |
| Section H2 | 50–68px | 700 | `text-[length:var(--text-heading)] font-bold` |
| Hero | 80px | 700 | `text-[length:var(--text-display)] font-bold` |

## Component Patterns

### Primary CTA Button
`bg-signal-blue text-paper`, 8px radius (`rounded-lg`), 18px/600, padding `py-2.5 px-4`. Use `Button` default variant.

### Dark CTA Button
`bg-ink-navy text-paper`. Use `Button` `secondary` variant.

### Ghost Text Link
`text-foreground font-medium`, optional underline on hover. Use `Button` `link` variant.

### Social Sign-In Button
Use `Button` `social` variant: card bg, foreground text, 1px hairline border.

### Elevated Product Card
`bg-card rounded-2xl shadow-[var(--shadow-sm-2)]`. Place behind coral-magenta or sky-cyan decorative blob offset 20–40px.

### Pill Badge
`bg-badge-bg text-deep-cobalt text-caption font-medium rounded-full px-2 py-1`.

### Section Card (demo panels)
`rounded-3xl border-border bg-card p-6 shadow-[var(--shadow-sm-2)]`.

### Modal overlay
`bg-overlay` — navy-tinted scrim, never `bg-black/*`.

## Layout

- Page max-width: `max-w-[var(--page-max-width)]` (1200px)
- Section gap: 48–64px (`gap-12` to `gap-16`)
- Card padding: 24px
- Nav height: 64px (`h-16`)
- Card radius: 24px (`rounded-3xl`) for panels, 16px (`rounded-2xl`) for product cards
- Button/input radius: 8px (`rounded-lg`)

## Theming Checklist (new components)

1. Use `bg-card`, `text-foreground`, `border-border`, `bg-muted` — not hardcoded hex
2. Floating panels: `rounded-2xl` + `shadow-[var(--shadow-sm-2)]`
3. Inputs/buttons: `rounded-lg` (8px)
4. Overlays: `bg-overlay`
5. Typography: `text-[length:var(--text-body-sm)]` etc.
6. Focus: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
7. Verify appearance in both light and dark mode

## Accessibility

- Maintain WCAG contrast ratios in both light and dark modes.
- Preserve Radix component keyboard navigation and ARIA patterns.
- Focus rings use Signal Blue (`--ring: #006bff`) with `focus-visible:ring-2 focus-visible:ring-offset-2`.

## Do's and Don'ts

### Do
- Use semantic or brand token classes for all text — never pure `#000000`
- Use Signal Blue `#006bff` exclusively for filled primary CTAs
- Apply theme-aware shadows (`--shadow-sm`, `--shadow-sm-2`, `--shadow-sm-3`) for elevation
- Use Manrope weight 700 at 50–80px for hero headlines
- Test components in both light and dark themes

### Don't
- Don't use `#000000` as text color
- Don't use `bg-black/*` overlays or hardcode light-mode hex in component classNames
- Don't use magenta/cyan blobs as functional UI fills
- Don't set button border-radius above 12px or below 4px — 8px is the sweet spot
- Don't add gradients to backgrounds

## Full Reference

For complete tokens, components, surfaces, elevation, imagery, and CSS architecture, see [reference.md](./reference.md).
