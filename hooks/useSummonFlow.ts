"use client";

import { useState, useEffect, useRef } from "react";
import { Reward } from "@/lib/reward";
import { BookDetail } from "@/hooks/useUserBooks";
import { extractBookIds } from "@/lib/bookSelection";
import { config } from "@/lib/wagmi"; // 👈 your wagmi.ts
import { readContract } from "wagmi/actions";

// Contract addresses
const BOOKS_ADDRESS = "0x9c17B842B39f9443F1108a147C4100a374Ff0E55";
const KTTY_COMPANIONS_ADDRESS = "0xbBDAFc390E221bb55F47bfB354CBcAa8876CF57a";
const TOOLS_ADDRESS = "0x3D9C67Ac7243480B656abCE6042E97416298Bd0e";
const COLLECTIBLES_ADDRESS = "0x5F9096FDC7ffD34Df0d33041ef0e9655d0A61527";

function normalizeSeriesName(name: string) {
  return name
    .replace(/[’']/g, "'") // normalize curly quotes to straight
    .trim();
}

// Minimal ABIs
const booksAbi = [
  {
    type: "function",
    name: "getBook",
    stateMutability: "view",
    inputs: [{ name: "bookId", type: "uint256" }],
    outputs: [
      {
        components: [
          { name: "nftId", type: "uint256" },
          { name: "toolIds", type: "uint256[3]" },
          { name: "goldenTicketId", type: "uint256" },
          { name: "hasGoldenTicket", type: "bool" },
          { name: "series", type: "string" },
        ],
        type: "tuple",
      },
    ],
  },
] as const;

const erc721TokenUriAbi = [
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

const erc1155UriAbi = [
  {
    type: "function",
    name: "uri",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

// Utility functions
function normalizeUri(uri: string) {
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

const seriesToColor: Record<string, string> = {
  "Emerald Book": "emerald",
  "Ruby Book": "ruby",
  "Amethyst Book": "amethyst",
  "Blacksmith's Manual": "bsmith",
  "Lucky Tome": "lucky",
  "One Eye Bible": "oneeye",
  "Corrupted Tome": "corrupt",
};

export function useSummonFlow({
  inventory,
  openBooks,
  isOpeningBooks,
  isWaitingForOpen,
  openTxHash,
}: {
  inventory: { id: string; icon: string; amount: number; color: string }[];
  openBooks: (ids: bigint[]) => Promise<void>;
  isOpeningBooks: boolean;
  isWaitingForOpen: boolean;
  openTxHash: string | null;
}) {
  const [step, setStep] = useState<"idle" | "animation" | "reward" | "grid">(
    "idle"
  );
  const [summonCount, setSummonCount] = useState(1);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [selectedBooksForSummon, setSelectedBooksForSummon] = useState<
    BookDetail[]
  >([]);
  const [pendingSelection, setPendingSelection] = useState<
    Record<string, number>
  >({});
  const pendingRef = useRef<Record<string, number>>({});
  useEffect(() => {
    pendingRef.current = pendingSelection;
  }, [pendingSelection]);

  const [selectedBookColor, setSelectedBookColor] = useState("ruby");
  const [selectedRarity, setSelectedRarity] = useState<
    "normal" | "rare" | "ultra" | undefined
  >();
  const [muted, setMuted] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [message] = useState(
    "These books contain a magic spell that will help you summon KTTYs! Open them to see what's inside."
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [bookSelectOpen, setBookSelectOpen] = useState(false);
  const [countRequired, setCountRequired] = useState<number>(1);

  useEffect(() => {
    if (cursor < message.length) {
      const t = setTimeout(() => setCursor((c) => c + 1), 35);
      return () => clearTimeout(t);
    }
  }, [cursor, message]);

  function getBatchTheme(selection: Record<string, number>) {
    const hierarchy = ["corrupt", "lucky", "bsmith", "oneeye"];
    for (const key of hierarchy) {
      const book = inventory.find((b) => b.color === key);
      if (book && selection[book.id] > 0) return key;
    }
    const base = ["amethyst", "ruby", "emerald"];
    const availableBase = base.filter((c) =>
      inventory.some((b) => b.color === c && selection[b.id] > 0)
    );
    return availableBase.length
      ? availableBase[Math.floor(Math.random() * availableBase.length)]
      : "ruby";
  }

  // 🚀 Fetch on-chain contents per book
  async function fetchContents(bookId: bigint) {
    try {
      const bookData = (await readContract(config, {
        address: BOOKS_ADDRESS as `0x${string}`,
        abi: booksAbi,
        functionName: "getBook",
        args: [bookId],
      })) as {
        nftId: bigint;
        toolIds: readonly bigint[];
        goldenTicketId: bigint;
        hasGoldenTicket: boolean;
        series: string;
      };

      const { nftId, toolIds, goldenTicketId, hasGoldenTicket, series } =
        bookData;

      // KTTY
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

      const kttyReward = {
        id: nftId.toString(),
        name: kttyMeta?.name || `KTTY #${nftId}`,
        image: normalizeUri(kttyMeta?.image),
        family: attributes["Family"] || "Unknown",
        breed: attributes["Breed"] || "Unknown",
        identity: attributes["Identity"] || "Unknown",
        expression: attributes["Expression"] || "Unknown",
      };

      // Tools
      const tools = await Promise.all(
        [...toolIds].map(async (id) => {
          const uri = (await readContract(config, {
            address: TOOLS_ADDRESS as `0x${string}`,
            abi: erc1155UriAbi,
            functionName: "uri",
            args: [id],
          })) as string;
          const meta = await safeFetchJson(uri);
          return {
            name: meta?.name || `Tool #${id}`,
            image: normalizeUri(meta?.image),
          };
        })
      );

      // Ticket
      let ticket: { name: string; image: string } | null = null;
      if (hasGoldenTicket) {
        const ticketUri = (await readContract(config, {
          address: COLLECTIBLES_ADDRESS as `0x${string}`,
          abi: erc721TokenUriAbi,
          functionName: "tokenURI",
          args: [goldenTicketId],
        })) as string;
        const meta = await safeFetchJson(ticketUri);
        ticket = {
          name: meta?.name || "Golden Ticket",
          image: normalizeUri(meta?.image) || "/images/otherrewards/gtix.png",
        };
      }

      const normalizedSeries = normalizeSeriesName(series);
      const color = seriesToColor[normalizedSeries] || "purple";

      return {
        id: kttyReward.id,
        name: kttyReward.name,
        image: kttyReward.image,
        family: kttyReward.family,
        breed: kttyReward.breed,
        identity: kttyReward.identity,
        expression: kttyReward.expression,
        borderColor: color,
        book: color,
        items: [...tools, ...(ticket ? [ticket] : [])],
      } as Reward;
    } catch (err) {
      console.error("fetchBookContents failed:", err);
      return null;
    }
  }

  async function startSummonAnimation(
    selectedBooks: BookDetail[],
    selection: Record<string, number>
  ) {
    const count = selectedBooks.length;
    setSummonCount(count);
    setShowFlash(true);
    setFadeOut(false);
    setCurrentIndex(0);

    const theme = getBatchTheme(selection);
    setSelectedBookColor(theme);

    const rand = Math.random();
    let randomTier: "normal" | "rare" | "ultra";
    if (rand < 0.6) randomTier = "normal";
    else if (rand < 0.9) randomTier = "rare";
    else randomTier = "ultra";
    setSelectedRarity(randomTier);

    // ✅ Step 3: resolve metadata only *after* openBooks() succeeds
    const cached = (window as any).__prefetchedBookData || {};
    const rewardsArray: Reward[] = [];

    for (const b of selectedBooks) {
      const bookData = cached[b.id.toString()];
      if (!bookData) continue;

      const { nftId, toolIds, goldenTicketId, hasGoldenTicket, series } =
        bookData;

      // Fetch the freshly-minted Companion metadata
      const kttyUri = await readContract(config, {
        address: KTTY_COMPANIONS_ADDRESS as `0x${string}`,
        abi: erc721TokenUriAbi,
        functionName: "tokenURI",
        args: [nftId],
      });
      const kttyMeta = await safeFetchJson(kttyUri);

      const attributes: Record<string, string> = {};
      if (Array.isArray(kttyMeta?.attributes)) {
        for (const attr of kttyMeta.attributes) {
          if (attr.trait_type && attr.value)
            attributes[attr.trait_type] = attr.value;
        }
      }

      const kttyReward = {
        id: nftId.toString(),
        name: kttyMeta?.name || `KTTY #${nftId}`,
        image: normalizeUri(kttyMeta?.image),
        family: attributes["Family"] || "Unknown",
        breed: attributes["Breed"] || "Unknown",
        identity: attributes["Identity"] || "Unknown",
        expression: attributes["Expression"] || "Unknown",
      };

      // Tools
      const tools = await Promise.all(
        [...toolIds].map(async (id) => {
          const uri = await readContract(config, {
            address: TOOLS_ADDRESS as `0x${string}`,
            abi: erc1155UriAbi,
            functionName: "uri",
            args: [id],
          });
          const meta = await safeFetchJson(uri);
          return {
            name: meta?.name || `Tool #${id}`,
            image: normalizeUri(meta?.image),
          };
        })
      );

      // Ticket
      let ticket: { name: string; image: string } | null = null;
      if (hasGoldenTicket) {
        const ticketUri = await readContract(config, {
          address: COLLECTIBLES_ADDRESS as `0x${string}`,
          abi: erc721TokenUriAbi,
          functionName: "tokenURI",
          args: [BigInt(1)],
        });
        const meta = await safeFetchJson(ticketUri);
        ticket = {
          name: meta?.name || "Golden Ticket",
          image: normalizeUri(meta?.image) || "/images/otherrewards/gtix.png",
        };
      }

      const normalizedSeries = normalizeSeriesName(series);
      const color = seriesToColor[normalizedSeries] || "purple";

      rewardsArray.push({
        id: kttyReward.id,
        name: kttyReward.name,
        image: kttyReward.image,
        family: kttyReward.family,
        breed: kttyReward.breed,
        identity: kttyReward.identity,
        expression: kttyReward.expression,
        borderColor: color,
        book: color,
        items: [...tools, ...(ticket ? [ticket] : [])],
      });
    }

    // clear cache after usage
    delete (window as any).__prefetchedBookData;

    setRewards(rewardsArray);
    setTimeout(() => setStep("animation"), 500);
  }

  function handleBack() {
    setStep("idle");
    setFadeOut(false);
    setRewards([]);
  }

  function skipSummon() {
    setFadeOut(true);
    setTimeout(() => {
      setStep("reward");
      setShowFlash(false);
    }, 800);
  }

  function handleNextReward() {
    if (currentIndex < rewards.length - 1) {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setShowFlash(false);
      }, 500);
    } else setStep("grid");
  }

  function handleSkipToGrid() {
    setStep("grid");
  }

  function openBookSelect(count: number) {
    setCountRequired(count);
    setBookSelectOpen(true);
  }
  function closeBookSelect() {
    setBookSelectOpen(false);
  }

  async function confirmBookSelect(
    selectedBooks: BookDetail[],
    selection: Record<string, number>
  ) {
    setBookSelectOpen(false);
    setSelectedBooksForSummon(selectedBooks);
    setPendingSelection(selection);

    if (videoRef.current) {
      try {
        await videoRef.current.play();
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch (err) {
        console.warn("⚠️ pre-play failed:", err);
      }
    }

    const ids = extractBookIds(selectedBooks);
    const preFetchedBookData: Record<string, any> = {};

    // ✅ Step 1: prefetch only getBook() before burning
    try {
      for (const book of selectedBooks) {
        const bookData = await readContract(config, {
          address: BOOKS_ADDRESS as `0x${string}`,
          abi: booksAbi,
          functionName: "getBook",
          args: [book.id as unknown as bigint],
        });
        preFetchedBookData[book.id.toString()] = bookData;
      }
    } catch (err) {
      console.error("⚠️ getBook prefetch failed (safe to continue):", err);
    }

    try {
      // 🔥 Step 2: openBooks (burn occurs here)
      await openBooks(ids);
      // temporarily store prefetch cache for use after tx confirms
      (window as any).__prefetchedBookData = preFetchedBookData;
    } catch (err) {
      console.error("openBooks failed:", err);
      setStep("idle");
    }
  }

  useEffect(() => {
    if (
      selectedBooksForSummon.length > 0 &&
      openTxHash &&
      !isOpeningBooks &&
      !isWaitingForOpen
    ) {
      startSummonAnimation(selectedBooksForSummon, pendingRef.current);
      setSelectedBooksForSummon([]);
      setPendingSelection({});
      requestAnimationFrame(() => {
        videoRef.current
          ?.play()
          .catch((err) => console.log("resume play failed", err));
      });
    }
  }, [
    openTxHash,
    isOpeningBooks,
    isWaitingForOpen,
    selectedBooksForSummon.length,
  ]);

  return {
    step,
    setStep,
    summonCount,
    rewards,
    currentIndex,
    showFlash,
    setShowFlash,
    fadeOut,
    setFadeOut,
    cursor,
    setCursor,
    message,
    selectedBookColor,
    selectedRarity,
    setSelectedRarity,
    muted,
    setMuted,
    handleBack,
    skipSummon,
    handleNextReward,
    handleSkipToGrid,
    bookSelectOpen,
    openBookSelect,
    closeBookSelect,
    confirmBookSelect,
    countRequired,
    videoRef,
  };
}
