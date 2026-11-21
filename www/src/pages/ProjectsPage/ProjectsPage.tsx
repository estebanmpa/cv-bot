import { Alert, Container, SimpleGrid, Skeleton, Stack, Text, Title } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { Trans, useTranslation } from 'react-i18next'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { useProjects } from '../../queries/useProjects'
import classes from '../../styles/page.module.css'

const SKELETON_CARDS = 2

export function ProjectsPage() {
  const { t } = useTranslation()

  return (
    <section className={classes.page}>
      <DotGrid />

      <Container size="lg" className={classes.content}>
        <Stack gap="xs" mb="xl">
          <Title order={1} className={classes.title}>
            <Trans
              i18nKey="projects.title"
              components={{ highlight: <span className={classes.gradientText} /> }}
            />
          </Title>
          <Text size="lg" c="dimmed" maw={620}>
            {t('projects.intro')}
          </Text>
        </Stack>

        <ProjectList />
      </Container>
    </section>
  )
}

function ProjectList() {
  const { t } = useTranslation()
  const { data: projects, isPending, isError } = useProjects()

  if (isError) {
    return (
      <Alert color="red" radius="lg" icon={<IconAlertTriangle size={18} />}>
        {t('projects.loadError')}
      </Alert>
    )
  }

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
      {isPending
        ? Array.from({ length: SKELETON_CARDS }, (_, index) => (
            <Skeleton key={index} height={380} radius="xl" />
          ))
        : projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
    </SimpleGrid>
  )
}
