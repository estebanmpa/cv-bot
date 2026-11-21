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
import { Trans, useTranslation } from 'react-i18next'
import { DotGrid } from '../../components/DotGrid/DotGrid'
import { ServiceCard } from '../../components/ServiceCard/ServiceCard'
import { useServiceOfferings } from '../../queries/useServiceOfferings'
import pageClasses from '../../styles/page.module.css'
import classes from './ServicesPage.module.css'

const SKELETON_CARDS = 3

const WORK_STEPS = ['discovery', 'proposal', 'build', 'launch'] as const

export function ServicesPage() {
  const { t } = useTranslation()

  return (
    <section className={pageClasses.page}>
      <DotGrid />

      <Container size="lg" className={pageClasses.content}>
        <Stack gap="xs" mb="xl">
          <Title order={1} className={pageClasses.title}>
            <Trans
              i18nKey="services.title"
              components={{ highlight: <span className={pageClasses.gradientText} /> }}
            />
          </Title>
          <Text size="lg" c="dimmed" maw={640}>
            {t('services.intro')}
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
  const { t } = useTranslation()
  const { data: offerings, isPending, isError } = useServiceOfferings()

  if (isError) {
    return (
      <Alert color="red" radius="lg" icon={<IconAlertTriangle size={18} />}>
        {t('services.loadError')}
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
  const { t } = useTranslation()

  return (
    <Stack gap="lg" mt={64}>
      <Title order={2} className={classes.sectionTitle}>
        {t('services.howIWork')}
      </Title>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="lg">
        {WORK_STEPS.map((step, index) => (
          <div key={step} className={classes.step}>
            <span className={classes.stepNumber}>{index + 1}</span>
            <Text fw={700} mt="sm">
              {t(`services.steps.${step}.title`)}
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
              {t(`services.steps.${step}.text`)}
            </Text>
          </div>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

function ContactCallout() {
  const { t } = useTranslation()

  return (
    <div className={classes.callout}>
      <div>
        <Title order={2} className={classes.sectionTitle}>
          {t('services.callout.title')}
        </Title>
        <Text c="dimmed" mt={4}>
          {t('services.callout.text')}
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
        {t('landing.startProject')}
      </Button>
    </div>
  )
}
