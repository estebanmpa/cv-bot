import { Link } from '@tanstack/react-router'
import {
  Alert,
  Button,
  Container,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconAlertTriangle, IconSend } from '@tabler/icons-react'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { ServiceCard } from '../../components/ServiceCard/ServiceCard'
import { useServiceOfferings } from '../../queries/useServiceOfferings'
import pageClasses from '../../styles/page.module.css'
import classes from './ServicesPage.module.css'

const SKELETON_CARDS = 3

const WORK_STEPS = [
  { title: 'Discovery call', text: 'A short call to understand the problem and the goal.' },
  { title: 'Proposal', text: 'Scope, milestones and a quote, so you know what to expect.' },
  { title: 'Build', text: 'Short iterations with demos you can try, not status reports.' },
  { title: 'Launch & support', text: 'Deploy, handover docs, and help once it is live.' },
] as const

export function ServicesPage() {
  return (
    <section className={pageClasses.page}>
      <DotGrid />

      <Container size="lg" className={pageClasses.content}>
        <Stack gap="xs" mb="xl">
          <Title order={1} className={pageClasses.title}>
            How I can <span className={pageClasses.gradientText}>help</span>
          </Title>
          <Text size="lg" c="dimmed" maw={640}>
            Freelance projects and part-time roles, for teams anywhere. I take ownership from
            the first conversation to production.
          </Text>
        </Stack>

        <ServiceList />
        <WorkProcess />
        <ContactCallout />
      </Container>
    </section>
  )
}

function ServiceList() {
  const { data: offerings, isPending, isError } = useServiceOfferings()

  if (isError) {
    return (
      <Alert color="red" radius="lg" icon={<IconAlertTriangle size={18} />}>
        The services couldn't be loaded. Please try again in a moment.
      </Alert>
    )
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {isPending
        ? Array.from({ length: SKELETON_CARDS }, (_, index) => (
            <Skeleton key={index} height={420} radius="xl" />
          ))
        : offerings.map((offering) => <ServiceCard key={offering.slug} offering={offering} />)}
    </SimpleGrid>
  )
}

function WorkProcess() {
  return (
    <Stack gap="lg" mt={64}>
      <Title order={2} className={classes.sectionTitle}>
        How I work
      </Title>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg">
        {WORK_STEPS.map((step, index) => (
          <div key={step.title} className={classes.step}>
            <span className={classes.stepNumber}>{index + 1}</span>
            <Text fw={700} mt="sm">
              {step.title}
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
              {step.text}
            </Text>
          </div>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

function ContactCallout() {
  return (
    <div className={classes.callout}>
      <div>
        <Title order={2} className={classes.sectionTitle}>
          Have a project in mind?
        </Title>
        <Text c="dimmed" mt={4}>
          Tell me what you need and I'll get back to you with next steps.
        </Text>
      </div>
      <Button
        component={Link}
        to="/contact"
        size="md"
        radius="xl"
        variant="gradient"
        gradient={{ from: 'violet', to: 'cyan', deg: 90 }}
        leftSection={<IconSend size={18} />}
      >
        Start a project
      </Button>
    </div>
  )
}
