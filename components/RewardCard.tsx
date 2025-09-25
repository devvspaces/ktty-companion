"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Reward } from "@/lib/reward"; // ✅ shared type

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
  const glow = reward.borderColor || "#a855f7";

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-between text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024]">
      {/* Skip button (multi-pull only) */}
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
          key={reward.id} // 👈 ensures smooth exit/enter per reward
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center flex-1 px-4 md:flex-row md:gap-16 lg:gap-24 w-full"
        >
          {/* Reward image */}
          <div
            className="relative mb-6 md:mb-0 rounded-lg border-4
                       w-40 h-40 md:w-80 md:h-80 lg:w-[32rem] lg:h-[32rem]"
            style={{
              borderColor: glow,
              boxShadow: `0 0 20px ${glow}, 0 0 40px ${glow}`,
            }}
          >
            <Image
              src={reward.image}
              alt={reward.name}
              fill
              className="object-contain rounded"
            />
          </div>

          {/* Reward details */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-4xl lg:text-7xl font-bold mb-4 md:mb-6 lg:mb-10">
              {reward.name}
            </h2>
            <p className="text-xl md:text-xl lg:text-4xl mb-2 md:mb-6 lg:mb-6">
              Family: {reward.family}
            </p>
            <p className="text-xl md:text-xl lg:text-4xl mb-2 md:mb-6 lg:mb-6">
              Breed: {reward.breed}
            </p>
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
