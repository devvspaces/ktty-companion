'use client'

import { useState } from 'react'

export default function SimpDeck() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-16 px-6">
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">Welcome to SIMPFI</h1>
      <p className="text-lg text-white/70 max-w-xl text-center">
        Stake your ego. Earn her attention. Mint Simpasses™, browse verified creators, and tip your way to emotional ruin.
      </p>

      {/* Coming Soon Sections (Temporary placeholders) */}
      <section className="mt-20 w-full max-w-4xl text-center">
        <div className="text-2xl font-semibold mb-2">🔥 Thirst Metrics</div>
        <p className="text-white/50">Real-time feed of simp activity and tip streaks</p>
      </section>

      <section className="mt-12 w-full max-w-4xl text-center">
        <div className="text-2xl font-semibold mb-2">💄 Featured Creators</div>
        <p className="text-white/50">Top earning baddies of the week</p>
      </section>

      <section className="mt-12 w-full max-w-4xl text-center">
        <div className="text-2xl font-semibold mb-2">📉 Wallet Drain-o-Meter™</div>
        <p className="text-white/50">Visualize your descent into simpdom</p>
      </section>
    </main>
  )
}
