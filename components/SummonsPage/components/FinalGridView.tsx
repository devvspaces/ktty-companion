"use client";

import RewardGrid from "@/components/RewardGrid";
import { Reward } from "@/lib/reward";

interface FinalGridViewProps {
  rewards: Reward[];
  availableBooks: number; // ✅ now required
  onBack: () => void;
  onSummonAgain: (count: number) => void; // ✅ callback used by modal
}

export default function FinalGridView({
  rewards,
  availableBooks,
  onBack,
  onSummonAgain,
}: FinalGridViewProps) {
  return (
    <RewardGrid
      rewards={rewards}
      availableBooks={availableBooks} // ✅ pass available books
      onBack={onBack}
      onSummonWithAmount={(count) => onSummonAgain(count)} // ✅ new prop
    />
  );
}
