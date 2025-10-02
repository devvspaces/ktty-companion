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

  const rarityGlow: Record<string, { border: string; shadow: string }> = {
    Standard: {
      border: "#cd7f32",
      shadow: "0 0 12px #cd7f32, 0 0 24px #b87333",
    },
    Advanced: {
      border: "#C0C0C0",
      shadow: "0 0 12px #C0C0C0, 0 0 24px #A9A9A9",
    },
    Prismatic: {
      border: "#FFD700",
      shadow: "0 0 12px #FFD700, 0 0 24px #FFA500",
    },
  };
  const getRarityStyle = (name: string) =>
    name.includes("Prismatic")
      ? rarityGlow.Prismatic
      : name.includes("Advanced")
        ? rarityGlow.Advanced
        : rarityGlow.Standard;

  return (
    <div className="fixed inset-0 z-[999] flex flex-col text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024] p-6 sm:hidden">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your New KTTY Friends!
      </h2>

      {/* KTTY rewards */}
      <motion.div
        className="flex flex-col gap-6 items-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {rows.map((count, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-3 w-full">
            {Array.from({ length: count }).map(() => {
              const reward = kttyRewards[kttyIndex++];
              if (!reward) return null;
              const glow = reward.borderColor || "#a855f7";

              return (
                <motion.div
                  key={reward.id}
                  className="relative bg-black/40 rounded-lg p-2 flex flex-col items-center"
                  style={{
                    border: `2px solid ${glow}`,
                    boxShadow: `0 0 12px ${glow}, 0 0 24px ${glow}`,
                  }}
                  variants={cardVariants}
                >
                  {reward.book && bookBadges[reward.book] && (
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center border border-white/40 shadow-md z-20">
                      <Image
                        src={bookBadges[reward.book]}
                        alt={`${reward.book} badge`}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div
                    className={`relative mb-2 ${isTenPull ? "w-16 h-16" : "w-20 h-20"}`}
                  >
                    <Image
                      src={reward.image}
                      alt={reward.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <p className="text-xs font-bold text-center whitespace-nowrap">
                    {reward.name} #{reward.id}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>

      {/* Minor rewards */}
      <div className="w-full mt-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Other Rewards
        </h3>
        <div className="overflow-y-auto h-40">
          <motion.div
            className="grid grid-cols-5 gap-2 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Object.values(minorItems).map((item, idx) => {
              const { border, shadow } = getRarityStyle(item.name);
              return (
                <motion.div
                  key={idx}
                  className="bg-black/40 rounded-lg relative"
                  style={{ border: `2px solid ${border}`, boxShadow: shadow }}
                  variants={cardVariants}
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded"
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
