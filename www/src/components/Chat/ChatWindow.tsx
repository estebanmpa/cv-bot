import { useEffect, useRef } from 'react'
import { ScrollArea } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { ChatComposer } from './ChatComposer'
import { ChatHeader } from './ChatHeader'
import { ChatMessage, TypingIndicator } from './ChatMessage'
import { SuggestedPrompts } from './SuggestedPrompts'
import { useChatConversation } from './useChatConversation'
import classes from './Chat.module.css'

export function ChatWindow({ initialQuestion }: { initialQuestion?: string }) {
  const { t } = useTranslation()
  const { history, send, isTyping, hasStarted } = useChatConversation(initialQuestion)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    viewport?.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' })
  }, [history.length, isTyping])

  return (
    <section className={classes.window} aria-label={t('chat.windowLabel')}>
      <ChatHeader />

      <ScrollArea className={classes.messages} viewportRef={viewportRef} type="hover">
        <div className={classes.messageList} aria-live="polite">
          <ChatMessage role="bot" text={t('chat.welcome')} />
          {history.map((entry) => (
            <ChatMessage key={entry.id} role={entry.role} text={entry.text} />
          ))}
          {!hasStarted && <SuggestedPrompts onPick={send} />}
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <ChatComposer onSend={send} isBusy={isTyping} />
      </div>
    </section>
  )
}
