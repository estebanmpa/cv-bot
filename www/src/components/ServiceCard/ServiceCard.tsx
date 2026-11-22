import { Link } from '@tanstack/react-router'
import { Button, Group, List, Text, ThemeIcon, Title } from '@mantine/core'
import { IconCheck, IconMessageChatbot, IconRosette } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { ServiceOffering } from '../../api/serviceOfferings'
import { serviceIconFor } from './serviceIcon'
import classes from './ServiceCard.module.css'

export function ServiceCard({ offering }: { offering: ServiceOffering }) {
  const { t } = useTranslation()
  const Icon = serviceIconFor(offering.slug)

  return (
    <article className={classes.card}>
      <Group gap="sm" wrap="nowrap">
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ from: 'violet', to: 'cyan', deg: 135 }}
        >
          <Icon size={24} stroke={1.8} />
        </ThemeIcon>
        <Title order={3} className={classes.name}>
          {offering.name}
        </Title>
      </Group>

      <Text c="dimmed">{offering.tagline}</Text>

      <List
        size="sm"
        spacing={6}
        className={classes.deliverables}
        icon={
          <ThemeIcon size={18} radius="xl" variant="light" color="teal">
            <IconCheck size={12} stroke={2.5} />
          </ThemeIcon>
        }
      >
        {offering.deliverables.map((deliverable) => (
          <List.Item key={deliverable}>{deliverable}</List.Item>
        ))}
      </List>

      <Group gap={8} wrap="nowrap" align="flex-start" className={classes.proof}>
        <IconRosette size={18} className={classes.proofIcon} />
        <Text size="sm">{offering.proof}</Text>
      </Group>

      <Button
        renderRoot={(props) => (
          <Link {...props} to="/chat" search={{ ask: offering.suggestedQuestion }} />
        )}
        variant="light"
        radius="xl"
        leftSection={<IconMessageChatbot size={18} />}
        className={classes.action}
      >
        {t('common.askBot')}
      </Button>
    </article>
  )
}
