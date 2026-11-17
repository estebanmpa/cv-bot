import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPage } from '../../pages/ProjectsPage/ProjectsPage'

export const Route = createFileRoute('/_public/projects')({
  component: ProjectsPage,
})
