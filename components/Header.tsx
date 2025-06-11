'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const CONTRACT = 'GCdM9N9gbEfXVSnQxSNS26AVVwGdoDuBHfQdkxrwkRgs'
const TWITTER_URL = 'https://x.com/aurafarmersol'

export default function Header() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT)
      setCopied(true)
    } catch {}
  }

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Twitter Icon */}
      <a
        href={TWITTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="block"
      >
        <Image
          src="/x-icon.png"
          alt="Twitter"
          width={32}
          height={32}
          priority
        />
      </a>

      {/* Copy Contract Button */}
      <button
        onClick={handleCopy}
        className={`
          w-48 px-2 py-1
          ${copied ? 'bg-white text-black' : 'bg-yellow-400 text-black'}
          font-mono text-xs font-semibold
          rounded-sm
          hover:opacity-80
          transition
        `}
        title="Copy contract address"
      >
        {copied ? 'Copied!' : CONTRACT}
      </button>
    </div>
  )
}
