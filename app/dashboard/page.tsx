'use client'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, FileText, ClipboardList, CreditCard, LogOut, BookOpen, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const SI = (props: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${props.className ?? ''}`}>{props.children}</span>
)

export default function DashboardPage() {
  const [studentName, setStudentName] = useState('')
  const [loading, setLoading] = useState(true)
  const [paymentStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.replace('/login'); return }
      setStudentName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'ශිෂ්‍යයා')
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return (
    <main className="min-h-screen bg-[#050A14] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-2 border-[#A0192D] border-t-transparent" />
    </main>
  )

  const paymentBadge = {
    pending:  { label: 'අනුමත කිරීම් බලාපොරොත්තුවෙන්', color: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25', icon: <Clock size={12} /> },
    approved: { label: 'අනුමත කරන ලදී', color: 'bg-green-500/15 text-green-300 border-green-500/25', icon: <CheckCircle size={12} /> },
    rejected: { label: 'ප්‍රතික්ෂේප කරන ලදී', color: 'bg-red-500/15 text-red-300 border-red-500/25', icon: <AlertCircle size={12} /> },
  }[paymentStatus]

  return (
    <main className="min-h-screen bg-[#050A14] text-white">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(160,25,45,0.4) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-2xl"
        style={{ background: 'rgba(5,10,20,0.85)' }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A0192D] flex items-center justify-center">
              <Play size={14} fill="white" className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Singharachchi Sir</p>
              <SI className="text-[#A0192D] text-[10px] tracking-widest">කලා ලොවේ රජ විෂය</SI>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-6 h-6 rounded-full bg-[#A0192D] flex items-center justify-center text-[10px] font-bold">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <SI className="text-sm text-gray-300">{studentName}</SI>
            </div>
            <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login' }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <LogOut size={15} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-10">

        {/* Welcome hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-8 p-8 md:p-10"
          style={{ background: 'linear-gradient(135deg, rgba(160,25,45,0.15) 0%, rgba(11,31,74,0.2) 100%)', border: '1px solid rgba(160,25,45,0.2)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top right, rgba(160,25,45,0.12) 0%, transparent 60%)' }} />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-[#A0192D] text-[11px] tracking-[0.3em] uppercase font-semibold mb-2">Student Dashboard</p>
              <h2 className="font-noto-si text-2xl md:text-3xl font-black text-white mb-2">
                ආයුබෝවන්, {studentName}! 👋
              </h2>
              <SI className="text-gray-400 text-sm">ඔබගේ A/L මාධ්‍ය ගමන අද පටන් ගනිමු!</SI>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full shrink-0"
              style={{ background: 'rgba(160,25,45,0.1)', border: '1px solid rgba(160,25,45,0.25)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">Live Classes Active</span>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'ලියාපදිංචි පාඨමාලා', value: '1', icon: <BookOpen size={18} className="text-[#A0192D]" />, color: 'text-white' },
            { label: 'සම්පූර්ණ කළ පාඩම්', value: '0', icon: <Play size={18} className="text-blue-400" />, color: 'text-[#A0192D]' },
            { label: 'ප්‍රගතිය', value: '0%', icon: <TrendingUp size={18} className="text-green-400" />, color: 'text-white' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex justify-center mb-2">{s.icon}</div>
              <p className={`text-2xl md:text-3xl font-black ${s.color} mb-1`}>{s.value}</p>
              <SI className="text-gray-500 text-[11px]">{s.label}</SI>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* My Course */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">මගේ පාඨමාලා · My Course</p>
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Course header */}
                <div className="p-5 flex items-center justify-between"
                  style={{ background: 'linear-gradient(135deg, rgba(160,25,45,0.1), rgba(11,31,74,0.15))', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A0192D] flex items-center justify-center">
                      <Play size={16} fill="white" className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">A/L Media Studies 2026</p>
                      <SI className="text-gray-400 text-xs">ජූනි සම්පූර්ණ සැසිය</SI>
                    </div>
                  </div>
                  <span className="font-noto-si bg-[#A0192D]/20 border border-[#A0192D]/40 text-[#F1B6C0] text-[10px] font-bold px-3 py-1 rounded-full">
                    සක්‍රීය
                  </span>
                </div>

                {/* Progress bar */}
                <div className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <SI>ප්‍රගතිය</SI>
                    <span>0%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div className="h-1.5 rounded-full bg-[#A0192D] w-0 transition-all duration-1000" />
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 flex flex-wrap gap-3">
                  <Link href="/lessons">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #B41F36, #8E1327)' }}>
                      <Play size={14} fill="white" />
                      <SI>පාඩම් බලන්න</SI>
                    </motion.button>
                  </Link>
                  <Link href="/quiz">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-200 transition-all"
                      style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
                      <ClipboardList size={14} />
                      <SI>ප්‍රශ්නාවලිය</SI>
                    </motion.button>
                  </Link>
                  <Link href="/lessons">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-200 transition-all"
                      style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
                      <FileText size={14} />
                      <SI>PDF Tutes</SI>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">ඉක්මන් සබැඳි · Quick Links</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { href: '/lessons', icon: <Play size={22} className="text-[#A0192D]" />, si: 'පාඩම් බලන්න', en: 'View Lessons' },
                  { href: '/quiz', icon: <ClipboardList size={22} className="text-blue-400" />, si: 'ප්‍රශ්නාවලිය', en: 'Take Quiz' },
                  { href: '/payment', icon: <CreditCard size={22} className="text-green-400" />, si: 'ගෙවීම් කරන්න', en: 'Make Payment' },
                ].map((l, i) => (
                  <Link key={i} href={l.href}>
                    <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="rounded-2xl p-5 text-center cursor-pointer transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex justify-center mb-3">{l.icon}</div>
                      <SI className="block text-sm font-semibold text-white mb-0.5">{l.si}</SI>
                      <p className="text-[11px] text-gray-500">{l.en}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">

            {/* Payment status */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">ගෙවීම් තත්ත්වය</p>
              <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <SI className="block font-semibold text-white text-sm">ජූනි 2026</SI>
                    <p className="text-gray-500 text-xs mt-0.5">LKR 2,500 · Bank Slip submitted</p>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${paymentBadge.color}`}>
                    {paymentBadge.icon}
                    <SI>{paymentBadge.label}</SI>
                  </span>
                </div>
                <Link href="/payment">
                  <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-[#A0192D] transition-all hover:bg-[#A0192D]/10"
                    style={{ border: '1px solid rgba(160,25,45,0.3)' }}>
                    <SI>නව ගෙවීමක් කරන්න</SI>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* This month */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">මෙම මාසය</p>
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {[
                  { label: 'නව වීඩියෝ', value: '4', color: 'text-[#A0192D]' },
                  { label: 'MCQ ප්‍රශ්නාවලිය', value: '1', color: 'text-blue-400' },
                  { label: 'PDF Tutes', value: '2', color: 'text-green-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <SI className="text-gray-400 text-sm">{item.label}</SI>
                    <span className={`font-black text-lg ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, rgba(160,25,45,0.1), rgba(11,31,74,0.15))', border: '1px solid rgba(160,25,45,0.2)' }}>
                <SI className="block font-bold text-white mb-1">උදව් අවශ්‍යද?</SI>
                <SI className="block text-gray-400 text-xs mb-4">සිංහආරච්චි සර් සමඟ සම්බන්ධ වන්න</SI>
                <a href="https://wa.me/94718294369" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #25D366, #1da851)' }}>
                    WhatsApp කරන්න
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
