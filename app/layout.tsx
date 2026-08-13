import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Mahrez Ourabi – Full-Stack Engineer & AI Specialist',
  description:
    'Portfolio of Mahrez Ourabi, a Full-Stack Software Engineer and AI Enthusiast based in Germany. Expert in Next.js, Spring Boot, Python, and AI/ML systems.',
  keywords: ['Full-Stack Developer', 'AI Engineer', 'Next.js', 'React', 'Spring Boot', 'TypeScript'],
  authors: [{ name: 'Mahrez Ourabi' }],
  openGraph: {
    title: 'Mahrez Ourabi – Full-Stack Engineer & AI Specialist',
    description: 'Building intelligent, scalable, and beautiful web applications.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d14' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans bg-background noise">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
