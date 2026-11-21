import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSendChatMessage } from '../../mutations/useSendChatMessage'
import { ChatEntry, createChatEntry } from './chatEntry'

// The welcome message isn't part of the history: ChatWindow renders it in the current language.
export function useChatConversation(initialQuestion?: string) {
  const { t } = useTranslation()
  const [history, setHistory] = useState<ChatEntry[]>([])
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
        onError: () => appendEntries([createChatEntry('bot', t('chat.error'))]),
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
    hasStarted: history.length > 0,
  }
}
