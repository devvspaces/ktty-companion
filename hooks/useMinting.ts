"use client";

import { useState, useEffect } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import {
  useSimulateKttyWorldMintingMint,
  useWriteKttyWorldMintingMint,
} from '@/src/generated';
import { getContractAddress } from '@/lib/contracts';
import { useWhitelistValidation, WhitelistValidation } from './useWhitelistValidation';
import { useKttyApproval } from './useKttyApproval';
import { useMintRounds } from './useMintRounds';
import { parseEther } from 'viem';

export enum PaymentType {
  NATIVE_ONLY = 0,
  HYBRID = 1,
}

export interface MintingData {
  mint: (roundId: number, quantity: number, paymentType: PaymentType) => Promise<void>;
  isSimulating: boolean;
  isMinting: boolean;
  isWaitingForMint: boolean;
  mintTxHash?: string;
  error: string | null;
  isLoading: boolean;
  canMint: (roundId: number, quantity: number, paymentType: PaymentType) => {
    canMint: boolean;
    reason?: string;
  };
}

/**
 * Hook to handle minting with validation, simulation, and error handling
 */
export function useMinting(): MintingData {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [simulationParams, setSimulationParams] = useState<{
    roundId: number;
    quantity: number;
    paymentType: PaymentType;
  } | null>(null);

  // Get contract data
  const { rounds, currentRound } = useMintRounds();
  const whitelistValidation = useWhitelistValidation();
  const kttyApproval = useKttyApproval();

  // Handle contract address
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress('KttyWorldMinting');
  } catch (err) {
    return {
      mint: async () => {},
      isSimulating: false,
      isMinting: false,
      isWaitingForMint: false,
      error: 'Contract not configured',
      isLoading: false,
      canMint: () => ({ canMint: false, reason: 'Contract not configured' }),
    };
  }

  // Get round data and merkle proof
  const getRoundData = (roundId: number) => {
    const round = rounds.find(r => r.id === roundId);
    const validation = whitelistValidation[`round${roundId}` as keyof typeof whitelistValidation];
    return { round, validation };
  };

  // Calculate payment amounts
  const calculatePaymentAmounts = (roundId: number, quantity: number, paymentType: PaymentType) => {
    const { round } = getRoundData(roundId);
    if (!round) return { nativeAmount: BigInt(0), erc20Amount: BigInt(0) };

    const payment = paymentType === PaymentType.NATIVE_ONLY 
      ? round.nativeOnlyPayment 
      : round.hybridPayment;

    return {
      nativeAmount: payment.nativeAmount * BigInt(quantity),
      erc20Amount: payment.erc20Amount * BigInt(quantity),
    };
  };

  // Simulate mint transaction
  const { 
    data: simulationData,
    isLoading: isSimulating,
    error: simulationError,
  } = useSimulateKttyWorldMintingMint({
    address: contractAddress,
    args: simulationParams ? [
      BigInt(simulationParams.quantity),
      simulationParams.paymentType,
      simulationParams.roundId === 3 
        ? (whitelistValidation.round3.merkleProof || []) as readonly `0x${string}`[]
        : [] as readonly `0x${string}`[],
    ] : undefined,
    value: simulationParams ? calculatePaymentAmounts(
      simulationParams.roundId, 
      simulationParams.quantity, 
      simulationParams.paymentType
    ).nativeAmount : undefined,
    query: {
      enabled: !!simulationParams && !!address,
    },
  });

  // Mint transaction
  const {
    writeContract: mintContract,
    data: mintTxHash,
    isPending: isMinting,
    error: mintError,
    reset: resetMint,
  } = useWriteKttyWorldMintingMint();

  // Wait for mint transaction
  const {
    isLoading: isWaitingForMint,
    isSuccess: mintSuccess,
    error: mintReceiptError,
  } = useWaitForTransactionReceipt({
    hash: mintTxHash,
    query: {
      enabled: !!mintTxHash,
    },
  });

  // Handle errors
  useEffect(() => {
    if (simulationError) {
      setError(mapContractError(simulationError.message));
    } else if (mintError) {
      setError(mapContractError(mintError.message));
    } else if (mintReceiptError) {
      setError(`Mint transaction failed: ${mintReceiptError.message}`);
    } else if (kttyApproval.error) {
      setError(kttyApproval.error);
    } else {
      setError(null);
    }
  }, [simulationError, mintError, mintReceiptError, kttyApproval.error]);

  // Reset after successful mint
  useEffect(() => {
    if (mintSuccess || mintError) {
      setSimulationParams(null);
      resetMint();
    }
  }, [mintSuccess, mintError, resetMint]);

  // Map contract errors to user-friendly messages
  const mapContractError = (errorMessage: string): string => {
    if (errorMessage.includes('InsufficientAllowance')) {
      return "You don't have enough mints remaining for this round";
    }
    if (errorMessage.includes('InvalidProof')) {
      return "You're not whitelisted for round 3";
    }
    if (errorMessage.includes('MaxMintExceeded')) {
      return "Maximum mint limit exceeded";
    }
    if (errorMessage.includes('InsufficientPayment')) {
      return "Insufficient funds for minting";
    }
    if (errorMessage.includes('RoundNotActive')) {
      return "This round is not currently active";
    }
    if (errorMessage.includes('PoolExhausted')) {
      return "All books for this round have been minted";
    }
    console.log(errorMessage)
    return "An unknown error occurred. Please try again.";
  };

  // Validate if user can mint
  const canMint = (roundId: number, quantity: number, paymentType: PaymentType) => {
    // Check if wallet connected
    if (!address) {
      return { canMint: false, reason: 'Please connect your wallet' };
    }

    // Check if current round
    if (currentRound !== roundId) {
      return { canMint: false, reason: 'This round is not currently active' };
    }

    // Get round validation
    const { round, validation } = getRoundData(roundId);
    if (!round) {
      return { canMint: false, reason: 'Round not found' };
    }

    // Check whitelist eligibility
    if (!(validation as WhitelistValidation).isEligible) {
      if (roundId === 1 || roundId === 2) {
        return { canMint: false, reason: "You're not whitelisted for this round" };
      }
      if (roundId === 3) {
        return { canMint: false, reason: "You're not whitelisted for round 3" };
      }
    }

    // Check remaining allowance for rounds 1 & 2
    if ((roundId === 1 || roundId === 2) && (validation as WhitelistValidation).remaining !== undefined) {
      const remaining = (validation as WhitelistValidation).remaining;
      if (remaining !== undefined && quantity > remaining) {
        return { canMint: false, reason: `You can only mint ${remaining} more books` };
      }
    }

    // Check KTTY approval for hybrid payment
    if (paymentType === PaymentType.HYBRID) {
      const { erc20Amount } = calculatePaymentAmounts(roundId, quantity, paymentType);
      if (kttyApproval.needsApproval(erc20Amount)) {
        return { canMint: false, reason: 'KTTY approval required' };
      }
    }

    return { canMint: true };
  };

  // Main mint function
  const mint = async (roundId: number, quantity: number, paymentType: PaymentType): Promise<void> => {
    try {
      setError(null);

      // Validate mint
      const validation = canMint(roundId, quantity, paymentType);
      if (!validation.canMint) {
        setError(validation.reason || 'Cannot mint');
        return;
      }

      // Handle KTTY approval for hybrid payment
      if (paymentType === PaymentType.HYBRID) {
        const { erc20Amount } = calculatePaymentAmounts(roundId, quantity, paymentType);
        if (kttyApproval.needsApproval(erc20Amount)) {
          // Request approval first
          kttyApproval.approve();
          return; // Exit and let user try again after approval
        }
      }

      // Set simulation parameters and wait for simulation
      setSimulationParams({ roundId, quantity, paymentType });

      // Execute mint transaction
      const { nativeAmount } = calculatePaymentAmounts(roundId, quantity, paymentType);
      
      mintContract({
        address: contractAddress!,
        args: [
          BigInt(quantity),
          paymentType,
          roundId === 3 
            ? (whitelistValidation.round3.merkleProof || []) as readonly `0x${string}`[]
            : [] as readonly `0x${string}`[],
        ],
        value: nativeAmount,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown minting error');
    }
  };

  const isLoading = isSimulating || isMinting || isWaitingForMint || kttyApproval.isLoading;

  return {
    mint,
    isSimulating,
    isMinting,
    isWaitingForMint,
    mintTxHash,
    error,
    isLoading,
    canMint,
  };
}