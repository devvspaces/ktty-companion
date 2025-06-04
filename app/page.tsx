'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'
import MemeCarousel from '@/components/MemeCarousel'
import Image from 'next/image'
import Link from 'next/link'

const CONTRACT = 'ANQRL7bK8dXLRqfjzTvEyjb1bJvJRBamFGkgAndkpump'

export default function Home() {
  const [copied, setCopied] = useState(false)
 const [promptInput, setPromptInput] = useState({
  theme: '',
  style: '',
  brand: '',
  color: '',
  pattern: ''
})

  const letters = '$TURT'.split('')

  const rainbow = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#ee82ee']

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handlePromptSubmit = () => {
    const encoded = encodeURIComponent(`Create a portrait of a turtle wearing a ${promptInput} turtleneck sweater, centered with a neutral background and realistic lighting.`)
    window.open(`https://chat.openai.com/chat?message=${encoded}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 text-white flex flex-col items-center pb-32">
      {/* Nav */}
      <div className="w-full flex justify-between items-center px-6 py-4 fixed top-0 z-50 bg-black/80 backdrop-blur border-b border-neutral-800">
        <div className="text-2xl font-extrabold flex items-center space-x-2 text-white">
          <span>$TURT</span>
        </div>
       <div className="space-x-3 text-sm font-semibold flex items-center">
  <a
    href="https://x.com/Turtmeme"
    className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition text-base"
  >
    X
  </a>
  <a
    href="https://dexscreener.com/solana"
    className="px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-white/90 transition text-base"
  >
    Chart
  </a>
  <a
    href="https://photon-sol.tinyastro.io/en/memescope"
    className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold flex items-center gap-2 hover:opacity-90 transition text-base"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
    Buy Now
  </a>
</div>

      </div>

      <div className="h-20" />

      {/* Main Title */}
      <motion.div className="flex space-x-4 mt-16 text-[8rem] font-black"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3],
              color: rainbow
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: i * 0.2
            }}
            style={{
              textShadow: rainbow.map(c => `0 0 25px ${c}`).join(', ')
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle */}
      <p className="text-white text-2xl mt-2 drop-shadow-lg">Turtle Wif Turtleneck</p>

      {/* Slideshow */}
      <MemeCarousel />

      {/* Contract Box */}
    <div className="mt-12 w-full max-w-xl bg-white/5 backdrop-blur border border-white/20 rounded-xl p-6 text-left shadow-md">
  <label className="block text-white/80 font-semibold text-sm mb-2">Contract Address:</label>
  <div className="flex justify-between items-center bg-white/10 px-4 py-3 rounded-lg text-yellow-300 font-mono text-sm break-all">
    <span>{CONTRACT}</span>
    <button onClick={handleCopy} className="text-white hover:text-green-400 ml-3">
      <Copy className="w-4 h-4" />
    </button>
  </div>
  {copied && <p className="text-green-400 text-xs mt-2">Copied to clipboard!</p>}
</div>


      {/* Roadmap Section */}
      <section className="mt-32 text-center">
        <motion.h2
          className="text-[4rem] font-bold mb-10 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['R', 'O', 'A', 'D', 'M', 'A', 'P'].map((char, i) => (
            <motion.span
              key={i}
              animate={{ color: rainbow, scale: [1, 1.1, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.2
              }}
              style={{
                textShadow: rainbow.map(c => `0 0 20px ${c}`).join(', ')
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {[
            { label: 'Phase 1: Turtle', img: 'Duoturt.png' },
            { label: 'Phase 2: Turtleneck', img: 'Redturt.png' },
            { label: 'Phase 3: Turtle Wif Turtleneck', img: 'Rainbowturt.png' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <Image
                src={`/assets/slideshow/${item.img}`}
                alt={item.label}
                width={300}
                height={300}
                className="rounded-xl border shadow"
              />
              <p className="mt-4 text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prompt Section */}
    <section className="mt-32 text-center px-4 w-full">
  <motion.h2
    className="text-[4rem] font-bold mb-10 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    {'PROMPT'.split('').map((char, i) => (
      <motion.span
        key={i}
        animate={{ color: rainbow, scale: [1, 1.15, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: 'loop',
          delay: i * 0.15
        }}
        style={{
          textShadow: rainbow.map(c => `0 0 20px ${c}`).join(', ')
        }}
      >
        {char}
      </motion.span>
    ))}
  </motion.h2>

  <div className="bg-white/10 border border-white/20 rounded-xl p-8 max-w-5xl mx-auto space-y-8 text-left text-base font-sans">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input placeholder="Theme (e.g. cosmic, seaweed)" className="p-4 rounded bg-black/60 border border-white/20 text-white placeholder:text-white/40 text-lg"
        onChange={e => setPromptInput(prev => ({ ...prev, theme: e.target.value }))} />
      <input placeholder="Style (e.g. vintage, cartoon)" className="p-4 rounded bg-black/60 border border-white/20 text-white placeholder:text-white/40 text-lg"
        onChange={e => setPromptInput(prev => ({ ...prev, style: e.target.value }))} />
      <input placeholder="Brand (e.g. Gucci, Solana)" className="p-4 rounded bg-black/60 border border-white/20 text-white placeholder:text-white/40 text-lg"
        onChange={e => setPromptInput(prev => ({ ...prev, brand: e.target.value }))} />
      <input placeholder="Color (e.g. red, rainbow)" className="p-4 rounded bg-black/60 border border-white/20 text-white placeholder:text-white/40 text-lg"
        onChange={e => setPromptInput(prev => ({ ...prev, color: e.target.value }))} />
      <input placeholder="Pattern (e.g. checker, starburst)" className="p-4 rounded bg-black/60 border border-white/20 text-white placeholder:text-white/40 text-lg"
        onChange={e => setPromptInput(prev => ({ ...prev, pattern: e.target.value }))} />
    </div>

    {/* Prompt Preview */}
    <div className="text-base bg-black/40 p-6 rounded text-white border border-white/10 leading-relaxed">
      <p className="font-semibold mb-2">Generated Prompt:</p>
      <p>
        Create a close-up portrait of a turtle wearing a turtleneck sweater. The turtle should be centered, facing forward with a neutral expression. The background should be soft beige. The turtleneck can include elements like <span className="text-green-400">{promptInput.theme || '...'}</span> theme, <span className="text-green-400">{promptInput.style || '...'}</span> style, <span className="text-green-400">{promptInput.brand || '...'}</span> branding, <span className="text-green-400">{promptInput.color || '...'}</span> color, or <span className="text-green-400">{promptInput.pattern || '...'}</span> pattern. Style should remain realistic, warm-lit, and soft-focused.
      </p>
    </div>

    <button
      onClick={() => {
        const prompt = `Create a close-up portrait of a turtle wearing a turtleneck sweater. The turtle should be centered, facing forward with a neutral expression. The background should be soft beige. The turtleneck can include elements like ${promptInput.theme || ''} theme, ${promptInput.style || ''} style, ${promptInput.brand || ''} branding, ${promptInput.color || ''} color, or ${promptInput.pattern || ''} pattern. Style should remain realistic, warm-lit, and soft-focused.`
        const encoded = encodeURIComponent(prompt)
        window.open(`https://chat.openai.com/chat?message=${encoded}`, '_blank')
      }}
      className="bg-green-500 hover:bg-green-600 text-black text-lg font-bold px-6 py-3 rounded transition"
    >
      Launch ChatGPT with Your Prompt
    </button>
  </div>
</section>


    </div>
  )
}
