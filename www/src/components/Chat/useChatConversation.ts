import { useEffect, useRef, useState } from 'react'
import { useSendChatMessage } from '../../mutations/useSendChatMessage'
import { BOT_ERROR_TEXT, ChatEntry, WELCOME_TEXT, createChatEntry } from './chatEntry'

const welcomeEntry: ChatEntry = { id: 'welcome', role: 'bot', text: WELCOME_TEXT }

export function useChatConversation(initialQuestion?: string) {
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

  // The ref keeps StrictMode's double-run effects from asking twice.
  const initialQuestionSent = useRef(false)
  useEffect(() => {
    if (!initialQuestion || initialQuestionSent.current) return

    initialQuestionSent.current = true
    send(initialQuestion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion])

  return {
    history,
    send,
    isTyping: sendMessage.isPending,
    hasStarted: history.length > 1,
  }
}
