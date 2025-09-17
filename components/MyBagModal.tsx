"use client";

import { X } from "lucide-react";
import Image from "next/image";

type Item = {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
};

const items: Item[] = [
  {
    id: "bookprp",
    name: "Amethyst Summoning Book",
    image: "/images/mybag/bookprp.png",
    count: 2,
    description:
      "Used to summon rare KTTYs aligned with celestial constellations.",
  },
  {
    id: "bookgrn",
    name: "Emerald Summoning Book",
    image: "/images/mybag/bookgrn.png",
    count: 1,
    description:
      "Holds the power of the forest. Grants you a special KTTY summon.",
  },
  {
    id: "bookred",
    name: "Ruby Summoning Book",
    image: "/images/mybag/bookred.png",
    count: 4,
    description: "Infused with fire. Summons fiery and powerful KTTYs.",
  },
  {
    id: "goldtk",
    name: "Golden Ticket",
    image: "/images/mybag/goldtk.png",
    count: 3,
    description:
      "1 Golden Ticket = 1 Entry into the $2,500 raffle. 500 exist across the collection.",
  },
];

export default function MyBagModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-[95%] sm:w-[80%] md:w-[70%] max-w-4xl bg-black/90 border-2 sm:border-4 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 border-neon overflow-y-auto max-h-[90vh]">
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

        {/* Grid (always 2 columns, scales spacing and item size) */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col items-center p-3 sm:p-4 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition group"
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

              {/* Tooltip (desktop only) */}
              <div className="hidden sm:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition bg-black/90 text-sm text-gray-300 p-3 rounded-md w-56 mt-2 z-20">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neon border glow */}
      <style jsx>{`
        .border-neon {
          border-color: #9b5cff;
          box-shadow: 0 0 10px #9b5cff, 0 0 20px #9b5cff;
        }
      `}</style>
    </div>
  );
}
