"use client";

import { AnimatePresence } from "framer-motion";
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
  return (
    <AnimatePresence mode="wait">
      <RewardCard
        reward={rewards[currentIndex]}
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
