import { Link } from '@tanstack/react-router'
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { IconMapPin, IconMessageChatbot } from '@tabler/icons-react'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { SocialLinks } from '../../components/SocialLinks'
import classes from './LandingPage.module.css'

export function LandingPage() {
  return (
    <section className={classes.hero}>
      <DotGrid />

      <Container size="md" className={classes.content}>
        <Stack align="center" gap="lg">
          <Badge
            variant="light"
            size="lg"
            radius="xl"
            leftSection={<IconMapPin size={14} />}
            className={classes.reveal}
          >
            Bariloche, Argentina · 20 years in tech
          </Badge>

          <Title order={1} className={`${classes.title} ${classes.reveal}`}>
            Hi, I'm <span className={classes.gradientText}>Esteban Piga Alessi</span>
          </Title>

          <Text size="xl" c="dimmed" maw={640} className={classes.reveal}>
            Systems Analyst &amp; Fullstack Developer with a strong backend focus.
          </Text>

          <Group justify="center" gap="md" className={classes.reveal}>
            <Button
              component={Link}
              to="/chat"
              size="md"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
              leftSection={<IconMessageChatbot size={20} />}
              className={classes.cta}
            >
              Chat with my profile
            </Button>
            <SocialLinks />
          </Group>
        </Stack>
      </Container>
    </section>
  )
}
