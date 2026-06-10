'use client'
import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const SI = (p: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${p.className ?? ''}`}>{p.children}</span>
)

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])

  const handleReset = async () => {
    setLoading(true)
    setError('')
    const redirectTo = typeof window !== 'undefined'
      ? `${window.location.origin}/update-password`
      : 'https://singharachchi-lms.vercel.app/update-password'
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  const BG = (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 z-10" style={{background:'linear-gradient(135deg, rgba(5,10,20,0.8) 0%, rgba(5,10,20,0.6) 50%, rgba(5,10,20,0.85) 100%)'}} />
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-50" autoPlay loop muted playsInline>
        <source src="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15" style={{background:'radial-gradient(circle, rgba(160,25,45,0.9) 0%, transparent 70%)'}} />
      </div>
    </div>
  )

  if (success) return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-[#050A14] overflow-hidden">
      {BG}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-md text-center rounded-3xl p-10"
        style={{background:'rgba(5,10,20,0.8)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)'}}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 rounded-full bg-[#A0192D]/10 border border-[#A0192D]/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#A0192D]" />
        </motion.div>
        <SI className="block text-2xl font-black text-white mb-2">Email යවා ඇත!</SI>
        <SI className="block text-gray-400 text-sm mb-8">ඔබගේ email එකට password reset link එකක් යවා ඇත. Email එක බලා password reset කරන්න.</SI>
        <Link href="/login">
          <button className="font-noto-si w-full py-4 rounded-2xl text-white font-bold" style={{background:'linear-gradient(135deg, #B41F36, #8E1327)'}}>
            Login වෙත යන්න
          </button>
        </Link>
      </motion.div>
    </main>
  )

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden bg-[#050A14]">
      {BG}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-md">

        <div className="text-center mb-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="text-3xl font-black text-white mb-1">Singharachchi Sir</h1>
            <SI className="text-[#A0192D] text-xs tracking-widest font-semibold">කලා ලොවේ රජ විෂය — මාධ්‍ය</SI>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="rounded-3xl p-8" style={{background:'rgba(5,10,20,0.7)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)', boxShadow:'0 40px 80px rgba(0,0,0,0.5)'}}>

          <div className="mb-6">
            <SI className="block text-xl font-black text-white mb-1">Password Reset</SI>
            <SI className="block text-gray-500 text-sm">ඔබගේ email ඇතුළත් කරන්න — reset link එකක් යවනු ලැබේ</SI>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-3 mb-5 text-sm text-red-300 flex items-center gap-2"
              style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </motion.div>
          )}

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleReset()}
                placeholder="your@email.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none"
                style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(160,25,45,0.4)' }} whileTap={{ scale: 0.97 }}
            onClick={handleReset} disabled={loading || !email}
            className="font-noto-si w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            style={{background:'linear-gradient(135deg, #B41F36, #8E1327)'}}>
            {loading ? (
              <>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="block w-4 h-4 rounded-full border-2 border-white border-t-transparent" />
                <SI>යවමින්...</SI>
              </>
            ) : (
              <><SI>Reset Link යවන්න</SI><ArrowRight size={18} /></>
            )}
          </motion.button>

          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors">
              <ArrowLeft size={14} />
              <SI>Login වෙත යන්න</SI>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
