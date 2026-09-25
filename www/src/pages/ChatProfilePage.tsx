import {
  Avatar,
  Box,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ChatWindow } from '../components/ChatWindow'
import { TelegramQr } from '../components/TelegramQr'

export function ChatProfilePage() {
  const isMobile = useMediaQuery('(max-width: 48em)')

  return (
    <Box
      style={{
        minHeight: 'calc(100vh - 60px)',
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
          <Group align="center" gap="md" mb="xl">
            <Avatar color="violet" radius="xl" size="lg">
              EP
            </Avatar>
            <Stack gap={2}>
              <Title order={2}>Esteban Mariano Piga Alessi</Title>
            </Stack>
          </Group>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 7 }} h={480}>
              <ChatWindow />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} h={480}>
              <Stack h="100%" gap="md">
                <Box style={{ flex: 1, minHeight: 0 }}>
                  <TelegramQr />
                </Box>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
