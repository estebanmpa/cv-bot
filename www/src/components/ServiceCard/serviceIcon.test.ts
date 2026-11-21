import { describe, expect, it } from 'vitest'
import { IconBriefcase, IconRocket } from '@tabler/icons-react'
import { serviceIconFor } from './serviceIcon'

describe('serviceIconFor', () => {
  it('returns the icon of a known service', () => {
    expect(serviceIconFor('mvp')).toBe(IconRocket)
  })

  it('falls back to a generic icon for unknown services', () => {
    expect(serviceIconFor('something-new')).toBe(IconBriefcase)
  })
})
