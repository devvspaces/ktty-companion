"use client";

import RewardGridMobile from "./RewardGridMobile";
import RewardGridDesktop from "./RewardGridDesktop";
import type { Reward } from "@/lib/reward";

export default function RewardGrid({
  rewards,
  onBack,
  onSummonAgain,
}: {
  rewards: Reward[];
  onBack: () => void;
  onSummonAgain: () => void;
}) {
  return (
    <>
      {/* Mobile version */}
      <div className="sm:hidden">
        <RewardGridMobile
          rewards={rewards}
          onBack={onBack}
          onSummonAgain={onSummonAgain}
        />
      </div>

      {/* Desktop version */}
      <div className="hidden sm:block">
        <RewardGridDesktop
          rewards={rewards}
          onBack={onBack}
          onSummonAgain={onSummonAgain}
        />
      </div>
    </>
  );
}
