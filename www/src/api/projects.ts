import { API_BASE_URL } from './apiBaseUrl'

export type ProjectStatus = 'live' | 'in-development'

export interface Project {
  slug: string
  name: string
  tagline: string
  status: ProjectStatus
  url?: string
  highlights: string[]
  stack: string[]
  suggestedQuestion: string
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`)

  if (!response.ok) {
    throw new Error(`Could not load the projects (${response.status})`)
  }

  return response.json()
}
