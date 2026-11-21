import { Link } from '@tanstack/react-router'
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { IconBriefcase, IconMessageChatbot, IconSend } from '@tabler/icons-react'
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
            color="teal"
            size="lg"
            radius="xl"
            leftSection={<span className={classes.availableDot} />}
            className={classes.reveal}
          >
            Open to freelance &amp; part-time
          </Badge>

          <Title order={1} className={`${classes.title} ${classes.reveal}`}>
            From idea to <span className={classes.gradientText}>production</span>, end to end
          </Title>

          <Text size="xl" c="dimmed" maw={680} className={classes.reveal}>
            I'm Esteban Piga Alessi, a fullstack developer with 20 years in tech and a strong
            backend focus. I build MVPs, APIs, integrations and AI features, and keep them
            running.
          </Text>

          <Group justify="center" gap="md" className={classes.reveal}>
            <Button
              component={Link}
              to="/contact"
              size="md"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
              leftSection={<IconSend size={20} />}
              className={classes.cta}
            >
              Start a project
            </Button>
            <Button
              component={Link}
              to="/services"
              size="md"
              radius="xl"
              variant="default"
              leftSection={<IconBriefcase size={20} />}
              className={classes.cta}
            >
              See my services
            </Button>
            <Button
              component={Link}
              to="/chat"
              size="md"
              radius="xl"
              variant="light"
              leftSection={<IconMessageChatbot size={20} />}
              className={classes.cta}
            >
              Chat with my profile
            </Button>
          </Group>

          <div className={classes.reveal}>
            <SocialLinks />
          </div>
        </Stack>
      </Container>
    </section>
  )
}
