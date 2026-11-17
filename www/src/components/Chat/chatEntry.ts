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

export const WELCOME_TEXT =
  "Hi 👋 I'm Esteban's virtual assistant. Ask me about his experience, stack, or availability."

export const BOT_ERROR_TEXT = "I couldn't reach the bot. Please try again in a moment."

export const SUGGESTED_PROMPTS = [
  "What's your tech stack?",
  'Tell me about your experience',
  'Are you open to new projects?',
] as const

export function createChatEntry(role: ChatRole, text: string): ChatEntry {
  return { id: crypto.randomUUID(), role, text }
}

export function parseMessageBody(text: string): MessageBody {
  if (!text.startsWith(LINK_TOKEN)) return { kind: 'text', text }

  return { kind: 'link', url: text.slice(LINK_TOKEN.length).trim() }
}
