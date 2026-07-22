'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function LiquidBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Blob 1 – cyan */}
      <motion.div
        className="blob-1 absolute top-[-20%] right-[-10%] w-[700px] h-[700px] opacity-[0.07] dark:opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, oklch(0.78 0.2 210) 0%, transparent 70%)',
          x: springX,
          y: springY,
        }}
      />

      {/* Blob 2 – accent */}
      <motion.div
        className="blob-2 absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] opacity-[0.06] dark:opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, oklch(0.55 0.2 280) 0%, transparent 70%)',
          x: springX,
          y: springY,
        }}
      />

      {/* Blob 3 – mid */}
      <motion.div
        className="blob-3 absolute top-[40%] left-[30%] w-[500px] h-[500px] opacity-[0.04] dark:opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.18 180) 0%, transparent 70%)',
          x: springX,
          y: springY,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
