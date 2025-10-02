"use client";

import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import {
  useReadKttyWorldMintingGetUserBooksDetails,
  useReadKttyWorldMintingGetUserBooks,
  useWatchKttyWorldMintingBooksMintedEvent,
  useWatchKttyWorldMintingBookOpenedEvent,
  useReadKttyWorldBooksGetUserBooks,
  useWatchKttyWorldBooksTransferEvent,
} from "@/src/generated";
import { getContractAddress } from "@/lib/contracts";

export interface UserBooksData {
  amethystCount: number;
  emeraldCount: number;
  rubyCount: number;
  oneEyeCount: number;
  blacksmithCount: number;
  luckyCount: number;
  corruptCount: number;
  totalBooks: number;
  isLoading: boolean;
  error: string | null;
  booksMap?: Record<string, BookDetail[]>;
}

export interface BookDetail {
  id: bigint; // The actual book ID from getUserBooks
  nftId: bigint; // The associated NFT ID
  toolIds: readonly [bigint, bigint, bigint];
  goldenTicketId: bigint;
  hasGoldenTicket: boolean;
  series: string;
}

const getUserNFTs = async (walletAddress: string): Promise<number[]> => {
  try {
    const response = await fetch(`/api/user-nfts?address=${encodeURIComponent(walletAddress)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.nftIds || [];
  } catch (error) {
    console.error('Error fetching NFTs from API:', error);
    throw error;
  }
}

export function useUserBooks(): UserBooksData {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [userBookIds, setUserBookIds] = useState<number[]>([]);
  const [isLoadingBookIds, setIsLoadingBookIds] = useState(false);

  // Handle contract address
  let contractAddress: `0x${string}` | undefined;
  try {
    contractAddress = getContractAddress("KttyWorldMinting");
  } catch (err) {
    console.error("Contract address not configured:", err);
    return {
      amethystCount: 0,
      emeraldCount: 0,
      rubyCount: 0,
      oneEyeCount: 0,
      blacksmithCount: 0,
      luckyCount: 0,
      corruptCount: 0,
      totalBooks: 0,
      isLoading: false,
      error: "Contract not configured. Please check environment variables.",
    };
  }

  // Read user book details (only when address is present)
  const {
    data: userBooksData,
    isLoading: isLoadingBooks,
    error: booksError,
    refetch: refetchUserBooks,
  } = useReadKttyWorldMintingGetUserBooksDetails({
    address: contractAddress,
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) }, // prevent call when address is null
  });

  // Read user book IDs
  // const {
  //   data: userBookIds,
  //   isLoading: isLoadingBookIds,
  //   error: bookIdsError,
  //   refetch: refetchBookIds,
  // } = useReadKttyWorldBooksGetUserBooks({
  //   address: "0x9c17B842B39f9443F1108a147C4100a374Ff0E55",
  //   args: address ? [address] : undefined,
  //   query: {
  //     enabled: Boolean(address),
  //     retry: 3,
  //     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  //     staleTime: 5000,
  //     refetchOnWindowFocus: false,
  //   },
  // });

  // Use getUserNFTs async method instead
  useEffect(() => {
    const fetchUserBookIds = async () => {
      if (!address) {
        setUserBookIds([]);
        return;
      }

      setIsLoadingBookIds(true);
      try {
        const nftIds = await getUserNFTs(address);
        setUserBookIds(nftIds);
        setError(null);
      } catch (err) {
        console.error('Error fetching user book IDs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch user book IDs');
        setUserBookIds([]);
      } finally {
        setIsLoadingBookIds(false);
      }
    };

    fetchUserBookIds();
  }, [address]);

  const refetchBookIds = async () => {
    if (!address) return;
    
    setIsLoadingBookIds(true);
    try {
      const nftIds = await getUserNFTs(address);
      setUserBookIds(nftIds);
      setError(null);
    } catch (err) {
      console.error('Error refetching user book IDs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user book IDs');
    } finally {
      setIsLoadingBookIds(false);
    }
  };

  // Watch mint/open events
  useWatchKttyWorldMintingBooksMintedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      const userMinted = logs.some(
        (log) => log.args.buyer?.toLowerCase() === address?.toLowerCase()
      );
      if (userMinted) {
        refetchUserBooks();
        refetchBookIds();
      }
    },
  });

  useWatchKttyWorldBooksTransferEvent({
    address: "0x9c17B842B39f9443F1108a147C4100a374Ff0E55",
    onLogs: (logs) => {
      const userTransferred = logs.some(
        (log) =>
          log.args.to?.toLowerCase() === address?.toLowerCase() ||
          log.args.from?.toLowerCase() === address?.toLowerCase()
      );
      if (userTransferred) {
        refetchUserBooks();
        refetchBookIds();
      }
    },
  });
  

  useWatchKttyWorldMintingBookOpenedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      const userOpened = logs.some(
        (log) => log.args.owner?.toLowerCase() === address?.toLowerCase()
      );
      if (userOpened) {
        refetchUserBooks();
        refetchBookIds();
      }
    },
  });

  // Error state
  useEffect(() => {
    if (booksError) setError(booksError.message);
  }, [booksError]);

  // Count by series
  const bookCounts = useMemo((): Omit<UserBooksData, "isLoading" | "error"> => {
    if (!userBooksData || !address) {
      return {
        amethystCount: 0,
        emeraldCount: 0,
        rubyCount: 0,
        oneEyeCount: 0,
        blacksmithCount: 0,
        luckyCount: 0,
        corruptCount: 0,
        totalBooks: 0,
      };
    }

    const counts = {
      amethystCount: 0,
      emeraldCount: 0,
      rubyCount: 0,
      oneEyeCount: 0,
      blacksmithCount: 0,
      luckyCount: 0,
      corruptCount: 0,
      totalBooks: userBooksData.length,
    };

    userBooksData.forEach((book) => {
      switch (book.series) {
        case "Amethyst Book":
          counts.amethystCount++;
          break;
        case "Emerald Book":
          counts.emeraldCount++;
          break;
        case "Ruby Book":
          counts.rubyCount++;
          break;
        case "One Eye Bible":
          counts.oneEyeCount++;
          break;
        case "Blacksmith's Manual":
          counts.blacksmithCount++;
          break;
        case "Lucky Tome":
          counts.luckyCount++;
          break;
        case "Corrupted Tome":
          counts.corruptCount++;
          break;
        default:
          break;
      }
    });

    return counts;
  }, [userBooksData, address]);

  // Build map of series → books
  const booksMap = useMemo(() => {
    if (!userBooksData || !userBookIds || userBookIds.length === 0) return {};

    const map: Record<string, BookDetail[]> = {};
    userBooksData.forEach((book, idx) => {
      if (!map[book.series]) map[book.series] = [];
      map[book.series].push({
        id: BigInt(userBookIds[idx] || 0),
        nftId: book.nftId,
        toolIds: book.toolIds,
        goldenTicketId: book.goldenTicketId,
        hasGoldenTicket: book.hasGoldenTicket,
        series: book.series,
      });
    });

    return map;
  }, [userBooksData, userBookIds]);

  return {
    ...bookCounts,
    booksMap,
    isLoading: isLoadingBooks || isLoadingBookIds,
    error,
  };
}
