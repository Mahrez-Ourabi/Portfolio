'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience, education } from '@/lib/data'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'
import { Briefcase, GraduationCap } from 'lucide-react'

interface ExperienceProps {
  locale: Locale
}

const TYPE_COLORS: Record<string, string> = {
  pfe: '#00d4ff',
  freelance: '#7c3aed',
  startup: '#10b981',
  internship: '#f59e0b',
  engineering: '#7c3aed',
  diploma: '#ec4899',
}

export default function Experience({ locale }: ExperienceProps) {
  const t = translations[locale].experience
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-cyan mb-3">{t.subtitle}</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">{t.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Work experience timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan">
                <Briefcase size={16} />
              </div>
              <h3 className="font-bold text-lg">
                {locale === 'en' ? 'Work Experience' : 'Expérience Professionnelle'}
              </h3>
            </div>
            <TimelineList items={experience} inView={inView} />
          </div>

          {/* Education timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan">
                <GraduationCap size={16} />
              </div>
              <h3 className="font-bold text-lg">
                {locale === 'en' ? 'Education' : 'Formation'}
              </h3>
            </div>
            <TimelineList items={education} inView={inView} isEducation />
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineList({
  items,
  inView,
  isEducation = false,
}: {
  items: typeof experience | typeof education
  inView: boolean
  isEducation?: boolean
}) {
  return (
    <div className="relative space-y-0">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      {items.map((item, i) => {
        const color = TYPE_COLORS[(item as any).type] ?? '#00d4ff'
        const title = isEducation ? (item as typeof education[0]).degree : (item as typeof experience[0]).role
        const org = isEducation ? (item as typeof education[0]).school : (item as typeof experience[0]).company

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-12 pb-10 last:pb-0"
          >
            {/* Dot */}
            <motion.div
              className="absolute left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: color, background: 'var(--background)', top: '6px' }}
              whileHover={{ scale: 1.3 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            </motion.div>

            {/* Card */}
            <motion.div
              className="glass rounded-2xl p-5 border border-border hover:border-cyan/30 transition-all"
              whileHover={{ x: 4 }}
            >
              <div className="mb-2">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                  <h4 className="font-bold text-sm leading-tight">{title}</h4>
                  <span
                    className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-mono font-bold whitespace-nowrap"
                    style={{ background: `${color}22`, color }}
                  >
                    {(item as any).period}
                  </span>
                </div>
                <p className="text-xs text-cyan font-medium">{org}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {(item as any).description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {((item as any).tags ?? []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-xs font-mono glass border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
