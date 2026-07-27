import { Anchor, Box, Paper, Stack, Text, Title } from '@mantine/core'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import QRCode from 'react-qr-code'

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE ?? '5490000000000'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`

export function WhatsappQr() {
  return (
    <Paper withBorder radius="lg" p="md" shadow="sm" h="100%">
      <Stack align="center" gap="sm" h="100%" justify="center">
        <Title order={4} display="flex" style={{ alignItems: 'center', gap: 8 }}>
          <IconBrandWhatsapp size={20} color="var(--mantine-color-green-6)" />
          Chat on WhatsApp
        </Title>

        <Box bg="white" p="md" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
          <QRCode value={WHATSAPP_URL} size={160} />
        </Box>

        <Text size="sm" c="dimmed" ta="center">
          Scan the code to chat with the bot on WhatsApp
          <br />
          (dummy number for now, it will be the official line soon).
        </Text>

        <Anchor href={WHATSAPP_URL} target="_blank" rel="noreferrer" size="sm">
          Open chat on WhatsApp
        </Anchor>
      </Stack>
    </Paper>
  )
}
