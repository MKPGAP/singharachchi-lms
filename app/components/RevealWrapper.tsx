'use client'
import { useEffect, useRef, useState } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade'

interface Props {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
  threshold?: number
}

const hidden: Record<Direction, string> = {
  up:    'translate-y-10 opacity-0',
  down:  '-translate-y-10 opacity-0',
  left:  'translate-x-10 opacity-0',
  right: '-translate-x-10 opacity-0',
  fade:  'opacity-0',
}

export default function RevealWrapper({
  children, direction = 'up', delay = 0, className = '', threshold = 0.15
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : hidden[direction]} ${className}`}>
      {children}
    </div>
  )
}
