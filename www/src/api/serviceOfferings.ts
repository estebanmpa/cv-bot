import { API_BASE_URL } from './apiBaseUrl'
import type { LanguageCode } from '../i18n'

export interface ServiceOffering {
  slug: string
  name: string
  tagline: string
  deliverables: string[]
  proof: string
  suggestedQuestion: string
}

export async function fetchServiceOfferings(language: LanguageCode): Promise<ServiceOffering[]> {
  const response = await fetch(`${API_BASE_URL}/services?lang=${language}`)

  if (!response.ok) {
    throw new Error(`Could not load the services (${response.status})`)
  }

  return response.json()
}
