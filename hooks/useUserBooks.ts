"use client";

import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import {
  useReadKttyWorldMintingGetUserBooksDetails,
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
}

export function useUserBooks(): UserBooksData {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [seriesMap, setSeriesMap] = useState<Record<string, string>>({}); // nftId → series
  const [metaLoading, setMetaLoading] = useState(false);

  // Handle contract address loading
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

  // Read raw user books
  const {
    data: userBooksData,
    isLoading: isLoadingBooks,
    error: booksError,
    refetch: refetchUserBooks,
  } = useReadKttyWorldMintingGetUserBooksDetails({
    address: contractAddress,
    args: address ? [address] : undefined,
  });

  // Watch mint/open events
  useWatchKttyWorldMintingBooksMintedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      const userMinted = logs.some(
        (log) => log.args.buyer?.toLowerCase() === address?.toLowerCase()
      );
      if (userMinted) refetchUserBooks();
    },
  });

  useWatchKttyWorldMintingBookOpenedEvent({
    address: contractAddress,
    onLogs: (logs) => {
      const userOpened = logs.some(
        (log) => log.args.owner?.toLowerCase() === address?.toLowerCase()
      );
      if (userOpened) refetchUserBooks();
    },
  });

  // Error state
  useEffect(() => {
    if (booksError) setError(booksError.message);
    else setError(null);
  }, [booksError]);

  // Fetch metadata → series
  useEffect(() => {
    async function fetchAllSeries() {
      if (!userBooksData) return;
      setMetaLoading(true);

      const entries = await Promise.all(
        userBooksData.map(async (book) => {
          try {
            const res = await fetch(`/api/metadata/${book.nftId.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch metadata");
            const meta = await res.json();
            return [book.nftId.toString(), meta.series] as const;
          } catch (err) {
            console.error("Metadata fetch failed for", book.nftId, err);
            return [book.nftId.toString(), "Unknown"] as const;
          }
        })
      );

      setSeriesMap(Object.fromEntries(entries));
      setMetaLoading(false);
    }

    fetchAllSeries();
  }, [userBooksData]);

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

    let counts = {
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
      const series = seriesMap[book.nftId.toString()];

      switch (series) {
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
        case "Blacksmith’s Manual":
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
  }, [userBooksData, address, seriesMap]);

  return {
    ...bookCounts,
    isLoading: isLoadingBooks || metaLoading,
    error,
  };
}
