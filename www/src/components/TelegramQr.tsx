import { Anchor, Box, Paper, Stack, Title } from '@mantine/core'
import { IconBrandTelegram } from '@tabler/icons-react'
import QRCode from 'react-qr-code'

const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME ?? 'your_bot'
const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`

export function TelegramQr() {
  return (
    <Paper withBorder radius="lg" p="sm" shadow="sm" h="100%">
      <Stack align="center" gap={4} h="100%" justify="center">
        <Title order={5} display="flex" style={{ alignItems: 'center', gap: 6 }}>
          <IconBrandTelegram size={18} color="var(--mantine-color-blue-6)" />
          Chat on Telegram
        </Title>

        <Box bg="white" p={6} style={{ borderRadius: 'var(--mantine-radius-md)' }}>
          <QRCode value={TELEGRAM_URL} size={100} />
        </Box>

        <Anchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" size="xs">
          Open chat on Telegram
        </Anchor>
      </Stack>
    </Paper>
  )
}
