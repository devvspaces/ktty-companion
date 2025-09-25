"use client";

import { useAccount } from "wagmi";
import { useRef } from "react";

type LeaderboardEntry = {
  rank: number;
  wallet: string;
  mints: number;
};

type LeaderboardModalProps = {
  show: boolean;
  onClose: () => void;
  leaderboard: LeaderboardEntry[];
  userMints?: number;
  userRank?: number | null;
  totalUniqueMinters?: number;
  isLoading?: boolean;
  error?: string | null;
};

export default function LeaderboardModal({
  show,
  onClose,
  leaderboard,
  userMints = 0,
  userRank,
  totalUniqueMinters = 0,
  isLoading = false,
  error,
}: LeaderboardModalProps) {
  const { address } = useAccount();
  const tableRef = useRef<HTMLTableSectionElement>(null);

  if (!show) return null;

  // Slice leaderboard to top 50 only
  const top50 = leaderboard.slice(0, 50);

  // Format wallet address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Jump to user’s row if visible
  const jumpToMe = () => {
    if (!tableRef.current || !address) return;
    const row = tableRef.current.querySelector<HTMLTableRowElement>(
      `tr[data-wallet="${address.toLowerCase()}"]`
    );
    if (row) row.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      {/* Modal */}
      <div className="relative w-[95%] sm:w-[85%] md:w-3/5 max-h-[90vh] bg-black/90 rounded-lg border-2 sm:border-4 border-neon overflow-hidden p-4 sm:p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl sm:text-2xl hover:text-purple-400"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
          Leaderboard
        </h3>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <p className="text-red-400 text-sm">
              Error loading leaderboard: {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <span className="ml-3 text-gray-400">Loading leaderboard...</span>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto max-h-[50vh]">
              {top50.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs sm:text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-white/20 text-purple-300">
                      <th className="py-2 px-2 sm:px-4">Rank #</th>
                      <th className="py-2 px-2 sm:px-4">Wallet Address</th>
                      <th className="py-2 px-2 sm:px-4">Mints</th>
                    </tr>
                  </thead>
                  <tbody ref={tableRef}>
                    {top50.map((entry) => {
                      const isCurrentUser =
                        address &&
                        entry.wallet.toLowerCase() === address.toLowerCase();
                      return (
                        <tr
                          key={entry.rank}
                          data-wallet={entry.wallet.toLowerCase()}
                          className={`border-b border-white/10 hover:bg-white/5 transition ${
                            isCurrentUser ? "bg-purple-500/20" : ""
                          }`}
                        >
                          <td className="py-2 px-2 sm:px-4">#{entry.rank}</td>
                          <td className="py-2 px-2 sm:px-4 font-mono">
                            <span className="hidden sm:inline">
                              {entry.wallet}
                            </span>
                            <span className="sm:hidden">
                              {formatAddress(entry.wallet)}
                            </span>
                            {isCurrentUser && (
                              <span className="ml-2 text-xs bg-purple-500 px-2 py-1 rounded">
                                YOU
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-2 sm:px-4 font-semibold">
                            {entry.mints}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No minters yet. Be the first to mint!
                </div>
              )}
            </div>

            {/* Jump to Me button (only if user is in top 50) */}
            {address &&
              top50.some(
                (e) => e.wallet.toLowerCase() === address.toLowerCase()
              ) && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={jumpToMe}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition text-sm font-semibold"
                  >
                    Jump to Me
                  </button>
                </div>
              )}
          </>
        )}
      </div>

      {/* Shared neon border glow */}
      <style jsx>{`
        .border-neon {
          border-color: #9b5cff;
          box-shadow:
            0 0 10px #9b5cff,
            0 0 20px #9b5cff;
        }
      `}</style>
    </div>
  );
}
