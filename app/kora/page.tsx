'use client'

import { useState } from 'react'
import CoraTerminal from '@/components/UI/CoraTerminal'
import Image from 'next/image'

export default function CoraPage() {
  const [enableSFX, setEnableSFX] = useState(true)

  return (
    <section className="min-h-screen w-full mt-20 bg-black text-white px-4 py-20 flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl mx-auto">
        <div className="relative bg-black border-2 border-pink-500 rounded-xl shadow-lg overflow-hidden animate-glow-pulse transition-all duration-700">
          <CoraTerminal enableSFX={enableSFX} />
        </div>
      </div>
    </section>
  )
}
