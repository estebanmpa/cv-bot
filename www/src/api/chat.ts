const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export interface ChatReply {
  reply: string
}

export async function sendChatMessage(message: string, chatId: string): Promise<ChatReply> {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, chatId }),
  })

  if (!response.ok) {
    throw new Error(`The bot replied with an error (${response.status})`)
  }

  return response.json()
}
