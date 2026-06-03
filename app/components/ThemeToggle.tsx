'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect((): (() => void) | void => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-10 h-10" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(11,31,74,0.08)',
        border: resolvedTheme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(11,31,74,0.2)'
      }}
    >
      {resolvedTheme === 'dark'
        ? <Sun size={16} className="text-yellow-400" />
        : <Moon size={16} className="text-[#0B1F4A]" />
      }
    </button>
  )
}