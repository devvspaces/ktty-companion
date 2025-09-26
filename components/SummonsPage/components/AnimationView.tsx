"use client";

import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

export default function AnimationView({
  summonVideos,
  selectedBookColor,
  selectedRarity,
  muted,
  setMuted,
  fadeOut,
  setFadeOut,
  skipSummon,
  onFinish, // callback to trigger next step
}: {
  summonVideos: Record<string, Record<"normal" | "rare" | "ultra", string>>;
  selectedBookColor: string;
  selectedRarity?: "normal" | "rare" | "ultra";
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  fadeOut: boolean;
  setFadeOut: React.Dispatch<React.SetStateAction<boolean>>;
  skipSummon: () => void;
  onFinish: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
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
          if (fadeOut) onFinish();
        }}
      >
        <video
          key={`${selectedBookColor}-${selectedRarity ?? "normal"}`}
          ref={videoRef}
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
              summonVideos[selectedBookColor]?.[selectedRarity ?? "normal"] ??
              summonVideos["ruby"].normal
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
  );
}
