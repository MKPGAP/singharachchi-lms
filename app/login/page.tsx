'use client'
import { supabase } from '../lib/supabase'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const SI = (p: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${p.className ?? ''}`}>{p.children}</span>
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    window.location.href = '/dashboard'
    setLoading(false)
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden bg-[#050A14]">

      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" style={{background:'linear-gradient(135deg, rgba(5,10,20,0.75) 0%, rgba(5,10,20,0.55) 50%, rgba(5,10,20,0.8) 100%)'}} />
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-60"
          autoPlay loop muted playsInline>
          <source src="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle red glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{background:'radial-gradient(circle, rgba(160,25,45,0.9) 0%, transparent 70%)'}} />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10"
          style={{background:'radial-gradient(circle, rgba(11,31,74,0.9) 0%, transparent 70%)'}} />
      </div>

      {/* Main card */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-md">

        {/* Logo area */}
        <div className="text-center mb-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
              style={{background:'rgba(160,25,45,0.1)', border:'1px solid rgba(160,25,45,0.3)'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A0192D] animate-pulse" />
              <SI className="text-[#A0192D] text-[11px] tracking-[0.2em]">2026 ලියාපදිංචිය ආරම්භ වී ඇත</SI>
            </div>
            <h1 className="text-3xl font-black text-white mb-1">Singharachchi Sir</h1>
            <SI className="text-[#A0192D] text-xs tracking-widest font-semibold">කලා ලොවේ රජ විෂය — මාධ්‍ය</SI>
          </motion.div>
        </div>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="rounded-3xl p-8" style={{background:'rgba(5,10,20,0.7)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)', boxShadow:'0 40px 80px rgba(0,0,0,0.5)'}}>

          <div className="mb-6">
            <SI className="block text-xl font-black text-white mb-1">පිවිසෙන්න</SI>
            <p className="text-gray-500 text-sm">Sign in to your account to continue learning</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-3 mb-5 text-sm text-red-300 flex items-center gap-2"
              style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </motion.div>
          )}

          <div className="space-y-4 mb-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
                <button onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mb-6">
            <Link href="/reset-password">
              <SI className="text-xs text-[#A0192D] hover:text-white transition-colors">Password අමතකද?</SI>
            </Link>
          </div>

          <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(160,25,45,0.4)' }} whileTap={{ scale: 0.97 }}
            onClick={handleLogin} disabled={loading || !email || !password}
            className="font-noto-si w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            style={{background:'linear-gradient(135deg, #B41F36, #8E1327)'}}>
            {loading ? (
              <>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="block w-4 h-4 rounded-full border-2 border-white border-t-transparent" />
                <SI>පිවිසෙමින්...</SI>
              </>
            ) : (
              <>
                <SI>පිවිසෙන්න</SI>
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-6">
            <SI>ගිණුමක් නැද්ද? </SI>
            <Link href="/register" className="text-[#A0192D] font-semibold hover:text-white transition-colors">
              <SI>ලියාපදිංචි වන්න</SI>
            </Link>
          </p>
        </motion.div>

        {/* Bottom trust signals */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex justify-center gap-6 mt-6">
          {['500+ Students', '95% Pass Rate', '12+ Years'].map((t, i) => (
            <div key={i} className="text-center">
              <p className="text-white text-xs font-bold">{t.split(' ')[0]}</p>
              <p className="text-gray-600 text-[10px]">{t.split(' ').slice(1).join(' ')}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}
