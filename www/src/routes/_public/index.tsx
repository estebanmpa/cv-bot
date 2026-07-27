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
import { ChatWindow } from '../../components/ChatWindow'
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle'
import { SocialLinks } from '../../components/SocialLinks'
import { WhatsappQr } from '../../components/WhatsappQr'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, var(--mantine-color-violet-1) 0%, var(--mantine-color-body) 55%)',
      }}
    >
      <Container size="lg" py="xl">
        <Paper radius="lg" shadow="md" p="xl" withBorder>
          <Group justify="space-between" align="flex-start" mb="xl" wrap="wrap">
            <Group align="center" gap="md">
              <Avatar color="violet" radius="xl" size="lg">
                EP
              </Avatar>
              <Stack gap={2}>
                <Title order={2}>Esteban Piga Alessi</Title>
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
