import { describe, expect, it } from 'vitest'
import { contactSchema } from './contactSchema'

const validRequest = {
  name: 'Ada',
  email: 'ada@example.com',
  projectType: 'new-product',
  message: 'I need an MVP for a booking app.',
}

describe('contactSchema', () => {
  it('accepts a complete request', () => {
    expect(contactSchema.safeParse(validRequest).success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({ ...validRequest, email: 'ada' })

    expect(result.success).toBe(false)
  })

  it('rejects an unknown project type', () => {
    const result = contactSchema.safeParse({ ...validRequest, projectType: 'crypto' })

    expect(result.success).toBe(false)
  })

  it('asks for more detail when the message is too short', () => {
    const result = contactSchema.safeParse({ ...validRequest, message: '   hi   ' })

    expect(result.success).toBe(false)
  })

  it('trims the name and message', () => {
    const result = contactSchema.parse({ ...validRequest, name: '  Ada  ' })

    expect(result.name).toBe('Ada')
  })
})
