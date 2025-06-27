import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { WalletConnectionProvider } from '@/lib/WalletProvider'


export const metadata: Metadata = {
  title: 'WAGMI BAR',
  description: 'Solana’s Late-Night Speakeasy Web3 Chatroom App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletConnectionProvider>
          {children}
        </WalletConnectionProvider>
      </body>
    </html>
  )
}
