"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useUserBooks } from "@/hooks/useUserBooks";
import { useAccount } from "wagmi";
import WalletButton from "./WalletButton";

type Item = {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
};

export default function MyBagModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { address } = useAccount();
  const {
    amethystCount,
    emeraldCount,
    rubyCount,
    blacksmithCount,
    luckyCount,
    oneEyeCount,
    corruptCount,
    totalBooks,
    isLoading,
    error,
  } = useUserBooks();

  const items: Item[] = [
    {
      id: "amethystbk",
      name: "Amethyst Summoning Book",
      image: "/images/mybag/amethystbk.png",
      count: amethystCount,
      description:
        "A book glowing with celestial energy. Summons mystical KTTYs.",
    },
    {
      id: "emeraldbk",
      name: "Emerald Summoning Book",
      image: "/images/mybag/emeraldbk.png",
      count: emeraldCount,
      description:
        "Holds the power of the forest. Summons nature-blessed KTTYs.",
    },
    {
      id: "rubybk",
      name: "Ruby Summoning Book",
      image: "/images/mybag/rubybk.png",
      count: rubyCount,
      description: "Burning with fire. Summons fierce and fiery KTTYs.",
    },
    {
      id: "bsmithbk",
      name: "Blacksmith’s Manual",
      image: "/images/mybag/bsmithbk.png",
      count: blacksmithCount,
      description:
        "An ancient manual of forging. Used to summon crafted KTTYs.",
    },
    {
      id: "luckybk",
      name: "Lucky Tome",
      image: "/images/mybag/luckybk.png",
      count: luckyCount,
      description: "Said to bring good fortune. Sometimes grants rare summons.",
    },
    {
      id: "oneeyebk",
      name: "One Eye Bible",
      image: "/images/mybag/oneeyebk.png",
      count: oneEyeCount,
      description:
        "Carved with ominous sigils. Summons cursed or powerful KTTYs.",
    },
    {
      id: "cursebk",
      name: "Corrupted Tome",
      image: "/images/mybag/cursebk.png",
      count: corruptCount,
      description: "Seething with unstable magic. Summons corrupted KTTYs.",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div
        className={`
          relative z-10 w-[95%] sm:w-[80%] md:w-[70%] max-w-4xl
          bg-black/90 border-2 sm:border-4 rounded-lg shadow-lg
          p-4 sm:p-6 md:p-8 border-neon overflow-y-auto max-h-[90vh]
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-400"
        >
          <X size={24} className="sm:w-7 sm:h-7" />
        </button>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          My Bag
        </h2>

        {/* Not Connected */}
        {!address && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <p className="text-lg text-gray-300">
              Please connect your wallet to view your books
            </p>
            <WalletButton />
          </div>
        )}

        {/* Loading after connect */}
        {address && isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-gray-300">Loading your books...</div>
          </div>
        )}

        {/* Error after connect */}
        {address && !isLoading && error && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <p className="text-lg text-red-400">Failed to load your books</p>
            <p className="text-sm mt-2 text-gray-400">
              {error || "Something went wrong. Please try again."}
            </p>
          </div>
        )}

        {/* Empty after connect */}
        {address && !isLoading && !error && totalBooks === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-gray-300 text-center">
              <p>No summoning books found</p>
              <p className="text-sm mt-2 text-gray-400">
                Mint some books to get started!
              </p>
            </div>
          </div>
        )}

        {/* Books grid */}
        {address && !isLoading && !error && totalBooks > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className={`
                  relative flex flex-col items-center
                  p-3 sm:p-4 bg-white/5 rounded-lg
                  border border-white/20 hover:bg-white/10 transition group
                `}
              >
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="font-semibold text-sm sm:text-base md:text-lg text-center">
                  {item.name}
                </p>

                <span className="absolute top-2 left-2 bg-black/70 px-1.5 py-0.5 text-xs sm:text-sm md:text-base rounded">
                  x{item.count}
                </span>

                {/* Tooltip */}
                <div
                  className={`
                    hidden sm:block absolute bottom-0 left-1/2
                    -translate-x-1/2 translate-y-full opacity-0
                    group-hover:opacity-100 transition
                    bg-black/90 text-sm text-gray-300 p-3 rounded-md
                    w-56 mt-2 z-20
                  `}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Neon border glow */}
      <style jsx>{`
        .border-neon {
          border-color: #9b5cff;
          box-shadow:
            0 0 10px #9b5cff,
            0 0 20px #9b5cff;
        }
      `}</style>
    </div>
  );
}
