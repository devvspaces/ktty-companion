'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  enableSFX?: boolean
}

export default function CoraTerminal({ enableSFX = false }: Props) {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const startupLines = [
    '[K.O.R.A. SYSTEM v1.0]',
    'Authenticating agent...',
    '✓ Access granted.',
    'K.O.R.A. online. Ready for input.',
  ]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < startupLines.length) {
        setMessages((prev) => [...prev, startupLines[index]])
        index++
      } else {
        clearInterval(interval)
      }
    }, 800)

    if (enableSFX) {
      const audio = new Audio('/sounds/startup.wav')
      audio.volume = 0.4
      audio.play().catch(() => {})
    }

    return () => clearInterval(interval)
  }, [enableSFX])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const callOpenAI = async (prompt: string): Promise<string> => {
    const res = await fetch('https://cora-backend-three.vercel.app/api/cora', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt }),
    })

    const { threadId, runId } = await res.json()

    const pollStatus = async (): Promise<string> => {
      const statusRes = await fetch(
        `https://cora-backend-three.vercel.app/api/cora-status?threadId=${threadId}&runId=${runId}`
      )
      const data = await statusRes.json()

      if (data.status === 'completed') return data.reply
      await new Promise((r) => setTimeout(r, 2000))
      return pollStatus()
    }

    return await pollStatus()
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = `> ${input.trim()}`
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setMessages((prev) => [...prev, 'K.O.R.A. is typing...'])
    setLoading(true)

    try {
      const reply = await callOpenAI(input.trim())
      setMessages((prev) => [...prev.slice(0, -1), reply])
    } catch (e) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        'K.O.R.A. encountered an error.',
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={clsx(
        'w-full max-w-4xl mx-auto p-6 rounded-lg border-2',
        'border-pink-500 shadow-[0_0_20px_#ec4899]',
        'text-white font-mono'
      )}
    >
      {/* K.O.R.A Image */}
      <div className="w-96 h-96 mx-auto mb-6">
        <Image
          src="/images/characters/kora.png"
          alt="K.O.R.A"
          width={192}
          height={192}
          className="w-full h-full object-contain rounded-md border border-white/10"
        />
      </div>

      {/* Message Log */}
      <div
        ref={scrollRef}
        className="min-h-[440px] max-h-[440px] overflow-y-auto text-sm bg-white/5 border border-white/10 rounded-md p-4 mb-4"
      >
        {messages.map((msg, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {msg}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2 rounded bg-black border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={clsx(
            'px-4 py-2 rounded font-bold text-sm transition',
            input.trim() && !loading
              ? 'bg-pink-500 hover:bg-pink-400 text-white'
              : 'bg-gray-700 text-gray-300 cursor-not-allowed'
          )}
        >
          Send
        </button>
      </div>
    </div>
  )
}
