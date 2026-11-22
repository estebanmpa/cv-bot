import { Anchor, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconClock, IconMail, IconMessageChatbot } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { ContactForm } from '../../components/ContactForm/ContactForm'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { SocialLinks } from '../../components/SocialLinks'
import pageClasses from '../../styles/page.module.css'

const CONTACT_EMAIL = 'esteban.pigaalessi@gmail.com'

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <section className={pageClasses.page}>
      <DotGrid />

      <Container size="lg" className={pageClasses.content}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
          <Stack gap="lg">
            <Title order={1} className={pageClasses.title}>
              <Trans
                i18nKey="contact.title"
                components={{ highlight: <span className={pageClasses.gradientText} /> }}
              />
            </Title>
            <Text size="lg" c="dimmed">
              {t('contact.intro')}
            </Text>

            <Stack gap="sm">
              <ContactDetail icon={<IconClock size={18} />}>
                {t('contact.timezone')}
              </ContactDetail>
              <ContactDetail icon={<IconMail size={18} />}>
                <Anchor href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Anchor>
              </ContactDetail>
              <ContactDetail icon={<IconMessageChatbot size={18} />}>
                {t('contact.knowMore')}{' '}
                <Anchor component={Link} to="/chat">
                  {t('contact.askProfileBot')}
                </Anchor>
              </ContactDetail>
            </Stack>

            <SocialLinks />
          </Stack>

          <ContactForm />
        </SimpleGrid>
      </Container>
    </section>
  )
}

function ContactDetail({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Group gap="sm" wrap="nowrap">
      <ThemeIcon variant="light" radius="xl" size={34}>
        {icon}
      </ThemeIcon>
      <Text size="sm">{children}</Text>
    </Group>
  )
}
