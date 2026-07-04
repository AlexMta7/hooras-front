export const SHIKI_THEMES = {
  light: 'github-light',
  dark: 'github-dark',
} as const

export type ShikiThemeKey = keyof typeof SHIKI_THEMES
