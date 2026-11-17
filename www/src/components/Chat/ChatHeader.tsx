import { Text } from '@mantine/core'
import { BotAvatar } from './BotAvatar'
import classes from './Chat.module.css'

export function ChatHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.botAvatar}>
        <BotAvatar size={42} />
        <span className={classes.statusDot} aria-hidden="true" />
      </div>
      <div>
        <Text fw={700} lh={1.3}>
          Esteban's AI assistant
        </Text>
        <Text size="xs" c="dimmed">
          Online · Ask about experience, stack or availability
        </Text>
      </div>
    </header>
  )
}
