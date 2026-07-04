const EMPTY_MARKERS = ['<p></p>', '<p><br></p>', '<p><br/></p>']

export function normalizeContent(content: string): string {
  const trimmed = content?.trim() ?? ''
  if (!trimmed) return ''
  if (EMPTY_MARKERS.includes(trimmed)) return ''
  return trimmed
}
