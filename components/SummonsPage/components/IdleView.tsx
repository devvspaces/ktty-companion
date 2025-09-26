"use client";

import Image from "next/image";

interface IdleViewProps {
  idleVideo: string;
  message: string;
  cursor: number;
  onSummon: (count: number) => void;
}

export default function IdleView({
  idleVideo,
  message,
  cursor,
  onSummon,
}: IdleViewProps) {
  return (
    <>
      {/* Idle background */}
      <div className="absolute inset-0">
        <video
          key={idleVideo}
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

      {/* Floating title */}
      <div className="absolute top-[80px] md:top-[90px] lg:top-[140px] w-full z-[49] flex justify-center">
        <h1 className="text-white drop-shadow-lg text-2xl md:text-3xl lg:text-5xl font-bold animate-float">
          KTTY Summoning Altar
        </h1>
      </div>

      {/* Idle screen content */}
      <div className="relative z-10 flex flex-col h-full pointer-events-auto">
        <div className="flex-1 flex flex-col justify-end pb-4">
          {/* RPG-style textbox */}
          <div className="mx-4 mb-3 bg-black/70 border-2 border-purple-500 rounded-md p-2 flex items-stretch gap-2 min-h-[80px] md:min-h-[120px] lg:min-h-[150px]">
            <div className="relative aspect-square h-full flex-shrink-0 bg-white/10 rounded">
              <Image
                src="/images/kttyboy.png"
                alt="Character Portrait"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed">
              {message.slice(0, cursor)}
              <span className="animate-pulse">▋</span>
            </p>
          </div>

          {/* Summon buttons */}
          <div className="flex justify-center gap-3 px-4">
            <button
              onClick={() => onSummon(1)}
              className="flex-1 px-3 py-2 md:px-4 md:py-2.5 bg-purple-600 rounded-md font-semibold text-white hover:bg-purple-500 transition text-sm md:text-base"
            >
              Summon x1
            </button>
            <button
              onClick={() => onSummon(5)}
              className="flex-1 px-3 py-2 md:px-4 md:py-2.5 bg-purple-600 rounded-md font-semibold text-white hover:bg-purple-500 transition text-sm md:text-base"
            >
              Summon x5
            </button>
            <button
              onClick={() => onSummon(10)}
              className="flex-1 px-3 py-2 md:px-4 md:py-2.5 bg-purple-600 rounded-md font-semibold text-white hover:bg-purple-500 transition text-sm md:text-base"
            >
              Summon x10
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
