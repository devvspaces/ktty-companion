'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [copied, setCopied] = useState(false)
  const contract = 'BxnvH5RYnhVFvTCvmZU4Mhc8f27YSyoXH3PdKJhXuF1Z'

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(contract)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="text-center p-6 space-y-8">
      {/* Title */}
      <h1 className="text-8xl font-bold animate-glow-fast text-neon-yellow">
        DEVINE CAT
      </h1>

      {/* Image + Aura */}
      <div className="relative inline-block">
        <div className="absolute inset-0 rounded-xl animate-pulse-glow bg-neon-yellow opacity-30" />
        <Image
          src="/divineone.png"
          alt="Divine Cat"
          width={500}
          height={500}
          className="relative rounded-xl"
          priority
        />
      </div>

      {/* Buttons & Contract */}
      <div className="flex flex-col items-center space-y-4">
        {/* Twitter Link */}
        <a
          href="https://x.com/aurafarmersol"
          target="_blank"
          rel="noopener noreferrer"
          className="w-48 px-6 py-2 bg-pastel-yellow hover:bg-neon-yellow text-black rounded-full font-semibold transition"
        >
          Twitter
        </a>

        {/* Copy Contract Button */}
        <button
          onClick={copyToClipboard}
          className="w-64 px-4 py-2 bg-pastel-yellow hover:bg-neon-yellow text-black rounded-full font-semibold transition"
        >
          {copied ? 'Copied!' : 'Copy Contract'}
        </button>

        {/* Visible Contract (non-wrapping) */}
        <div className="w-120
         truncate bg-pastel-yellow text-black rounded-full px-4 py-2">
          {contract}
        </div>
      </div>
    </div>
  )
}
