import { Link } from '@tanstack/react-router'
import { Badge, Button, Group, List, Text, Title } from '@mantine/core'
import { IconExternalLink, IconMessageChatbot } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Project } from '../../api/projects'
import { statusBadgeFor } from './projectStatus'
import classes from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const status = statusBadgeFor(project.status)

  return (
    <article className={classes.card}>
      <Group justify="space-between" align="center" wrap="nowrap">
        <Title order={3} className={classes.name}>
          {project.name}
        </Title>
        <Badge variant="dot" color={status.color} radius="xl">
          {t(status.labelKey)}
        </Badge>
      </Group>

      <Text c="dimmed">{project.tagline}</Text>

      <List size="sm" spacing={6} className={classes.highlights}>
        {project.highlights.map((highlight) => (
          <List.Item key={highlight}>{highlight}</List.Item>
        ))}
      </List>

      <Group gap={6} className={classes.stack}>
        {project.stack.map((technology) => (
          <Badge key={technology} variant="light" color="violet" radius="sm" tt="none">
            {technology}
          </Badge>
        ))}
      </Group>

      <Group gap="sm" className={classes.actions}>
        {project.url && (
          <Button
            component="a"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
            radius="xl"
            leftSection={<IconExternalLink size={18} />}
          >
            {t('projects.visitSite')}
          </Button>
        )}
        <Button
          renderRoot={(props) => (
            <Link {...props} to="/chat" search={{ ask: project.suggestedQuestion }} />
          )}
          variant="light"
          radius="xl"
          leftSection={<IconMessageChatbot size={18} />}
        >
          {t('common.askBot')}
        </Button>
      </Group>
    </article>
  )
}
