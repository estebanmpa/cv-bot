export type ChatRole = 'user' | 'bot'

export interface ChatEntry {
  id: string
  role: ChatRole
  text: string
}

export type MessageBody =
  | { kind: 'text'; text: string }
  | { kind: 'link'; url: string }

// The backend prefixes a message with this token when its body is a bare URL that
// should be rendered as a link (webchat renders HTML, unlike WhatsApp/Telegram).
const LINK_TOKEN = '[[LINK]]'

export function createChatEntry(role: ChatRole, text: string): ChatEntry {
  return { id: crypto.randomUUID(), role, text }
}

export function parseMessageBody(text: string): MessageBody {
  if (!text.startsWith(LINK_TOKEN)) return { kind: 'text', text }

  return { kind: 'link', url: text.slice(LINK_TOKEN.length).trim() }
}
