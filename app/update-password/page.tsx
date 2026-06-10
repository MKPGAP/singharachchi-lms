'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const SI = (p: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${p.className ?? ''}`}>{p.children}</span>
)

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showCf, setShowCf] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])

  // Handle #access_token hash — Supabase sets session from it
  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.includes('access_token')) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) setReady(true)
        else {
          // Parse and set session manually
          const params = new URLSearchParams(hash.replace('#', ''))
          const access_token = params.get('access_token')
          const refresh_token = params.get('refresh_token') || ''
          if (access_token) {
            supabase.auth.setSession({ access_token, refresh_token })
              .then(() => setReady(true))
          }
        }
      })
    } else {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) setReady(true)
        else window.location.href = '/reset-password'
      })
    }
  }, [])

  const handleUpdate = async () => {
    if (password !== confirm) { setError('Passwords do not match!'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password })
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
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{background:'radial-gradient(circle, rgba(160,25,45,0.9) 0%, transparent 70%)'}} />
    </div>
  )

  if (success) return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-[#050A14] overflow-hidden">
      {BG}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-md text-center rounded-3xl p-10"
        style={{background:'rgba(5,10,20,0.8)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)'}}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </motion.div>
        <SI className="block text-2xl font-black text-white mb-2">Password සාර්ථකව වෙනස් විය!</SI>
        <SI className="block text-gray-400 text-sm mb-8">ඔබේ නව password එකෙන් login වන්න.</SI>
        <Link href="/login">
          <button className="font-noto-si w-full py-4 rounded-2xl text-white font-bold" style={{background:'linear-gradient(135deg, #B41F36, #8E1327)'}}>Login වෙන්න</button>
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
          <h1 className="text-3xl font-black text-white mb-1">Singharachchi Sir</h1>
          <SI className="text-[#A0192D] text-xs tracking-widest font-semibold">කලා ලොවේ රජ විෂය — මාධ්‍ය</SI>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="rounded-3xl p-8" style={{background:'rgba(5,10,20,0.7)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)', boxShadow:'0 40px 80px rgba(0,0,0,0.5)'}}>

          <div className="mb-6">
            <SI className="block text-xl font-black text-white mb-1">නව Password සකසන්න</SI>
            <SI className="block text-gray-500 text-sm">ආරක්ෂිත password එකක් ඇතුළත් කරන්න</SI>
          </div>

          {!ready && (
            <div className="rounded-xl p-3 mb-5 text-sm text-yellow-300 flex items-center gap-2"
              style={{background:'rgba(234,179,8,0.1)', border:'1px solid rgba(234,179,8,0.2)'}}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="block w-3 h-3 rounded-full border-2 border-yellow-400 border-t-transparent shrink-0" />
              <SI>Session සූදානම් කරමින්...</SI>
            </div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-3 mb-5 text-sm text-red-300 flex items-center gap-2"
              style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />{error}
            </motion.div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase"><SI>නව Password</SI></label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showPw ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase"><SI>Password තහවුරු කරන්න</SI></label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showCf ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleUpdate()}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
                <button onClick={() => setShowCf(!showCf)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showCf ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(160,25,45,0.4)' }} whileTap={{ scale: 0.97 }}
            onClick={handleUpdate} disabled={loading || !ready || !password || !confirm}
            className="font-noto-si w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            style={{background:'linear-gradient(135deg, #B41F36, #8E1327)'}}>
            {loading ? (
              <>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="block w-4 h-4 rounded-full border-2 border-white border-t-transparent" />
                <SI>සකසමින්...</SI>
              </>
            ) : (
              <><SI>Password වෙනස් කරන්න</SI><ArrowRight size={18} /></>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  )
}
