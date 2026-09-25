import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '../../pages/LandingPage/LandingPage'

export const Route = createFileRoute('/_public/')({
  component: LandingPage,
})
