"use client";

import { useState, useEffect } from "react";
import MintRounds from "./MintRounds";
import ImageWall from "./ImageWall";
import LeaderboardModal from "./LeaderboardModal";
import MyBagModal from "./MyBagModal";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useMintRounds } from "@/hooks/useMintRounds";
import { useUserBooks } from "@/hooks/useUserBooks";

export default function MintSection() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showBag, setShowBag] = useState(false);

  // Leaderboard data
  const {
    topMinters: leaderboard,
    userMints,
    userRank,
    totalUniqueMinters,
    isLoading: isLeaderboardLoading,
    error: leaderboardError,
  } = useLeaderboard();

  // Mint round data
  const { rounds } = useMintRounds();

  // User books for badge logic
  const { totalBooks } = useUserBooks();

  // Track last seen count (persisted in localStorage)
  const [lastSeenCount, setLastSeenCount] = useState<number>(0);

  // Load saved lastSeenCount on first mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lastSeenBooks");
      if (saved) {
        setLastSeenCount(parseInt(saved, 10));
      }
    }
  }, []);

  // Show badge if there are more books than last time user opened the bag
  const hasNewBooks = totalBooks > lastSeenCount;

  // When opening the bag, mark current total as seen
  const handleOpenBag = () => {
    setShowBag(true);
    setLastSeenCount(totalBooks);
    localStorage.setItem("lastSeenBooks", totalBooks.toString());
  };

  // Mint progress
  const minted = rounds
    .filter((round) => round.id !== 4)
    .reduce((sum, round) => sum + round.minted, 0);

  const totalSupply = rounds
    .filter((round) => round.id !== 4)
    .reduce((sum, round) => sum + round.supply, 0);

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
      <div className="grid grid-cols-3 gap-4 mt-4 md:mt-10">
        {/* Leaderboard button */}
        <button
          onClick={() => setShowLeaderboard(true)}
          disabled={isLeaderboardLoading}
          className="w-full py-2 md:py-3 text-xs md:text-sm lg:text-base 
                     bg-black/60 border border-white/20 rounded-md font-semibold 
                     hover:bg-black/80 transition disabled:opacity-50"
        >
          {isLeaderboardLoading ? "Loading..." : "Leaderboard"}
        </button>

        {/* My Bag button with notification badge */}
        <div className="relative w-full">
          <button
            onClick={handleOpenBag}
            className="w-full py-2 md:py-3 text-xs md:text-sm lg:text-base 
                       bg-black/60 border border-white/20 rounded-md font-semibold 
                       hover:bg-black/80 transition"
          >
            My Bag
          </button>

          {hasNewBooks && (
            <span
              className="absolute -top-1 -right-1
                         min-w-[1.1rem] h-5 px-1
                         flex items-center justify-center
                         bg-red-500 text-white text-[0.7rem] font-bold
                         rounded-full border border-black shadow-md"
            >
              !
            </span>
          )}
        </div>

        {/* Inactive Summon button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="w-full py-2 md:py-3 text-xs md:text-sm lg:text-base 
                     bg-black/40 border border-white/20 rounded-md font-semibold 
                     text-gray-400 hover:text-gray-400 hover:bg-black/40 transition"
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
