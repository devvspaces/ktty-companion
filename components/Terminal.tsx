'use client'

import { useEffect, useRef, useState } from 'react'
import GlitchText from './GlitchText'
import LayerCounter from './LayerCounter'
import CrashScreen from './CrashScreen'
import { getResponse } from '@/lib/aiResponses'

export default function Terminal() {
  const [layer, setLayer] = useState(1)
  const [log, setLog] = useState<string[]>([])
  const [crashed, setCrashed] = useState(false)
  const [badgeUnlocked, setBadgeUnlocked] = useState(false)
  const [isVoidMode, setIsVoidMode] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const hasCrashed = localStorage.getItem('altf4_crash') === 'true'
    const crashCount = Number(localStorage.getItem('altf4_crash_count') || '0')

    if (hasCrashed) {
      setLog([
        '> Previous session crashed...',
        '> Reinitializing terminal shell...',
      ])
    } else {
      setLog([
        '> Welcome, terminal user.',
        '> Ask anything to begin traversal.',
        '> Reach Layer 5 to complete the Glitch Ritual...',
        "> Type `help` to see corrupted documentation."
      ])
    }

    if (crashCount >= 3) {
      setIsVoidMode(true)
    }

    if (crashCount > 0 && !localStorage.getItem('badge_claimed')) {
      setBadgeUnlocked(true)
      localStorage.setItem('badge_claimed', 'true')
    }

    if (videoRef.current) {
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    }
  }, [])

  const handleInput = (input: string) => {
    if (!input.trim()) return

    const newLog = [...log, `> ${input}`]
    const response = getResponse(layer)
    const responseLog = `> ${response}`

    const nextLayer = Math.min(layer + 1, 5)
    setLayer(nextLayer)
    setLog([...newLog, responseLog])

    if (nextLayer === 5 && newLog.length >= 6) {
      setTimeout(() => {
        setCrashed(true)
        localStorage.setItem('altf4_crash', 'true')
      }, 1000)
    }
  }

  return (
    <>
      {crashed && <CrashScreen />}

      {/* 🔴 Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 z-0 object-cover w-full h-full opacity-10 pointer-events-none"
      >
        <source src="/bg/void-loop.mp4" type="video/mp4" />
        <source src="/bg/void-loop.webm" type="video/webm" />
        Your browser does not support the background video.
      </video>

      {/* ✅ Global top-left indicator */}
      <div className="fixed top-2 left-2 text-xs text-white/70 font-mono bg-black/60 px-2 py-1 rounded border border-white/10 z-50">
        ⬤ Users at Layer {layer}: {Math.floor(4000 + Math.random() * 300)}
      </div>

      {/* 🖥️ Terminal full height container */}
      <div
        className={`relative z-10 flex flex-col w-full h-[calc(100vh-2rem)] px-4 sm:px-8 transition-all duration-500 ${
          crashed ? 'opacity-20 blur-sm pointer-events-none' : ''
        }`}
      >
        <LayerCounter layer={layer} />

        {isVoidMode && (
          <div className="text-xs text-red-400 mb-2 font-mono">
            &gt; VOID ACCESS GRANTED
          </div>
        )}

        {/* Terminal log */}
        <div className="h-[400px] bg-black border border-white p-4 overflow-y-auto text-sm font-mono space-y-1 shadow-md shadow-black mb-4">
          {log.map((line, idx) => (
            <div key={idx}>
              <GlitchText text={line} layer={layer} />
            </div>
          ))}
        </div>

        {/* Input field */}
        <input
          type="text"
          className="w-full p-2 bg-black border border-white text-white font-mono"
          placeholder="Ask a question..."
          disabled={crashed}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const input = (e.target as HTMLInputElement).value
              handleInput(input)
              ;(e.target as HTMLInputElement).value = ''
            }
          }}
        />

        {/* Crash badge message */}
        {badgeUnlocked && (
          <div className="mt-2 text-green-400 text-sm font-mono animate-pulse">
            🏅 Crash Badge Unlocked — Welcome Back, Survivor.
          </div>
        )}
      </div>
    </>
  )
}
