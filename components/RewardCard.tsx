"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Reward } from "@/lib/reward";

// 🔹 Display shortened KTTY name
const getDisplayName = (fullName: string, id: string | number) => {
  const match = fullName.match(/#?(\d+)/);
  const idNumber = match ? match[1] : id;
  return `KTTY #${idNumber}`;
};

// 🔹 Gradient for main family border
const getFamilyGradient = (family?: string) => {
  switch (family) {
    case "Core KTTY":
      return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
    case "Null KTTY":
      return "linear-gradient(90deg, #3b0764, #7e22ce, #6d28d9, #3b0764)";
    case "1 of 1 KTTY":
      return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
    default:
      return "linear-gradient(90deg, #ffffff, #d9d9d9)";
  }
};

// 🔹 Gradient for animated text (same as before)
const getRarityGradient = (
  type: "Family" | "Breed" | "Identity" | "Expression",
  value: string
) => {
  switch (type) {
    case "Family":
      if (value === "1 of 1 KTTY")
        return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
      if (value === "Null KTTY")
        return "linear-gradient(90deg, #3b0764, #7e22ce, #6d28d9, #3b0764)";
      return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
    case "Breed":
      return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
    case "Identity": {
      const tier1 = ["Origin", "Abyss", "Catastrophe", "Infinity"];
      const tier2 = [
        "Anima",
        "Chronos",
        "Fury",
        "Tyrant",
        "Hollow",
        "Eclipse",
        "Illumia",
        "Glory",
      ];
      const tier3 = [
        "Dawn",
        "Aurora",
        "Dusk",
        "Shadow",
        "Fang",
        "Beast",
        "Elemental",
        "Celestial",
      ];
      if (tier1.includes(value))
        return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
      if (tier2.includes(value))
        return "linear-gradient(90deg, #fff7b0, #ffd700, #fff7b0)";
      if (tier3.includes(value))
        return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
      return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
    }
    case "Expression": {
      const specialist = [
        "Champion",
        "Absolute",
        "Clairvoyant",
        "Ascendant",
        "Singularity",
      ];
      if (specialist.includes(value))
        return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
      return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
    }
    default:
      return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
  }
};

// 🔹 Animated Value Renderer
const AnimatedValue = ({
  type,
  value,
}: {
  type: "Family" | "Breed" | "Identity" | "Expression";
  value: string;
}) => (
  <motion.span
    initial={{ backgroundPosition: "0% 50%" }}
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
    className="font-normal text-transparent bg-clip-text bg-[length:200%_200%]"
    style={{
      backgroundImage: getRarityGradient(type, value),
    }}
  >
    {value}
  </motion.span>
);

// 🔹 Animated border gradient for lesser rewards
const getItemGradient = (name: string) => {
  if (name.includes("Prismatic") || name.includes("Golden Ticket"))
    return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
  if (name.includes("Advanced"))
    return "linear-gradient(90deg, #fff7b0, #ffd700, #fff7b0)";
  return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
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
  const [isLoaded, setIsLoaded] = useState(false);

  const familyGlow =
    reward.family === "1 of 1 KTTY"
      ? "drop-shadow(0 0 25px rgba(255,255,255,0.6))"
      : reward.family === "Null KTTY"
        ? "drop-shadow(0 0 25px rgba(139,92,246,0.6))"
        : "drop-shadow(0 0 20px rgba(255,255,255,0.3))";

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-between text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024]">
      {/* Skip for multipulls */}
      {mode === "multi" && onSkipToGrid && (
        <button
          onClick={onSkipToGrid}
          className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition cursor-pointer"
        >
          Skip &gt;
        </button>
      )}

      {/* Core content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={reward.id}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center flex-1 px-4 md:flex-row md:gap-16 lg:gap-24 w-full"
        >
          {/* Main KTTY image */}
          <motion.div
            className="relative mb-6 md:mb-0 rounded-2xl p-[3px] w-40 h-40 md:w-80 md:h-80 lg:w-[32rem] lg:h-[32rem]"
            style={{
              background: getFamilyGradient(reward.family),
              backgroundSize: "300% 300%",
              filter: familyGlow,
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration:
                reward.family === "1 of 1 KTTY"
                  ? 3
                  : reward.family === "Null KTTY"
                    ? 6
                    : 8,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0a1d3b] flex items-center justify-center relative">
              {!isLoaded && (
                <motion.div
                  key="spinner"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 z-10"
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
              <Image
                src={reward.image}
                alt={reward.name}
                fill
                className="object-contain rounded-2xl"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          </motion.div>

          {/* Details */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-4xl lg:text-7xl font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {getDisplayName(reward.name, reward.id)}
            </h2>

            <div className="space-y-4 text-xl md:text-2xl lg:text-4xl">
              <p className="font-bold">
                Family: <AnimatedValue type="Family" value={reward.family} />
              </p>
              <p className="font-bold">
                Breed: <AnimatedValue type="Breed" value={reward.breed} />
              </p>
              <p className="font-bold">
                Identity:{" "}
                <AnimatedValue type="Identity" value={reward.identity} />
              </p>
              <p className="font-bold">
                Expression:{" "}
                <AnimatedValue type="Expression" value={reward.expression} />
              </p>
            </div>

            {/* 🔹 Lesser Rewards */}
            <div className="flex justify-center flex-wrap gap-6 mt-10 mb-10">
              {reward.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                  className="flex flex-col items-center"
                >
                  {/* Animated Gradient Border */}
                  <motion.div
                    className="relative w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 mb-6 rounded-lg p-[2px]"
                    style={{
                      background: getItemGradient(item.name),
                      backgroundSize: "300% 300%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    <div className="w-full h-full rounded-lg bg-[#0a1d3b] flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </motion.div>

                  <span className="text-md md:text-base lg:text-lg text-center break-words max-w-[6rem]">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer buttons */}
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
