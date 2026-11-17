import { Avatar } from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'

export function BotAvatar({ size = 28 }: { size?: number }) {
  return (
    <Avatar
      size={size}
      radius="xl"
      variant="gradient"
      gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
    >
      <IconSparkles size={size * 0.55} />
    </Avatar>
  )
}
