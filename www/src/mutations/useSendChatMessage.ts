import { useMutation } from '@tanstack/react-query'
import { sendChatMessage } from '../api/chat'

interface SendChatMessageParams {
  message: string
  chatId: string
}

export function useSendChatMessage() {
  return useMutation({
    mutationFn: ({ message, chatId }: SendChatMessageParams) => sendChatMessage(message, chatId),
  })
}
