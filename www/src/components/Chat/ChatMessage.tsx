import { ReactNode } from 'react'
import { Anchor } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { BotAvatar } from './BotAvatar'
import { ChatRole, parseMessageBody } from './chatEntry'
import classes from './Chat.module.css'

interface MessageBubbleProps {
  role: ChatRole
  children: ReactNode
}

export function MessageBubble({ role, children }: MessageBubbleProps) {
  return (
    <div className={classes.row} data-role={role}>
      {role === 'bot' && <BotAvatar />}
      <div className={classes.bubble} data-role={role}>
        {children}
      </div>
    </div>
  )
}

function MessageBody({ text }: { text: string }) {
  const { t } = useTranslation()
  const body = parseMessageBody(text)
  if (body.kind === 'text') return body.text

  return (
    <Anchor href={body.url} target="_blank" rel="noopener noreferrer" className={classes.link}>
      {t('chat.openLink')} <IconExternalLink size={14} />
    </Anchor>
  )
}

export function ChatMessage({ role, text }: { role: ChatRole; text: string }) {
  return (
    <MessageBubble role={role}>
      <MessageBody text={text} />
    </MessageBubble>
  )
}

export function TypingIndicator() {
  const { t } = useTranslation()

  return (
    <MessageBubble role="bot">
      <span className={classes.typing} role="status" aria-label={t('chat.typing')}>
        <span className={classes.typingDot} />
        <span className={classes.typingDot} />
        <span className={classes.typingDot} />
      </span>
    </MessageBubble>
  )
}
