import { API_BASE_URL } from './apiBaseUrl'

export interface ChatReply {
  replies: string[]
}

export async function sendChatMessage(message: string, chatId: string): Promise<ChatReply> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, chatId }),
  })

  if (!response.ok) {
    throw new Error(`The bot replied with an error (${response.status})`)
  }

  return response.json()
}
