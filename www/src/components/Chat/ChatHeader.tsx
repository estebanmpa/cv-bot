import { Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { BotAvatar } from './BotAvatar'
import classes from './Chat.module.css'

export function ChatHeader() {
  const { t } = useTranslation()

  return (
    <header className={classes.header}>
      <div className={classes.botAvatar}>
        <BotAvatar size={42} />
        <span className={classes.statusDot} aria-hidden="true" />
      </div>
      <div>
        <Text fw={700} lh={1.3}>
          {t('chat.title')}
        </Text>
        <Text size="xs" c="dimmed">
          {t('chat.subtitle')}
        </Text>
      </div>
    </header>
  )
}
