import { ProjectStatus } from '../../api/projects'

interface StatusBadge {
  label: string
  color: string
}

const STATUS_BADGES: Record<ProjectStatus, StatusBadge> = {
  live: { label: 'Live', color: 'teal' },
  'in-development': { label: 'In development', color: 'yellow' },
}

export function statusBadgeFor(status: ProjectStatus): StatusBadge {
  return STATUS_BADGES[status]
}
