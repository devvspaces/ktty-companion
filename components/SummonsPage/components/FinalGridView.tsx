"use client";

import RewardGrid from "@/components/RewardGrid";
import { Reward } from "@/lib/reward";

interface FinalGridViewProps {
  rewards: Reward[];
  summonCount: number;
  onBack: () => void;
  onSummonAgain: (count: number) => void;
}

export default function FinalGridView({
  rewards,
  summonCount,
  onBack,
  onSummonAgain,
}: FinalGridViewProps) {
  return (
    <RewardGrid
      rewards={rewards}
      onBack={onBack}
      onSummonAgain={() => onSummonAgain(summonCount)}
    />
  );
}
