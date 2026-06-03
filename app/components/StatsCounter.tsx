'use client'
import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const stats = [
  { value: 12, suffix: '+', si: 'වසර', en: 'Years of Experience' },
  { value: 500, suffix: '+', si: 'ශිෂ්‍යයන්', en: 'Students Taught' },
  { value: 95, suffix: '%', si: 'සමත්', en: 'Pass Rate' },
]

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative z-10 py-24 md:py-32 px-5 md:px-10">
      <div ref={ref} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
        {stats.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}>
            <p className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-2 tabular-nums">
              {inView
                ? <CountUp end={s.value} duration={2.5} delay={i * 0.2} suffix={s.suffix} useEasing />
                : <span>0{s.suffix}</span>
              }
            </p>
            <p className="font-noto-si text-[#A0192D] text-sm mb-1">{s.si}</p>
            <p className="text-gray-500 text-xs">{s.en}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
