'use client'

import { useEffect, useState } from 'react'
import Terminal from '@/components/Terminal'
import BootSequence from '@/components/BootSequence'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const [booted, setBooted] = useState(false)
  const contractAddress = 'Updated'

  useEffect(() => {
    const hasBooted = localStorage.getItem('altf4_booted') === 'true'
    if (hasBooted) {
      setBooted(true)
    }
  }, [])

  const handleBootComplete = () => {
    setBooted(true)
    localStorage.setItem('altf4_booted', 'true')
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence mode="wait">
      {!booted ? (
        <BootSequence key="boot" onComplete={handleBootComplete} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen text-white font-mono relative z-10"
        >
          {/* Background mask for logo/buttons */}
          <div className="w-full bg-black/70 backdrop-blur-sm py-8 flex flex-col items-center space-y-4">
            <img
              src="/projectlogo.png"
              alt="ALT+F4 Logo"
              className="w-60 h-60 border-4 border-red-500 shadow-red-500/60 shadow-md glitch"
            />

            <div className="flex space-x-4">
              <a
                href="https://x.com/altf4solana"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white px-4 py-2 hover:bg-white hover:text-black transition"
              >
                TWITTER
              </a>
              <Link
                href="/whitepaper"
                className="border border-white px-4 py-2 hover:bg-white hover:text-black transition"
              >
                WHITEPAPER
              </Link>
            </div>

            <div
              onClick={copyAddress}
              className="px-4 py-2 border border-red-500 cursor-pointer hover:bg-red-600 hover:text-white transition"
            >
              {copied ? '✓ CONTRACT COPIED' : 'CONTRACT: TO BE ANNOUNCED'}
            </div>
          </div>

          {/* Edge-to-edge terminal */}
          <div className="w-full px-2 sm:px-4 mt-6">
            <Terminal />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
