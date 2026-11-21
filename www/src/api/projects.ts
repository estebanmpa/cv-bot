import { API_BASE_URL } from './apiBaseUrl'
import type { LanguageCode } from '../i18n'

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

export async function fetchProjects(language: LanguageCode): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects?lang=${language}`)

  if (!response.ok) {
    throw new Error(`Could not load the projects (${response.status})`)
  }

  return response.json()
}
