// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { WalletAdapterProvider } from '@/lib/wallet'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ALT+F4 – Terminal Closed',
  description: 'MemeFi ritual interface for $ALT+F4 on Solana.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} bg-black text-white`}>
      <body className="min-h-screen bg-black font-mono overflow-hidden">
        <WalletAdapterProvider>
          <main className="flex flex-col items-center justify-center w-full h-screen p-4">
            {children}
          </main>
        </WalletAdapterProvider>
      </body>
    </html>
  )
}
