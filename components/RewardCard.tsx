"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Reward = {
  id: string;
  name: string;
  breed: string;
  identity: string;
  expression: string;
  image: string;
  borderColor?: string; // neon glow color
  items: { name: string; image: string }[];
};

export default function RewardCard({
  reward,
  onBack,
  onSummonAgain,
  startAnimation = true,
  mode = "single",
  onNext,
  isLast = false,
  onSkipToGrid,
}: {
  reward: Reward;
  onBack: () => void;
  onSummonAgain: () => void;
  startAnimation?: boolean;
  mode?: "single" | "multi";
  onNext?: () => void;
  isLast?: boolean;
  onSkipToGrid?: () => void;
}) {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [reward]);

  const glow = reward.borderColor || "#a855f7";

  return (
    <div
      key={animKey}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-between text-white bg-gradient-to-b from-[#0a1d3b] to-[#091024]"
    >
      {/* Skip button (multi-pull only) */}
      {mode === "multi" && onSkipToGrid && (
        <button
          onClick={onSkipToGrid}
          className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition animate-fadeIn delay-500 cursor-pointer"
        >
          Skip &gt;
        </button>
      )}

      {/* Main reward */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 md:flex-row md:gap-16 lg:gap-24">
        {/* Reward image */}
        <div
          className={`relative mb-6 md:mb-0 rounded-lg border-4 animate-fadeIn delay-0
          w-40 h-40 md:w-80 md:h-80 lg:w-[32rem] lg:h-[32rem]`}
          style={{
            borderColor: glow,
            boxShadow: `0 0 20px ${glow}, 0 0 40px ${glow}`,
          }}
        >
          <Image
            src={reward.image}
            alt={reward.name}
            fill
            className="object-contain rounded"
          />
        </div>

        {/* Reward details */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-4xl lg:text-7xl font-bold mb-4 md:mb-6 lg:mb-10 animate-fadeIn delay-200">
            {reward.name} #{reward.id}
          </h2>
          <p className="text-xl md:text-xl lg:text-4xl mb-2 md:mb-6 lg:mb-6 animate-fadeIn delay-400">
            Breed: {reward.breed}
          </p>
          <p className="text-xl md:text-xl lg:text-4xl mb-2 md:mb-6 lg:mb-6 animate-fadeIn delay-600">
            Identity: {reward.identity}
          </p>
          <p className="text-xl md:text-xl lg:text-4xl mb-6 md:mb-10 lg:mb-12 animate-fadeIn delay-800">
            Expression: {reward.expression}
          </p>

          {/* Minor items */}
          <div className="flex justify-center md:justify-start gap-6 mb-10">
            {reward.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className={`flex flex-col items-center animate-fadeIn delay-${
                  1000 + i * 200
                }`}
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 mb-6 rounded-lg border-2 border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.9)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <span className="text-md md:text-base lg:text-lg text-center break-words max-w-[6rem]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-center pb-8 px-4 animate-fadeIn delay-1600">
        {mode === "single" ? (
          <div className="flex flex-row gap-4 w-full max-w-md">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500 transition text-sm md:text-lg"
            >
              Back
            </button>
            <button
              onClick={onSummonAgain}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500 transition text-sm md:text-lg"
            >
              Summon Again
            </button>
          </div>
        ) : (
          <button
            onClick={onNext}
            className="mx-auto px-8 py-3 md:px-10 md:py-4 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500 transition text-base md:text-lg"
          >
            {isLast ? "See All" : "Next >"}
          </button>
        )}
      </div>

      <style jsx>{`
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.6s forwards;
        }
        .delay-0 {
          animation-delay: 0s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1200 {
          animation-delay: 1.2s;
        }
        .delay-1400 {
          animation-delay: 1.4s;
        }
        .delay-1600 {
          animation-delay: 1.6s;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
