'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const TABS = {
  stake: {
    label: 'Stake',
    image: '/images/tamermissions/stake.png',
  },
  dispatch: {
    label: 'Dispatch',
    image: '/images/tamermissions/dispatch.png',
  },
  manage: {
    label: 'Manage',
    image: '/images/tamermissions/manage.png',
  },
  rewards: {
    label: 'Rewards',
    image: '/images/tamermissions/rewards.png',
  },
  dominate: {
    label: 'Dominate',
    image: '/images/tamermissions/dominate.png',
  },
}

const TAB_KEYS = Object.keys(TABS) as (keyof typeof TABS)[]

export default function TamerMissionsSection() {
  const [selected, setSelected] = useState<keyof typeof TABS>('stake')
  const [mobileIndex, setMobileIndex] = useState(0)

  const current = TABS[selected]
  const mobileCurrent = TABS[TAB_KEYS[mobileIndex]]

  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev - 1 + TAB_KEYS.length) % TAB_KEYS.length)
  }

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev + 1) % TAB_KEYS.length)
  }

  return (
    <section className="w-full py-10 sm:py-4 lg:py-10 px-6 text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4">Tamer Missions</h2>
        <p className="text-base lg:text-xl text-gray-300 max-w-4xl mx-auto mb-8">
          Send Teams of Tamers off on gamified missions to earn a variety of rewards and points central to the KTTY Ecosystem
        </p>

        {/* Buttons: side by side on mobile */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/news/developer-blog-06-dispatch-missions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-2xl block text-center px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition"
          >
            Learn More
          </a>
          <a
            href="https://missions.kttyworld.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-2xl block text-center px-6 py-4 bg-purple-500 hover:bg-white/20 text-white font-semibold rounded-lg transition animate-pulse-glow"
          >
            Play Now
          </a>
        </div>
      </div>

      {/* DESKTOP/LG: Tabs + Image */}
      <div className="max-w-7xl mx-auto hidden lg:flex flex-row gap-6 items-stretch">
        {/* Tabs */}
        <div className="flex flex-col w-full lg:w-[180px] min-h-[660px]">
          {Object.entries(TABS).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelected(key as keyof typeof TABS)}
              className={clsx(
                'flex-1 w-full flex items-center justify-center font-medium text-lg rounded-md transition',
                selected === key
                  ? 'bg-white text-black'
                  : 'bg-black text-white border border-white/10 hover:bg-white/10'
              )}
            >
              {data.label}
            </button>
          ))}
        </div>

        {/* Image Display */}
        <div className="flex-1 bg-[#121025] rounded-lg border border-white/10 p-1">
          <div className="relative w-full h-[660px] rounded-lg overflow-hidden">
            <Image
              src={current.image}
              alt={current.label}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* MOBILE-ONLY: Carousel-like simplified view */}
<div className="lg:hidden flex flex-col items-center gap-4">
  <div className="relative w-full max-w-xl bg-[#121025] border border-white/10 rounded-lg overflow-hidden aspect-[4/3]">
    <Image
      src={mobileCurrent.image}
      alt={mobileCurrent.label}
      fill
      className="object-contain p-4"
    />
  </div>

  {/* Arrows wrap the title */}
  <div className="flex items-center justify-center gap-4 text-lg sm:text-4xl font-semibold">
    <button onClick={handleMobilePrev} className="hover:opacity-80 text-2xl">&larr;</button>
    <span>{mobileCurrent.label}</span>
    <button onClick={handleMobileNext} className="hover:opacity-80 text-2xl">&rarr;</button>
  </div>
</div>

    </section>
  )
}
