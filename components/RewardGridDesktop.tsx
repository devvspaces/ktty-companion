"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import type { Reward } from "@/lib/reward";
import SummonOptionsModal from "./SummonOptionsModal";

// 🔹 Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ease: "easeOut", duration: 0.35 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// 🔹 Family gradient system for main KTTYs
const getFamilyGradient = (family?: string) => {
  switch (family) {
    case "1 of 1 KTTY":
      return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
    case "Null KTTY":
      return "linear-gradient(90deg, #3b0764, #7e22ce, #6d28d9, #3b0764)";
    case "Core KTTY":
      return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
    default:
      return "linear-gradient(90deg, #ffffff, #d9d9d9)";
  }
};

// 🔹 Gradient system for minor rewards (tools/tickets)
const getItemGradient = (name: string) => {
  if (name.includes("Prismatic") || name.includes("Golden Ticket"))
    return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
  if (name.includes("Advanced"))
    return "linear-gradient(90deg, #fff7b0, #ffd700, #fff7b0)";
  return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
};

export default function RewardGridDesktop({
  rewards,
  availableBooks,
  onBack,
  onSummonWithAmount,
}: {
  rewards: Reward[];
  availableBooks: number;
  onBack: () => void;
  onSummonWithAmount: (count: number) => void;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const isTenPull = rewards.length === 10;

  // 🔹 Badge mapping
  const bookBadges: Record<string, string> = {
    ruby: "/images/badges/rubybadge.png",
    emerald: "/images/badges/emeraldbadge.png",
    amethyst: "/images/badges/amethystbadge.png",
    bsmith: "/images/badges/bsmithbadge.png",
    lucky: "/images/badges/luckybadge.png",
    oneeye: "/images/badges/oneeyebadge.png",
    corrupt: "/images/badges/corruptedbadge.png",
  };

  // 🔹 Split KTTYs & collect minor rewards
  const kttyRewards = rewards;
  const minorItems: Record<
    string,
    { name: string; image: string; count: number }
  > = {};
  rewards.forEach((r) =>
    r.items.forEach((item) => {
      const key = `${item.name}-${item.image}`;
      if (!minorItems[key]) minorItems[key] = { ...item, count: 0 };
      minorItems[key].count++;
    })
  );

  // 🔹 Grid layout for KTTYs
  const rows = isTenPull ? [5, 5] : [5];
  let kttyIndex = 0;

  // 🔹 Animated minor reward card
  function renderRewardCard(item: any, idx: number) {
    const gradient = getItemGradient(item.name);
    return (
      <motion.div
        key={idx}
        className="relative rounded-lg p-[3px] flex items-center justify-center"
        style={{
          background: gradient,
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
        variants={cardVariants}
      >
        <div className="bg-black/60 rounded-lg overflow-hidden flex items-center justify-center w-20 h-20">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        {item.count > 1 && (
          <span className="absolute top-1 right-1 text-[11px] font-bold bg-black/70 px-1.5 py-0.5 rounded-md text-yellow-300">
            x{item.count}
          </span>
        )}
      </motion.div>
    );
  }

  // 🔹 Animated KTTY reward card
  function renderKTTYReward(reward: any) {
    const gradient = getFamilyGradient(reward.family);
    return (
      <motion.div
        key={reward.id}
        className="relative rounded-2xl p-[3px] flex flex-col items-center justify-center"
        style={{
          background: gradient,
          backgroundSize: "300% 300%",
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
        variants={cardVariants}
      >
        <div className="bg-black/60 rounded-2xl flex flex-col items-center justify-center p-3">
          {reward.book && bookBadges[reward.book] && (
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center border border-white/40 shadow-md z-20">
              <Image
                src={bookBadges[reward.book]}
                alt={`${reward.book} badge`}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          )}
          <div
            className={`relative mb-3 ${
              isTenPull
                ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                : "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
            }`}
          >
            <Image
              src={reward.image}
              alt={reward.name}
              fill
              className="object-contain rounded-2xl"
            />
          </div>
          <p className="text-sm md:text-base font-bold text-center whitespace-nowrap">
            {`KTTY #${reward.id}`}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="hidden sm:flex fixed inset-0 z-[999] flex-col text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024] p-6">
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
        Your New KTTY Friends!
      </h2>

      {/* 🐾 KTTY Rewards */}
      <motion.div
        className="flex flex-col gap-8 mt-4 items-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {rows.map((count, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-6 w-full">
            {Array.from({ length: count }).map(() => {
              const reward = kttyRewards[kttyIndex++];
              if (!reward) return null;
              return renderKTTYReward(reward);
            })}
          </div>
        ))}
      </motion.div>

      {/* ✨ Minor Rewards */}
      <div
        className={`w-full ${isTenPull ? "mt-14" : "mt-8"} flex-1 flex flex-col`}
      >
        <h3 className="text-5xl font-semibold text-center mb-8">
          Other Rewards
        </h3>

        <div
          className={`${isTenPull ? "h-[150px]" : "h-[200px]"} flex justify-center`}
        >
          <motion.div
            className={`grid gap-4 justify-items-center ${
              isTenPull ? "grid-cols-8" : "grid-cols-6"
            }`}
            style={{
              maxWidth: isTenPull ? "calc(8 * 90px)" : "calc(6 * 90px)",
              margin: "0 auto",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Object.values(minorItems)
              .slice(0, isTenPull ? 16 : 18)
              .map((item, idx) => renderRewardCard(item, idx))}
          </motion.div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full max-w-[52rem] mt-8 mx-auto px-0">
        <button
          onClick={onBack}
          className="flex-1 mx-2 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Back
        </button>
        {availableBooks === 0 ? (
          <button
            onClick={() => (window.location.href = "/#mint")}
            className="flex-1 mx-2 py-3 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-500"
          >
            Mint Books
          </button>
        ) : (
          <button
            onClick={() => setShowOptions(true)}
            className="flex-1 mx-2 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
          >
            Summon Again
          </button>
        )}
      </div>

      {/* Summon Options Modal */}
      <SummonOptionsModal
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        availableBooks={availableBooks}
        onSelect={(amt) => {
          setShowOptions(false);
          onSummonWithAmount(amt);
        }}
      />
    </div>
  );
}
