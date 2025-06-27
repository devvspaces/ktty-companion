// components/BarHeader.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

interface BarHeaderProps {
  onConnect?: () => void
  wallet?: string | null
}

export default function BarHeader({ onConnect, wallet }: BarHeaderProps) {
  const [copied, setCopied] = useState(false)
  const contractAddress = 'BFqydS6i9C4xHFQRMtSzcaaUe3WbT8AUiKBsz3CLpump'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="px-4 py-3 bg-[#140f23] border-b border-purple-900 flex items-center justify-between text-white font-mono text-sm">
      {/* LEFT */}
      <div className="flex-1 flex items-center gap-3 text-pink-500 text-lg font-bold">
        WAGMI BAR
        <a href="https://x.com/wagmibarwtf" target="_blank" rel="noopener noreferrer">
          <Image
            src="/x-icon.png"
            alt="Twitter"
            width={25}
            height={25}
            className="hover:opacity-70 transition"
          />
        </a>
      </div>

      {/* CENTER */}
      <div className="flex-1 flex justify-center">
        <button
          onClick={handleCopy}
          className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700 transition"
        >
          {copied ? 'Copied!' : contractAddress}
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex justify-end">
        {wallet ? (
          <div className="bg-purple-700 text-white px-3 py-1 rounded">
            {wallet}
          </div>
        ) : (
          onConnect && (
            <button
              onClick={onConnect}
              className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700 transition"
            >
              Connect Wallet
            </button>
          )
        )}
      </div>
    </div>
  )
}
