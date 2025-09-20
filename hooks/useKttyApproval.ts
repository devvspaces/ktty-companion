"use client";

import { useState, useEffect } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import {
  useReadErc20Allowance,
  useWriteErc20Approve,
} from '@/src/generated';
import { getContractAddress } from '@/lib/contracts';
import { parseEther } from 'viem';

export interface KttyApprovalData {
  currentAllowance: bigint;
  hasInfiniteApproval: boolean;
  needsApproval: (amount: bigint) => boolean;
  approve: () => void;
  isApproving: boolean;
  isWaitingForApproval: boolean;
  approvalTxHash?: string;
  error: string | null;
  isLoading: boolean;
}

// Large number for "infinite" approval
const INFINITE_APPROVAL = parseEther('1000000000'); // 1 billion KTTY tokens

/**
 * Hook to manage KTTY token approval for the minting contract
 * @returns KTTY approval management functions and state
 */
export function useKttyApproval(): KttyApprovalData {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);

  // Handle contract addresses
  let kttyTokenAddress: `0x${string}` | undefined;
  let mintingContractAddress: `0x${string}` | undefined;
  
  try {
    kttyTokenAddress = getContractAddress('KttyToken');
    mintingContractAddress = getContractAddress('KttyWorldMinting');
  } catch (err) {
    return {
      currentAllowance: BigInt(0),
      hasInfiniteApproval: false,
      needsApproval: () => true,
      approve: () => {},
      isApproving: false,
      isWaitingForApproval: false,
      error: 'Contract addresses not configured',
      isLoading: false,
    };
  }

  // Read current allowance
  const { 
    data: currentAllowance, 
    isLoading: isLoadingAllowance, 
    error: allowanceError,
    refetch: refetchAllowance,
  } = useReadErc20Allowance({
    address: kttyTokenAddress,
    args: address && mintingContractAddress ? [address, mintingContractAddress] : undefined,
    query: {
      enabled: !!address && !!mintingContractAddress,
    },
  });

  // Approval transaction
  const { 
    writeContract: approveContract, 
    data: approvalTxHash, 
    isPending: isApproving,
    error: approveError,
    reset: resetApproval,
  } = useWriteErc20Approve();

  // Wait for approval transaction
  const { 
    isLoading: isWaitingForApproval, 
    isSuccess: approvalSuccess,
    error: approvalReceiptError,
  } = useWaitForTransactionReceipt({
    hash: approvalTxHash,
    query: {
      enabled: !!approvalTxHash,
    },
  });

  // Handle errors
  useEffect(() => {
    if (allowanceError) {
      setError(`Failed to check allowance: ${allowanceError.message}`);
    } else if (approveError) {
      setError(`Approval failed: ${approveError.message}`);
    } else if (approvalReceiptError) {
      setError(`Approval transaction failed: ${approvalReceiptError.message}`);
    } else {
      setError(null);
    }
  }, [allowanceError, approveError, approvalReceiptError]);

  // Refetch allowance after successful approval
  useEffect(() => {
    if (approvalSuccess) {
      refetchAllowance();
      resetApproval();
    }
  }, [approvalSuccess, refetchAllowance, resetApproval]);

  // Approval functions
  const hasInfiniteApproval = (currentAllowance || BigInt(0)) >= INFINITE_APPROVAL;
  
  const needsApproval = (amount: bigint): boolean => {
    if (!currentAllowance) return true;
    return currentAllowance < amount;
  };

  const approve = () => {
    if (!kttyTokenAddress || !mintingContractAddress) {
      setError('Contract addresses not configured');
      return;
    }

    try {
      approveContract({
        address: kttyTokenAddress,
        args: [mintingContractAddress, INFINITE_APPROVAL],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown approval error');
    }
  };

  const isLoading = isLoadingAllowance || isApproving || isWaitingForApproval;

  return {
    currentAllowance: currentAllowance || BigInt(0),
    hasInfiniteApproval,
    needsApproval,
    approve,
    isApproving,
    isWaitingForApproval,
    approvalTxHash,
    error,
    isLoading,
  };
}