'use client'

import Image from 'next/image'

export default function HeroBanner() {
  return (
    <div className="relative left-0 right-0 w-screen h-[calc(100vh-80px)] max-h-[1080px] overflow-hidden">
      <Image
        src="/images/hero/banner.png"
        alt="KTTY World Banner"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Centered logo overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/kttywrldlogo.png"
          alt="KTTY World Logo"
          width={600}
          height={600}
          className="drop-shadow-2xl"
        />
      </div>
    </div>
  )
}
