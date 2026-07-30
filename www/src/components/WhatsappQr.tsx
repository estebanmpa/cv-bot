import { Anchor, Box, Paper, Stack, Title } from '@mantine/core'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import QRCode from 'react-qr-code'

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE ?? '5490000000000'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`

export function WhatsappQr() {
  return (
    <Paper withBorder radius="lg" p="sm" shadow="sm" h="100%">
      <Stack align="center" gap={4} h="100%" justify="center">
        <Title order={5} display="flex" style={{ alignItems: 'center', gap: 6 }}>
          <IconBrandWhatsapp size={18} color="var(--mantine-color-green-6)" />
          Chat on WhatsApp
        </Title>

        <Box bg="white" p={6} style={{ borderRadius: 'var(--mantine-radius-md)' }}>
          <QRCode value={WHATSAPP_URL} size={100} />
        </Box>

        <Anchor href={WHATSAPP_URL} target="_blank" rel="noreferrer" size="xs">
          Open chat on WhatsApp
        </Anchor>
      </Stack>
    </Paper>
  )
}
