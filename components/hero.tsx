'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

interface HeroProps {
  locale: Locale
}

const ROLES_EN = ['Full-Stack Engineer', 'AI Specialist', 'Product Builder']
const ROLES_FR = ['Ingénieur Full-Stack', 'Spécialiste IA', 'Créateur de Produits']

export default function Hero({ locale }: HeroProps) {
  const t = translations[locale].hero
  const roles = locale === 'en' ? ROLES_EN : ROLES_FR
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[roleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        const timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(timeout)
      } else {
        setRoleIndex((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex, roles])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-cyan border border-cyan/30">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            {t.available}
            <Sparkles size={12} className="text-cyan" />
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-sm font-mono tracking-[0.3em] uppercase text-muted-foreground mb-4"
        >
          {t.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight mb-6 text-balance"
        >
          <span className="shimmer-text">{t.name}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold text-muted-foreground mb-8 h-10 flex items-center justify-center"
        >
          <span className="text-cyan text-cyan-glow">{displayed}</span>
          <span className="ml-0.5 w-0.5 h-7 bg-cyan animate-pulse inline-block" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-pretty"
        >
          {t.description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            onClick={scrollToProjects}
            className="group flex items-center gap-2 px-8 py-4 bg-cyan text-background font-bold rounded-full text-sm hover:shadow-lg transition-all cyan-glow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.cta_primary}
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </motion.button>
          <motion.a
            href="/CV_IT_EN_Mahrez_ourabi.pdf"
            download
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-border hover:border-cyan text-sm font-bold transition-all glass"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} />
            {t.cta_secondary}
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-cyan rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
