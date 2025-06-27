'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const fakeMessagesData = [
  'Drinks on me if we hit 2x tonight.',
  'Just aped into $DROP, feeling bullish.',
  'WAGMI, fam. Hold tight.',
  'Anyone else farming this new airdrop?',
  'Check this alpha I found on X...',
  'Still can’t believe I missed that mint 😭',
  'This bar got better vibes than Discord.',
  'LFG 🔥🔥🔥',
]

const fakeUsers = ['copechan', 'solbro', 'basedcat', 'alphafox', 'wagmi69']

function generateMessage() {
  const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)]
  const message = fakeMessagesData[Math.floor(Math.random() * fakeMessagesData.length)]
  return { user, message, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
}

export default function ChatRoom() {
  const router = useRouter()
  const [messages, setMessages] = useState(() =>
    Array.from({ length: 10 }, () => generateMessage())
  )
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev, generateMessage()])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        user: 'you',
        message: input.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setInput('')
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Top nav with exit */}
      <div className="p-4 border-b border-purple-900 bg-[#1a162b] flex justify-between items-center">
        <button
          onClick={() => router.push('/')}
          className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 text-sm"
        >
          ← Back to Lobby
        </button>
        <div className="text-purple-400 text-sm font-bold">Chatroom</div>
        <div className="w-[120px]" />
      </div>

      {/* Chat Scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i}>
            <span className="text-purple-400">[{msg.timestamp}]</span>{' '}
            <span className={msg.user === 'you' ? 'text-pink-400' : 'text-blue-400'}>
              {msg.user}:
            </span>{' '}
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Fixed Bottom */}
      <div className="p-4 border-t border-purple-900 bg-[#1a162b] flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded bg-[#2e2648] text-white focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}
