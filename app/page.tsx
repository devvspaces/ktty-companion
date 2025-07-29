'use client'

import HeroBanner from '@/components/Hero/HeroBanner'
import NewsSlider from '@/components/News/NewsSlider'
import Image from 'next/image'
import CharactersSection from '@/components/Sections/CharactersSection'
import TamerMissionsSection from '@/components/Sections/TamerMissionsSection'
import RoadmapSection from '@/components/Sections/RoadmapSection'
import TeamSection from '@/components/Sections/TeamSection'
import Footer from '@/components/Sections/Footer'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Full-width Hero */}
      <HeroBanner />

      {/* Main content area */}
      <section className="pt-16 pb-20 px-4 md:px-12 lg:px-20 text-foreground space-y-20">
        
        {/* News Slider */}
        <div>
          <h2 className="text-xl font-bold text-lavender mb-4">Latest News</h2>
          <div className="w-full">
            <NewsSlider />
          </div>
        </div>

   {/* Story Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full min-h-[520px] lg:min-h-[680px]">
  {/* Text with Card Background */}
  <div className="flex flex-col justify-center text-center bg-white/5 backdrop-blur-md border border-white/10 shadow-inner px-4 py-8 lg:px-12 lg:py-16 w-full h-full">
    <h1 className="text-8xl sm:text-6xl font-bold text-lavender mb-10">Story</h1>

    <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
      Imagine waking in a land where every color feels alive and rivers hum in harmony and moonlit trees sparkle like constellations.
    </p>
    <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
      In Felysia, the cat-like KTTYs are more than companions; each one mirrors a fragment of your own spirit, growing stronger as your bond deepens.
    </p>
    <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
      But two forces are shaping that bond: a bright call to explore, create, and connect… and a shadow that insists feeling itself is a flaw.
    </p>

    <p className="text-lg sm:text-4xl lg:text-6xl font-bold text-white mb-6">
      Welcome to KTTY World.
    </p>

    {/* Read More Button */}
    <div className="w-full flex justify-center">
  <div className="w-full max-w-lg">
    <Link href="/story" passHref>
      <button className="w-full text-2xl px-6 py-5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition">
        Read More
      </button>
    </Link>
  </div>
</div>

  </div>

  {/* Image */}
  <div className="w-full h-full">
    <Image
      src="/cecilliasdiary.png?v=2"
      alt="Cecillia's Diary"
      width={960}
      height={720}
      className="w-full h-full object-cover rounded-lg border border-white/10 shadow-lg"
    />
  </div>
</div>



 {/* Characters Section */}
        <CharactersSection />

 {/* Enter Felysia Section */}
<section className="w-full px-6 sm:py-4 lg:py-10 text-center">
  <h2 className="text-4xl sm:text-7xl lg:text-8xl font-bold text-white mb-10">Enter Felysia</h2>

  {/* Top Video */}
  <div className="w-full max-w-6xl mx-auto rounded-lg overflow-hidden mb-10">
    <video
      src="/videos/felysia.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-auto rounded-lg border border-white/10 shadow-lg"
    />
  </div>

  {/* Text + Side Video */}
  <div className="grid pr-15 grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-center text-center">
    {/* Text */}
    <div className="text-white text-2xl leading-relaxed space-y-6">
      <h2 className="text-5xl font-bold text-white">3D Action RPG Pet Game</h2>

      <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
        KTTY World is designed as an open, immersive 3D world, inviting players to explore the vast and ever-evolving landscape of Felysia. Our vision is to create a world that feels alive, interactive, and rewarding to explore, offering both structured adventures and open-ended discovery.
      </p>
      <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
        Battle, Hunt, Explore, Collect throughout the land of Felysia as you delve into the secrets of the KTTYs!
      </p>

      <div className="w-full flex justify-center">
        <a
    href="https://ktty-world.gitbook.io/ktty-world/game/core-gameplay-loop"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full px-6 py-4 text-2xl font-bold text-white bg-white/10 rounded-xl shadow hover:bg-white/20  transition text-center"
  >
    Learn More
  </a>
      </div>
    </div>

    {/* Side Video */}
    <div className="w-full rounded-lg overflow-hidden border border-white/10 shadow-lg">
      <video
        src="/videos/tamer.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto object-cover"
      />
    </div>
  </div>
</section>

{/* NFTs Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full min-h-[520px] lg:min-h-[680px]">
  {/* GIF Image */}
  <div className="w-full h-full flex items-center justify-center p-6">
    <Image
      src="/tamers.gif"
      alt="Tamers Animation"
      width={600}
      height={600}
      className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-lg"
    />
  </div>

  {/* Text with Card Background */}
  <div className="flex flex-col justify-center text-center shadow-inner px-4 py-8 lg:px-12 lg:py-16 w-full h-full">
    <h1 className="text-8xl sm:text-6xl font-bold text-lavender mb-10">KTTY Tamer NFTs</h1>

    <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
      Our first collection of 6,666 KTTY Tamers are your entry point into the KTTY World Ecosystem
    </p>
    <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
      In our world, the tamer is a chosen individual with the rare ability to draw out the true power of KTTYs.
    </p>
    <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
    With over 200+ Unique Traits,  In Game Utility and the ability to earn rewards by sending them on missions if you aim to explore Felysia, your first port of call is acquiring one today!
    </p>


  {/* Button Row */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full px-4">
  <a
    href="/tamers"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full px-6 py-4 text-2xl font-bold text-white bg-white/10 rounded-xl shadow hover:bg-white/20  transition text-center"
  >
    Rarity
  </a>
  <a
    href="/news/ktty-dev-blog-02"
    className="w-full px-6 py-4 text-2xl font-bold text-white bg-white/10 rounded-xl shadow hover:bg-white/20 transition text-center"
  >
    Read More
  </a>
  <a
    href="https://marketplace.roninchain.com/collections/0xcd36c37185f80f688a91a9a272c1bf35eb33c6be"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full px-6 py-4 text-2xl font-bold text-white bg-white/10  rounded-xl shadow hover:bg-white/20 transition text-center"
  >
    Marketplace
  </a>
</div>

  </div>
</div>

{/* Token Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full min-h-[520px] lg:min-h-[680px]">
   {/* Text with Card Background */}
  <div className="flex flex-col justify-center text-center shadow-inner px-4 sm:py-4 lg:px-12 lg:py-16 w-full h-full">
    <h1 className="text-8xl sm:text-6xl font-bold text-lavender mb-10">$KTTY</h1>

    <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
The $KTTY Token acts as the premium currency within the game world, offering Tamers access to a variety of cosmetic and quality-of-life upgrades without impacting game balance.    
</p>
 <p className="text-base lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4">
  From performing premium functions to NFT Minting discounts. $KTTY will be essential to the way you choose to play in our world.
</p>

  {/* Button Row */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full px-4">
  <a
    href="https://app.roninchain.com/swap?outputCurrency=0x95cc15e901e884ccbf5e4247e41af3c28b02191a"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full px-6 py-4 text-2xl font-bold text-white bg-white/10 rounded-xl shadow hover:bg-white/20 transition text-center"
  >
    Buy
  </a>
  <a
    href="/ktty"
    className="w-full px-6 py-4 text-2xl font-bold text-white bg-white/10  rounded-xl shadow hover:bg-white/20 transition text-center"
  >
    Tokenomics
  </a>
  <a
    href="https://marketplace.roninchain.com/collections/0xcd36c37185f80f688a91a9a272c1bf35eb33c6be"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full px-6 py-4 text-2xl font-bold text-white bg-white/10 rounded-xl shadow hover:bg-white/20 transition text-center"
  >
    Stake
  </a>
</div>

  </div>
 {/* Static KTTY Token Image */}
<div className="w-full h-full flex items-center justify-center p-6">
  <Image
    src="/kttytoken.png"
    alt="KTTY Token"
    width={600}
    height={600}
    className="max-w-full max-h-full object-contain shadow-lg"
  />
</div>
</div>

  {/* Tamer Missions Section */}
        <TamerMissionsSection />

  {/* Roadmap Section */}
        <RoadmapSection />

  {/* Team Section */}
        <TeamSection />

  
      </section>
      {/* Footer Section */}
        <Footer />
    </>
    
  )
}
