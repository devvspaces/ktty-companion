"use client";

type LeaderboardEntry = {
  rank: number;
  wallet: string;
  mints: number;
};

type LeaderboardModalProps = {
  show: boolean;
  onClose: () => void;
  leaderboard: LeaderboardEntry[];
};

export default function LeaderboardModal({
  show,
  onClose,
  leaderboard,
}: LeaderboardModalProps) {
  if (!show) return null;

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

        <div className="overflow-y-auto max-h-[70vh]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="border-b border-white/20 text-purple-300">
                <th className="py-2 px-2 sm:px-4">Rank #</th>
                <th className="py-2 px-2 sm:px-4">Wallet Address</th>
                <th className="py-2 px-2 sm:px-4">Mints</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-2 px-2 sm:px-4">{entry.rank}</td>
                  <td className="py-2 px-2 sm:px-4 font-mono truncate max-w-[100px] sm:max-w-none">
                    {entry.wallet}
                  </td>
                  <td className="py-2 px-2 sm:px-4">{entry.mints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shared neon border glow */}
      <style jsx>{`
        .border-neon {
          border-color: #9b5cff;
          box-shadow: 0 0 10px #9b5cff, 0 0 20px #9b5cff;
        }
      `}</style>
    </div>
  );
}
