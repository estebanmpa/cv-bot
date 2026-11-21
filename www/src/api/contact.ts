import { API_BASE_URL } from './apiBaseUrl'
import type { ContactRequest } from '../components/ContactForm/contactSchema'

/** Carries the HTTP status so the UI can explain the failure in the visitor's language. */
export class ContactRequestError extends Error {
  constructor(readonly status: number) {
    super(`The contact request failed (${status})`)
  }

  /** The backend got the request but couldn't forward it (e.g. Telegram is down). */
  get isDeliveryFailure(): boolean {
    return this.status === 503
  }
}

export async function sendContactRequest(request: ContactRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new ContactRequestError(response.status)
  }
}
