"use client";

import Image from "next/image";
import MintSection from "@/components/MintSection";
import InfoSection from "@/components/InfoSection";

export default function NewsPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-12 pt-28 md:pt-32 pb-10 text-foreground">
      {/* Banner */}
      <div className="w-full mb-8 md:mb-12 overflow-hidden rounded-xl">
        <Image
          src="/images/mint/compbnr.png"
          alt="News Banner"
          width={2048}
          height={512}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Intro Text */}
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
          KTTY’s are fragments of our souls. A magical representation of who we
          are, good or bad. It is time to summon yours now and take your next
          steps into the world of Felysia!
        </p>
      </div>

      {/* How it works */}
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          How it works
        </h2>
      </div>

      {/* Responsive Boxes */}
      <div className="grid grid-cols-2 gap-6 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-8">
        {/* Box 1 */}
        <div className="bg-white/10 w-full h-28 sm:w-40 sm:h-36 md:w-72 md:h-64 lg:w-96 lg:h-80 flex items-center justify-center rounded-md border border-white/20">
          <span className="text-xs sm:text-sm text-gray-400">
            Artwork Placeholder
          </span>
        </div>

        {/* Box 2 */}
        <div className="bg-white/10 w-full h-28 sm:w-40 sm:h-36 md:w-72 md:h-64 lg:w-96 lg:h-80 flex items-center justify-center rounded-md border border-white/20">
          <span className="text-xs sm:text-sm text-gray-400">
            Artwork Placeholder
          </span>
        </div>

        {/* Box 3 - spans both columns on mobile */}
        <div className="col-span-2 bg-white/10 w-full h-28 sm:w-40 sm:h-36 md:w-72 md:h-64 lg:w-96 lg:h-80 flex items-center justify-center rounded-md border border-white/20 sm:col-span-1">
          <span className="text-xs sm:text-sm text-gray-400">
            Artwork Placeholder
          </span>
        </div>
      </div>

      <MintSection />
      <InfoSection />
    </div>
  );
}
