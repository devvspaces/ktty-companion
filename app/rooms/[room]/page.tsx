'use client'

import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import BarHeader from '@/components/BarHeader'
import ChatRoom from '@/components/ChatRoom'
import WalletConnect from '@/components/WalletConnect'

export default function RoomPage({ params }: { params: Promise<{ room: string }> }) {
  const { room } = use(params)
  const [wallet, setWallet] = useState<string | null>(null)

  // Simulate wallet connect
  useEffect(() => {
    const stored = localStorage.getItem('wagmi_wallet')
    if (stored) setWallet(stored)
  }, [])

  const connect = () => {
    const fakeWallet = '9x7...gH'
    localStorage.setItem('wagmi_wallet', fakeWallet)
    setWallet(fakeWallet)
  }

  return (
    <div className="flex min-h-screen bg-[#0d0b18] text-white font-mono">
      {/* Left Panel: Rainy Bar Window */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/assets/chatroom.png"
          alt="Bar Window"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
        <div className="absolute bottom-6 left-6 text-pink-400 text-2xl tracking-widest font-bold">
          {room.toUpperCase()}
        </div>
      </div>

      {/* Right Panel: Chat / Wallet */}
      <div className="w-full md:w-1/2 flex flex-col">
        <BarHeader onConnect={connect} wallet={wallet} />
        {!wallet ? <WalletConnect /> : <ChatRoom />}
      </div>
    </div>
  )
}
