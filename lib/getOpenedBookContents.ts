"use client";

import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import {
  useReadKttyWorldBooksGetBook,
  kttyWorldBooksAbi,
} from "@/src/generated";
import { config } from "@/lib/wagmi";

/* -------------------------------------------------
   📦 Contract Addresses
-------------------------------------------------- */
export const BOOKS_ADDRESS = "0x9c17B842B39f9443F1108a147C4100a374Ff0E55";
export const KTTY_COMPANIONS_ADDRESS =
  "0xbBDAFc390E221bb55F47bfB354CBcAa8876CF57a";
export const TOOLS_ADDRESS = "0x3D9C67Ac7243480B656abCE6042E97416298Bd0e";
export const COLLECTIBLES_ADDRESS =
  "0x5F9096FDC7ffD34Df0d33041ef0e9655d0A61527";

/* -------------------------------------------------
   🧩 Minimal ABIs
-------------------------------------------------- */
export const erc721TokenUriAbi = [
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

export const erc1155UriAbi = [
  {
    type: "function",
    name: "uri",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

/* -------------------------------------------------
   🧠 Types
-------------------------------------------------- */
export interface KTTYData {
  id: number;
  name: string;
  image: string;
  family: string;
  breed: string;
  identity: string;
  expression: string;
  raw: Record<string, any> | null;
}

export interface ToolData {
  id: number;
  name: string;
  image: string;
  raw: Record<string, any> | null;
}

export interface TicketData {
  id: number;
  name: string;
  image: string;
  raw: Record<string, any> | null;
}

export interface OpenedBookData {
  series: string;
  ktty: KTTYData;
  tools: ToolData[];
  ticket: TicketData | null;
}

/* -------------------------------------------------
   🔧 Utility Helpers
-------------------------------------------------- */
function normalizeUri(uri: string): string {
  if (!uri) return "";
  if (uri.startsWith("ipfs://"))
    return `https://ipfs.io/ipfs/${uri.replace("ipfs://", "")}`;
  return uri;
}

async function safeFetchJson(uri: string) {
  if (!uri) return null;
  try {
    const res = await fetch(normalizeUri(uri));
    if (!res.ok) throw new Error(`Fetch failed: ${uri}`);
    return await res.json();
  } catch (err) {
    console.error("Metadata fetch failed:", err);
    return null;
  }
}

/* -------------------------------------------------
   ⚡ Hook — useOpenedBookContents
-------------------------------------------------- */
export function useOpenedBookContents(bookId?: bigint) {
  const [data, setData] = useState<OpenedBookData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 1️⃣ Use generated Books contract hook
  const {
    data: bookData,
    isLoading: isBookLoading,
    isError,
  } = useReadKttyWorldBooksGetBook({
    address: BOOKS_ADDRESS as `0x${string}`,
    args: bookId ? [bookId] : undefined,
    query: { enabled: Boolean(bookId) },
  });

  useEffect(() => {
    if (!bookId || !bookData || isBookLoading || isError) return;

    async function fetchContents() {
      setIsLoading(true);
      setError(null);

      try {
        const book = bookData as unknown as {
          nftId: bigint;
          toolIds: readonly bigint[];
          goldenTicketId: bigint;
          hasGoldenTicket: boolean;
          series: string;
        };

        const { nftId, toolIds, goldenTicketId, hasGoldenTicket, series } =
          book;

        /* 2️⃣ Fetch KTTY metadata */
        const kttyUri = (await readContract(config, {
          address: KTTY_COMPANIONS_ADDRESS as `0x${string}`,
          abi: erc721TokenUriAbi,
          functionName: "tokenURI",
          args: [nftId],
        })) as string;

        const kttyMeta = await safeFetchJson(kttyUri);

        const attributes: Record<string, string> = {};
        if (Array.isArray(kttyMeta?.attributes)) {
          for (const attr of kttyMeta.attributes) {
            if (attr.trait_type && attr.value)
              attributes[attr.trait_type] = attr.value;
          }
        }

        const ktty: KTTYData = {
          id: Number(nftId),
          name: kttyMeta?.name || `KTTY #${nftId}`,
          image: normalizeUri(kttyMeta?.image || ""),
          family: attributes["Family"] || "Unknown",
          breed: attributes["Breed"] || "Unknown",
          identity: attributes["Identity"] || "Unknown",
          expression: attributes["Expression"] || "Unknown",
          raw: kttyMeta,
        };

        /* 3️⃣ Fetch Tool metadata */
        const tools: ToolData[] = await Promise.all(
          [...toolIds].map(async (id) => {
            const uri = (await readContract(config, {
              address: TOOLS_ADDRESS as `0x${string}`,
              abi: erc1155UriAbi,
              functionName: "uri",
              args: [id],
            })) as string;
            const meta = await safeFetchJson(uri);
            return {
              id: Number(id),
              name: meta?.name || `Tool #${id}`,
              image: normalizeUri(meta?.image || ""),
              raw: meta,
            };
          })
        );

        /* 4️⃣ Fetch Golden Ticket */
        let ticket: TicketData | null = null;
        if (hasGoldenTicket) {
          const ticketUri = (await readContract(config, {
            address: COLLECTIBLES_ADDRESS as `0x${string}`,
            abi: erc721TokenUriAbi,
            functionName: "tokenURI",
            args: [goldenTicketId],
          })) as string;
          const meta = await safeFetchJson(ticketUri);
          ticket = {
            id: Number(goldenTicketId),
            name: meta?.name || "Golden Ticket",
            image: normalizeUri(meta?.image) || "/images/otherrewards/gtix.png",
            raw: meta,
          };
        }

        /* 5️⃣ Return structured result */
        setData({ series, ktty, tools, ticket });
      } catch (err) {
        console.error("Error in useOpenedBookContents:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContents();
  }, [bookId, bookData, isBookLoading, isError]);

  return { data, isLoading: isLoading || isBookLoading, error };
}
