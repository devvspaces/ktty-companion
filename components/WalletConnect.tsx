'use client'

import dynamic from 'next/dynamic'

const WalletMultiButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function WalletConnect() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-[#1e1a2e] p-8">
      <div className="text-pink-400 mb-4 text-lg">You must connect your wallet to enter the bar.</div>
      <WalletMultiButton className="!bg-pink-600 hover:!bg-pink-700 text-white font-mono" />
    </div>
  )
}
