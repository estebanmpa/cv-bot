import { createFileRoute } from '@tanstack/react-router'
import {
  Avatar,
  Box,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ChatWindow } from '../../components/ChatWindow'
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle'
import { SocialLinks } from '../../components/SocialLinks'
import { WhatsappQr } from '../../components/WhatsappQr'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  const isMobile = useMediaQuery('(max-width: 48em)')

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Container size="lg" py="xl">
        <Paper
          radius={isMobile ? 0 : 'lg'}
          shadow={isMobile ? 'none' : 'md'}
          p={isMobile ? 0 : 'xl'}
          withBorder={!isMobile}
        >
          <Group justify="space-between" align="flex-start" mb="xl" wrap="wrap">
            <Group align="center" gap="md">
              <Avatar color="violet" radius="xl" size="lg">
                EP
              </Avatar>
              <Stack gap={2}>
                <Title order={2}>Esteban Mariano Piga Alessi</Title>
                <Text c="dimmed">
                  Professional presentation, social links, and chat with my virtual assistant.
                </Text>
                <SocialLinks />
              </Stack>
            </Group>

            <ColorSchemeToggle />
          </Group>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 7 }} h={480}>
              <ChatWindow />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} h={480}>
              <WhatsappQr />
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
