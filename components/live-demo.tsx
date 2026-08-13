'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, FileText, Brain, CheckCircle, Zap, Target, Clock, Award } from 'lucide-react'
import type { Locale } from '@/lib/i18n'

interface LiveDemoProps {
  locale: Locale
}

const DEMO_STAGES = [
  { id: 'upload',    label: 'CV Received',           icon: FileText, color: '#00d4ff', delay: 0 },
  { id: 'parse',     label: 'NLP Parsing…',          icon: Brain,    color: '#7c3aed', delay: 0.6 },
  { id: 'match',     label: 'Semantic Matching…',    icon: Target,   color: '#f59e0b', delay: 1.4 },
  { id: 'score',     label: 'Scoring Complete',      icon: Award,    color: '#10b981', delay: 2.2 },
]

const EXTRACTED_FIELDS = [
  { field: 'Name',          value: 'Mahrez Ourabi',              delay: 0.8 },
  { field: 'Experience',    value: '3+ years Full-Stack',        delay: 1.0 },
  { field: 'Skills',        value: 'Next.js, Spring Boot, AI',   delay: 1.2 },
  { field: 'Education',     value: 'Eng. Degree – Tek-Up',       delay: 1.4 },
  { field: 'Languages',     value: 'EN · FR · AR · DE',          delay: 1.6 },
  { field: 'Location',      value: 'Weimar, Germany',            delay: 1.8 },
]

const JOB_MATCHES = [
  { role: 'Senior Full-Stack Engineer',      company: 'TechCorp GmbH',    match: 94, color: '#10b981' },
  { role: 'AI/ML Engineer',                  company: 'DeepMind Europe',  match: 87, color: '#00d4ff' },
  { role: 'Backend Engineer – Java/Spring',  company: 'Delivery Hero',    match: 82, color: '#7c3aed' },
]

export default function LiveDemo({ locale }: LiveDemoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [activeStage, setActiveStage] = useState(-1)

  const runDemo = () => {
    if (running || done) {
      setDone(false)
      setActiveStage(-1)
      setTimeout(() => startDemo(), 100)
      return
    }
    startDemo()
  }

  const startDemo = () => {
    setRunning(true)
    setDone(false)
    setActiveStage(0)
    DEMO_STAGES.forEach((stage, i) => {
      setTimeout(() => {
        setActiveStage(i)
        if (i === DEMO_STAGES.length - 1) {
          setTimeout(() => {
            setRunning(false)
            setDone(true)
          }, 800)
        }
      }, stage.delay * 1000)
    })
  }

  const idle = !running && !done

  return (
    <section id="demo" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-cyan mb-3">
            {locale === 'en' ? 'Interactive' : 'Interactif'}
          </p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            {locale === 'en' ? 'Live Demo' : 'Démo Live'}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {locale === 'en'
              ? 'Watch Hire-Tech\'s AI engine parse a CV and match it to jobs — in real time. This is the core of the platform I built at Audaxis.'
              : 'Regardez le moteur IA de Hire-Tech analyser un CV et le matcher à des offres — en temps réel. C\'est le cœur de la plateforme que j\'ai construite chez Audaxis.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left panel – pipeline visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* CV drop zone */}
            <div className="glass rounded-3xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan">
                  <FileText size={16} />
                </div>
                <span className="text-sm font-bold font-mono">
                  {locale === 'en' ? 'Sample CV' : 'CV Exemple'}
                </span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-mono glass border border-border text-muted-foreground">
                  mahrez_cv.pdf
                </span>
              </div>

              {/* Extracted fields */}
              <div className="space-y-2 min-h-[160px]">
                {(running || done) && EXTRACTED_FIELDS.map(({ field, value, delay }) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 text-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                    <span className="text-muted-foreground w-20 flex-shrink-0 font-mono">{field}</span>
                    <span className="font-bold text-foreground">{value}</span>
                  </motion.div>
                ))}
                {idle && (
                  <p className="text-xs text-muted-foreground font-mono pt-4">
                    {locale === 'en' ? '// Click "Run Demo" to start AI parsing…' : '// Cliquez "Lancer" pour démarrer l\'analyse IA…'}
                  </p>
                )}
              </div>
            </div>

            {/* Pipeline stages */}
            <div className="grid grid-cols-2 gap-3">
              {DEMO_STAGES.map((stage, i) => {
                const Icon = stage.icon
                const isActive = activeStage === i
                const isPast = activeStage > i
                return (
                  <motion.div
                    key={stage.id}
                    className="glass rounded-2xl p-4 border transition-all duration-300 flex items-center gap-3"
                    style={{
                      borderColor: (isActive || isPast) ? `${stage.color}60` : undefined,
                      background: isActive ? `${stage.color}10` : undefined,
                    }}
                    animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <span
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: (isActive || isPast) ? `${stage.color}20` : 'transparent',
                        color: (isActive || isPast) ? stage.color : 'var(--muted-foreground)',
                        border: `1px solid ${(isActive || isPast) ? stage.color + '40' : 'var(--border)'}`,
                      }}
                    >
                      {isPast ? <CheckCircle size={16} /> : <Icon size={16} />}
                    </span>
                    <span
                      className="text-xs font-bold transition-colors duration-300"
                      style={{ color: (isActive || isPast) ? stage.color : undefined }}
                    >
                      {stage.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-3 h-3 rounded-full"
                        style={{ background: stage.color }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Run button */}
            <motion.button
              onClick={runDemo}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all relative overflow-hidden"
              style={{
                background: done ? '#10b98120' : 'var(--cyan)',
                color: done ? '#10b981' : 'var(--background)',
                border: done ? '1px solid #10b98140' : 'none',
              }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              disabled={running}
            >
              {running ? (
                <>
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  />
                  {locale === 'en' ? 'Analyzing…' : 'Analyse en cours…'}
                </>
              ) : done ? (
                <>
                  <CheckCircle size={16} />
                  {locale === 'en' ? 'Run Again' : 'Relancer'}
                </>
              ) : (
                <>
                  <Play size={16} />
                  {locale === 'en' ? 'Run Demo' : 'Lancer la Démo'}
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Right panel – results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Zap,   label: locale === 'en' ? 'Parse Speed' : 'Vitesse', value: '<2s',  color: '#00d4ff' },
                { icon: Target,label: locale === 'en' ? 'Accuracy'    : 'Précision',value: '87%', color: '#10b981' },
                { icon: Clock, label: locale === 'en' ? 'API Latency' : 'Latence', value: '<150ms', color: '#f59e0b' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="glass rounded-2xl p-4 border border-border text-center">
                  <Icon size={16} className="mx-auto mb-2" style={{ color }} />
                  <p className="text-xl font-black" style={{ color }}>{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{label}</p>
                </div>
              ))}
            </div>

            {/* Job matches */}
            <div className="glass rounded-3xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <Target size={16} className="text-cyan" />
                <span className="text-sm font-bold">
                  {locale === 'en' ? 'Top Job Matches' : 'Meilleures Correspondances'}
                </span>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {(running || done) && JOB_MATCHES.map(({ role, company, match, color }, i) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.4 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-sm">{role}</p>
                          <p className="text-muted-foreground">{company}</p>
                        </div>
                        <span
                          className="text-lg font-black"
                          style={{ color }}
                        >
                          {match}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${match}%` }}
                          transition={{ delay: 2.5 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {idle && (
                  <p className="text-xs text-muted-foreground font-mono text-center py-8">
                    {locale === 'en' ? 'Waiting for analysis…' : 'En attente d\'analyse…'}
                  </p>
                )}
              </div>
            </div>

            {/* Architecture callout */}
            <div className="glass rounded-2xl border border-border p-5">
              <p className="text-xs font-mono text-muted-foreground mb-3">
                {locale === 'en' ? '// Behind the scenes' : '// Dans les coulisses'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['Python FastAPI', 'Sentence Transformers', 'Ollama LLM', 'Spring Boot', 'PostgreSQL JSONB'].map((t) => (
                  <span key={t} className="px-2 py-1 rounded-lg text-xs font-mono glass border border-border text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
