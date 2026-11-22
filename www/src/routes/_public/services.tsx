import { createFileRoute } from '@tanstack/react-router'
import { ServicesPage } from '../../pages/ServicesPage/ServicesPage'

export const Route = createFileRoute('/_public/services')({
  component: ServicesPage,
})
