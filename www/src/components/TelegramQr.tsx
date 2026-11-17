import { Anchor, Box, Group, Stack, Text } from '@mantine/core'
import { IconBrandTelegram } from '@tabler/icons-react'
import QRCode from 'react-qr-code'

const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME ?? 'your_bot'
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`

export function TelegramQr() {
  return (
    <Stack align="center" gap={8}>
      <Group gap={6}>
        <IconBrandTelegram size={18} color="var(--mantine-color-blue-5)" />
        <Text size="sm" fw={600}>
          Prefer Telegram?
        </Text>
      </Group>

      <Box bg="white" p={8} style={{ borderRadius: 'var(--mantine-radius-md)' }}>
        <QRCode value={TELEGRAM_URL} size={104} />
      </Box>

      <Anchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" size="xs">
        Scan or open the chat on Telegram
      </Anchor>
    </Stack>
  )
}
