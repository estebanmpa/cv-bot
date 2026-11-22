import {
  type Icon,
  IconBriefcase,
  IconDatabase,
  IconPlugConnected,
  IconRocket,
  IconSparkles,
  IconTool,
} from '@tabler/icons-react'

const ICONS_BY_SLUG: Record<string, Icon> = {
  mvp: IconRocket,
  backend: IconPlugConnected,
  ai: IconSparkles,
  legacy: IconDatabase,
  maintenance: IconTool,
}

// Services come from the backend, so a new slug must still render.
export function serviceIconFor(slug: string): Icon {
  return ICONS_BY_SLUG[slug] ?? IconBriefcase
}
