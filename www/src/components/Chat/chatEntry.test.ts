import { describe, expect, it } from 'vitest'
import { createChatEntry, parseMessageBody } from './chatEntry'

describe('parseMessageBody', () => {
  it('returns plain text when there is no link token', () => {
    expect(parseMessageBody('Hello there')).toEqual({ kind: 'text', text: 'Hello there' })
  })

  it('extracts the url from a link-token message', () => {
    expect(parseMessageBody('[[LINK]] https://example.com ')).toEqual({
      kind: 'link',
      url: 'https://example.com',
    })
  })

  it('treats a token that is not a prefix as plain text', () => {
    const text = 'see [[LINK]]https://example.com'

    expect(parseMessageBody(text)).toEqual({ kind: 'text', text })
  })
})

describe('createChatEntry', () => {
  it('creates entries with unique ids', () => {
    const first = createChatEntry('user', 'hi')
    const second = createChatEntry('user', 'hi')

    expect(first).toMatchObject({ role: 'user', text: 'hi' })
    expect(first.id).not.toBe(second.id)
  })
})
