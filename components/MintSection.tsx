"use client";

import { useState } from "react";
import MintRounds from "./MintRounds";
import ImageWall from "./ImageWall";
import LeaderboardModal from "./LeaderboardModal";
import MyBagModal from "./MyBagModal";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useMintRounds } from "@/hooks/useMintRounds";

export default function MintSection() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showBag, setShowBag] = useState(false);

  // Get real leaderboard data from smart contract
  const { 
    topMinters: leaderboard, 
    userMints, 
    userRank, 
    totalUniqueMinters,
    isLoading: isLeaderboardLoading,
    error: leaderboardError 
  } = useLeaderboard();


  // Load round data from smart contract
  const { rounds, currentRound, isLoading, error } = useMintRounds();

  const minted = rounds.reduce((sum, round) => sum + round.minted, 0);
  const totalSupply = rounds.reduce((sum, round) => sum + round.supply, 0);
  const percent = Math.round((minted / totalSupply) * 100);

  return (
    <section
      id="mint"
      className="w-full px-4 md:px-12 pt-12 pb-4 md:pt-16 md:pb-16 text-foreground"
    >
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
        Mint KTTYs
      </h2>

      {/* Global Progress bar */}
      <div className="w-full mb-10">
        <div className="flex justify-between text-base md:text-xl mb-3 px-1">
          <span className="text-gray-300">{percent}% minted</span>
          <span className="font-semibold">
            {minted}/{totalSupply}
          </span>
        </div>
        <div className="w-full h-3 bg-black/60 border border-white/20 rounded-md overflow-hidden">
          <div
            className="h-3 bg-blue-500 rounded"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Mobile: ImageWall above MintRounds */}
      <div className="block md:hidden mb-10">
        <ImageWall />
      </div>

      {/* Two-column layout for medium+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <MintRounds />
        <div className="hidden md:block">
          <ImageWall />
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="grid grid-cols-3 gap-4 mt-10">
        <button
          onClick={() => setShowLeaderboard(true)}
          disabled={isLeaderboardLoading}
          className="w-full py-2 md:py-3 text-xs md:text-sm lg:text-base bg-black/60 border border-white/20 rounded-md font-semibold hover:bg-black/80 transition disabled:opacity-50"
        >
          {isLeaderboardLoading ? 'Loading...' : 'Leaderboard'}
        </button>
        <button
          onClick={() => setShowBag(true)}
          className="w-full py-2 md:py-3 text-xs md:text-sm lg:text-base bg-black/60 border border-white/20 rounded-md font-semibold hover:bg-black/80 transition"
        >
          My Bag
        </button>
        <button
          disabled
          className="w-full py-2 md:py-3 text-xs md:text-sm lg:text-base bg-black/40 border border-white/10 rounded-md font-semibold opacity-50"
        >
          <span className="block md:hidden">Summon</span>
          <span className="hidden md:block">Summon KTTYs</span>
        </button>
      </div>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        show={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        leaderboard={leaderboard}
        userMints={userMints}
        userRank={userRank}
        totalUniqueMinters={totalUniqueMinters}
        isLoading={isLeaderboardLoading}
        error={leaderboardError || null}
      />

      {/* My Bag Modal */}
      <MyBagModal isOpen={showBag} onClose={() => setShowBag(false)} />
    </section>
  );
}
