import { codeToHtml } from 'shiki'
import { SHIKI_THEMES } from './config'

function getActiveTheme(): string {
  const isDark = document.documentElement.classList.contains('dark')
  return isDark ? SHIKI_THEMES.dark : SHIKI_THEMES.light
}

function extractLanguage(className: string): string {
  const match = className.match(/language-([\w-]+)/)
  return match?.[1] || 'text'
}

export async function highlightCodeBlocksInHtmlClient(html: string): Promise<string> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const codeBlocks = Array.from(doc.querySelectorAll('pre code'))

  if (codeBlocks.length === 0) {
    return html
  }

  const theme = getActiveTheme()

  await Promise.all(
    codeBlocks.map(async (codeEl) => {
      const pre = codeEl.parentElement
      if (!pre) return

      const code = codeEl.textContent || ''
      const lang = extractLanguage(codeEl.className)

      try {
        const highlighted = await codeToHtml(code, {
          lang,
          theme,
        })

        const wrapper = document.createElement('div')
        wrapper.innerHTML = highlighted
        const highlightedPre = wrapper.querySelector('pre')

        if (highlightedPre) {
          highlightedPre.classList.add('qwerty-code-block')
          pre.replaceWith(highlightedPre)
        }
      } catch {
        pre.classList.add('qwerty-code-block')
      }
    }),
  )

  return doc.body.innerHTML
}
