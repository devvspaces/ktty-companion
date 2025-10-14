"use client";

import { AnimatePresence, motion } from "framer-motion";
import RewardCard from "@/components/RewardCard";
import { Reward } from "@/lib/reward";

interface RewardScreenViewProps {
  rewards: Reward[];
  currentIndex: number;
  summonCount: number;
  onBack: () => void;
  onSummonAgain: (count: number) => void;
  onNext: () => void;
  onSkipToGrid: () => void;
}

export default function RewardScreenView({
  rewards,
  currentIndex,
  summonCount,
  onBack,
  onSummonAgain,
  onNext,
  onSkipToGrid,
}: RewardScreenViewProps) {
  const reward = rewards?.[currentIndex];

  // ✅ Catch invalid or undefined reward entries
  if (!reward || !reward.name) {
    console.error(
      "⚠️ Invalid reward object:",
      reward,
      "at index",
      currentIndex
    );
    return (
      <motion.div
        key="fallback"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024]"
      >
        <h2 className="text-3xl font-bold mb-4">Summoning Error</h2>
        <p className="text-center text-sm max-w-md mb-6">
          We encountered an issue loading your summoning result. Please wait a
          few seconds, or try summoning again.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500"
        >
          Back
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <RewardCard
        reward={reward}
        onBack={onBack}
        onSummonAgain={() => onSummonAgain(summonCount)}
        mode={summonCount > 1 ? "multi" : "single"}
        onNext={onNext}
        isLast={currentIndex === rewards.length - 1}
        onSkipToGrid={summonCount > 1 ? onSkipToGrid : undefined}
      />
    </AnimatePresence>
  );
}
