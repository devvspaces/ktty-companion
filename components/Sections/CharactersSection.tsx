'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const CHARACTER_TYPES = {
  tamer: {
    label: 'The Tamers',
    badge: '/images/characters/tamerbadge.png',
    image: '/images/characters/tamers.png',
    description:
      'Tamers are the brave hearts who connect with KTTYS. They guide, protect, and shape the future of Felycia.',
  },
  ktty: {
    label: 'The KTTYs',
    badge: '/images/characters/kttybadge.png',
    image: '/images/characters/kttys.png',
    description:
      'KTTYS are mystical creatures, fragments of emotion bound in feline form. Each one holds a piece of your soul and grows stronger with your bond.',
  },
  oneeye: {
    label: 'The One Eye Clan',
    badge: '/images/characters/oneyebadge.png',
    image: '/images/characters/oneyes.png',
    description:
      'A group led by the mysterious but sinister NULL. With secrets locked behind masks, they shape destiny from afar.',
  },
}

export default function CharactersSection() {
  const [selected, setSelected] = useState<'ktty' | 'oneeye' | 'tamer'>('tamer')
  const current = CHARACTER_TYPES[selected]

  return (
    <section id="characters" className="w-full sm:py-4 lg:py-10  px-6 text-center">
      <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4">Characters</h2>
      <p className="text-base lg:text-xl text-gray-300 max-w-4xl mx-auto mb-10">
        Learn more about the dozens of roles in KTTY World—mystical creatures, the humans who guide them, and a masked organization.
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-12 max-w-6xl mx-auto">
        {/* Left: Badge Filter */}
        <div className="flex flex-row lg:flex-col gap-6 justify-center lg:justify-start items-center lg:items-start w-full lg:w-auto">
          {Object.entries(CHARACTER_TYPES).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelected(key as 'ktty' | 'oneeye' | 'tamer')}
              className={clsx(
                'rounded-full p-1 transition border-2',
                selected === key
                  ? 'border-purple-500 bg-purple-800/30'
                  : 'border-transparent hover:border-purple-300'
              )}
            >
              <Image
                src={data.badge}
                alt={`${data.label} Badge`}
                width={64}
                height={64}
                className="w-32 h-32 object-contain"
              />
            </button>
          ))}
        </div>

        {/* Right: Character Box */}
        <div className="flex flex-col items-center gap-6 text-white text-center flex-1 w-full">
          {/* Fixed-size image card */}
          <div className="relative w-full h-[500px] bg-white/5 border border-white/10 rounded-lg shadow-lg overflow-hidden mx-auto">
            <Image
              src={current.image}
              alt={`${current.label} Characters`}
              fill
              className="object-contain p-6"
            />
          </div>

          {/* Character Title */}
          <h3 className="text-4xl font-semibold text-white">{current.label}</h3>

          {/* Description */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm text-white text-sm lg:text-base p-6 rounded-lg w-full h-[100px] shadow-inner ">
            {current.description}
          </div>
        </div>
      </div>
    </section>
  )
}
