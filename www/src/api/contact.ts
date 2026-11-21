import { API_BASE_URL } from './apiBaseUrl'
import type { ContactRequest } from '../components/ContactForm/contactSchema'

const FALLBACK_ERROR = "Your message couldn't be sent. Please try again in a moment."

export async function sendContactRequest(request: ContactRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
}

// The backend explains delivery failures (503); anything else gets a generic message.
async function readErrorMessage(response: Response): Promise<string> {
  if (response.status !== 503) return FALLBACK_ERROR

  try {
    const body = await response.json()
    return typeof body.message === 'string' ? body.message : FALLBACK_ERROR
  } catch {
    return FALLBACK_ERROR
  }
}
