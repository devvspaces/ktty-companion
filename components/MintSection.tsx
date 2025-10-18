"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

  // ✅ Use new global stats directly from useMintRounds
  const { rounds, overallMinted, overallSupply } = useMintRounds();

  // User books for badge logic
  const { totalBooks } = useUserBooks();

  // Track last seen count (persisted in localStorage)
  const [lastSeenCount, setLastSeenCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lastSeenBooks");
      if (saved) setLastSeenCount(parseInt(saved, 10));
    }
  }, []);

  const hasNewBooks = totalBooks > lastSeenCount;

  const handleOpenBag = () => {
    setShowBag(true);
    setLastSeenCount(totalBooks);
    localStorage.setItem("lastSeenBooks", totalBooks.toString());
  };

  // ===== Global Mint Progress =====
  const progress = (overallMinted / overallSupply) * 100;
  const percent = Math.min(100, progress);
  const displayPercent = percent.toFixed(1);

  return (
    <section
      id="mint"
      className="w-full px-4 md:px-12 pt-12 pb-4 md:pt-16 md:pb-16 text-foreground"
    >
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
        Mint KTTYs
      </h2>

      {/* === Global Progress bar === */}
      <div className="w-full mb-10">
        <div className="flex justify-between text-base md:text-xl mb-3 px-1">
          <span className="text-gray-300">{displayPercent}% minted</span>
          <span className="font-semibold">
            {overallMinted.toLocaleString()}/{overallSupply.toLocaleString()}
          </span>
        </div>
        <div className="w-full h-3 bg-black/60 border border-white/20 rounded-md overflow-hidden">
          <div
            className="h-3 bg-blue-500 rounded transition-all duration-500"
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

        {/* My Bag button with badge */}
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

        {/* Active Summon button (matching My Bag style) */}
        <Link
          href="/summon"
          className="w-full py-2 md:py-3 text-xs md:text-sm lg:text-base 
             bg-black/60 border border-white/20 rounded-md font-semibold 
             text-white hover:bg-black/80 transition text-center"
        >
          <span className="block md:hidden">Summon</span>
          <span className="hidden md:block">Summon KTTYs</span>
        </Link>
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
