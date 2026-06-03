'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(11,31,74,0.08)',
        border: resolvedTheme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(11,31,74,0.2)'
      }}
    >
      {resolvedTheme === 'dark'
        ? <Sun size={15} className="text-yellow-400" />
        : <Moon size={15} className="text-[#0B1F4A]" />
      }
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(t)
  }, [])

  const isDark = !mounted || resolvedTheme === 'dark'

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 md:py-6"
      style={{
        backdropFilter: 'blur(24px)',
        background: isDark ? 'rgba(5,10,20,0.7)' : 'rgba(255,255,255,0.85)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(11,31,74,0.08)'
      }}
    >
      {/* Logo / Back */}
      <div className="flex items-center gap-3">
        {!isHome && (
          <Link href="/">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 mr-1"
              style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(11,31,74,0.06)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(11,31,74,0.1)'
              }}
            >
              <ArrowLeft size={14} className={isDark ? 'text-white' : 'text-[#0B1F4A]'} />
            </button>
          </Link>
        )}
        <Link href="/" className="flex flex-col">
          <span className={`font-bold text-lg md:text-xl tracking-tight leading-none ${isDark ? 'text-white' : 'text-[#0B1F4A]'}`}>
            Singharachchi Sir
          </span>
          <span className="font-noto-si text-[#A0192D] text-[10px] tracking-[0.25em] mt-0.5">
            කලා ලොවේ රජ විෂය — මාධ්‍ය
          </span>
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 md:gap-6">
        <Link href="/courses" className={`hidden md:inline text-sm tracking-wide transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#0B1F4A]'}`}>
          Courses
        </Link>
        <Link href="/register" className={`hidden md:inline text-sm tracking-wide transition-colors duration-200 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#0B1F4A]'}`}>
          Register
        </Link>
        <ThemeToggle />
        <Link href="/login">
          <button
            className="flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(160,25,45,0.8), rgba(160,25,45,0.5))',
              border: '1px solid rgba(160,25,45,0.6)'
            }}
          >
            Login
          </button>
        </Link>
      </div>
    </nav>
  )
}