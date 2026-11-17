// Same limit the backend enforces on chat messages.
export const MAX_QUESTION_LENGTH = 100

export interface ChatSearch {
  ask?: string
}

// The question comes from the URL, so anything a visitor types there is accepted
// only as a trimmed, bounded string.
export function parseChatSearch(search: Record<string, unknown>): ChatSearch {
  if (typeof search.ask !== 'string') return {}

  const ask = search.ask.trim().slice(0, MAX_QUESTION_LENGTH)
  return ask ? { ask } : {}
}
