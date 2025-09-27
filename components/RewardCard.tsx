"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Reward } from "@/lib/reward";

// 🔹 Aurora gradient settings
const auroraSettings = {
  voidPurple: {
    from: "#8B5CF6", // violet-500
    via: "#6D28D9", // violet-700
    to: "#8B5CF6",
  },
  gold: {
    from: "#FACC15", // yellow-400
    via: "#FBBF24", // amber-400
    to: "#FACC15",
  },
};

export default function RewardCard({
  reward,
  onBack,
  onSummonAgain,
  mode = "single",
  onNext,
  isLast = false,
  onSkipToGrid,
}: {
  reward: Reward;
  onBack: () => void;
  onSummonAgain: () => void;
  mode?: "single" | "multi";
  onNext?: () => void;
  isLast?: boolean;
  onSkipToGrid?: () => void;
}) {
  const glow = reward.borderColor || "#3b82f6"; // fallback glow
  const [isLoaded, setIsLoaded] = useState(false);

  // Pick gradient colors based on breed
  const getGradient = () => {
    if (reward.breed === "Null KTTY") {
      return `${auroraSettings.voidPurple.from}, ${auroraSettings.voidPurple.via}, ${auroraSettings.voidPurple.to}`;
    }
    if (reward.breed === "1 of 1 KTTY") {
      return `${auroraSettings.gold.from}, ${auroraSettings.gold.via}, ${auroraSettings.gold.to}`;
    }
    return "white, white";
  };

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-between text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024]">
      {/* Skip button for multi-pulls */}
      {mode === "multi" && onSkipToGrid && (
        <button
          onClick={onSkipToGrid}
          className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition cursor-pointer"
        >
          Skip &gt;
        </button>
      )}

      {/* Animated reward transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={reward.id}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center flex-1 px-4 md:flex-row md:gap-16 lg:gap-24 w-full"
        >
          {/* Reward image container */}
          <div
            className="relative mb-6 md:mb-0 rounded-lg border-4 w-40 h-40 md:w-80 md:h-80 lg:w-[32rem] lg:h-[32rem]"
            style={{
              borderColor: glow,
              boxShadow: `0 0 20px ${glow}, 0 0 40px ${glow}`,
            }}
          >
            {/* Spinner overlay */}
            <AnimatePresence>
              {!isLoaded && (
                <motion.div
                  key="spinner"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reward image */}
            <Image
              src={reward.image}
              alt={reward.name}
              fill
              className="object-contain rounded-lg"
              onLoad={() => setIsLoaded(true)}
            />
          </div>

          {/* Reward details */}
          <div className="flex flex-col items-center text-center">
            {/* Animated Name */}
            <motion.h2
              initial={{ backgroundPosition: "200% 50%" }}
              animate={{ backgroundPosition: ["200% 50%", "-200% 50%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="text-5xl md:text-4xl lg:text-7xl font-bold mb-4 md:mb-6 lg:mb-10
                         bg-clip-text text-transparent bg-[length:200%_200%]"
              style={{
                backgroundImage: `linear-gradient(90deg, ${getGradient()})`,
              }}
            >
              {reward.name}
            </motion.h2>

            {/* Family */}
            <p className="text-xl md:text-xl lg:text-4xl mb-2 md:mb-6 lg:mb-6">
              Family: {reward.family}
            </p>

            {/* Animated Breed */}
            <motion.p
              initial={{ backgroundPosition: "200% 50%" }}
              animate={{ backgroundPosition: ["200% 50%", "-200% 50%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="text-xl md:text-xl lg:text-4xl mb-2 md:mb-6 lg:mb-6 
                         font-extrabold bg-clip-text text-transparent 
                         bg-[length:200%_200%]"
              style={{
                backgroundImage: `linear-gradient(90deg, ${getGradient()})`,
              }}
            >
              Breed: {reward.breed}
            </motion.p>

            {/* Other stats */}
            <p className="text-xl md:text-xl lg:text-4xl mb-2 md:mb-6 lg:mb-6">
              Identity: {reward.identity}
            </p>
            <p className="text-xl md:text-xl lg:text-4xl mb-6 md:mb-10 lg:mb-12">
              Expression: {reward.expression}
            </p>

            {/* Minor items */}
            <div className="flex justify-center md:justify-start gap-6 mb-10">
              {reward.items.slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 mb-6 rounded-lg border-2 border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.9)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <span className="text-md md:text-base lg:text-lg text-center break-words max-w-[6rem]">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="w-full flex justify-center pb-8 px-4">
        {mode === "single" ? (
          <div className="flex flex-row gap-4 w-full max-w-md">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500 transition text-sm md:text-lg"
            >
              Back
            </button>
            <button
              onClick={onSummonAgain}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500 transition text-sm md:text-lg"
            >
              Summon Again
            </button>
          </div>
        ) : (
          <button
            onClick={onNext}
            className="mx-auto px-8 py-3 md:px-10 md:py-4 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500 transition text-base md:text-lg"
          >
            {isLast ? "See All" : "Next >"}
          </button>
        )}
      </div>
    </div>
  );
}
