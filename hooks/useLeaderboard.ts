"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  useReadKttyWorldMintingGetTopMintersLeaderboard,
  useReadKttyWorldMintingGetUserTotalMints,
  useReadKttyWorldMintingGetTotalUniqueMinters,
  useWatchKttyWorldMintingMinterStatsUpdatedEvent
} from '@/src/generated';
import { getContractAddress } from '@/lib/contracts';

export type LeaderboardEntry = {
  rank: number;
  wallet: string;
  mints: number;
};

export type LeaderboardData = {
  topMinters: LeaderboardEntry[];
  userMints: number;
  userRank: number | null;
  totalUniqueMinters: number;
  isLoading: boolean;
  error: string | null;
};

export function useLeaderboard(): LeaderboardData {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);

  // Handle contract address loading with error boundary
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress('KttyWorldMinting');
  } catch (err) {
    console.error('Contract address not configured:', err);
    return {
      topMinters: [],
      userMints: 0,
      userRank: null,
      totalUniqueMinters: 0,
      isLoading: false,
      error: 'Contract not configured. Please check environment variables.',
    };
  }

  // Read top minters leaderboard
  const { 
    data: leaderboardData, 
    isLoading: isLoadingLeaderboard, 
    error: leaderboardError,
    refetch: refetchLeaderboard
  } = useReadKttyWorldMintingGetTopMintersLeaderboard({
    address: contractAddress,
  });

  // Read user's total mints
  const { 
    data: userMints, 
    isLoading: isLoadingUserMints,
    error: userMintsError,
    refetch: refetchUserMints
  } = useReadKttyWorldMintingGetUserTotalMints({
    address: contractAddress,
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Read total unique minters
  const { 
    data: totalUniqueMinters, 
    isLoading: isLoadingTotalMinters,
    error: totalMintersError,
    refetch: refetchTotalMinters
  } = useReadKttyWorldMintingGetTotalUniqueMinters({
    address: contractAddress,
  });

  // Watch for real-time updates
  useWatchKttyWorldMintingMinterStatsUpdatedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      console.log('Minter stats updated:', logs);
      // Refetch all data when stats update
      refetchLeaderboard();
      refetchUserMints();
      refetchTotalMinters();
    },
  });

  // Handle errors
  useEffect(() => {
    const errors = [leaderboardError, userMintsError, totalMintersError].filter(Boolean);
    if (errors.length > 0) {
      setError(errors.map(e => e?.message).join('; '));
    } else {
      setError(null);
    }
  }, [leaderboardError, userMintsError, totalMintersError]);

  // Process leaderboard data with error handling
  const topMinters: LeaderboardEntry[] = (() => {
    try {
      if (!leaderboardData || !Array.isArray(leaderboardData) || leaderboardData.length < 2) {
        return [];
      }
      
      const [wallets, mints] = leaderboardData;
      if (!Array.isArray(wallets) || !Array.isArray(mints)) {
        return [];
      }

      return wallets.map((wallet: string, index: number) => ({
        rank: index + 1,
        wallet,
        mints: Number(mints[index] || 0),
      }));
    } catch (err) {
      console.error('Error processing leaderboard data:', err);
      return [];
    }
  })();

  // Calculate user rank
  const userRank = address && userMints && Number(userMints) > 0
    ? topMinters.find(entry => entry.wallet.toLowerCase() === address.toLowerCase())?.rank || null
    : null;

  const isLoading = isLoadingLeaderboard || isLoadingUserMints || isLoadingTotalMinters;

  return {
    topMinters,
    userMints: Number(userMints || 0),
    userRank,
    totalUniqueMinters: Number(totalUniqueMinters || 0),
    isLoading,
    error,
  };
}