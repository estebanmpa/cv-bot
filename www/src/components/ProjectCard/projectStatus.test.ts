import { describe, expect, it } from 'vitest'
import { statusBadgeFor } from './projectStatus'

describe('statusBadgeFor', () => {
  it('labels live projects', () => {
    expect(statusBadgeFor('live')).toEqual({ labelKey: 'projects.status.live', color: 'teal' })
  })

  it('labels projects still in development', () => {
    expect(statusBadgeFor('in-development').labelKey).toBe('projects.status.inDevelopment')
  })
})
