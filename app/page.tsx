'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import LiquidBackground from '@/components/liquid-background'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import About from '@/components/about'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Experience from '@/components/experience'
import Contact from '@/components/contact'
import Footer from '@/components/footer'


export default function Page() {
  const [locale, setLocale] = useState<Locale>('en')

  return (
    <main className="relative min-h-screen">
      <LiquidBackground />
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <Skills locale={locale} />
      <Projects locale={locale} />
      <Experience locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
