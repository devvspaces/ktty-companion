"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { Reward } from "@/lib/reward";
import { useState } from "react";
import SummonOptionsModal from "./SummonOptionsModal";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ease: "easeOut", duration: 0.4 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// 🔹 Gradient for main KTTY Family types
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

// 🔹 Gradient animation for minor item borders
const getItemGradient = (name: string) => {
  if (name.includes("Prismatic") || name.includes("Golden Ticket"))
    return "linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff)";
  if (name.includes("Advanced"))
    return "linear-gradient(90deg, #fff7b0, #ffd700, #fff7b0)";
  return "linear-gradient(90deg, #ffffff, #d9d9d9, #f8f8f8)";
};

export default function RewardGridMobile({
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

  const kttyRewards = rewards;
  const isTenPull = rewards.length === 10;
  const rows = isTenPull ? [3, 4, 3] : [2, 3];
  let kttyIndex = 0;

  const bookBadges: Record<string, string> = {
    ruby: "/images/badges/rubybadge.png",
    emerald: "/images/badges/emeraldbadge.png",
    amethyst: "/images/badges/amethystbadge.png",
    bsmith: "/images/badges/bsmithbadge.png",
    lucky: "/images/badges/luckybadge.png",
    oneeye: "/images/badges/oneeyebadge.png",
    corrupt: "/images/badges/corruptedbadge.png",
  };

  // Collect minor items and stack counts
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

  return (
    <div className="fixed inset-0 z-[999] flex flex-col text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024] p-6 sm:hidden">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your New KTTY Friends!
      </h2>

      {/* 🐾 KTTY Rewards */}
      <motion.div
        className={`flex flex-col items-center w-full ${
          isTenPull ? "gap-4" : "gap-6"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {rows.map((count, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-3 w-full">
            {Array.from({ length: count }).map(() => {
              const reward = kttyRewards[kttyIndex++];
              if (!reward) return null;

              const gradient = getFamilyGradient(reward.family);
              const displayName = `KTTY #${reward.id}`;

              return (
                <motion.div
                  key={reward.id}
                  className="relative rounded-lg p-[2px] flex flex-col items-center"
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
                  <div className="bg-black/60 rounded-lg flex flex-col items-center p-2 relative">
                    {/* Badge */}
                    {reward.book && bookBadges[reward.book] && (
                      <div className="absolute -top-2 -left-2 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center border border-white/40 shadow-md z-20">
                        <Image
                          src={bookBadges[reward.book]}
                          alt={`${reward.book} badge`}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                    )}
                    {/* Image */}
                    <div
                      className={`relative mb-2 ${
                        isTenPull ? "w-14 h-14" : "w-20 h-20"
                      }`}
                    >
                      <Image
                        src={reward.image}
                        alt={reward.name}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    <p className="text-xs font-bold text-center whitespace-nowrap">
                      {displayName}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>

      {/* ✨ Minor Rewards */}
      <div className="w-full mt-5 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Other Rewards
        </h3>
        <div
          className={`overflow-y-auto ${
            isTenPull ? "h-[10.5rem]" : "h-[12.5rem]"
          }`}
        >
          <motion.div
            className="grid grid-cols-5 gap-2 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Object.values(minorItems).map((item, idx) => {
              const gradient = getItemGradient(item.name);

              return (
                <motion.div
                  key={idx}
                  className="relative rounded-lg p-[2px]"
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
                  <div className="bg-black/60 rounded-lg overflow-hidden flex items-center justify-center w-12 h-12">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  {item.count > 1 && (
                    <span className="absolute bottom-0 right-0 text-[10px] font-bold bg-black/70 px-1 rounded-tl-md text-yellow-300">
                      x{item.count}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={onBack}
          className="flex-1 mx-2 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Back
        </button>
        {availableBooks === 0 ? (
          <button
            onClick={() => (window.location.href = "/#mint")}
            className="flex-1 mx-2 py-2 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-500"
          >
            Mint Books
          </button>
        ) : (
          <button
            onClick={() => setShowOptions(true)}
            className="flex-1 mx-2 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
          >
            Summon Again
          </button>
        )}
      </div>

      {/* Summon Options */}
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
