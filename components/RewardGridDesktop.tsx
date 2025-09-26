"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { Reward } from "@/lib/reward";

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

export default function RewardGridDesktop({
  rewards,
  onBack,
  onSummonAgain,
}: {
  rewards: Reward[];
  onBack: () => void;
  onSummonAgain: () => void;
}) {
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

  // 🔹 Split KTTYs & group minor rewards
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

  // 🔹 KTTY display rows
  const rows = isTenPull ? [5, 5] : [5];
  let kttyIndex = 0;

  // 🔹 Rarity glow styles
  const rarityGlow: Record<string, { border: string; shadow: string }> = {
    Standard: {
      border: "#cd7f32",
      shadow: "0 0 8px #cd7f32, 0 0 16px #b87333",
    },
    Advanced: {
      border: "#C0C0C0",
      shadow: "0 0 8px #C0C0C0, 0 0 16px #A9A9A9",
    },
    Prismatic: {
      border: "#FFD700",
      shadow: "0 0 8px #FFD700, 0 0 16px #FFA500",
    },
  };

  function getRarityStyle(name: string) {
    if (name.includes("Prismatic")) return rarityGlow.Prismatic;
    if (name.includes("Advanced")) return rarityGlow.Advanced;
    return rarityGlow.Standard;
  }

  // 🔹 Minor reward card
  function renderRewardCard(item: any, idx: number) {
    const { border, shadow } = getRarityStyle(item.name);
    return (
      <div key={idx} className="flex flex-col items-center">
        <motion.div
          className="bg-black/40 rounded-lg relative flex items-center justify-center"
          style={{
            border: `2px solid ${border}`,
            boxShadow: shadow,
            width: "80px",
            height: "80px",
          }}
          variants={cardVariants}
        >
          <div className="relative w-16 h-16">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          </div>
          {item.count > 1 && (
            <span className="absolute top-1 right-1 text-[10px] font-bold bg-black/70 px-1.5 py-0.5 rounded-md text-yellow-300">
              x{item.count}
            </span>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex fixed inset-0 z-[999] flex-col text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024] p-6">
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
        Your New KTTY Friends!
      </h2>

      {/* KTTY Rewards */}
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
              const glow = reward.borderColor || "#a855f7";

              return (
                <motion.div
                  key={reward.id}
                  className="relative bg-black/40 rounded-lg p-3 flex flex-col items-center"
                  style={{
                    border: `2px solid ${glow}`,
                    boxShadow: `0 0 12px ${glow}, 0 0 24px ${glow}`,
                  }}
                  variants={cardVariants}
                >
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
                      className="object-contain rounded"
                    />
                  </div>

                  <p className="text-sm md:text-base font-bold text-center whitespace-nowrap">
                    {reward.name} #{reward.id}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>

      {/* Minor Rewards */}
      <div
        className={`w-full ${isTenPull ? "mt-14" : "mt-8"} flex-1 flex flex-col`}
      >
        <h3 className={`text-5xl font-semibold text-center mb-8`}>
          Other Rewards
        </h3>

        <div
          className={`${isTenPull ? "h-[150px]" : "h-[200px]"} flex justify-center`}
        >
          <motion.div
            className={`grid gap-4 justify-items-center ${isTenPull ? "grid-cols-8" : "grid-cols-6"}`}
            style={{
              maxWidth: isTenPull ? "calc(8 * 90px)" : "calc(6 * 90px)",
              margin: "0 auto",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Object.values(minorItems)
              .slice(0, isTenPull ? 16 : 18) // adjust visible count
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
        <button
          onClick={onSummonAgain}
          className="flex-1 mx-2 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Summon Again
        </button>
      </div>
    </div>
  );
}
