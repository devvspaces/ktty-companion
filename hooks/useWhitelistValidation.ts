"use client";

import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import {
  useReadKttyWorldMintingGetWhitelistStatus,
} from '@/src/generated';
import { getContractAddress } from '@/lib/contracts';
import { useMerkleProof } from './useMerkleProof';

export interface WhitelistValidation {
  isEligible: boolean;
  allowance?: number;
  minted?: number;
  remaining?: number;
  error: string | null;
  isLoading: boolean;
  merkleProof?: string[];
}

export interface WhitelistValidationData {
  round1: WhitelistValidation;
  round2: WhitelistValidation;
  round3: WhitelistValidation;
  round4: WhitelistValidation;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to validate whitelist status for all rounds
 * @returns Whitelist validation data for all 4 rounds
 */
export function useWhitelistValidation(): WhitelistValidationData {
  const { address } = useAccount();

  // Handle contract address loading with error boundary
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress('KttyWorldMinting');
  } catch (err) {
    return {
      round1: { isEligible: false, error: 'Contract not configured', isLoading: false },
      round2: { isEligible: false, error: 'Contract not configured', isLoading: false },
      round3: { isEligible: false, error: 'Contract not configured', isLoading: false },
      round4: { isEligible: true, error: null, isLoading: false }, // Public round
      isLoading: false,
      error: 'Contract not configured. Please check environment variables.',
    };
  }

  // Round 1 whitelist status
  const { 
    data: round1Status, 
    isLoading: isLoadingRound1, 
    error: round1Error 
  } = useReadKttyWorldMintingGetWhitelistStatus({
    address: contractAddress,
    args: address ? [1n, address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Round 2 whitelist status  
  const { 
    data: round2Status, 
    isLoading: isLoadingRound2, 
    error: round2Error 
  } = useReadKttyWorldMintingGetWhitelistStatus({
    address: contractAddress,
    args: address ? [2n, address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Round 3 merkle proof validation
  const { 
    proof: round3Proof, 
    isWhitelisted: isRound3Whitelisted, 
    error: round3Error 
  } = useMerkleProof(address);

  // Process validation results
  const validationData = useMemo((): WhitelistValidationData => {
    const isLoading = isLoadingRound1 || isLoadingRound2;
    
    // Round 1 validation
    const round1: WhitelistValidation = {
      isEligible: false,
      allowance: 0,
      minted: 0,
      remaining: 0,
      error: null,
      isLoading: isLoadingRound1,
    };

    if (round1Status) {
      const [allowance, minted] = round1Status;
      const allowanceNum = Number(allowance);
      const mintedNum = Number(minted);
      
      round1.allowance = allowanceNum;
      round1.minted = mintedNum;
      round1.remaining = Math.max(0, allowanceNum - mintedNum);
      round1.isEligible = allowanceNum > 0 && mintedNum < allowanceNum;
    }

    if (round1Error) {
      round1.error = round1Error.message;
    }

    // Round 2 validation
    const round2: WhitelistValidation = {
      isEligible: false,
      allowance: 0,
      minted: 0,
      remaining: 0,
      error: null,
      isLoading: isLoadingRound2,
    };

    if (round2Status) {
      const [allowance, minted] = round2Status;
      const allowanceNum = Number(allowance);
      const mintedNum = Number(minted);
      
      round2.allowance = allowanceNum;
      round2.minted = mintedNum;
      round2.remaining = Math.max(0, allowanceNum - mintedNum);
      round2.isEligible = allowanceNum > 0 && mintedNum < allowanceNum;
    }

    if (round2Error) {
      round2.error = round2Error.message;
    }

    // Round 3 validation (merkle proof)
    const round3: WhitelistValidation = {
      isEligible: isRound3Whitelisted,
      error: round3Error,
      isLoading: false,
      merkleProof: round3Proof,
    };

    // Round 4 validation (public round - everyone eligible)
    const round4: WhitelistValidation = {
      isEligible: true,
      error: null,
      isLoading: false,
    };

    return {
      round1,
      round2,
      round3,
      round4,
      isLoading,
      error: round1Error?.message || round2Error?.message || round3Error || null,
    };
  }, [
    round1Status, 
    round2Status, 
    isRound3Whitelisted, 
    round3Proof, 
    round3Error,
    isLoadingRound1, 
    isLoadingRound2, 
    round1Error, 
    round2Error
  ]);

  return validationData;
}

/**
 * Get whitelist validation for a specific round
 * @param round - Round number (1-4)
 * @returns Whitelist validation for the specified round
 */
export function useRoundWhitelistValidation(round: number): WhitelistValidation {
  const allValidation = useWhitelistValidation();
  
  switch (round) {
    case 1:
      return allValidation.round1;
    case 2:
      return allValidation.round2;
    case 3:
      return allValidation.round3;
    case 4:
      return allValidation.round4;
    default:
      return {
        isEligible: false,
        error: 'Invalid round number',
        isLoading: false,
      };
  }
}