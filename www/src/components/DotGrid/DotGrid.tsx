import { useEffect, useRef } from 'react'
import { useComputedColorScheme } from '@mantine/core'
import { createDotGrid } from '../../utils/dotGrid'
import classes from './DotGrid.module.css'

const DOT_SPACING = 28
const DOT_RADIUS = 1.2

const DOT_COLORS: Record<'light' | 'dark', string> = {
  light: 'rgba(60, 60, 90, 0.18)',
  dark: 'rgba(200, 200, 255, 0.14)',
}

function drawGrid(canvas: HTMLCanvasElement, color: string) {
  const context = canvas.getContext('2d')
  if (!context) return

  const ratio = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width * ratio
  canvas.height = height * ratio
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  context.fillStyle = color

  for (const dot of createDotGrid(width, height, DOT_SPACING)) {
    context.beginPath()
    context.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
    context.fill()
  }
}

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorScheme = useComputedColorScheme('light')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const redraw = () => drawGrid(canvas, DOT_COLORS[colorScheme])
    redraw()
    const resizeObserver = new ResizeObserver(redraw)
    resizeObserver.observe(canvas)

    return () => resizeObserver.disconnect()
  }, [colorScheme])

  return <canvas ref={canvasRef} className={classes.grid} aria-hidden="true" />
}
