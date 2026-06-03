'use client'
import { useEffect, useRef } from 'react'

export default function MediaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let scrollY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', () => { scrollY = window.scrollY })

    // Signal wave particles
    const particles: {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; type: string
    }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        type: ['circle', 'square', 'line'][Math.floor(Math.random() * 3)]
      })
    }

    // Film frame corners
    const drawFilmCorner = (x: number, y: number, size: number, flip: boolean) => {
      ctx.strokeStyle = 'rgba(160,25,45,0.15)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      if (!flip) {
        ctx.moveTo(x, y + size)
        ctx.lineTo(x, y)
        ctx.lineTo(x + size, y)
      } else {
        ctx.moveTo(x - size, y)
        ctx.lineTo(x, y)
        ctx.lineTo(x, y + size)
      }
      ctx.stroke()
    }

    // Sound wave bars
    const drawSoundWave = (x: number, y: number, time: number) => {
      const bars = 8
      const barWidth = 3
      const gap = 4
      for (let i = 0; i < bars; i++) {
        const height = Math.abs(Math.sin(time * 0.02 + i * 0.8)) * 20 + 4
        ctx.fillStyle = 'rgba(160,25,45,0.12)'
        ctx.fillRect(x + i * (barWidth + gap), y - height / 2, barWidth, height)
      }
    }

    // Signal circles (broadcast waves)
    const drawSignal = (x: number, y: number, time: number) => {
      for (let r = 1; r <= 3; r++) {
        const radius = (r * 20) + ((time * 0.5) % 20)
        const opacity = Math.max(0, 0.15 - (radius / 80))
        ctx.strokeStyle = `rgba(160,25,45,${opacity})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // Grid lines (broadcast grid)
    const drawGrid = () => {
      const gridSize = 80
      const offsetX = (scrollY * 0.1) % gridSize
      const offsetY = (scrollY * 0.05) % gridSize
      ctx.strokeStyle = 'rgba(11,31,74,0.08)'
      ctx.lineWidth = 0.5
      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      // Grid
      drawGrid()

      // Film frame corners at fixed positions
      const corners = [
        { x: 60, y: 60, flip: false },
        { x: canvas.width - 60, y: 60, flip: true },
        { x: 60, y: canvas.height - 60, flip: false },
        { x: canvas.width - 60, y: canvas.height - 60, flip: true },
      ]
      corners.forEach(c => drawFilmCorner(c.x, c.y, 24, c.flip))

      // Sound waves at positions
      drawSoundWave(canvas.width * 0.1, canvas.height * 0.3, time)
      drawSoundWave(canvas.width * 0.85, canvas.height * 0.7, time + 20)

      // Broadcast signals
      drawSignal(canvas.width * 0.08, canvas.height * 0.15, time)
      drawSignal(canvas.width * 0.92, canvas.height * 0.85, time)
      drawSignal(canvas.width * 0.5, canvas.height * 0.05, time + 30)

      // Particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.fillStyle = `rgba(160,25,45,${p.opacity})`
        if (p.type === 'circle') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type === 'square') {
          ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2)
        } else {
          ctx.strokeStyle = `rgba(160,25,45,${p.opacity})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x - 4, p.y)
          ctx.lineTo(p.x + 4, p.y)
          ctx.stroke()
        }
      })

      // Connect nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(160,25,45,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      // Scanline effect (subtle)
      const scanlineY = (time * 2) % canvas.height
      ctx.fillStyle = 'rgba(160,25,45,0.015)'
      ctx.fillRect(0, scanlineY, canvas.width, 2)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  )
}