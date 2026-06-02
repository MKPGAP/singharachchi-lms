'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { Play, FileText, CheckCircle, ArrowRight, ChevronDown, PlayCircle, Share2, Star, ShieldCheck, Users } from 'lucide-react'

const SI = (props: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <span style={props.style} className={`font-noto-si ${props.className ?? ""}`}>
    {props.children}
  </span>
)

const featuredVideos = [
  {
    title: 'A/L Media Studies Orientation',
    titleSi: 'A/L මාධ්‍ය හැඳින්වීම',
    duration: '14:32',
    youtubeUrl: 'https://www.youtube.com/watch?v=08tlaeOZr-Y',
  },
  {
    title: 'Past Paper Strategy Session',
    titleSi: 'පසුගිය ප්‍රශ්න පත්‍ර රහස්',
    duration: '22:11',
    youtubeUrl: 'https://www.youtube.com/watch?v=ndYLCZPQWYM',
  },
  {
    title: 'Media Theory Crash Course',
    titleSi: 'මාධ්‍ය න්‍යාය කෙටි පාඩම',
    duration: '18:06',
    youtubeUrl: 'https://www.youtube.com/watch?v=iQTcOKf5jSg',
  },
]

const testimonials = [
  { name: 'Nethmi S.', result: 'A Pass', quote: 'Weekly MCQ and clear explanations helped me stay confident for every exam.' },
  { name: 'Pasindu K.', result: 'A Pass', quote: 'The structured videos and Sinhala explanations made tough media concepts simple.' },
  { name: 'Dinuli R.', result: 'B to A', quote: 'I improved fast because every lesson had practical examples and reliable feedback.' },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <main className="bg-[#050A14] overflow-x-hidden">

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '256px' }} />

      {/* Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(160,25,45,0.35) 0%, transparent 65%)' }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(11,31,74,0.6) 0%, transparent 65%)' }} />
      </div>

      {/* NAV */}
      <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 md:py-6"
        style={{ backdropFilter: 'blur(24px)', background: 'rgba(5,10,20,0.6)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg md:text-xl tracking-tight leading-none">Singharachchi Sir</span>
          <SI className="text-[#A0192D] text-[10px] tracking-[0.25em] mt-1">කලා ලොවේ රජ විෂය — මාධ්‍ය</SI>
        </div>
        <div className="flex items-center gap-4 md:gap-10">
          <Link href="/courses" className="hidden md:inline text-gray-400 hover:text-white text-sm tracking-wide transition-colors duration-200">Courses</Link>
          <Link href="/register" className="hidden md:inline text-gray-400 hover:text-white text-sm tracking-wide transition-colors duration-200">Register</Link>
          <Link href="/login">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(160,25,45,0.45), rgba(160,25,45,0.2))', border: '1px solid rgba(160,25,45,0.55)' }}>
              Login <ArrowRight size={14} />
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-5 md:px-8 pt-24">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-2.5 mb-14 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(160,25,45,0.08)', border: '1px solid rgba(160,25,45,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A0192D] animate-pulse" />
            <SI className="text-[#A0192D] text-[11px] tracking-[0.2em]">2026 ලියාපදිංචිය ආරම්භ වී ඇත</SI>
          </motion.div>

          {/* Headline */}
          <div className="space-y-1 mb-10">
            <div className="overflow-visible py-2">
              <motion.h1 initial={{ y: 110 }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-noto-si text-[68px] sm:text-[92px] md:text-[142px] font-black text-white leading-none tracking-tight">
                කලා ලොවේ
              </motion.h1>
            </div>
            <div className="overflow-visible py-2">
              <motion.h1 initial={{ y: 110 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-noto-si text-[68px] sm:text-[92px] md:text-[142px] font-black leading-none tracking-tight"
                style={{ WebkitTextStroke: '1.5px #A0192D', color: 'transparent' }}>
                රජ විෂය
              </motion.h1>
            </div>
            <div className="overflow-visible py-1">
              <motion.h1 initial={{ y: 110 }} animate={{ y: 0 }} transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-guardia text-[48px] sm:text-[64px] md:text-[98px] font-black text-[#A0192D] leading-none italic tracking-wide">
                MEDIA
              </motion.h1>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="font-noto-si text-gray-400 text-base md:text-xl leading-relaxed mb-14 max-w-xl mx-auto">
            සිංහආරච්චි සර් සමඟ ඔබේ A/L මාධ්‍ය ගමන අද පටන් ගන්න
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/courses">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(160,25,45,0.5)' }} whileTap={{ scale: 0.96 }}
                className="font-noto-si flex items-center gap-3 px-8 md:px-10 py-4 rounded-full text-white font-semibold text-base"
                style={{ background: 'linear-gradient(135deg, #B41F36, #8E1327)' }}>
                <Play size={16} fill="white" />
                පාඨමාලාව බලන්න
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="font-noto-si flex items-center gap-3 px-10 py-4 rounded-full text-white font-semibold text-base"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
                ලියාපදිංචි වන්න
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {['New videos weekly', 'Trusted by 500+ learners', 'Shareable YouTube lessons'].map((chip) => (
              <motion.span
                key={chip}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-gray-300"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>

        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={20} className="text-gray-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* DIVIDER LINE */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ABOUT SIR */}
      <section className="relative z-10 py-28 md:py-36 px-5 md:px-10 overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(160,25,45,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{ border: '1px dashed rgba(160,25,45,0.2)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-3xl pointer-events-none"
              style={{ border: '1px dashed rgba(255,255,255,0.05)' }}
            />
            <div className="relative w-72 h-80 md:w-80 md:h-96">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 100%, rgba(160,25,45,0.4) 0%, transparent 60%)', transform: 'scale(1.1)' }}
              />
              <motion.img
                src="/profilepic.jpeg"
                alt="Singharachchi Sir"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full h-full object-cover rounded-3xl"
                style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, type: 'spring', bounce: 0.4 }}
                className="absolute -bottom-4 -right-4 z-20 px-4 py-2.5 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #B41F36, #8E1327)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 10px 30px rgba(160,25,45,0.4)' }}>
                <p className="text-white text-xs font-bold">12+ Years</p>
                <p className="text-red-200 text-[10px]">Experience</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5, type: 'spring', bounce: 0.4 }}
                className="absolute -top-4 -left-4 z-20 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(5,10,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[10px] font-semibold">Live Classes</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">
              About
            </motion.p>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: 60 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-noto-si text-4xl md:text-5xl font-black text-white leading-tight">
                සිංහආරච්චි සර්
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-noto-si text-gray-400 text-base leading-relaxed mb-4">
              වසර 12කට වැඩි අත්දැකීමක් සහිත A/L මාධ්‍ය ගුරුවරයා. ශ්‍රී ලංකාවේ සෑම දිස්ත්‍රික්කයකම සිටින ශිෂ්‍යයන් සිංහආරච්චි සර් සමඟ A/L මාධ්‍ය ඉගෙන ගනිමින් සිටිති.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-noto-si text-gray-500 text-sm leading-relaxed mb-10">
              කලා ලොවේ රජ විෂය ලෙස සැලකෙන මාධ්‍ය විෂය ශිෂ්‍යයන්ට ලෙහෙසියෙන් ඉගෙන ගැනීමට හැකි වන ලෙස නව ක්‍රමවේදයකින් උගන්වයි.
            </motion.p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '12+', si: 'වසර', en: 'Experience' },
                { num: '500+', si: 'ශිෂ්‍යයන්', en: 'Students' },
                { num: '95%', si: 'සමත්', en: 'Pass Rate' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6, type: 'spring', bounce: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-2xl transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.p
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1, type: 'spring', bounce: 0.5 }}
                    className="text-2xl font-black text-white mb-1">
                    {s.num}
                  </motion.p>
                  <p className="font-noto-si text-[#A0192D] text-xs">{s.si}</p>
                  <p className="text-gray-700 text-[10px]">{s.en}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* YOUTUBE VIDEOS */}
      <section className="relative z-10 py-28 md:py-36 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">YouTube</p>
              <h2 className="font-noto-si text-5xl md:text-6xl font-black text-white leading-tight">
                නවතම වීඩියෝ
              </h2>
            </div>
            <a href="https://www.youtube.com/@lankawatamamedia" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
                style={{ background: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,0,0,0.3)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="red">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube Channel
              </motion.button>
            </a>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: '08tlaeOZr-Y' },
              { id: 'ndYLCZPQWYM' },
              { id: 'iQTcOKf5jSg' },
              { id: 'f9TJ3B13Yyw' },
            ].map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
              >
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title="Singharachchi Sir Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* FEATURES */}
      <section className="relative z-10 py-28 md:py-36 px-5 md:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">Why Choose Us</p>
              <h2 className="font-noto-si text-5xl md:text-6xl font-black text-white leading-tight">
                ඇයි සිංහආරච්චි<br />සර් සමඟ?
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
              Sri Lanka&apos;s most advanced A/L Media Studies platform — built for the next generation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Play size={22} className="text-[#A0192D]" />, num: '01', title: 'වීඩියෝ පාඩම්', sub: 'Video Lessons', desc: 'HD streaming. Watch any lesson, any time, on any device — at your own pace.' },
              { icon: <CheckCircle size={22} className="text-[#A0192D]" />, num: '02', title: 'සතිපතා MCQ', sub: 'Weekly Quizzes', desc: 'Instant results and detailed explanations. Track your growth every single week.' },
              { icon: <FileText size={22} className="text-[#A0192D]" />, num: '03', title: 'PDF Tutes', sub: 'Study Materials', desc: 'Expert-crafted notes. Download and study offline whenever you need.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between p-8 rounded-2xl h-64 overflow-hidden transition-all duration-500"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 28px 60px rgba(0,0,0,0.35)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(160,25,45,0.07), transparent)' }} />
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl" style={{ background: 'rgba(160,25,45,0.1)' }}>{item.icon}</div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-700">{item.num}</span>
                </div>
                <div>
                  <h3 className="font-noto-si text-white text-xl font-bold mb-0.5">{item.title}</h3>
                  <p className="text-[#A0192D] text-[10px] tracking-widest uppercase mb-3">{item.sub}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* YOUTUBE + SHARE */}
      <section className="relative z-10 py-28 md:py-32 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">Video Learning</p>
              <h2 className="font-noto-si text-4xl md:text-5xl font-black text-white leading-tight">YouTube Lessons + Easy Sharing</h2>
            </div>
            <p className="font-noto-si text-gray-400 text-sm max-w-sm">
              Watch lessons instantly, share directly with friends, and build group learning with one click.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredVideos.map((video, i) => {
              const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(video.youtubeUrl)}`
              return (
                <motion.div key={video.title}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-300">
                      <PlayCircle size={14} />YouTube
                    </div>
                    <span className="text-xs text-gray-400">{video.duration}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{video.title}</h3>
                  <p className="font-noto-si text-sm text-gray-400 mb-5">{video.titleSi}</p>
                  <div className="flex gap-2">
                    <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="flex-1">
                      <button className="w-full rounded-lg py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-2"
                        style={{ background: 'linear-gradient(135deg, #B41F36, #8E1327)' }}>
                        <Play size={14} /> Watch
                      </button>
                    </a>
                    <a href={shareUrl} target="_blank" rel="noreferrer" className="flex-1">
                      <button className="w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold text-gray-200 flex items-center justify-center gap-2">
                        <Share2 size={14} /> Share
                      </button>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* COURSE CARD */}
      <section className="relative z-10 py-28 md:py-36 px-5 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="flex-1">
            <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">Enroll Now</p>
            <h2 className="font-noto-si text-5xl md:text-6xl font-black text-white mb-6 leading-tight">පාඨමාලා</h2>
            <p className="font-noto-si text-gray-500 text-sm leading-relaxed max-w-sm">
              සිංහආරච්චි සර් සමඟ A/L මාධ්‍ය ඉගෙන ගන්න. ශ්‍රී ලංකාවේ හොඳම A/L මාධ්‍ය platform එක.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            whileHover={{ y: -8 }}
            className="shrink-0 w-full md:w-96 rounded-3xl overflow-hidden transition-all duration-500"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 60px 120px rgba(0,0,0,0.6)' }}>
            <div className="p-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-noto-si text-[10px] tracking-[0.2em] text-[#A0192D] uppercase font-bold">නව පන්තිය</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[10px]">Live</span>
                </div>
              </div>
              <h3 className="text-white text-2xl font-bold mb-1">A/L Media Studies</h3>
              <p className="text-gray-600 text-sm">2026 · Full Course</p>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Play size={14} />, label: 'HD Video Lessons' },
                  { icon: <CheckCircle size={14} />, label: 'Weekly MCQ Quizzes' },
                  { icon: <FileText size={14} />, label: 'PDF Study Materials' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[#A0192D]">{f.icon}</span>
                    <span className="text-gray-300 text-sm">{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <p className="font-noto-si text-gray-600 text-xs mb-1">මාසික ගාස්තුව</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-4xl font-black">2,500</span>
                  <span className="text-gray-500 text-sm">LKR / month</span>
                </div>
              </div>
              <Link href="/register">
                <motion.button whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(160,25,45,0.4)' }} whileTap={{ scale: 0.97 }}
                  className="font-noto-si w-full py-4 rounded-2xl bg-[#A0192D] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300">
                  ඇතුළත් වන්න <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* RECOMMENDATIONS + RELIABILITY */}
      <section className="relative z-10 py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">Reliability</p>
            <h3 className="font-noto-si text-3xl font-black text-white mb-5">Trusted & Reliable Learning</h3>
            <div className="space-y-4">
              {[
                { icon: <ShieldCheck size={18} className="mt-0.5 text-[#A0192D]" />, text: 'Structured curriculum with consistent weekly updates and exam-focused content.' },
                { icon: <Users size={18} className="mt-0.5 text-[#A0192D]" />, text: 'Growing learner community where students can recommend lessons and share resources.' },
                { icon: <CheckCircle size={18} className="mt-0.5 text-[#A0192D]" />, text: 'Performance tracking with MCQ insights to improve consistency and reliability.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  {item.icon}
                  <p className="text-sm text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-1 text-[#A0192D]">
                  {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={13} fill="currentColor" />)}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">{item.quote}</p>
                <p className="font-semibold text-white text-sm">{item.name}</p>
                <p className="text-xs text-[#A0192D]">{item.result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-24 md:py-32 px-5 md:px-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
          {[
            { num: '12+', si: 'වසර', en: 'Years of Experience' },
            { num: '500+', si: 'ශිෂ්‍යයන්', en: 'Students Taught' },
            { num: '95%', si: 'සමත්', en: 'Pass Rate' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}>
              <p className="text-5xl md:text-6xl font-black text-white mb-2">{s.num}</p>
              <p className="font-noto-si text-[#A0192D] text-sm mb-1">{s.si}</p>
              <p className="text-gray-700 text-xs">{s.en}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 px-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Singharachchi Sir</h4>
            <SI className="text-[#A0192D] text-xs tracking-widest">කලා ලොවේ රජ විෂය — මාධ්‍ය</SI>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/courses" className="text-gray-600 hover:text-white text-sm transition-colors">Courses</Link>
            <Link href="/login" className="text-gray-600 hover:text-white text-sm transition-colors">Login</Link>
            <Link href="/register" className="text-gray-600 hover:text-white text-sm transition-colors">Register</Link>
          </div>
          <p className="text-gray-700 text-xs">© 2026 Singharachchi Sir</p>
        </div>
      </footer>

    </main>
  )
}