import { Anchor, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconClock, IconMail, IconMessageChatbot } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { ContactForm } from '../../components/ContactForm/ContactForm'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { SocialLinks } from '../../components/SocialLinks'
import pageClasses from '../../styles/page.module.css'

const CONTACT_EMAIL = 'esteban.pigaalessi@gmail.com'

export function ContactPage() {
  return (
    <section className={pageClasses.page}>
      <DotGrid />

      <Container size="lg" className={pageClasses.content}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
          <Stack gap="lg">
            <Title order={1} className={pageClasses.title}>
              Let's build <span className={pageClasses.gradientText}>something</span>
            </Title>
            <Text size="lg" c="dimmed">
              Tell me about your project or role. I read every message myself and reply with
              next steps, usually within one business day.
            </Text>

            <Stack gap="sm">
              <ContactDetail icon={<IconClock size={18} />}>
                Bariloche, Argentina (UTC−3), working with teams in any time zone
              </ContactDetail>
              <ContactDetail icon={<IconMail size={18} />}>
                <Anchor href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Anchor>
              </ContactDetail>
              <ContactDetail icon={<IconMessageChatbot size={18} />}>
                Want to know more first?{' '}
                <Anchor component={Link} to="/chat">
                  Ask my profile bot
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
