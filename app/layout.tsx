// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Lilita_One } from 'next/font/google'

const lilita = Lilita_One({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'SIMPFI',
  description: 'The future of emotional yield farming. Stake your ego. Earn her attention.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lilita.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
