'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { burnTokens } from '@/lib/burn'

export default function SendToken() {
  const { publicKey } = useWallet()

  const handleBurn = async () => {
    if (!publicKey) return alert('Connect wallet first.')
    await burnTokens(publicKey)
  }

  return (
    <button
      onClick={handleBurn}
      className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-900 text-white font-mono"
    >
      Send $ALT+F4 (Burn)
    </button>
  )
}
