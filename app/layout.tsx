// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Lilita_One } from 'next/font/google'

const lilita = Lilita_One({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: '$TURT Token',
  description: 'The slowest, funniest meme token on the chain. Shell yeah!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lilita.className} bg-[var(--background)] text-[var(--foreground)]`}>
        {children}
      </body>
    </html>
  )
}
