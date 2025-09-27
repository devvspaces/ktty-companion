"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

import MintSection from "@/components/MintSection";
import InfoSection from "@/components/InfoSection";

const steps = [
  {
    key: "ron",
    title: "Purchase RON",
    description:
      "You’ll need RON tokens to participate in the mint. Get RON from a supported exchange or bridge, then fund your wallet.",
    image: "/images/howto/howto1.png",
  },
  {
    key: "books",
    title: "Mint Books",
    description:
      "Mint your KTTY Summoning Books during the live sale rounds. Each book is your ticket to bringing your KTTY into the world.",
    image: "/images/howto/howto2.png",
  },
  {
    key: "summon",
    title: "Summon KTTYs",
    description:
      "Use your Summoning Books to summon your magical KTTY companion and begin your journey in the world of Felysia.",
    image: "/images/howto/howto3.png",
  },
];

export default function NewsPage() {
  const [openStep, setOpenStep] = useState<string | null>(steps[0].key);
  const [activeHighlight, setActiveHighlight] = useState(0);

  // Cycle highlight between steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % steps.length);
    }, 2000); // 2s per step
    return () => clearInterval(interval);
  }, []);

  const expandVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

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

      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto mb-8 mt-8 md:mb-12">
        <h2 className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-8">
          KTTY Companion Mint
        </h2>
        <p className="text-gray-300 text-base md:text-xl leading-relaxed">
          KTTY’s are fragments of our souls — magical reflections of who we are,
          good or bad. It’s time to summon yours and begin your journey into the
          world of Felysia!
        </p>
      </div>

      {/* How it Works */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          How it Works
        </h2>
      </div>

      {/* Step Illustration Row */}
      <div className="flex justify-center gap-6 sm:gap-10 mb-10">
        {steps.map((step, idx) => (
          <motion.div
            key={step.key}
            animate={{
              boxShadow:
                activeHighlight === idx
                  ? "0 0 24px rgba(192,192,192,0.7), 0 0 36px rgba(192,192,192,0.5)"
                  : "0 0 6px rgba(255,255,255,0.1)",
              borderColor:
                activeHighlight === idx ? "#C0C0C0" : "rgba(255,255,255,0.2)",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="
              relative 
              w-24 aspect-square 
              sm:w-36 sm:aspect-square
              md:w-48 md:aspect-square
              lg:w-56 lg:aspect-square
              rounded-md overflow-hidden 
              flex items-center justify-center 
              bg-white/5
            "
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        ))}
      </div>

      {/* Collapsible Steps */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {steps.map((step) => {
          const isOpen = openStep === step.key;

          return (
            <div
              key={step.key}
              className="bg-black/30 border border-white/20 rounded-lg overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => setOpenStep(isOpen ? null : step.key)}
                className="w-full px-4 md:px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg md:text-xl font-semibold text-white">
                  {step.title}
                </span>
                <span className="text-gray-400 text-xl">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`${step.key}-content`}
                    variants={expandVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="px-4 md:px-6 pb-6"
                  >
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center md:text-left">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Mint + Info */}
      <div className="mt-2 md:mt-4">
        <MintSection />
      </div>
      <div className="mt-2 md:mt-4">
        <InfoSection />
      </div>
    </div>
  );
}
