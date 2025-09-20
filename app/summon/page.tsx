"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import RewardCard from "@/components/RewardCard";
import RewardGrid from "@/components/RewardGrid";
import SummonBookModal from "@/components/SummonBookModal";
import { Reward } from "@/lib/reward";

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
  const inventory = [
    {
      id: "Green Book",
      icon: "/images/mybag/bookgrn.png",
      amount: 21,
      color: "green",
    },
    {
      id: "Red Book",
      icon: "/images/mybag/bookred.png",
      amount: 64,
      color: "red",
    },
    {
      id: "Purple Book",
      icon: "/images/mybag/bookprp.png",
      amount: 14,
      color: "purple",
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
  const [selectedBookColor, setSelectedBookColor] = useState<string>("purple");

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
  const summonVideos: Record<string, string> = {
    red:
      screen === "desktop"
        ? "/video/animations/desktop/normal/normalred.mp4"
        : "/video/animations/mobile/normal/normalred.mp4",
    green:
      screen === "desktop"
        ? "/video/animations/desktop/normal/normalgreen.mp4"
        : "/video/animations/mobile/normal/normalgreen.mp4",
    purple:
      screen === "desktop"
        ? "/video/animations/desktop/normal/normalpurp.mp4"
        : "/video/animations/mobile/normal/normalpurp.mp4",
  };

  // Typewriter effect
  useEffect(() => {
    if (cursor < message.length) {
      const timer = setTimeout(() => setCursor(cursor + 1), 35);
      return () => clearTimeout(timer);
    }
  }, [cursor, message]);

  // Summon setup
  const handleSummon = (count: number, selection: Record<string, number>) => {
    setSummonCount(count);
    setShowFlash(true);
    setFadeOut(false);
    setCurrentIndex(0);

    const firstBookId = Object.keys(selection)[0];
    const firstBook = inventory.find((b) => b.id === firstBookId);
    setSelectedBookColor(firstBook?.color || "purple");

    const mockRewards: Reward[] = Array.from({ length: count }).map((_, i) => {
      const bookId = Object.keys(selection)[i % Object.keys(selection).length];
      const book = inventory.find((b) => b.id === bookId);
      return {
        id: String(i + 1),
        name: "KTTY",
        image: `/images/rewards/kttys/ktty${(i % 10) + 1}.png`,
        breed: "Lumen",
        identity: "Dawn",
        expression: "Happy",
        borderColor: book?.color || "purple",
        items: [
          { name: "Golden Ticket", image: "/images/mybag/goldtk.png" },
          { name: "Orb", image: "/images/mybag/bookprp.png" },
          { name: "Mystery Shard", image: "/images/mybag/bookred.png" },
        ],
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
    setShowFlash(true);
    setFadeOut(true);
    setTimeout(() => {
      setStep("reward");
      setShowFlash(false);
    }, 800);
  };

  const handleNextReward = () => {
    if (currentIndex < rewards.length - 1) {
      setShowFlash(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowFlash(false);
      }, 500);
    } else {
      setStep("grid");
    }
  };

  const handleSkipToGrid = () => setStep("grid");

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

      {/* Currency bar */}
      {step === "idle" && (
        <div className="absolute top-[70px] md:top-[70px] lg:top-[115px] left-0 right-0 z-20 flex items-center justify-center gap-4 sm:gap-6 md:gap-10 bg-black/50 backdrop-blur-sm border-b border-white/20 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1.5 sm:gap-2 md:gap-3"
            >
              <div className="relative w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.id}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-semibold text-xs sm:text-sm md:text-lg whitespace-nowrap">
                {item.amount.toLocaleString()}
              </span>
            </div>
          ))}
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
              key={summonVideos[selectedBookColor]}
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
                src={summonVideos[selectedBookColor] || summonVideos.purple}
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
        <RewardCard
          reward={rewards[currentIndex]}
          onBack={handleBack}
          onSummonAgain={() => openModal(summonCount)}
          startAnimation={true}
          mode={summonCount > 1 ? "multi" : "single"}
          onNext={handleNextReward}
          isLast={currentIndex === rewards.length - 1}
          onSkipToGrid={summonCount > 1 ? handleSkipToGrid : undefined}
        />
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
        onConfirm={(selection) => {
          setShowModal(false);
          if (pendingCount) handleSummon(pendingCount, selection);
        }}
        countRequired={pendingCount || 0}
        inventory={inventory}
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
