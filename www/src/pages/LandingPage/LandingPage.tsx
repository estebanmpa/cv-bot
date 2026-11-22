import { Link } from '@tanstack/react-router'
import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { IconBriefcase, IconMessageChatbot, IconSend } from '@tabler/icons-react'
import { Trans, useTranslation } from 'react-i18next'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { SocialLinks } from '../../components/SocialLinks'
import classes from './LandingPage.module.css'

export function LandingPage() {
  const { t } = useTranslation()

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
            {t('landing.availability')}
          </Badge>

          <Title order={1} className={`${classes.title} ${classes.reveal}`}>
            <Trans
              i18nKey="landing.title"
              components={{ highlight: <span className={classes.gradientText} /> }}
            />
          </Title>

          <Text size="xl" c="dimmed" maw={680} className={classes.reveal}>
            {t('landing.intro')}
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
              {t('landing.startProject')}
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
              {t('landing.seeServices')}
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
              {t('landing.chatWithProfile')}
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
