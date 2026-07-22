'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/lib/data'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

interface SkillsProps {
  locale: Locale
}

type Category = keyof typeof skills

const CATEGORY_ICONS: Record<Category, string> = {
  frontend: '⬡',
  backend: '⬢',
  ai: '◈',
  devops: '⬙',
  databases: '◉',
  tools: '◎',
}

export default function Skills({ locale }: SkillsProps) {
  const t = translations[locale].skills
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<Category>('frontend')

  const categories = Object.keys(skills) as Category[]

  return (
    <section id="skills" className="py-32 px-6 relative" ref={ref}>
      {/* Subtle section bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section header */}
          <div className="mb-16">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-cyan mb-3">{t.subtitle}</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">{t.title}</h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  active === cat
                    ? 'bg-cyan text-background cyan-glow'
                    : 'glass text-muted-foreground border border-border hover:border-cyan hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-base">{CATEGORY_ICONS[cat]}</span>
                {t.categories[cat]}
              </motion.button>
            ))}
          </div>

          {/* Skills list */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-3xl"
          >
            {skills[active].map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillBar({
  skill,
  index,
  inView,
}: {
  skill: { name: string; level: number }
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 group hover:border-cyan/40 border border-border transition-colors"
      whileHover={{ scale: 1.01, x: 4 }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-sm">{skill.name}</span>
        <span className="font-mono text-xs text-cyan font-bold">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-cyan"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.07 + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            boxShadow: '0 0 10px oklch(0.78 0.2 210 / 0.6)',
          }}
        />
      </div>
    </motion.div>
  )
}
