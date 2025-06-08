'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CrashScreen() {
  useEffect(() => {
    const audio = new Audio('/sfx/glitch.mp3')
    audio.volume = 0.5
    audio.play()
  }, [])

  const handleReset = () => {
    const crashCount = Number(localStorage.getItem('altf4_crash_count') || '0') + 1
    localStorage.setItem('altf4_crash_count', crashCount.toString())
    localStorage.removeItem('altf4_crash')
    localStorage.removeItem('badge_claimed') // Optional: Reset badge display
    location.reload()
  }

  return (
    <motion.div
      className="fixed inset-0 bg-red-900 text-white flex flex-col items-center justify-center text-center px-4 z-50 animate-flicker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-4 text-lg font-mono animate-pulse">
        <div className="tracking-widest">∅ SYSTEM FAILURE ∅</div>
        <div className="text-3xl font-bold">You are now the token.</div>
        <div className="text-sm text-white/70">All layers breached. Disconnect complete.</div>
      </div>

      <button
        onClick={handleReset}
        className="mt-8 px-6 py-2 border border-white text-white font-mono hover:bg-white hover:text-black transition"
      >
        RESET TERMINAL
      </button>
    </motion.div>
  )
}
