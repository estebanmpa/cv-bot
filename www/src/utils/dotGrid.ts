export interface Point {
  x: number
  y: number
}

export function createDotGrid(width: number, height: number, spacing: number): Point[] {
  const dots: Point[] = []
  const offsetX = (width % spacing) / 2
  const offsetY = (height % spacing) / 2

  for (let y = offsetY; y <= height; y += spacing) {
    for (let x = offsetX; x <= width; x += spacing) {
      dots.push({ x, y })
    }
  }

  return dots
}
