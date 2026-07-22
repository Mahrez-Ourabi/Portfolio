'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, Languages, GraduationCap } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

interface AboutProps {
  locale: Locale
}

const stats = [
  { key: 'projects', value: '10+' },
  { key: 'accuracy', value: '87%' },
  { key: 'coverage', value: '85%' },
  { key: 'success', value: '98%' },
]

export default function About({ locale }: AboutProps) {
  const t = translations[locale].about
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  const infoItems = [
    { icon: MapPin, text: t.location },
    { icon: Mail, text: t.email },
    { icon: Languages, text: t.languages },
    { icon: GraduationCap, text: t.degree },
  ]

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-cyan mb-3">{t.subtitle}</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">{t.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left – photo + info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Profile image */}
              <motion.div
                className="relative w-64 h-64 mx-auto md:mx-0"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-cyan/20 blur-2xl" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden glass border border-cyan/20">
                  <img
                    src="/images/profile-mahrez.png"
                    alt="Mahrez Ouarbi"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = '/placeholder-user.jpg'
                    }}
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 glass-elevated px-4 py-2 rounded-2xl border border-cyan/20"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-xs font-mono text-cyan">Available ✓</p>
                </motion.div>
              </motion.div>

              {/* Info list */}
              <ul className="space-y-3">
                {infoItems.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg glass flex items-center justify-center text-cyan">
                      <Icon size={14} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right – text + stats */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-5">
                <p className="text-lg leading-relaxed text-muted-foreground">{t.p1}</p>
                <p className="text-lg leading-relaxed text-muted-foreground">{t.p2}</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ key, value }) => (
                  <motion.div
                    key={key}
                    className="glass rounded-2xl p-5 text-center border border-border hover:border-cyan/40 transition-colors gradient-border"
                    whileHover={{ scale: 1.03, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className="text-3xl font-black text-cyan mb-1">{value}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {t.stats[key as keyof typeof t.stats]}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
