'use client'
import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const SI = (p: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${p.className ?? ''}`}>{p.children}</span>
)

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])

  const handleRegister = async () => {
    setLoading(true)
    setError('')
    const { data, error: authError } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, phone } }
    })
    if (authError) { setError(authError.message); setLoading(false); return }
    if (data.user) {
      const { error: dbError } = await supabase.from('students').insert({
        id: data.user.id, full_name: fullName, email, phone
      })
      if (dbError) { setError(dbError.message); setLoading(false); return }
    }
    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-[#050A14] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{background:'radial-gradient(circle, rgba(74,222,128,0.6) 0%, transparent 70%)'}} />
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md text-center rounded-3xl p-10"
        style={{background:'rgba(5,10,20,0.8)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)'}}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </motion.div>
        <SI className="block text-2xl font-black text-white mb-2">ලියාපදිංචිය සාර්ථකයි!</SI>
        <SI className="block text-gray-400 text-sm mb-8">ඔබගේ email එකට confirmation link එකක් යවා ඇත.</SI>
        <Link href="/login">
          <button className="font-noto-si w-full py-4 rounded-2xl text-white font-bold"
            style={{background:'linear-gradient(135deg, #B41F36, #8E1327)'}}>
            පිවිසෙන්න · Login
          </button>
        </Link>
      </motion.div>
    </main>
  )

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden bg-[#050A14]">

      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10" style={{background:'linear-gradient(135deg, rgba(5,10,20,0.8) 0%, rgba(5,10,20,0.6) 50%, rgba(5,10,20,0.85) 100%)'}} />
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-50"
          autoPlay loop muted playsInline>
          <source src="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{background:'radial-gradient(circle, rgba(160,25,45,0.9) 0%, transparent 70%)'}} />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-10"
          style={{background:'radial-gradient(circle, rgba(11,31,74,0.9) 0%, transparent 70%)'}} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-md">

        {/* Logo */}
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

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="rounded-3xl p-8" style={{background:'rgba(5,10,20,0.7)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)', boxShadow:'0 40px 80px rgba(0,0,0,0.5)'}}>

          <div className="mb-6">
            <SI className="block text-xl font-black text-white mb-1">ලියාපදිංචි වන්න</SI>
            <p className="text-gray-500 text-sm">Create your account and start learning today</p>
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
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase"><SI>පූර්ණ නම · Full Name</SI></label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="ඔබගේ නම"
                  className="font-noto-si w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
              </div>
            </div>
            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase"><SI>දුරකථන අංකය · Phone</SI></label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="07X XXX XXXX"
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none"
                  style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)'}} />
                <button onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(160,25,45,0.4)' }} whileTap={{ scale: 0.97 }}
            onClick={handleRegister} disabled={loading || !fullName || !email || !password}
            className="font-noto-si w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            style={{background:'linear-gradient(135deg, #B41F36, #8E1327)'}}>
            {loading ? (
              <>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="block w-4 h-4 rounded-full border-2 border-white border-t-transparent" />
                <SI>ලියාපදිංචි වෙමින්...</SI>
              </>
            ) : (
              <>
                <SI>ලියාපදිංචි වන්න</SI>
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-6">
            <SI>දැනටමත් ගිණුමක් තිබේද? </SI>
            <Link href="/login" className="text-[#A0192D] font-semibold hover:text-white transition-colors">
              <SI>පිවිසෙන්න</SI>
            </Link>
          </p>
        </motion.div>

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
