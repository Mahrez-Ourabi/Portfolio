'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, ExternalLink, MapPin, CheckCircle, Phone } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

interface ContactProps {
  locale: Locale
}

export default function Contact({ locale }: ContactProps) {
  const t = translations[locale].contact
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
  }

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:mahreez.ourabi@gmail.com', value: 'mahreez.ourabi@gmail.com' },
    { icon: Phone, label: 'Phone', href: 'tel:+491777967266', value: '+49 177 796 7266' },
    { icon: ExternalLink, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mahrez-ourabi-41339b197', value: 'mahrez-ourabi-41339b197' },
    { icon: ExternalLink, label: 'GitHub', href: 'https://github.com/Mahrez-Ourabi', value: 'Mahrez-Ourabi' },
    { icon: MapPin, label: 'Location', href: '#', value: 'Weimar, Thüringen, Germany' },
  ]

  return (
    <section id="contact" className="py-32 px-6 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-cyan/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-cyan mb-3">
            {t.subtitle}
          </p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">{t.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left – description + social */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">{t.description}</p>

            <div className="space-y-4">
              {socialLinks.map(({ icon: Icon, label, href, value }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 glass rounded-2xl border border-border hover:border-cyan/40 transition-all group"
                  whileHover={{ x: 6, scale: 1.01 }}
                >
                  <span className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan flex-shrink-0 group-hover:bg-cyan group-hover:text-background transition-all">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <p className="text-sm font-bold">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-4 border border-cyan/30"
              >
                <CheckCircle size={48} className="text-cyan" />
                <p className="text-xl font-bold">{t.success}</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-3xl p-8 border border-border space-y-5"
              >
                <div>
                  <label className="text-xs font-mono font-bold text-muted-foreground block mb-2">
                    {t.name_label}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.name_placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-all text-sm placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-muted-foreground block mb-2">
                    {t.email_label}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.email_placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-all text-sm placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-muted-foreground block mb-2">
                    {t.message_label}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.message_placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-all text-sm placeholder:text-muted-foreground resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan text-background font-bold text-sm disabled:opacity-60 cyan-glow transition-all"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t.send}
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
