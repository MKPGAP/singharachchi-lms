'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, CheckCircle, FileText, ClipboardList, ArrowRight, Star } from 'lucide-react'
import Navbar from '../components/Navbar'

const SI = (props: { children: React.ReactNode; className?: string }) => (
  <span className={`font-noto-si ${props.className ?? ''}`}>{props.children}</span>
)

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#050A14] text-white overflow-x-hidden">
      <Navbar />

      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(160,25,45,0.4) 0%, transparent 70%)' }} />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 px-5 md:px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">2026 Enrollment Open</p>
          <h1 className="font-noto-si text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
            පාඨමාලා
          </h1>
          <p className="font-noto-si text-gray-400 text-base md:text-lg max-w-md mx-auto">
            සිංහආරච්චි සර් සමඟ A/L මාධ්‍ය ඉගෙන ගන්න — ශ්‍රී ලංකාවේ හොඳම platform එක
          </p>
        </motion.div>
      </section>

      {/* Course card */}
      <section className="relative z-10 pb-32 px-5 md:px-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="rounded-3xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 60px 120px rgba(0,0,0,0.6)' }}>

          {/* Top banner */}
          <div className="relative px-8 py-10 md:px-12 md:py-12"
            style={{ background: 'linear-gradient(135deg, rgba(160,25,45,0.2) 0%, rgba(11,31,74,0.3) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">Enrolling Now</span>
            </div>
            <span className="inline-block font-noto-si bg-[#A0192D]/20 border border-[#A0192D]/40 text-[#F1B6C0] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              නව පන්තිය · 2026
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">A/L Media Studies</h2>
            <SI className="text-gray-400 text-base">ජූනි 2026 — සම්පූර්ණ සැසිය · Full Year Course</SI>

            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: <Star size={13} fill="#A0192D" className="text-[#A0192D]" />, text: '95% Pass Rate' },
                { icon: <Play size={13} className="text-[#A0192D]" />, text: 'HD Video Lessons' },
                { icon: <ClipboardList size={13} className="text-[#A0192D]" />, text: 'Weekly MCQ' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-gray-300">
                  {b.icon}{b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ background: 'rgba(255,255,255,0.02)' }}>

            {/* Features */}
            <div className="p-8 md:p-10" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">ඇතුළත් දේ</p>
              <div className="space-y-4">
                {[
                  { icon: <Play size={16} className="text-[#A0192D]" />, title: 'HD Video Lessons', desc: 'සතිය පාසා නව පාඩම් — ඕනෑ වෙලාවක බලන්න' },
                  { icon: <ClipboardList size={16} className="text-blue-400" />, title: 'Weekly MCQ Quizzes', desc: 'සතිය නිම වූ පසු MCQ ප්‍රශ්නාවලිය — progress track කරන්න' },
                  { icon: <FileText size={16} className="text-green-400" />, title: 'PDF Study Materials', desc: 'Expert notes download කර offline study කරන්න' },
                  { icon: <CheckCircle size={16} className="text-yellow-400" />, title: 'Past Papers & Tips', desc: 'A/L exam strategies සහ past paper walkthroughs' },
                ].map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(255,255,255,0.05)' }}>{f.icon}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{f.title}</p>
                      <SI className="text-gray-500 text-xs">{f.desc}</SI>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">ගාස්තුව</p>
                <div className="mb-6">
                  <SI className="text-gray-500 text-xs block mb-1">මාසික ගාස්තුව</SI>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-white">2,500</span>
                    <span className="text-gray-500 text-sm">LKR</span>
                  </div>
                  <SI className="text-gray-600 text-xs">per month · bank transfer</SI>
                </div>

                {/* Bank details */}
                <div className="rounded-xl p-4 mb-6 space-y-2"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] tracking-widest uppercase text-gray-600 font-semibold mb-3">Bank Details</p>
                  {[
                    { label: 'ගිණුම', value: 'Sampath Singharachchi' },
                    { label: 'බැංකුව', value: 'Bank of Ceylon' },
                    { label: 'ගිණුම් අංකය', value: 'XXXX XXXX XXXX' },
                  ].map((d, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <SI className="text-gray-500">{d.label}</SI>
                      <span className="text-gray-300 font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/register">
                  <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(160,25,45,0.4)' }} whileTap={{ scale: 0.97 }}
                    className="font-noto-si w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 text-base"
                    style={{ background: 'linear-gradient(135deg, #B41F36, #8E1327)' }}>
                    ඇතුළත් වන්න <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <a href="https://wa.me/94718294369" target="_blank" rel="noopener noreferrer">
                  <button className="font-noto-si w-full py-3 rounded-2xl text-gray-300 font-semibold text-sm transition-all hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    📞 ප්‍රශ්නයක් ඇත්නම් WhatsApp කරන්න
                  </button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials mini */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            { name: 'Nethmi S.', result: 'A Pass', quote: 'Weekly MCQ helped me stay consistent every week.' },
            { name: 'Pasindu K.', result: 'A Pass', quote: 'Sinhala explanations made tough concepts simple.' },
            { name: 'Dinuli R.', result: 'B to A', quote: 'Improved fast with practical examples and feedback.' },
          ].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
              className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1 mb-3">
                {[0,1,2,3,4].map(s => <Star key={s} size={11} fill="#A0192D" className="text-[#A0192D]" />)}
              </div>
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">"{t.quote}"</p>
              <p className="text-white font-semibold text-sm">{t.name}</p>
              <p className="text-[#A0192D] text-xs">{t.result}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
