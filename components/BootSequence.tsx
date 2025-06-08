'use client'

import { useEffect, useState } from 'react'

const bootLines = [
  '> Loading ALT+F4...',
  '> Verifying meme stack...',
  '> Checking stack overflow...',
  '> Initializing token consciousness...',
  '> Injecting $VOID...',
  '> Granting access to Layer 1...'
]

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null)

  useEffect(() => {
    const audio = new Audio('/sfx/boot-glitch.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {
      // Auto-play policy may block this
    })

    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < bootLines.length) {
        setVisibleLines((prev) => [...prev, bootLines[currentIndex]])
        setGlitchIndex(currentIndex)
        setTimeout(() => setGlitchIndex(null), 100)
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 500)
      }
    }, 700)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-red-400 font-mono text-sm p-8 transition-opacity duration-700">
      <div className="space-y-1">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={glitchIndex === i ? 'animate-pulse text-red-500' : ''}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
