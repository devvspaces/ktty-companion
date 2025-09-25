"use client";

import { useState, useEffect, useMemo } from 'react';
import {
  useReadKttyWorldMintingGetAllRounds,
  useReadKttyWorldMintingGetCurrentRound,
  useReadKttyWorldMintingGetPoolAndBucketStatus,
  useWatchKttyWorldMintingBooksMintedEvent,
  useWatchKttyWorldMintingRoundUpdatedEvent,
} from '@/src/generated';
import { getContractAddress } from '@/lib/contracts';
import { getRoundConfig, type RoundConfig } from '@/lib/roundConfig';

export interface PaymentOption {
  nativeAmount: bigint;
  erc20Amount: bigint;
}

export interface RoundData {
  id: number;
  config: RoundConfig;
  startTime: number;
  endTime: number;
  active: boolean;
  isCurrentRound: boolean;
  nativeOnlyPayment: PaymentOption;
  hybridPayment: PaymentOption;
  minted: number;
  supply: number;
  progress: number; // percentage
}

export interface PoolStatus {
  pool1Length: number;
  pool1Remaining: number;
  pool2Length: number;
  pool2Remaining: number;
  currentBucket: number;
  bucketsRemaining: number[];
  bucketsTotal: number[];
}

export interface MintRoundsData {
  rounds: RoundData[];
  currentRound: number;
  poolStatus: PoolStatus;
  isLoading: boolean;
  error: string | null;
}

export function useMintRounds(): MintRoundsData {
  const [error, setError] = useState<string | null>(null);

  // Handle contract address loading with error boundary
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress('KttyWorldMinting');
  } catch (err) {
    console.error('Contract address not configured:', err);
    return {
      rounds: [],
      currentRound: 0,
      poolStatus: {
        pool1Length: 0,
        pool1Remaining: 0,
        pool2Length: 0,
        pool2Remaining: 0,
        currentBucket: 0,
        bucketsRemaining: [],
        bucketsTotal: [],
      },
      isLoading: false,
      error: 'Contract not configured. Please check environment variables.',
    };
  }

  // Read all rounds configuration (includes payment config)
  const {
    data: allRoundsData,
    isLoading: isLoadingRounds,
    error: roundsError,
    refetch: refetchRounds,
  } = useReadKttyWorldMintingGetAllRounds({
    address: contractAddress,
  });

  // Read current round
  const {
    data: currentRoundData,
    isLoading: isLoadingCurrentRound,
    error: currentRoundError,
    refetch: refetchCurrentRound
  } = useReadKttyWorldMintingGetCurrentRound({
    address: contractAddress,
  });

  // Read pool and bucket status
  const {
    data: poolAndBucketData,
    isLoading: isLoadingPoolStatus,
    error: poolStatusError,
    refetch: refetchPoolStatus
  } = useReadKttyWorldMintingGetPoolAndBucketStatus({
    address: contractAddress,
  });


  // Watch for real-time updates
  useWatchKttyWorldMintingBooksMintedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      console.log('Books minted:', logs);
      // Refetch all data when stats update
      refetchCurrentRound();
      refetchPoolStatus();
      refetchRounds();
    },
  });

  useWatchKttyWorldMintingRoundUpdatedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      console.log('Round updated:', logs);
      // Refetch current round when it updates
      refetchCurrentRound();
      refetchPoolStatus();
      refetchRounds();
    },
  });

  // Handle errors
  useEffect(() => {
    const errors = [roundsError, currentRoundError, poolStatusError].filter(Boolean);
    if (errors.length > 0) {
      setError(errors.map(e => e?.message).join('; '));
    } else {
      setError(null);
    }
  }, [roundsError, currentRoundError, poolStatusError]);

  // Process pool status
  const poolStatus = useMemo((): PoolStatus => {
    if (!poolAndBucketData) {
      return {
        pool1Length: 0,
        pool1Remaining: 0,
        pool2Length: 0,
        pool2Remaining: 0,
        currentBucket: 0,
        bucketsRemaining: [],
        bucketsTotal: [],
      };
    }

    const [
      pool1Length,
      pool1Remaining,
      pool2Length,
      pool2Remaining,
      currentBucket,
      bucketStats
    ] = poolAndBucketData;

    const bucketsRemaining = bucketStats.map(bucket => Number(bucket[0]));
    const bucketsTotal = bucketStats.map(bucket => Number(bucket[1]));

    return {
      pool1Length: Number(pool1Length),
      pool1Remaining: Number(pool1Remaining),
      pool2Length: Number(pool2Length),
      pool2Remaining: Number(pool2Remaining),
      currentBucket: Number(currentBucket),
      bucketsRemaining,
      bucketsTotal,
    };
  }, [poolAndBucketData]);

  // Calculate progress for each round based on pool logic
  const calculateRoundProgress = (roundId: number): { minted: number; supply: number; progress: number } => {
    const currentRound = Number(currentRoundData || 0);

    switch (roundId) {
      case 1:
        const pool1Minted = poolStatus.pool1Length - poolStatus.pool1Remaining;
        return {
          minted: pool1Minted,
          supply: poolStatus.pool1Length,
          progress: poolStatus.pool1Length > 0 ? Math.round((pool1Minted / poolStatus.pool1Length) * 100) : 0,
        };

      case 2:
        const pool2Minted = poolStatus.pool2Length - poolStatus.pool2Remaining;
        return {
          minted: pool2Minted,
          supply: poolStatus.pool2Length,
          progress: poolStatus.pool2Length > 0 ? Math.round((pool2Minted / poolStatus.pool2Length) * 100) : 0,
        };

      case 3:
        // Round 3 shows current active pool based on the logic:
        // Pool 1 first, then Pool 2, then buckets
        if (currentRound >= 3) {
          // Show bucket progress
          const totalBucketSupply = poolStatus.bucketsTotal.reduce((sum, total) => sum + total, 0);
          const totalBucketRemaining = poolStatus.bucketsRemaining.reduce((sum, remaining) => sum + remaining, 0);
          const bucketMinted = totalBucketSupply - totalBucketRemaining;
          return {
            minted: bucketMinted,
            supply: totalBucketSupply,
            progress: totalBucketSupply > 0 ? Math.round((bucketMinted / totalBucketSupply) * 100) : 0,
          };
        } else {
          // Round 3 hasn't started, show bucket totals
          const totalBucketSupply = poolStatus.bucketsTotal.reduce((sum, total) => sum + total, 0);
          return {
            minted: 0,
            supply: totalBucketSupply,
            progress: 0,
          };
        }

      case 4:
        // Round 4 continues whatever is left from round 3
        if (currentRound >= 4) {
          const totalBucketSupply = poolStatus.bucketsTotal.reduce((sum, total) => sum + total, 0);
          const totalBucketRemaining = poolStatus.bucketsRemaining.reduce((sum, remaining) => sum + remaining, 0);
          const bucketMinted = totalBucketSupply - totalBucketRemaining;
          return {
            minted: bucketMinted,
            supply: totalBucketSupply,
            progress: totalBucketSupply > 0 ? Math.round((bucketMinted / totalBucketSupply) * 100) : 0,
          };
        } else {
          return { minted: 0, supply: 0, progress: 0 };
        }

      default:
        return { minted: 0, supply: 0, progress: 0 };
    }
  };

  // Process rounds data
  const rounds = useMemo((): RoundData[] => {
    if (!allRoundsData) return [];

    const currentRound = Number(currentRoundData || 0);

    return allRoundsData.map((roundData, index) => {
      const roundId = index + 1;
      const config = getRoundConfig(roundId);
      const { minted, supply, progress } = calculateRoundProgress(roundId);

      return {
        id: roundId,
        config,
        startTime: Number(roundData.startTime),
        endTime: Number(roundData.endTime),
        active: roundData.active,
        isCurrentRound: currentRound === roundId,
        nativeOnlyPayment: roundData.nativeOnlyPayment,
        hybridPayment: roundData.hybridPayment,
        minted,
        supply,
        progress,
      };
    });
  }, [allRoundsData, currentRoundData, poolStatus]);

  const isLoading = isLoadingRounds || isLoadingCurrentRound || isLoadingPoolStatus;

  return {
    rounds,
    currentRound: Number(currentRoundData || 0),
    poolStatus,
    isLoading,
    error,
  };
}