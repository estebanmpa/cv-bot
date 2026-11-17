import { describe, expect, it } from 'vitest'
import { MAX_QUESTION_LENGTH, parseChatSearch } from './chatSearch'

describe('parseChatSearch', () => {
  it('keeps a trimmed question', () => {
    expect(parseChatSearch({ ask: '  What is IAM?  ' })).toEqual({ ask: 'What is IAM?' })
  })

  it('drops missing, blank or non-string questions', () => {
    expect(parseChatSearch({})).toEqual({})
    expect(parseChatSearch({ ask: '   ' })).toEqual({})
    expect(parseChatSearch({ ask: 42 })).toEqual({})
  })

  it('caps the question length', () => {
    const { ask } = parseChatSearch({ ask: 'a'.repeat(MAX_QUESTION_LENGTH + 50) })
    expect(ask).toHaveLength(MAX_QUESTION_LENGTH)
  })
})
