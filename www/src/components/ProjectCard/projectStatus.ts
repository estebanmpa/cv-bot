import { ProjectStatus } from '../../api/projects'

interface StatusBadge {
  labelKey: 'projects.status.live' | 'projects.status.inDevelopment'
  color: string
}

const STATUS_BADGES: Record<ProjectStatus, StatusBadge> = {
  live: { labelKey: 'projects.status.live', color: 'teal' },
  'in-development': { labelKey: 'projects.status.inDevelopment', color: 'yellow' },
}

export function statusBadgeFor(status: ProjectStatus): StatusBadge {
  return STATUS_BADGES[status]
}
