'use client'

import Image from 'next/image'
import { FaTwitter, FaDiscord } from 'react-icons/fa'

export default function Footer() {
  return (
   <footer className="bg-black text-white py-10 px-6">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start gap-8 sm:gap-12 text-center sm:text-left">
    
    {/* Left Side */}
    <div className="flex flex-col gap-4 items-center sm:items-start max-w-md">
      <div className="relative w-32 h-12">
        <Image src="/kttywrldlogo.png" alt="KTTY World Logo" fill className="object-contain" />
      </div>
      <p className="text-gray-300 text-base leading-relaxed max-w-xs">
        A 3D Openworld Pet Collection adventure through the magical world of Felycia
      </p>
      <div className="flex gap-4 mt-2 justify-center sm:justify-start">
        <a href="https://twitter.com/kttyworld" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="w-6 h-6 hover:text-lavender transition" />
        </a>
        <a href="https://discord.gg/kttyworld" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="w-6 h-6 hover:text-lavender transition" />
        </a>
      </div>
    </div>

    {/* Right Side */}
    <div className="text-base text-gray-300 space-y-1 text-center sm:text-left">
      <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
      <p>Kttyworld Gaming Solutions Ltd</p>
      <p>Company No 16341943</p>
      <p>United Kingdom</p>
      <p>Elderbek, Cheshunt</p>
      <p>kttyworld@kttyworld.io</p>
    </div>
  </div>
</footer>
  )
}
