"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import IdleView from "@/components/SummonsPage/components/IdleView";
import AnimationView from "@/components/SummonsPage/components/AnimationView";
import RewardScreenView from "@/components/SummonsPage/components/RewardScreenView";
import FinalGridView from "@/components/SummonsPage/components/FinalGridView";
import BookSelectView from "@/components/SummonsPage/components/BookSelectView";

import { useUserBooks } from "@/hooks/useUserBooks";
import { useOpenBooks } from "@/hooks/useOpenBooks";
import { useSummonFlow } from "@/hooks/useSummonFlow";

import { getSummonVideos } from "@/components/SummonsPage/utils/getSummonVideos";

type Book = {
  id: string;
  icon: string;
  amount: number;
  color: string;
};

// 🔹 Screen size hook
function useScreenSize() {
  const [screen, setScreen] = useState<"mobile" | "mid" | "desktop">("desktop");

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768) setScreen("mobile");
      else if (window.innerWidth < 1280) setScreen("mid");
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
  } = useUserBooks();

  const {
    openBooks,
    isLoading: isOpeningBooks,
    openTxHash,
    isWaitingForOpen,
  } = useOpenBooks();

  // 🔹 Build inventory for the modal
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

  // 🔹 Hook
  const {
    step,
    setStep,
    showFlash,
    message,
    cursor,
    setCursor,

    // Animation state
    selectedBookColor,
    selectedRarity,
    muted,
    setMuted,
    fadeOut,
    setFadeOut,

    // Reward flow
    rewards,
    currentIndex,
    summonCount,
    handleBack,
    handleNextReward,
    handleSkipToGrid,
    skipSummon,

    // Modal
    bookSelectOpen,
    closeBookSelect,
    confirmBookSelect,
    countRequired,
    openBookSelect,
  } = useSummonFlow({
    inventory,
    openBooks,
    isOpeningBooks, // ✅ pass these
    isWaitingForOpen, // ✅ pass these
    openTxHash: openTxHash ?? null, 
  });

  // 🔹 Video assets
  const screen = useScreenSize();
  const summonVideos = getSummonVideos(screen);
  const idleVideo =
    screen === "desktop" ? "/video/summonhomew.mp4" : "/video/summonhomev.mp4";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Idle view */}
      {step === "idle" && (
        <IdleView
          idleVideo={idleVideo}
          message={message}
          cursor={cursor}
          onSummon={openBookSelect}
        />
      )}

      {/* Flash overlay */}
      {showFlash && (
        <div className="fixed inset-0 bg-white z-[10020] animate-flashFade pointer-events-none" />
      )}

      {/* Animation view */}
      {step === "animation" && (
        <AnimationView
          summonVideos={summonVideos}
          selectedBookColor={selectedBookColor}
          selectedRarity={selectedRarity}
          muted={muted}
          setMuted={setMuted}
          fadeOut={fadeOut}
          setFadeOut={setFadeOut}
          skipSummon={skipSummon}
          onFinish={() => setStep("reward")}
        />
      )}

      {/* Reward screen */}
      {step === "reward" && (
        <RewardScreenView
          rewards={rewards}
          currentIndex={currentIndex}
          summonCount={summonCount}
          onBack={handleBack}
          onSummonAgain={openBookSelect}
          onNext={handleNextReward}
          onSkipToGrid={handleSkipToGrid}
        />
      )}

      {/* Final grid */}
      {step === "grid" && (
        <FinalGridView
          rewards={rewards}
          summonCount={summonCount}
          onBack={handleBack}
          onSummonAgain={openBookSelect}
        />
      )}

      {/* Book select modal */}
      <BookSelectView
        isOpen={bookSelectOpen}
        onClose={closeBookSelect}
        onConfirm={confirmBookSelect}
        countRequired={countRequired}
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
