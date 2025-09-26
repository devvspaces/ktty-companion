"use client";

import { useState, useEffect, useRef } from "react";
import { Reward } from "@/lib/reward";
import { BookDetail } from "@/hooks/useUserBooks";
import books from "@/lib/books.json";
import { extractBookIds } from "@/lib/bookSelection";

// Map series → color
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
  // ---------------- STATE ----------------
  const [step, setStep] = useState<"idle" | "animation" | "reward" | "grid">(
    "idle"
  );
  const [summonCount, setSummonCount] = useState(1);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // selected books
  const [selectedBooksForSummon, setSelectedBooksForSummon] = useState<
    BookDetail[]
  >([]);
  const [pendingSelection, setPendingSelection] = useState<
    Record<string, number>
  >({});

  // keep latest pending selection in a ref to avoid re-creating deps
  const pendingRef = useRef<Record<string, number>>({});
  useEffect(() => {
    pendingRef.current = pendingSelection;
  }, [pendingSelection]);

  // style
  const [selectedBookColor, setSelectedBookColor] = useState("ruby");
  const [selectedRarity, setSelectedRarity] = useState<
    "normal" | "rare" | "ultra" | undefined
  >();
  const [muted, setMuted] = useState(false);

  // typewriter
  const [cursor, setCursor] = useState(0);
  const [message] = useState(
    "These books contain a magic spell that will help you summon KTTYs! Open them to see what's inside."
  );

  // video ref
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // modal
  const [bookSelectOpen, setBookSelectOpen] = useState(false);
  const [countRequired, setCountRequired] = useState<number>(1);

  // ---------------- TYPEWRITER ----------------
  useEffect(() => {
    if (cursor < message.length) {
      const t = setTimeout(() => setCursor(cursor + 1), 35);
      return () => clearTimeout(t);
    }
  }, [cursor, message]);

  // ---------------- HELPERS ----------------
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

  // ---------------- ANIMATION STARTER ----------------
  function startSummonAnimation(
    selectedBooks: BookDetail[],
    selection: Record<string, number>
  ) {
    const count = selectedBooks.length;
    setSummonCount(count);
    setShowFlash(true);
    setFadeOut(false);
    setCurrentIndex(0);

    setSelectedBookColor(getBatchTheme(selection));

    // mock rewards for now
    const mock: Reward[] = selectedBooks.map((book) => {
      const color = seriesToColor[book.series] || "purple";
      const bookContent = books[book.id.toString() as keyof typeof books];
      return {
        id: book.nftId.toString(),
        name: bookContent.name,
        image: bookContent.image,
        family: bookContent.family,
        breed: bookContent.breed,
        identity: bookContent.identity,
        expression: bookContent.expression,
        borderColor: color,
        book: color,
        items: bookContent.items,
      };
    });

    setRewards(mock);

    // enter animation
    setTimeout(() => setStep("animation"), 500);
    setTimeout(() => setShowFlash(false), 2000);
  }

  // ---------------- HANDLERS ----------------
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
    } else {
      setStep("grid");
    }
  }

  function handleSkipToGrid() {
    setStep("grid");
  }

  // ---------------- MODAL ----------------
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

    const ids = extractBookIds(selectedBooks);

    try {
      // only trigger wallet signing & tx
      await openBooks(ids);
      // animation will start in watcher after tx success
    } catch (err) {
      console.error("openBooks failed:", err);
      setStep("idle");
    }
  }

  // ---------------- WATCHER: wait until tx done ----------------
  useEffect(() => {
    console.log("Watcher check:", {
      hasBooks: selectedBooksForSummon.length,
      openTxHash,
      isOpeningBooks,
      isWaitingForOpen,
      step,
    });

    if (
      selectedBooksForSummon.length > 0 &&
      openTxHash &&
      !isOpeningBooks &&
      !isWaitingForOpen
    ) {
      console.log("▶️  Starting animation after tx");
      startSummonAnimation(selectedBooksForSummon, pendingRef.current);
      setSelectedBooksForSummon([]);
      setPendingSelection({});
    }
  }, [
    openTxHash,
    isOpeningBooks,
    isWaitingForOpen,
    selectedBooksForSummon.length,
  ]);

  // ---------------- RETURN ----------------
  return {
    step,
    setStep,
    summonCount,
    rewards,
    currentIndex,
    showFlash,
    fadeOut,

    cursor,
    setCursor,
    message,

    selectedBookColor,
    selectedRarity,
    setSelectedRarity,
    setFadeOut,
    setShowFlash,

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
