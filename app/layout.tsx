// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import NavBar from '@/components/NavBar/NavBar'
import FloatingCora from '@/components/UI/FloatingCora'

export const metadata = {
  title: 'KTTY World',
  description: 'The 3D Pet Adventure on Ronin Network',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-[DIN2014] antialiased">
        {/* Glow-ready translucent header nav */}
        <NavBar />

        {/* Main content */}
        <main className="min-h-screen w-full">
          {children}
        </main>

        {/* Floating C.O.R.A assistant */}
        <FloatingCora />
      </body>
    </html>
  )
}
