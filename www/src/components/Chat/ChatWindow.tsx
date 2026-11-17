import { useEffect, useRef } from 'react'
import { ScrollArea } from '@mantine/core'
import { ChatComposer } from './ChatComposer'
import { ChatHeader } from './ChatHeader'
import { ChatMessage, TypingIndicator } from './ChatMessage'
import { SuggestedPrompts } from './SuggestedPrompts'
import { useChatConversation } from './useChatConversation'
import classes from './Chat.module.css'

export function ChatWindow() {
  const { history, send, isTyping, hasStarted } = useChatConversation()
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    viewport?.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' })
  }, [history.length, isTyping])

  return (
    <section className={classes.window} aria-label="Chat with Esteban's assistant">
      <ChatHeader />

      <ScrollArea className={classes.messages} viewportRef={viewportRef} type="hover">
        <div className={classes.messageList} aria-live="polite">
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
