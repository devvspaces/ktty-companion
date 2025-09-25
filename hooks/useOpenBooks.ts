"use client";

import { useState, useEffect } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import {
  useSimulateKttyWorldMintingOpenBooks,
  useWriteKttyWorldMintingOpenBooks,
} from '@/src/generated';
import { getContractAddress } from '@/lib/contracts';
import { BookDetail } from './useUserBooks';
import { 
  showOpenBooksNotification,
  dismissNotification 
} from '@/lib/notifications';

export interface OpenBooksData {
  openBooks: (bookIds: bigint[]) => Promise<void>;
  isSimulating: boolean;
  isOpening: boolean;
  isWaitingForOpen: boolean;
  openTxHash?: string;
  error: string | null;
  isLoading: boolean;
}

/**
 * Hook to handle opening books with validation, simulation, and error handling
 */
export function useOpenBooks(): OpenBooksData {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [simulationParams, setSimulationParams] = useState<bigint[] | null>(null);
  
  // Notification tracking - following the exact MintRounds pattern
  const [currentNotificationId, setCurrentNotificationId] = useState<string | null | undefined>(null);

  // Handle contract address
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress('KttyWorldMinting');
  } catch (err) {
    return {
      openBooks: async () => {},
      isSimulating: false,
      isOpening: false,
      isWaitingForOpen: false,
      error: 'Contract not configured',
      isLoading: false,
    };
  }

  // Simulate openBooks transaction
  const { 
    data: simulationData,
    isLoading: isSimulating,
    error: simulationError,
  } = useSimulateKttyWorldMintingOpenBooks({
    address: contractAddress,
    args: simulationParams ? [simulationParams] : undefined,
    query: {
      enabled: !!simulationParams && !!address,
    },
  });

  // OpenBooks transaction
  const {
    writeContract: openBooksContract,
    data: openTxHash,
    isPending: isOpening,
    error: openError,
    reset: resetOpen,
  } = useWriteKttyWorldMintingOpenBooks();

  // Wait for openBooks transaction
  const {
    isLoading: isWaitingForOpen,
    isSuccess: openSuccess,
    error: openReceiptError,
  } = useWaitForTransactionReceipt({
    hash: openTxHash,
    query: {
      enabled: !!openTxHash,
    },
  });

  // Handle errors
  useEffect(() => {
    if (simulationError) {
      setError(mapContractError(simulationError.message));
    } else if (openError) {
      setError(mapContractError(openError.message));
    } else if (openReceiptError) {
      setError(`Opening books transaction failed: ${openReceiptError.message}`);
    } else {
      setError(null);
    }
  }, [simulationError, openError, openReceiptError]);

  // Reset after successful open
  useEffect(() => {
    if (openSuccess || openError) {
      setSimulationParams(null);
      resetOpen();
    }
  }, [openSuccess, openError, resetOpen]);

  // Handle opening books state changes - following exact MintRounds pattern
  useEffect(() => {
    if (isSimulating && simulationParams) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      const id = showOpenBooksNotification('simulating');
      setCurrentNotificationId(id);
    } else if (isOpening || isWaitingForOpen) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      const id = showOpenBooksNotification('pending', { quantity: simulationParams?.length });
      setCurrentNotificationId(id);
    } else if (openTxHash && !isWaitingForOpen && !error) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      showOpenBooksNotification('success', { 
        quantity: simulationParams?.length, 
        txHash: openTxHash 
      });
      setCurrentNotificationId(null);
    } else if (error) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      showOpenBooksNotification('error', { error });
      setCurrentNotificationId(null);
    }
  }, [
    isSimulating,
    isOpening, 
    isWaitingForOpen, 
    openTxHash, 
    error,
    simulationParams?.length
  ]);

  // Map contract errors to user-friendly messages
  const mapContractError = (errorMessage: string): string => {
    if (errorMessage.includes('BookNotOwned')) {
      return "You don't own one or more of these books";
    }
    if (errorMessage.includes('BookAlreadyOpened')) {
      return "One or more of these books have already been opened";
    }
    if (errorMessage.includes('InvalidBookId')) {
      return "Invalid book ID provided";
    }
    console.log(errorMessage);
    return "An unknown error occurred while opening books. Please try again.";
  };

  // Main openBooks function
  const openBooks = async (bookIds: bigint[]): Promise<void> => {
    try {
      setError(null);

      // Validate input
      if (!address) {
        setError('Please connect your wallet');
        return;
      }

      if (!bookIds || bookIds.length === 0) {
        setError('No books selected');
        return;
      }

      // Clear any existing notifications - following MintRounds pattern
      if (currentNotificationId) {
        dismissNotification(currentNotificationId);
      }

      // Set simulation parameters to trigger simulation
      setSimulationParams(bookIds);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error opening books');
    }
  };

  // Execute transaction when simulation is successful
  useEffect(() => {
    if (simulationData && simulationParams && !simulationError) {
      // Execute openBooks transaction
      openBooksContract({
        address: contractAddress!,
        args: [simulationParams],
      });
    }
  }, [simulationData, simulationParams, simulationError, openBooksContract, contractAddress]);

  const isLoading = isSimulating || isOpening || isWaitingForOpen;

  return {
    openBooks,
    isSimulating,
    isOpening,
    isWaitingForOpen,
    openTxHash,
    error,
    isLoading,
  };
}