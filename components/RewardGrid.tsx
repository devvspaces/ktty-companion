"use client";

import RewardGridMobile from "./RewardGridMobile";
import RewardGridDesktop from "./RewardGridDesktop";
import type { Reward } from "@/lib/reward";

export default function RewardGrid({
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
  return (
    <>
      {/* Mobile version */}
      <div className="sm:hidden">
        <RewardGridMobile
          rewards={rewards}
          availableBooks={availableBooks}
          onBack={onBack}
          onSummonWithAmount={onSummonWithAmount}
        />
      </div>

      {/* Desktop version */}
      <div className="hidden sm:block">
        <RewardGridDesktop
          rewards={rewards}
          availableBooks={availableBooks}
          onBack={onBack}
          onSummonWithAmount={onSummonWithAmount}
        />
      </div>
    </>
  );
}
