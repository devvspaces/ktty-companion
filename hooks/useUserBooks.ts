"use client";

import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import {
  useReadKttyWorldMintingGetUserBooksDetails,
  useReadKttyWorldMintingGetUserBooks,
  useWatchKttyWorldMintingBooksMintedEvent,
  useWatchKttyWorldMintingBookOpenedEvent,
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

export function useUserBooks(): UserBooksData {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);

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
  const {
    data: userBookIds,
    isLoading: isLoadingBookIds,
    error: bookIdsError,
    refetch: refetchBookIds,
  } = useReadKttyWorldMintingGetUserBooks({
    address: contractAddress,
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  console.error(bookIdsError)

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
    else if (bookIdsError) setError(bookIdsError.message);
    else setError(null);
  }, [booksError, bookIdsError]);

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
    if (!userBooksData || !userBookIds) return {};

    const map: Record<string, BookDetail[]> = {};
    userBooksData.forEach((book, idx) => {
      if (!map[book.series]) map[book.series] = [];
      map[book.series].push({
        id: userBookIds[idx],
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
