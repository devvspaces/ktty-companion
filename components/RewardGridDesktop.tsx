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
    transition: { ease: "easeOut", duration: 0.4 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
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
  const kttyRewards = rewards;

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

  // 🔹 Group minor rewards
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

  const isTenPull = rewards.length === 10;
  const rows = isTenPull ? [5, 5] : [5];
  let kttyIndex = 0;

  // 🔹 Rarity glow styles
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

  function getRarityStyle(name: string) {
    if (name.includes("Prismatic")) return rarityGlow.Prismatic;
    if (name.includes("Advanced")) return rarityGlow.Advanced;
    return rarityGlow.Standard;
  }

  // 🔹 Render card helper (minor rewards only)
  function renderRewardCard(item: any, idx: number) {
    const { border, shadow } = getRarityStyle(item.name);
    return (
      <div key={idx} className="flex flex-col items-center">
        <motion.div
          className="bg-black/40 rounded-lg relative flex items-center justify-center"
          style={{
            border: `2px solid ${border}`,
            boxShadow: shadow,
            width: "100px",
            height: "100px",
          }}
          variants={cardVariants}
        >
          <div className="relative w-24 h-24">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          </div>
          {item.count > 1 && (
            <span className="absolute top-1 right-1 text-xs font-bold bg-black/70 px-2 py-0.5 rounded-md text-yellow-300">
              x{item.count}
            </span>
          )}
        </motion.div>
        {/* ⛔ Removed item name text here */}
      </div>
    );
  }

  return (
    <div
      className="hidden sm:flex fixed inset-0 z-[999] flex-col text-white 
                 bg-gradient-to-b from-[#0a1d3b] to-[#091024] p-8 mb-10"
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-10 text-center">
        Your New KTTY Friends!
      </h2>

      {/* KTTY Rewards */}
      <motion.div
        className="flex flex-col gap-10 mt-5 items-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {rows.map((count, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-8 w-full">
            {Array.from({ length: count }).map((_, i) => {
              const reward = kttyRewards[kttyIndex++];
              if (!reward) return null;
              const glow = reward.borderColor || "#a855f7";

              return (
                <motion.div
                  key={reward.id}
                  className="relative bg-black/40 rounded-lg p-4 flex flex-col items-center"
                  style={{
                    border: `2px solid ${glow}`,
                    boxShadow: `0 0 18px ${glow}, 0 0 36px ${glow}`,
                  }}
                  variants={cardVariants}
                >
                  {/* Badge (book source) */}
                  {reward.book && bookBadges[reward.book] && (
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center border border-white/40 shadow-md z-20">
                      <Image
                        src={bookBadges[reward.book]}
                        alt={`${reward.book} badge`}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* KTTY Image */}
                  <div
                    className={`relative mb-4 ${
                      isTenPull
                        ? "w-20 h-20 md:w-32 md:h-32"
                        : "w-32 h-32 md:w-48 md:h-48"
                    }`}
                  >
                    <Image
                      src={reward.image}
                      alt={reward.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>

                  {/* Text */}
                  <p className="text-base md:text-xl font-bold text-center whitespace-nowrap">
                    {reward.name} #{reward.id}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>

      {/* Minor rewards */}
      <div className="w-full mt-20 flex-1 flex flex-col">
        <h3 className="text-5xl font-semibold mb-12 text-center">
          Other Rewards
        </h3>
        <div className="overflow-y-auto h-[250px] overflow-visible ">
          {!isTenPull && Object.values(minorItems).length > 0 ? (
            // ✅ Unified 8-column grid, centered like top KTTY grid
            (() => {
              const items = Object.values(minorItems);

              return (
                <div className="flex justify-center w-full">
                  <motion.div
                    className="grid grid-cols-8 gap-8"
                    style={{ maxWidth: "fit-content" }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {items.map((item, idx) => renderRewardCard(item, idx))}
                  </motion.div>
                </div>
              );
            })()
          ) : (
            // ✅ Default (10x pull or others)
            <motion.div
              className="grid grid-cols-8 gap-8 justify-items-center overflow-x-visible"
              style={{ maxWidth: "fit-content" }}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {Object.values(minorItems).map((item, idx) =>
                renderRewardCard(item, idx)
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full max-w-lg mt-8 mx-auto">
        <button
          onClick={onBack}
          className="flex-1 max-w-[160px] px-6 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Back
        </button>
        <button
          onClick={onSummonAgain}
          className="flex-1 max-w-[180px] px-6 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Summon Again
        </button>
      </div>
    </div>
  );
}
