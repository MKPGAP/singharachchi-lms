'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import MediaBackground from './components/MediaBackground'
import TunnelBackground from './components/TunnelBackground'
import StatsCounter from './components/StatsCounter'
import RevealWrapper from './components/RevealWrapper'
import VaporizeTextCycle, { Tag } from './components/ui/vapour-text'
import MediaOutlineText from './components/MediaOutlineText'
import { Play, FileText, CheckCircle, ArrowRight, ChevronDown, PlayCircle, Share2, Star, ShieldCheck, Users, Smartphone, CreditCard, Video, ClipboardList, Trophy } from 'lucide-react'

const SI = (props: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <span style={props.style} className={`font-noto-si ${props.className ?? ""}`}>
    {props.children}
  </span>
)

const featuredVideos = [
  { title: 'A/L Media Studies Orientation', titleSi: 'A/L මාධ්‍ය හැඳින්වීම', duration: '14:32', youtubeUrl: 'https://www.youtube.com/watch?v=08tlaeOZr-Y' },
  { title: 'Past Paper Strategy Session', titleSi: 'පසුගිය ප්‍රශ්න පත්‍ර රහස්', duration: '22:11', youtubeUrl: 'https://www.youtube.com/watch?v=ndYLCZPQWYM' },
  { title: 'Media Theory Crash Course', titleSi: 'මාධ්‍ය න්‍යාය කෙටි පාඩම', duration: '18:06', youtubeUrl: 'https://www.youtube.com/watch?v=iQTcOKf5jSg' },
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
    <main className="bg-white dark:bg-[#050A14] overflow-x-hidden transition-colors duration-500">
  <MediaBackground />
  <TunnelBackground />
  {/* Grain */}
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '256px' }} />
  
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
              <motion.div
                initial={{ y: 110 }} animate={{ y: 0 }}
                transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                <MediaOutlineText />
              </motion.div>
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

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-3">
            {['New videos weekly', 'Trusted by 5000+ learners', 'Shareable YouTube lessons'].map((chip) => (
              <motion.span key={chip} animate={{ y: [0, -4, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-gray-300">
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
     
      {/* SCROLL STORY SECTION */}
      <section className="relative z-10 py-40 px-5 md:px-10 overflow-hidden">

        {/* Animated background SVG lines — DNA helix effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1200 1600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor="#A0192D" />
                <stop offset="70%" stopColor="#A0192D" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Left helix strand */}
            <motion.path
              d="M 400 0 Q 300 200 400 400 Q 500 600 400 800 Q 300 1000 400 1200 Q 500 1400 400 1600"
              stroke="url(#lineGrad)" strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
            {/* Right helix strand */}
            <motion.path
              d="M 800 0 Q 900 200 800 400 Q 700 600 800 800 Q 900 1000 800 1200 Q 700 1400 800 1600"
              stroke="url(#lineGrad)" strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
            />
            {/* Cross connectors */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.line
                key={i}
                x1="400" y1={130 + i * 230} x2="800" y2={130 + i * 230}
                stroke="#A0192D" strokeWidth="1" strokeDasharray="4 4"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 0.5, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                style={{ transformOrigin: '600px center' }}
              />
            ))}
          </svg>

          {/* Floating orbs */}
          {[
            { x: '15%', y: '20%', size: 300, delay: 0 },
            { x: '75%', y: '50%', size: 250, delay: 1 },
            { x: '30%', y: '80%', size: 200, delay: 2 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: orb.x,
                top: orb.y,
                width: orb.size,
                height: orb.size,
                background: 'radial-gradient(circle, rgba(160,25,45,0.08) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: orb.delay,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">How It Works</p>
            <h2 className="font-noto-si text-4xl md:text-5xl font-black text-white leading-tight">
              ඉගෙනීමේ ගමන
            </h2>
            <p className="text-gray-500 text-sm mt-4 max-w-sm mx-auto">
              Simple steps to start your A/L Media journey with Singharachchi Sir
            </p>
          </motion.div>

          {/* Center timeline line */}
          <div className="relative">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              initial={{ scaleY: 0, transformOrigin: 'top' }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(160,25,45,0.6) 15%, rgba(160,25,45,0.6) 85%, transparent)' }}
            />

            {[
              { icon: <Smartphone size={22} className="text-[#A0192D]" />, title: 'ලියාපදිංචි වන්න', sub: 'Register', desc: 'ඔබේ details ඇතුළත් කර platform එකට join වන්න.', side: 'left' },
              { icon: <CreditCard size={22} className="text-[#A0192D]" />, title: 'ගෙවීම කරන්න', sub: 'Payment', desc: 'Bank slip upload කර enrollment confirm කරගන්න.', side: 'right' },
              { icon: <Video size={22} className="text-[#A0192D]" />, title: 'Video Lessons', sub: 'Watch', desc: 'HD quality videos ඕනෑ වෙලාවක, ඕනෑ තැනක බලන්න.', side: 'left' },
              { icon: <ClipboardList size={22} className="text-[#A0192D]" />, title: 'Weekly MCQ', sub: 'Practice', desc: 'සතියකට වරක් MCQ quiz complete කර progress track කරන්න.', side: 'right' },
              { icon: <FileText size={22} className="text-[#A0192D]" />, title: 'PDF Tutes', sub: 'Study', desc: 'Expert notes download කර offline study කරන්න.', side: 'left' },
              { icon: <Trophy size={22} className="text-[#A0192D]" />, title: 'A/L සමත් වන්න', sub: 'Success', desc: 'සිංහආරච්චි සර්ගේ 95% pass rate සමඟ සාර්ථක වන්න.', side: 'right' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === 'left' ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center mb-16 ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content card */}
                <div className={`w-5/12 ${item.side === 'left' ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-2xl group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                    }}
                  >
                    <p className="text-[#A0192D] text-[10px] tracking-widest uppercase font-bold mb-2">{item.sub}</p>
                    <h3 className="font-noto-si text-white text-lg font-bold mb-2">{item.title}</h3>
                    <p className="font-noto-si text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>

                {/* Center icon node */}
                <div className="w-2/12 flex flex-col items-center relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.2, type: 'spring', bounce: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #0B1F4A, #1A3A7A)',
                      border: '2px solid rgba(160,25,45,0.5)',
                      boxShadow: '0 0 0 4px rgba(160,25,45,0.1), 0 8px 24px rgba(0,0,0,0.4)',
                    }}
                  >
                    {item.icon}
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ border: '1px solid rgba(160,25,45,0.4)' }}
                    />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-[#A0192D] text-[10px] font-black mt-2 tracking-widest"
                  >
                    0{i + 1}
                  </motion.span>
                </div>

                {/* Empty opposite side */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* DIVIDER */}
      <div className="relative z-10 h-px mx-5 md:mx-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ABOUT SIR */}
      <section className="relative z-10 py-28 md:py-36 px-5 md:px-10 overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(160,25,45,0.08) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-20">

          {/* Profile Image */}
<motion.div
  initial={{ opacity: 0, x: -60 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
  className="flex-shrink-0 relative flex items-center justify-center"
  style={{ width: '340px', height: '500px' }}
>
  {/* Red accent blob */}
  <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full pointer-events-none"
    style={{ background: 'radial-gradient(circle, rgba(160,25,45,0.25) 0%, transparent 70%)' }} />
  <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full pointer-events-none"
    style={{ background: 'radial-gradient(circle, rgba(11,31,74,0.2) 0%, transparent 70%)' }} />

  {/* Photo with frame */}
  <motion.div
    className="relative w-full h-full rounded-[2rem] overflow-hidden"
    style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(160,25,45,0.15)' }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.4 }}
  >
    <img
      src="/profilepic.jpeg"
      alt="Singharachchi Sir"
      className="w-full h-full object-cover"
      style={{ objectPosition: '50% 20%' }}
    />
    {/* Red gradient overlay at bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
      style={{ background: 'linear-gradient(to top, rgba(160,25,45,0.3), transparent)' }} />
  </motion.div>

  {/* Live Classes badge */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.6, type: 'spring', bounce: 0.4 }}
    className="absolute -top-4 left-4 z-20 px-4 py-2 rounded-2xl flex items-center gap-2"
    style={{ background: '#0B1F4A', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
  >
    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    <span className="text-green-400 text-xs font-bold tracking-wide">Live Classes</span>
  </motion.div>

  {/* Experience badge */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.8, type: 'spring', bounce: 0.4 }}
    className="absolute -bottom-4 -right-4 z-20 px-5 py-3 rounded-2xl text-center"
    style={{ background: 'linear-gradient(135deg, #A0192D, #6e1120)', boxShadow: '0 12px 32px rgba(160,25,45,0.5)' }}
  >
    <p className="text-white text-lg font-black leading-none">12+</p>
    <p className="text-red text-[11px] font-semibold">Years Exp.</p>
  </motion.div>
</motion.div>

      
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }} className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">
              About
            </motion.p>
            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: 60 }} whileInView={{ y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-noto-si text-4xl md:text-5xl font-black text-white leading-tight">
                සිංහආරච්චි සර්
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-noto-si text-gray-400 text-base leading-relaxed mb-4">
              වසර 12කට වැඩි අත්දැකීමක් සහිත A/L මාධ්‍ය ගුරුවරයා. ශ්‍රී ලංකාවේ සෑම දිස්ත්‍රික්කයකම සිටින ශිෂ්‍යයන් සිංහආරච්චි සර් සමඟ A/L මාධ්‍ය ඉගෙන ගනිමින් සිටිති.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-noto-si text-gray-500 text-sm leading-relaxed mb-10">
              කලා ලොවේ රජ විෂය ලෙස සැලකෙන මාධ්‍ය විෂය ශිෂ්‍යයන්ට ලෙහෙසියෙන් ඉගෙන ගැනීමට හැකි වන ලෙස නව ක්‍රමවේදයකින් උගන්වයි.
            </motion.p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '12+', si: 'වසර', en: 'Experience' },
                { num: '5000+', si: 'ශිෂ්‍යයන්', en: 'Students' },
                { num: '95%', si: 'සමත්', en: 'Pass Rate' },
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6, type: 'spring', bounce: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-2xl transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.p initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#A0192D] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4">YouTube</p>
              <h2 className="font-noto-si text-5xl md:text-6xl font-black text-white leading-tight">නවතම වීඩියෝ</h2>
            </div>
            <a href="https://www.youtube.com/@lankawatamamedia" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
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
              { id: '08tlaeOZr-Y' }, { id: 'ndYLCZPQWYM' },
              { id: 'iQTcOKf5jSg' }, { id: 'f9TJ3B13Yyw' },
            ].map((video, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden transition-all duration-500"
                style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title="Singharachchi Sir Video" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />
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
              <h2 className="font-noto-si text-5xl md:text-6xl font-black text-white leading-tight">ඇයි සිංහආරච්චි<br />සර් සමඟ?</h2>
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
            <p className="font-noto-si text-gray-400 text-sm max-w-sm">Watch lessons instantly, share directly with friends, and build group learning with one click.</p>
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

      {/* RELIABILITY + TESTIMONIALS */}
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
      <footer className="relative z-10 overflow-hidden text-[#A0192D]" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <h4 className="text-white font-black text-2xl mb-1">Singharachchi Sir</h4>
            <SI className="text-[#A0192D] text-xs tracking-widest block mb-4">කලා ලොවේ රජ විෂය — මාධ්‍ය</SI>
            <p className="font-noto-si text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              නූතන පරම්පරාව ආමන්ත්‍රණය කරන Online A/L මාධ්‍ය platform එක. ප්‍රථිපල සහතික කළ පළපුරුදු ගුරුවරයා සමඟ.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.youtube.com/@lankawatamamedia" target="_blank" rel="noopener noreferrer">
                <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,0,0,0.3)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="red">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </a>
              <a href="https://wa.me/94777279476" target="_blank" rel="noopener noreferrer">
                <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h5 className="text-white font-bold text-sm mb-5 tracking-wide">Site Links</h5>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Courses', href: '/courses' },
                { label: 'Register', href: '/register' },
                { label: 'Login', href: '/login' },
                { label: 'Dashboard', href: '/dashboard' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-[#A0192D] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold text-sm mb-5 tracking-wide">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(160,25,45,0.15)', border: '1px solid rgba(160,25,45,0.2)' }}>
                  <span className="text-[10px]">📍</span>
                </div>
                <span className="font-noto-si text-gray-500 text-sm">Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(160,25,45,0.15)', border: '1px solid rgba(160,25,45,0.2)' }}>
                  <span className="text-[10px]">📞</span>
                </div>
                <a href="tel:+94777279476" className="text-gray-500 hover:text-white text-sm transition-colors">
                  +94 777 279 476
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(160,25,45,0.15)', border: '1px solid rgba(160,25,45,0.2)' }}>
                  <span className="text-[10px]">✉️</span>
                </div>
                <a href="mailto:singharachchisir@gmail.com" className="text-gray-500 hover:text-white text-sm transition-colors">
                  singharachchisir@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.2)' }}>
                  <span className="text-[10px]">🎥</span>
                </div>
                <a href="https://www.youtube.com/@lankawatamamedia" target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#A0192D] text-sm transition-colors">
                  @lankawatamamedia
                </a>
              </li>
            </ul>
          </div>
        </div>

        
 
        {/* Sri Lanka Skyline PNG */}
        <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>

          {/* Top fade — matches footer bg per mode */}
          <div className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none
            bg-gradient-to-b from-white dark:from-[#050A14] to-transparent" />

          {/* The PNG */}
          <img
            src="/colombo-skyline.png"
            alt="Colombo Skyline"
            className="absolute bottom-0 w-full object-cover object-bottom
              opacity-60 dark:opacity-45
              brightness-75 dark:brightness-90
              saturate-50 dark:saturate-75
              contrast-125 dark:contrast-100"
            style={{ height: '220px' }}
          />

          {/* Red tint overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(160,25,45,0.18) 0%, transparent 60%)' }} />

          {/* Ground line */}
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'rgba(160,25,45,0.3)' }} />

        </div>

        {/* Bottom bar */}
        <div className="border-t px-10 py-5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-700 hover:text-gray-500 text-xs transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-700 hover:text-gray-500 text-xs transition-colors">Terms & Conditions</Link>
            </div>
            <p className="text-gray-700 text-xs">© 2026 Singharachchi Sir · All rights reserved</p>
            <SI className="text-gray-700 text-xs">කලා ලොවේ රජ විෂය — මාධ්‍ය</SI>
          </div>
        </div>
      </footer>

      </main>
  )
}
