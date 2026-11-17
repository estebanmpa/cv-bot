import { useState } from 'react'
import { useSendChatMessage } from '../../mutations/useSendChatMessage'
import { BOT_ERROR_TEXT, ChatEntry, WELCOME_TEXT, createChatEntry } from './chatEntry'

const welcomeEntry: ChatEntry = { id: 'welcome', role: 'bot', text: WELCOME_TEXT }

export function useChatConversation() {
  const [history, setHistory] = useState<ChatEntry[]>([welcomeEntry])
  const [chatId] = useState(() => crypto.randomUUID())
  const sendMessage = useSendChatMessage()

  function appendEntries(entries: ChatEntry[]) {
    setHistory((current) => [...current, ...entries])
  }

  function send(text: string) {
    appendEntries([createChatEntry('user', text)])

    sendMessage.mutate(
      { message: text, chatId },
      {
        onSuccess: ({ replies }) =>
          appendEntries(replies.map((reply) => createChatEntry('bot', reply))),
        onError: () => appendEntries([createChatEntry('bot', BOT_ERROR_TEXT)]),
      },
    )
  }

  return {
    history,
    send,
    isTyping: sendMessage.isPending,
    hasStarted: history.length > 1,
  }
}
