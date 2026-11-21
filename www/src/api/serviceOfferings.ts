import { API_BASE_URL } from './apiBaseUrl'

export interface ServiceOffering {
  slug: string
  name: string
  tagline: string
  deliverables: string[]
  proof: string
  suggestedQuestion: string
}

export async function fetchServiceOfferings(): Promise<ServiceOffering[]> {
  const response = await fetch(`${API_BASE_URL}/services`)

  if (!response.ok) {
    throw new Error(`Could not load the services (${response.status})`)
  }

  return response.json()
}
