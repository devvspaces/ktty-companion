"use client";

import Image from "next/image";

export default function InfoSection() {
  return (
    <section className="w-full px-4 md:px-12 py-6 md:py-10 text-foreground">
      {/* Golden Ticket Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-16 items-center">
        {/* Text */}
        <div className="text-center md:text-left">
          <h3 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4">
            Golden Ticket
          </h3>
          <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-3 md:mb-4">
            Hidden within the collection are{" "}
            <span className="font-semibold text-white">500 Golden Tickets</span>
            . Each ticket grants you{" "}
            <span className="font-semibold text-white">1 Entry</span> into a
            raffle to win a{" "}
            <span className="font-semibold text-white">$2,500 prize</span>.
            Raffle results will be announced at the end of the mint.
          </p>
        </div>

        {/* Artwork */}
        <div className="flex justify-center">
          <div className="relative w-full aspect-[16/9] bg-white/10 border border-white/20 rounded-md flex items-center justify-center">
            <span className="text-sm text-gray-400">Artwork Placeholder</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Artwork */}
        <div className="flex justify-center order-1 md:order-none">
          <div className="relative w-full aspect-[16/9] bg-white/10 border border-white/20 rounded-md flex items-center justify-center">
            <span className="text-sm text-gray-400">Artwork Placeholder</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h3 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4">
            Leaderboard
          </h3>
          <p className="text-base md:text-xl text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida.
          </p>
        </div>
      </div>
    </section>
  );
}
