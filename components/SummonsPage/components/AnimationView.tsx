"use client";

import { useRef, useState, useEffect } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function AnimationView({
  summonVideos,
  selectedBookColor,
  selectedRarity,
  muted,
  setMuted,
  fadeOut,
  setFadeOut,
  skipSummon,
  onFinish,
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
  const [videoReady, setVideoReady] = useState(false);

  // ✅ On iOS, autoplay with sound off only works if muted at load
  useEffect(() => {
    if (!muted) {
      setMuted(true);
    }
  }, []); // run once on mount

  return (
    <>
      {/* 🔊 Sound Toggle */}
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

      {/* 🌑 Overlay + Spinner */}
      <div
        className={`fixed inset-0 z-[10000] pointer-events-none transition-opacity duration-1500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        onTransitionEnd={() => {
          if (fadeOut) onFinish();
        }}
      >
        {/* Loading spinner until first frame */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* 🎥 Video */}
        <video
          key={`${selectedBookColor}-${selectedRarity ?? "normal"}`}
          ref={videoRef}
          autoPlay
          muted={muted} // ✅ keep muted to allow autoplay
          playsInline // ✅ needed on iOS
          preload="auto"
          poster="/images/fallbackPoster.jpg" // ✅ optional debug/fallback
          className={`absolute inset-0 w-full h-full object-cover z-[10005] ${
            videoReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          onCanPlay={() => setVideoReady(true)}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 12 && !fadeOut) {
              setFadeOut(true);
            }
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

      {/* ⏭ Skip Button */}
      <button
        onClick={skipSummon}
        className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition animate-fadeIn delay-1000 cursor-pointer"
      >
        Skip &gt;
      </button>
    </>
  );
}
