"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
      <div className="text-center max-w-3xl mx-auto mb-8 mt-8 md:mb-12">
        <h2 className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-8">
          KTTY Companion Mint
        </h2>
        <p className="text-gray-300 text-base md:text-xl leading-relaxed">
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

      {/* Responsive Boxes + Animated Arrows */}
      <div className="grid grid-cols-2 gap-6 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-8 relative">
        {/* Box 1 */}
        <div className="bg-white/10 w-28 h-28 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center rounded-md border border-white/20 overflow-hidden relative z-10">
          <Image
            src="/images/howto/howto1.png"
            alt="How-To Step 1"
            className="object-contain w-full h-full"
            width={320}
            height={320}
            priority
          />
        </div>

        {/* Arrow from 1 → 2 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="hidden sm:flex items-center justify-center text-white"
        >
          <svg
            className="w-10 h-10 text-white/70"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-6-6l6 6-6 6"
            />
          </svg>
        </motion.div>

        {/* Box 2 */}
        <div className="bg-white/10 w-28 h-28 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center rounded-md border border-white/20 overflow-hidden relative z-10">
          <Image
            src="/images/howto/howto2.png"
            alt="How-To Step 2"
            className="object-contain w-full h-full"
            width={320}
            height={320}
            priority
          />
        </div>

        {/* Arrow from 2 → 3 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="hidden sm:flex items-center justify-center text-white"
        >
          <svg
            className="w-10 h-10 text-white/70"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-6-6l6 6-6 6"
            />
          </svg>
        </motion.div>

        {/* Box 3 */}
        <div className="col-span-2 bg-white/10 w-28 h-28 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center rounded-md border border-white/20 overflow-hidden sm:col-span-1 relative z-10">
          <Image
            src="/images/howto/howto3.png"
            alt="How-To Step 3"
            className="object-contain w-full h-full"
            width={320}
            height={320}
            priority
          />
        </div>
      </div>

      <MintSection />
      <InfoSection />
    </div>
  );
}
