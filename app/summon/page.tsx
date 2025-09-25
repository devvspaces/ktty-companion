"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import RewardCard from "@/components/RewardCard";
import RewardGrid from "@/components/RewardGrid";
import SummonBookModal from "@/components/SummonBookModal";
import { Reward } from "@/lib/reward";
import { minorRewards } from "@/lib/tools";
import { AnimatePresence, motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useUserBooks, BookDetail } from "@/hooks/useUserBooks";
import { useOpenBooks } from "@/hooks/useOpenBooks";
import { extractBookIds } from "@/lib/bookSelection";
import books from '@/lib/books.json'

type Book = {
  id: string;
  icon: string;
  amount: number;
  color: string;
};

// At the top of SummonsPage
const seriesToColor: Record<string, string> = {
  "Emerald Book": "emerald",
  "Ruby Book": "ruby",
  "Amethyst Book": "amethyst",
  "Blacksmith's Manual": "bsmith",
  "Lucky Tome": "lucky",
  "One Eye Bible": "oneeye",
  "Corrupted Tome": "corrupt",
};

// 🔹 Hook to detect screen size with 3 tiers
function useScreenSize() {
  const [screen, setScreen] = useState<"mobile" | "mid" | "desktop">("desktop");

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768) setScreen("mobile");
      else if (window.innerWidth < 1280)
        setScreen("mid"); // tablets & smaller laptops
      else setScreen("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return screen;
}

export default function SummonsPage() {
  const { address } = useAccount();
  const {
    amethystCount,
    emeraldCount,
    rubyCount,
    blacksmithCount,
    luckyCount,
    oneEyeCount,
    corruptCount,
    booksMap,
    totalBooks,
    isLoading,
    error,
  } = useUserBooks();

  const {
    openBooks,
    isLoading: isOpeningBooks,
    openTxHash,
    isWaitingForOpen,
  } = useOpenBooks();

  // State for selected books from the modal
  const [selectedBooksForSummon, setSelectedBooksForSummon] = useState<
    BookDetail[]
  >([]);
  const [pendingSelection, setPendingSelection] = useState<
    Record<string, number>
  >({});

  const inventory: Book[] = [
    {
      id: "Emerald Book",
      icon: "/images/mybag/emeraldbk.png",
      amount: emeraldCount,
      color: "emerald",
    },
    {
      id: "Ruby Book",
      icon: "/images/mybag/rubybk.png",
      amount: rubyCount,
      color: "ruby",
    },
    {
      id: "Amethyst Book",
      icon: "/images/mybag/amethystbk.png",
      amount: amethystCount,
      color: "amethyst",
    },
    {
      id: "Blacksmith's Manual",
      icon: "/images/mybag/bsmithbk.png",
      amount: blacksmithCount,
      color: "bsmith",
    },
    {
      id: "Lucky Tome",
      icon: "/images/mybag/luckybk.png",
      amount: luckyCount,
      color: "lucky",
    },
    {
      id: "One Eye Bible",
      icon: "/images/mybag/oneeyebk.png",
      amount: oneEyeCount,
      color: "oneeye",
    },
    {
      id: "Corrupted Tome",
      icon: "/images/mybag/cursebk.png",
      amount: corruptCount,
      color: "corrupt",
    },
  ];

  const message =
    "These books contain a magic spell that will help you summon KTTYs! Open them to see what's inside.";
  const [cursor, setCursor] = useState(0);

  const [step, setStep] = useState<"idle" | "animation" | "reward" | "grid">(
    "idle"
  );
  const [summonCount, setSummonCount] = useState<number>(1);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  const [muted, setMuted] = useState(false); // summon video respects this toggle
  const [selectedBookColor, setSelectedBookColor] = useState<string>("ruby");
  const [selectedRarity, setSelectedRarity] = useState<
    "normal" | "rare" | "ultra" | undefined
  >(undefined);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screen = useScreenSize();

  // Force idle video remount when returning to idle to avoid any stalled playback
  const [idleKey, setIdleKey] = useState(0);
  useEffect(() => {
    if (step === "idle") setIdleKey((k) => k + 1);
  }, [step]);

  // Idle background swap (mobile + mid both use mobile version)
  const idleVideo =
    screen === "desktop" ? "/video/summonhomew.mp4" : "/video/summonhomev.mp4";

  // Summon animation swaps (mobile + mid use mobile animations)
  const summonVideos: Record<
    string,
    Record<"normal" | "rare" | "ultra", string>
  > = {
    ruby: {
      normal:
        screen === "desktop"
          ? "/video/animations/desktop/normal/normalruby.mp4"
          : "/video/animations/mobile/normal/normalruby.mp4",
      rare:
        screen === "desktop"
          ? "/video/animations/desktop/rare/rareruby.mp4"
          : "/video/animations/mobile/rare/rareruby.mp4",
      ultra:
        screen === "desktop"
          ? "/video/animations/desktop/ultra/ultraruby.mp4"
          : "/video/animations/mobile/ultra/ultraruby.mp4",
    },
    emerald: {
      normal:
        screen === "desktop"
          ? "/video/animations/desktop/normal/normalemerald.mp4"
          : "/video/animations/mobile/normal/normalemerald.mp4",
      rare:
        screen === "desktop"
          ? "/video/animations/desktop/rare/rareemerald.mp4"
          : "/video/animations/mobile/rare/rareemerald.mp4",
      ultra:
        screen === "desktop"
          ? "/video/animations/desktop/ultra/ultraemerald.mp4"
          : "/video/animations/mobile/ultra/ultraemerald.mp4",
    },
    amethyst: {
      normal:
        screen === "desktop"
          ? "/video/animations/desktop/normal/normalamethyst.mp4"
          : "/video/animations/mobile/normal/normalamethyst.mp4",
      rare:
        screen === "desktop"
          ? "/video/animations/desktop/rare/rareamethyst.mp4"
          : "/video/animations/mobile/rare/rareamethyst.mp4",
      ultra:
        screen === "desktop"
          ? "/video/animations/desktop/ultra/ultraamethyst.mp4"
          : "/video/animations/mobile/ultra/ultraamethyst.mp4",
    },
    bsmith: {
      normal:
        screen === "desktop"
          ? "/video/animations/desktop/normal/normalbsmith.mp4"
          : "/video/animations/mobile/normal/normalbsmith.mp4",
      rare:
        screen === "desktop"
          ? "/video/animations/desktop/rare/rarebsmith.mp4"
          : "/video/animations/mobile/rare/rarebsmith.mp4",
      ultra:
        screen === "desktop"
          ? "/video/animations/desktop/ultra/ultrabsmith.mp4"
          : "/video/animations/mobile/ultra/ultrabsmith.mp4",
    },
    corrupt: {
      normal:
        screen === "desktop"
          ? "/video/animations/desktop/normal/normalcorrupt.mp4"
          : "/video/animations/mobile/normal/normalcorrupt.mp4",
      rare:
        screen === "desktop"
          ? "/video/animations/desktop/rare/rarecorrupt.mp4"
          : "/video/animations/mobile/rare/rarecorrupt.mp4",
      ultra:
        screen === "desktop"
          ? "/video/animations/desktop/ultra/ultracorrupt.mp4"
          : "/video/animations/mobile/ultra/ultracorrupt.mp4",
    },
    lucky: {
      normal:
        screen === "desktop"
          ? "/video/animations/desktop/normal/normallucky.mp4"
          : "/video/animations/mobile/normal/normallucky.mp4",
      rare:
        screen === "desktop"
          ? "/video/animations/desktop/rare/rarelucky.mp4"
          : "/video/animations/mobile/rare/rarelucky.mp4",
      ultra:
        screen === "desktop"
          ? "/video/animations/desktop/ultra/ultralucky.mp4"
          : "/video/animations/mobile/ultra/ultralucky.mp4",
    },
    oneeye: {
      normal:
        screen === "desktop"
          ? "/video/animations/desktop/normal/normaloneeye.mp4"
          : "/video/animations/mobile/normal/normaloneeye.mp4",
      rare:
        screen === "desktop"
          ? "/video/animations/desktop/rare/rareoneeye.mp4"
          : "/video/animations/mobile/rare/rareoneeye.mp4",
      ultra:
        screen === "desktop"
          ? "/video/animations/desktop/ultra/ultraoneeye.mp4"
          : "/video/animations/mobile/ultra/ultraoneeye.mp4",
    },
  };

  // Typewriter effect
  useEffect(() => {
    if (cursor < message.length) {
      const timer = setTimeout(() => setCursor(cursor + 1), 35);
      return () => clearTimeout(timer);
    }
  }, [cursor, message]);

  function getBatchTheme(selection: Record<string, number>, inventory: Book[]) {
    const hierarchy = ["corrupt", "lucky", "bsmith", "oneeye"];

    // 🔹 First pass: check hierarchy
    for (const key of hierarchy) {
      const book = inventory.find((b) => b.color === key);
      if (book && selection[book.id] > 0) {
        return key;
      }
    }

    // 🔹 If only base trio (Amethyst/Ruby/Emerald), pick random
    const baseTrio = ["amethyst", "ruby", "emerald"];
    const availableBase = baseTrio.filter((color) =>
      inventory.some((b) => b.color === color && selection[b.id] > 0)
    );

    if (availableBase.length > 0) {
      return availableBase[Math.floor(Math.random() * availableBase.length)];
    }

    // 🔹 Fallback (shouldn’t happen, but default safe)
    return "ruby";
  }

  // Summon setup - now called after successful book opening
  const handleSummon = (
    selectedBooks: BookDetail[],
    selection: Record<string, number>
  ) => {
    const count = selectedBooks.length;
    setSummonCount(count);
    setShowFlash(true);
    setFadeOut(false);
    setCurrentIndex(0);

    const theme = getBatchTheme(selection, inventory);
    setSelectedBookColor(theme);

    // Create rewards using the actual selected books with book IDs
    const mockRewards: Reward[] = selectedBooks.map((book, i) => {
      const color = seriesToColor[book.series] || "purple"; // ✅ safe lookup
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

    setRewards(mockRewards);

    setTimeout(() => {
      setStep("animation");
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 500);

    setTimeout(() => setShowFlash(false), 2000);
  };

  const openModal = (count: number) => {
    setPendingCount(count);
    setShowModal(true);
  };

  const handleBack = () => {
    setStep("idle");
    setFadeOut(false);
    setRewards([]);
  };

  const skipSummon = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStep("reward");
      setShowFlash(false);
    }, 800);
  };

  const handleNextReward = () => {
    if (currentIndex < rewards.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowFlash(false);
      }, 500);
    } else {
      setStep("grid");
    }
  };

  const handleSkipToGrid = () => setStep("grid");

  // Handle book selection and opening
  const handleBookSelection = async (
    selectedBooks: BookDetail[],
    selection: Record<string, number>
  ) => {
    try {
      // Store the selected books and selection for later use
      setSelectedBooksForSummon(selectedBooks);
      setPendingSelection(selection);

      // Extract book IDs and open books
      const bookIds = extractBookIds(selectedBooks);
      await openBooks(bookIds);
    } catch (error) {
      console.error("Error opening books:", error);
    }
  };

  // Watch for successful book opening and trigger animation
  useEffect(() => {
    // Check if we have selected books, no longer opening, and we have a successful tx
    if (
      selectedBooksForSummon.length > 0 &&
      !isOpeningBooks &&
      !isWaitingForOpen &&
      openTxHash
    ) {
      // Trigger the summon animation with the selected books
      handleSummon(selectedBooksForSummon, pendingSelection);

      // Clear the selected books after using them
      setSelectedBooksForSummon([]);
      setPendingSelection({});
    }
  }, [
    selectedBooksForSummon,
    isOpeningBooks,
    isWaitingForOpen,
    openTxHash,
    pendingSelection,
  ]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Idle background */}
      {step === "idle" && (
        <div className="absolute inset-0">
          <video
            key={`${idleVideo}-${idleKey}`}
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.play().catch(() => {});
              }
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover fade-video"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              if (v.paused) v.play().catch(() => {});
            }}
          >
            <source src={idleVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Floating title */}
      {step === "idle" && (
        <div className="absolute top-[115px] md:top-[110px] lg:top-[200px] w-full z-[49] flex justify-center">
          <h1 className="text-white drop-shadow-lg text-3xl md:text-4xl lg:text-6xl font-bold animate-float">
            KTTY Summoning Altar
          </h1>
        </div>
      )}

      {/* Idle screen */}
      {step === "idle" && (
        <div className="relative z-10 flex flex-col h-full pointer-events-auto">
          <div className="flex-1 flex flex-col justify-end pb-6">
            <div className="mx-4 mb-4 bg-black/70 border-2 border-purple-500 rounded-md p-3 flex items-stretch gap-3 min-h-[120px] md:min-h-[200px] lg:min-h-[250px]">
              <div className="relative aspect-square h-full flex-shrink-0 bg-white/10 rounded">
                <Image
                  src="/images/kttyboy.png"
                  alt="Character Portrait"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-sm sm:text-base md:text-3xl leading-relaxed">
                {message.slice(0, cursor)}
                <span className="animate-pulse">▋</span>
              </p>
            </div>

            <div className="flex justify-center gap-4 px-4">
              <button
                onClick={() => openModal(1)}
                className="flex-1 md:px-6 py-3 bg-purple-600 rounded-md font-semibold text-white hover:bg-purple-500 transition"
              >
                Summon x1
              </button>
              <button
                onClick={() => openModal(5)}
                className="flex-1 md:px-6 py-3 bg-purple-600 rounded-md font-semibold text-white hover:bg-purple-500 transition"
              >
                Summon x5
              </button>
              <button
                onClick={() => openModal(10)}
                className="flex-1 md:px-6 py-3 bg-purple-600 rounded-md font-semibold text-white hover:bg-purple-500 transition"
              >
                Summon x10
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flash overlay */}
      {showFlash && (
        <div className="fixed inset-0 bg-white z-[10020] animate-flashFade pointer-events-none" />
      )}

      {/* Summon animation */}
      {step === "animation" && (
        <>
          {/* Sound Toggle */}
          <button
            onClick={() => setMuted((m) => !m)}
            className="fixed top-4 left-4 z-[10015] p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
          >
            {muted ? (
              <SpeakerXMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6 text-white" />
            )}
          </button>

          <div
            className={`fixed inset-0 z-[10000] pointer-events-none transition-opacity duration-1500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
            onTransitionEnd={() => {
              if (fadeOut) setStep("reward");
            }}
          >
            <video
              key={`${selectedBookColor}-${selectedRarity ?? "normal"}`} // ensure rerender when rarity changes
              ref={(el) => {
                videoRef.current = el;
              }}
              autoPlay
              muted={muted}
              playsInline
              preload="auto"
              className="w-full h-full object-cover fade-video"
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                if (v.paused) v.play().catch(() => {});
              }}
              onTimeUpdate={(e) => {
                const current = e.currentTarget.currentTime;
                if (current >= 12 && !fadeOut) setFadeOut(true);
              }}
            >
              <source
                src={
                  summonVideos[selectedBookColor]?.[
                    selectedRarity ?? "normal"
                  ] ?? summonVideos["ruby"].normal
                }
                type="video/mp4"
              />
            </video>
          </div>

          {/* Skip button */}
          <button
            onClick={skipSummon}
            className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition animate-fadeIn delay-1000 cursor-pointer"
          >
            Skip &gt;
          </button>
        </>
      )}

      {/* Reward screen */}
      {step === "reward" && (
        <AnimatePresence mode="wait">
          <RewardCard
            reward={rewards[currentIndex]}
            onBack={handleBack}
            onSummonAgain={() => openModal(summonCount)}
            mode={summonCount > 1 ? "multi" : "single"}
            onNext={handleNextReward}
            isLast={currentIndex === rewards.length - 1}
            onSkipToGrid={summonCount > 1 ? handleSkipToGrid : undefined}
          />
        </AnimatePresence>
      )}

      {/* Final grid */}
      {step === "grid" && (
        <RewardGrid
          rewards={rewards}
          onBack={handleBack}
          onSummonAgain={() => openModal(summonCount)}
        />
      )}

      {/* Book selection modal */}
      <SummonBookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={(selectedBooks, selection) => {
          setShowModal(false);
          handleBookSelection(selectedBooks, selection);
        }}
        countRequired={pendingCount || 0}
        inventory={inventory}
        booksMap={booksMap || {}}
      />

      <style jsx>{`
        @keyframes flashFade {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-flashFade {
          animation: flashFade 1.5s ease-in-out forwards;
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 1.5s forwards;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .fade-video {
          opacity: 0;
          animation: fadeVideoIn 0.6s ease forwards;
        }
        @keyframes fadeVideoIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
