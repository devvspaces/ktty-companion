"use client";

import { useState, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import {
  useReadKttyWorldMintingGetUserBooksDetails,
  useWatchKttyWorldMintingBooksMintedEvent,
  useWatchKttyWorldMintingBookOpenedEvent
} from '@/src/generated';
import { getContractAddress } from '@/lib/contracts';

export interface UserBooksData {
  coreKttyCount: number;
  nullKttyCount: number;
  oneOfOneCount: number;
  goldenTicketCount: number;
  totalBooks: number;
  isLoading: boolean;
  error: string | null;
}

export function useUserBooks(): UserBooksData {
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  // Handle contract address loading with error boundary
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress('KttyWorldMinting');
  } catch (err) {
    console.error('Contract address not configured:', err);
    return {
      coreKttyCount: 0,
      nullKttyCount: 0,
      oneOfOneCount: 0,
      goldenTicketCount: 0,
      totalBooks: 0,
      isLoading: false,
      error: 'Contract not configured. Please check environment variables.',
    };
  }

  // Read user books details
  const {
    data: userBooksData,
    isLoading: isLoadingBooks,
    error: booksError,
    refetch: refetchUserBooks,
  } = useReadKttyWorldMintingGetUserBooksDetails({
    address: contractAddress,
    args: address ? [address] : undefined,
  });

  // Watch for real-time updates when books are minted
  useWatchKttyWorldMintingBooksMintedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      // Check if any of the logs involve the current user
      const userMinted = logs.some(log => 
        log.args.buyer?.toLowerCase() === address?.toLowerCase()
      );
      
      if (userMinted) {
        console.log('User minted books, refreshing user books data');
        refetchUserBooks();
      }
    },
  });

  // Watch for real-time updates when books are opened
  useWatchKttyWorldMintingBookOpenedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      // Check if any of the logs involve the current user
      const userOpened = logs.some(log => 
        log.args.owner?.toLowerCase() === address?.toLowerCase()
      );
      
      if (userOpened) {
        console.log('User opened books, refreshing user books data');
        refetchUserBooks();
      }
    },
  });

  // Handle errors
  useEffect(() => {
    if (booksError) {
      setError(booksError.message);
    } else {
      setError(null);
    }
  }, [booksError]);

  // Process book data to calculate counts by category
  const bookCounts = useMemo((): Omit<UserBooksData, 'isLoading' | 'error'> => {
    if (!userBooksData || !address) {
      return {
        coreKttyCount: 0,
        nullKttyCount: 0,
        oneOfOneCount: 0,
        goldenTicketCount: 0,
        totalBooks: 0,
      };
    }

    let coreKttyCount = 0;
    let nullKttyCount = 0;
    let oneOfOneCount = 0;
    let goldenTicketCount = 0;

    userBooksData.forEach((book) => {
      // Count books by NFT type
      switch (book.nftType) {
        case 'Core KTTY':
          coreKttyCount++;
          break;
        case 'Null KTTY':
          nullKttyCount++;
          break;
        case '1/1 KTTY':
          oneOfOneCount++;
          break;
        default:
          console.warn(`Unknown NFT type: ${book.nftType}`);
          break;
      }

      // Count golden tickets
      if (book.hasGoldenTicket) {
        goldenTicketCount++;
      }
    });

    return {
      coreKttyCount,
      nullKttyCount,
      oneOfOneCount,
      goldenTicketCount,
      totalBooks: userBooksData.length,
    };
  }, [userBooksData, address]);

  return {
    ...bookCounts,
    isLoading: isLoadingBooks,
    error,
  };
}