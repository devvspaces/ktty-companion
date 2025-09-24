"use client";

import Image from "next/image";

type Reward = {
  id: string;
  name: string;
  image: string;
  borderColor?: string; // 🔹 glow color
  items: { name: string; image: string }[];
};

export default function RewardGrid({
  rewards,
  onBack,
  onSummonAgain,
}: {
  rewards: Reward[];
  onBack: () => void;
  onSummonAgain: () => void;
}) {
  const kttyRewards = rewards;

  // Group minor rewards
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

  // Layout setup
  const isTenPull = rewards.length === 10;
  const rows = isTenPull ? [3, 4, 3] : [2, 3];
  let kttyIndex = 0;

  // Rarity glow
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

  return (
    <div className="fixed inset-0 z-[999] flex flex-col text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024] p-6">
      <h2 className="text-2xl sm:text-5xl font-bold mb-6 text-center animate-fadeInUp">
        Your New KTTY Friends!
      </h2>

      {/* KTTY Rewards (static, never scrolls) */}
      <div className="flex flex-col gap-6 items-center w-full">
        {rows.map((count, rowIdx) => (
          <div
            key={rowIdx}
            className="flex justify-center gap-3 sm:gap-4 md:gap-6 w-full animate-fadeInUp"
            style={{ animationDelay: `${rowIdx * 0.4}s` }}
          >
            {Array.from({ length: count }).map((_, i) => {
              const reward = kttyRewards[kttyIndex++];
              if (!reward) return null;
              const glow = reward.borderColor || "#a855f7";

              return (
                <div
                  key={reward.id}
                  className="bg-black/40 rounded-lg p-2 sm:p-3 flex flex-col items-center animate-fadeInUp"
                  style={{
                    animationDelay: `${rowIdx * 0.4 + i * 0.2}s`,
                    border: `2px solid ${glow}`,
                    boxShadow: `0 0 12px ${glow}, 0 0 24px ${glow}`,
                  }}
                >
                  <div
                    className={`relative mb-2 ${
                      isTenPull
                        ? "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20"
                        : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                    }`}
                  >
                    <Image
                      src={reward.image}
                      alt={reward.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-bold mb-1 text-center whitespace-nowrap">
                    {reward.name} #{reward.id}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Minor rewards (only this section scrolls if >2 rows) */}
      <div className="w-full max-w-4xl mt-6 animate-fadeInUp flex-1 flex flex-col">
        <h3 className="text-3xl font-semibold mb-4 text-center">
          Other Rewards
        </h3>

        <div
          className={`overflow-y-auto ${
            isTenPull ? "h-40 sm:h-56 md:h-64" : "h-32 sm:h-40 md:h-48"
          }`}
        >
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-4 justify-items-center">
            {Object.values(minorItems).map((item, idx) => {
              const { border, shadow } = getRarityStyle(item.name);
              return (
                <div
                  key={idx}
                  className="bg-black/40 rounded-lg relative animate-fadeInUp"
                  style={{
                    animationDelay: `${1.2 + idx * 0.1}s`,
                    border: `2px solid ${border}`,
                    boxShadow: shadow,
                  }}
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  {item.count > 1 && (
                    <span className="absolute bottom-0 right-0 text-[10px] sm:text-xs font-bold bg-black/70 px-1 rounded-tl-md text-yellow-300">
                      x{item.count}
                    </span>
                  )}
                  <span className="hidden sm:block text-xs text-center mt-1">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buttons pinned at bottom */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={onBack}
          className="flex-1 max-w-[120px] px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Back
        </button>
        <button
          onClick={onSummonAgain}
          className="flex-1 max-w-[150px] px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Summon Again
        </button>
      </div>
    </div>
  );
}
