import { Alert, Container, SimpleGrid, Skeleton, Stack, Text, Title } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { useProjects } from '../../queries/useProjects'
import classes from './ProjectsPage.module.css'

const SKELETON_CARDS = 2

export function ProjectsPage() {
  return (
    <section className={classes.page}>
      <DotGrid />

      <Container size="lg" className={classes.content}>
        <Stack gap="xs" mb="xl">
          <Title order={1} className={classes.title}>
            Projects I'm <span className={classes.gradientText}>building</span>
          </Title>
          <Text size="lg" c="dimmed" maw={620}>
            Side projects I design, build and run end to end, from the architecture to the
            deploy.
          </Text>
        </Stack>

        <ProjectList />
      </Container>
    </section>
  )
}

function ProjectList() {
  const { data: projects, isPending, isError } = useProjects()

  if (isError) {
    return (
      <Alert color="red" radius="lg" icon={<IconAlertTriangle size={18} />}>
        The projects couldn't be loaded. Please try again in a moment.
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
