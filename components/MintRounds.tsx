"use client";

import { useState, useEffect } from "react";

type Round = {
  id: string;
  title: string;
  price: string;
  minted: number;
  supply: number;
  description: string;
  eligibility: string[];
  includes: string[];
  startTime: string; // ISO string
  durationHours: number;
};

const rounds: Round[] = [
  {
    id: "null",
    title: "Null KTTY Sale",
    price: "35 RON or 25 RON + 2000 $KTTY",
    minted: 200,
    supply: 2000,
    description:
      "This round is available to those affiliated with the One Eye Clan. Help break the cycle by taking your rightful place in the world that Mr Null will create by claiming an all powerful NULL KTTY.",
    eligibility: ["9 Lives Holders", "Fallen Personality"],
    includes: ["1 Null KTTY NFT", "3 × Forge Tools"],
    startTime: "2025-09-25T14:00:00Z",
    durationHours: 2,
  },
  {
    id: "whitelist",
    title: "Whitelist Sale",
    price: "200 RON",
    minted: 227,
    supply: 380,
    description:
      "Exclusive access for early supporters of the project. Claim your advantage before the gates open to the wider world.",
    eligibility: ["Whitelist Holders"],
    includes: ["1 KTTY NFT", "3 × Forge Tools"],
    startTime: "2025-09-25T16:30:00Z",
    durationHours: 2,
  },
  {
    id: "public",
    title: "Public Sale",
    price: "200 RON",
    minted: 122,
    supply: 1153,
    description:
      "The public round is open to all. Step into the world of Felysia and summon your KTTY to begin your journey.",
    eligibility: ["Open to Everyone"],
    includes: ["1 Random KTTY NFT", "3 × Forge Tools"],
    startTime: "2025-09-25T19:00:00Z",
    durationHours: 2,
  },
];

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function useCountdown(start: string, durationHours: number) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startTime = new Date(start).getTime();
  const endTime = startTime + durationHours * 60 * 60 * 1000;

  let label = "";
  let diff = 0;
  let ended = false;

  if (now < startTime) {
    label = "Starts in:";
    diff = startTime - now;
  } else if (now >= startTime && now < endTime) {
    label = "Ends in:";
    diff = endTime - now;
  } else {
    label = "Ended";
    diff = 0;
    ended = true;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    label,
    days,
    hours,
    minutes,
    seconds,
    ended,
    active: now >= startTime && now < endTime,
  };
}

export default function MintRounds() {
  const mounted = useMounted();
  const [openRound, setOpenRound] = useState<string | null>("null");
  const [quantity, setQuantity] = useState(1);

  const handleMint = (roundId: string, method: string) => {
    console.log(`Minting ${quantity} from ${roundId} using method: ${method}`);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {rounds.map((round) => {
        const { label, days, hours, minutes, seconds, ended } = useCountdown(
          round.startTime,
          round.durationHours
        );

        const percent = Math.round((round.minted / round.supply) * 100);
        const isOpen = openRound === round.id;

        return (
          <div
            key={round.id}
            className={`relative bg-black/40 border border-white/20 rounded-lg overflow-hidden flex flex-col transition-all duration-300 ${
              isOpen ? "flex-1" : "shrink-0"
            }`}
          >
            {isOpen && ended && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                <span className="text-lg md:text-2xl font-bold text-white">
                  Sale Round Ended
                </span>
              </div>
            )}
            {/* Header */}
            <button
              className="w-full px-4 py-3 text-left"
              onClick={() => setOpenRound(isOpen ? null : round.id)}
              disabled={ended}
            >
              <div className="flex items-center justify-between">
                {/* Title + Arrow (always same line) */}
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-2xl font-semibold">
                    {round.title}
                  </span>
                  <span className="text-sm md:text-lg text-gray-400">
                    {ended && !isOpen ? "Ended" : isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Countdown (moves below on mobile via flex-col wrapper) */}
                {mounted && !ended && (
                  <span className="hidden md:inline text-xl font-mono text-white whitespace-nowrap">
                    {label}{" "}
                    {`${days.toString().padStart(2, "0")}D 
          ${hours.toString().padStart(2, "0")}H 
          ${minutes.toString().padStart(2, "0")}M 
          ${seconds.toString().padStart(2, "0")}S`}
                  </span>
                )}
              </div>

              {/* Mobile-only countdown (full-width, below title + arrow) */}
              {mounted && !ended && (
                <div className="mt-2 md:hidden text-base font-mono text-white">
                  {label}{" "}
                  {`${days.toString().padStart(2, "0")}D 
        ${hours.toString().padStart(2, "0")}H 
        ${minutes.toString().padStart(2, "0")}M 
        ${seconds.toString().padStart(2, "0")}S`}
                </div>
              )}
            </button>

            {/* Collapsible content */}
            {isOpen && (
              <div className="px-4 pb-4 flex-1 flex flex-col justify-between text-sm md:text-lg text-gray-300">
                <div className="space-y-6 md:space-y-8 overflow-y-auto">
                  <p className="leading-relaxed">{round.description}</p>

                  <div>
                    <p className="mb-3 md:mb-5 text-gray-400 text-base md:text-xl">
                      Available to the following:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                      {round.eligibility.map((group, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-3 py-1 text-sm md:text-lg bg-purple-900/40 border border-purple-500 rounded-md text-purple-300"
                        >
                          {group}
                        </span>
                      ))}
                    </div>

                    <p className="mb-2 md:mb-3 text-gray-400 text-base md:text-xl">
                      Each Mint Includes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {round.includes.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-3 py-1 text-sm md:text-lg bg-white/10 border border-white/40 rounded-md text-gray-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-base md:text-xl">
                    Mint Price:{" "}
                    <span className="font-semibold">{round.price}</span>
                  </p>

                  <div>
                    <p className="mb-2 md:mb-3 text-base md:text-xl">
                      {percent}% minted
                    </p>
                    <div className="w-full h-2 bg-gray-700 rounded">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-base md:text-xl mt-2 md:mt-3">
                      {round.minted}/{round.supply}
                    </p>
                  </div>
                </div>

                {!ended && (
                  <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center justify-between w-full bg-gray-800/50 border border-white/20 rounded-md p-2">
                      <button
                        className="px-3 md:px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="text-lg md:text-xl font-bold">
                        {quantity}
                      </span>
                      <button
                        className="px-3 md:px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="px-3 md:px-4 py-2 bg-gray-600 rounded text-xs md:text-sm hover:bg-gray-500 transition"
                        onClick={() => setQuantity(75)}
                      >
                        Max
                      </button>
                    </div>

                    <div className="flex gap-3 md:gap-4">
                      <button
                        className="flex-1 py-2 md:py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition"
                        onClick={() => handleMint(round.id, "RON")}
                      >
                        Mint with RON
                      </button>
                      <button
                        className="flex-1 py-2 md:py-3 bg-purple-600 rounded font-semibold hover:bg-purple-500 transition"
                        onClick={() => handleMint(round.id, "RON + KTTY")}
                      >
                        Mint with RON + KTTY
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
