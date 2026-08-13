'use client'

import { motion } from 'framer-motion'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

interface FooterProps {
  locale: Locale
}

export default function Footer({ locale }: FooterProps) {
  const t = translations[locale].footer
  const year = new Date().getFullYear()

  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p
          className="text-xs text-muted-foreground font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t.made_with}
        </motion.p>
        <motion.p
          className="text-xs text-muted-foreground font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {year} Mahrez Ourabi. {t.rights}
        </motion.p>
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="text-xs font-mono font-bold text-cyan hover:underline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  )
}
