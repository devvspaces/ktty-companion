'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BarHeader from '@/components/BarHeader'

const rooms = [
  { name: 'main', label: 'Main Room' },
  { name: 'wif-only', label: 'WIF Only' },
  { name: 'cope-corner', label: 'Cope Corner' },
  { name: 'alpha-leaks', label: 'Alpha Leaks' },
  { name: 'off-topic', label: 'Off Topic' },
  { name: 'dev-den', label: 'Dev Den' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0b18] text-white font-mono flex flex-col">
      <BarHeader />

      {/* Visual */}
      <div className="w-full relative aspect-[16/6]">
       <Image
  src="/assets/barfront.png"
  alt="WAGMI BAR Front"
  fill
  priority
  className="object-contain"
/>

      </div>

      {/* Chatroom Selector */}
      <div className="flex-1 p-8 bg-gradient-to-br from-[#1e1a2e] to-[#0d0b18]">
        <h1 className="text-3xl font-bold mb-6 text-pink-400">
          Choose Your Chatroom
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.name}
              href={`/rooms/${room.name}`}
              className="bg-[#2e2648] hover:bg-pink-600 hover:shadow-lg transition-all p-6 rounded-xl border border-purple-900 flex flex-col items-start"
            >
              <div className="text-xl font-bold">{room.label}</div>
              <div className="text-xs text-purple-300 mt-1">/{room.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
