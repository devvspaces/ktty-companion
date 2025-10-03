"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useReadKttyWorldMintingGetAllRounds,
  useReadKttyWorldMintingGetCurrentRound,
  useReadKttyWorldMintingGetPoolAndBucketStatus,
  useWatchKttyWorldMintingBooksMintedEvent,
  useWatchKttyWorldMintingRoundUpdatedEvent,
} from "@/src/generated";
import { getContractAddress } from "@/lib/contracts";
import { getRoundConfig, type RoundConfig } from "@/lib/roundConfig";

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

  // ✅ for global progress bar
  overallMinted: number;
  overallSupply: number;
}

export function useMintRounds(): MintRoundsData {
  const [error, setError] = useState<string | null>(null);

  // ===== Contract address
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress("KttyWorldMinting");
  } catch (err) {
    console.error("Contract address not configured:", err);
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
      error: "Contract not configured. Please check environment variables.",
      overallMinted: 0,
      overallSupply: 10000,
    };
  }

  // ===== Read on-chain data
  const {
    data: allRoundsData,
    isLoading: isLoadingRounds,
    error: roundsError,
    refetch: refetchRounds,
  } = useReadKttyWorldMintingGetAllRounds({ address: contractAddress });

  const {
    data: currentRoundData,
    isLoading: isLoadingCurrentRound,
    error: currentRoundError,
    refetch: refetchCurrentRound,
  } = useReadKttyWorldMintingGetCurrentRound({ address: contractAddress });

  const {
    data: poolAndBucketData,
    isLoading: isLoadingPoolStatus,
    error: poolStatusError,
    refetch: refetchPoolStatus,
  } = useReadKttyWorldMintingGetPoolAndBucketStatus({
    address: contractAddress,
  });

  // ===== Watch contract events for live updates
  useWatchKttyWorldMintingBooksMintedEvent({
    address: contractAddress,
    onLogs: () => {
      refetchCurrentRound();
      refetchPoolStatus();
      refetchRounds();
    },
  });

  useWatchKttyWorldMintingRoundUpdatedEvent({
    address: contractAddress,
    onLogs: () => {
      refetchCurrentRound();
      refetchPoolStatus();
      refetchRounds();
    },
  });

  // ===== Error handler
  useEffect(() => {
    const errors = [roundsError, currentRoundError, poolStatusError].filter(
      Boolean
    );
    if (errors.length > 0) {
      setError(errors.map((e) => e?.message).join("; "));
    } else {
      setError(null);
    }
  }, [roundsError, currentRoundError, poolStatusError]);

  // ===== Pool status
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
      bucketStats,
    ] = poolAndBucketData;

    return {
      pool1Length: Number(pool1Length),
      pool1Remaining: Number(pool1Remaining),
      pool2Length: Number(pool2Length),
      pool2Remaining: Number(pool2Remaining),
      currentBucket: Number(currentBucket),
      bucketsRemaining: bucketStats.map((b) => Number(b[0])),
      bucketsTotal: bucketStats.map((b) => Number(b[1])),
    };
  }, [poolAndBucketData]);

  // ===== Per-round progress calc
  const calculateRoundProgress = (
    roundId: number
  ): { minted: number; supply: number; progress: number } => {
    const currentRound = Number(currentRoundData || 0);

    switch (roundId) {
      case 1: {
        const minted = poolStatus.pool1Length - poolStatus.pool1Remaining;
        const supply = poolStatus.pool1Length;
        return {
          minted,
          supply,
          progress: supply > 0 ? Math.round((minted / supply) * 100) : 0,
        };
      }

      case 2: {
        const minted = poolStatus.pool2Length - poolStatus.pool2Remaining;
        const supply = poolStatus.pool2Length;
        return {
          minted,
          supply,
          progress: supply > 0 ? Math.round((minted / supply) * 100) : 0,
        };
      }

      case 3: {
    {
      // Show the historic round-3 snapshot
      const minted = Number(allRoundsData?.[2]?.minted ?? 0);
      const supply = Number(allRoundsData?.[2]?.supply ?? 0);
      return {
        minted,
        supply,
        progress: supply > 0 ? Math.round((minted / supply) * 100) : 0,
      };
    }
      }

      case 4: {
        if (currentRound >= 4) {
          const totalSupply = poolStatus.bucketsTotal.reduce(
            (s, v) => s + v,
            0
          );
          const totalRemaining = poolStatus.bucketsRemaining.reduce(
            (s, v) => s + v,
            0
          );
          const minted = totalSupply - totalRemaining;
          return {
            minted,
            supply: totalSupply,
            progress:
              totalSupply > 0 ? Math.round((minted / totalSupply) * 100) : 0,
          };
        }
        return { minted: 0, supply: 0, progress: 0 };
      }

      default:
        return { minted: 0, supply: 0, progress: 0 };
    }
  };

  // ===== Build rounds list
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

  const isLoading =
    isLoadingRounds || isLoadingCurrentRound || isLoadingPoolStatus;

  // ===== Global totals
  const TOTAL_SUPPLY = 10000;
  const RESERVED_SUPPLY = 430;

  const mintedFromRounds = rounds.reduce((sum, r) => sum + r.minted, 0);
  const overallMinted = RESERVED_SUPPLY + mintedFromRounds;

  return {
    rounds,
    currentRound: Number(currentRoundData || 0),
    poolStatus,
    isLoading,
    error,
    overallMinted,
    overallSupply: TOTAL_SUPPLY,
  };
}
