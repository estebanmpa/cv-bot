import { describe, expect, it } from 'vitest'
import { createDotGrid } from './dotGrid'

describe('createDotGrid', () => {
  it('covers the area with evenly spaced, centered dots', () => {
    const dots = createDotGrid(100, 50, 20)

    expect(dots).toHaveLength(6 * 3)
    expect(dots[0]).toEqual({ x: 0, y: 5 })
    expect(dots[1]).toEqual({ x: 20, y: 5 })
  })

  it('places a single dot at the origin for an empty area', () => {
    expect(createDotGrid(0, 0, 20)).toEqual([{ x: 0, y: 0 }])
  })
})
