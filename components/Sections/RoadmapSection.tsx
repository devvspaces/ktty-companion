'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const PHASES = [
  {
    id: 'phase1',
    title: 'Phase 1',
    image: '/images/roadmap/phase1.png',
    headline: 'Phase 1: $KTTY Token',
    description:
      '$KTTY Token launched on the TAMAMEME platform allowing fair acquisition of the core project currency for early supporters',
  },
  {
    id: 'phase2',
    title: 'Phase 2',
    image: '/images/roadmap/phase2.png',
    headline: 'Phase 2: KTTY Tamers NFTs',
    description:
      '6,666 KTTY Tamer NFTs available to mint via our first of its kind custom minting platform on Ronin',
  },
  {
    id: 'phase3',
    title: 'Phase 3',
    image: '/images/roadmap/phase3.png',
    headline: 'Phase 3: KORA AI Agent',
    description:
      'The K.O.R.A AI Agent is launched, allowing users to dive deeper into the KTTY Ecosystem',
  },
  {
    id: 'phase4',
    title: 'Phase 4',
    image: '/images/roadmap/phase4.png',
    headline: 'Phase 4: Tamer Missions',
    description:
      'Dispatch Tamers into the wild—earn rewards, explore Felysia, and uncover hidden synergies.',
  },
  {
    id: 'phase5',
    title: 'Phase 5',
    image: '/images/roadmap/phase5.png',
    headline: 'Phase 5: KTTY NFTs',
    description:
      'Our 2nd collection of KTTY Companion NFTs are released ahead of our breeding system',
  },
  {
    id: 'phase6',
    title: 'Phase 6',
    image: '/images/roadmap/phase6.png',
    headline: 'Phase 6: Tamer Item Forge',
    description:
      'Use Items earned in dispatch missions to craft exclusive tamer gear pieces that will be tradeable with other players',
  },
]

export default function RoadmapSection() {
  const [activePhase, setActivePhase] = useState('phase1')
  const current = PHASES.find((p) => p.id === activePhase)!
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (container) {
      const child = container.children[index] as HTMLElement
      child?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    }
  }

  const handleNext = () => {
    const currentIndex = PHASES.findIndex((p) => p.id === activePhase)
    if (currentIndex < PHASES.length - 1) {
      const nextId = PHASES[currentIndex + 1].id
      setActivePhase(nextId)
      scrollToIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    const currentIndex = PHASES.findIndex((p) => p.id === activePhase)
    if (currentIndex > 0) {
      const prevId = PHASES[currentIndex - 1].id
      setActivePhase(prevId)
      scrollToIndex(currentIndex - 1)
    }
  }

  return (
    <section id="roadmap" className="w-full sm:py-4 lg:py-10  px-6 text-center">
      <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4">Roadmap</h2>
      <p className="text-base lg:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
        The KTTY World Project will evolve over several key phases leading up to the release of the KTTY World Game and beyond.
      </p>

      {/* Scrollable Phase Row */}
      <div
  ref={scrollRef}
  className="flex overflow-x-auto gap-6 px-4 pb-6 snap-x snap-mandatory max-w-7xl mx-auto"
  style={{
    scrollbarWidth: 'none',           // Firefox
    msOverflowStyle: 'none',          // IE/Edge
  }}
>
  <style jsx>{`
    div::-webkit-scrollbar {
      display: none;                  // WebKit (Chrome/Safari)
    }
  `}</style>

        {PHASES.map((phase) => {
          const isActive = phase.id === activePhase
          return (
            <div
              key={phase.id}
              onClick={() => {
                setActivePhase(phase.id)
                scrollToIndex(PHASES.findIndex((p) => p.id === phase.id))
              }}
              className={clsx(
                'min-w-[220px] max-w-[240px] cursor-pointer transition-all duration-300 border-2 rounded-lg p-2 snap-start',
                isActive
                  ? 'border-purple-500 shadow-[0_0_12px_4px_rgba(168,85,247,0.5)]'
                  : 'border-gray-700 opacity-60 hover:opacity-100 hover:border-purple-400'
              )}
            >
              <div
                className={clsx(
                  'text-xl font-bold text-white py-2 mb-2 rounded-md text-center',
                  isActive ? 'bg-purple-700' : 'bg-gray-800'
                )}
              >
                {phase.title}
              </div>
              <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
                <Image
                  src={phase.image}
                  alt={phase.title}
                  fill
                  className={clsx('object-cover transition', isActive ? '' : 'grayscale')}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Scroll Buttons - moved below */}
      <div className="flex justify-center items-center gap-6 mb-10">
        <button
          onClick={handlePrev}
          className="text-white text-2xl bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="text-white text-2xl bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition"
        >
          →
        </button>
      </div>

      {/* Static Description Box */}
<div className="bg-white/5 border border-white/10 backdrop-blur-sm text-white w-full max-w-7xl mx-auto px-8 py-10 rounded-lg shadow-inner min-h-[180px] flex flex-col items-center justify-center">
        <h3 className="text-2xl font-semibold mb-4">{current.headline}</h3>
        <p className="text-base lg:text-lg text-gray-300">{current.description}</p>
      </div>
    </section>
  )
}
