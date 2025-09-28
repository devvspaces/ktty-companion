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
  const [videoError, setVideoError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // ✅ Helper to timestamp logs
  const log = (msg: string) => {
    const t = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${t}] ${msg}`, ...prev]);
    console.log(`[${t}] ${msg}`);
  };

  // ✅ Test URL
  const testURL = "https://www.w3schools.com/html/mov_bbb.mp4";

  // ✅ Decide which video URL to use
  const videoURL =
    testURL  // ← uncomment this line to force-test W3Schools video
   // summonVideos[selectedBookColor]?.[selectedRarity ?? "normal"] ??
    // summonVideos["ruby"].normal;

  useEffect(() => {
    log("Mounted AnimationView");

    if (!muted) {
      setMuted(true);
      log("Forced muted for autoplay");
    }
  }, []);

  return (
    <>
      {/* 🔊 Sound Toggle */}
      <button
        onClick={() => {
          setMuted((m) => !m);
          log(`Muted toggled → ${!muted}`);
        }}
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
          if (fadeOut) {
            log("Fade-out finished → onFinish()");
            onFinish();
          }
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
          muted={muted} // ✅ needed for iOS autoplay
          playsInline // ✅ critical for iOS WebView
          preload="auto"
          poster="/images/fallbackPoster.jpg"
          className={`absolute inset-0 w-full h-full object-cover z-[10005] ${
            videoReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          onLoadStart={() => log(`Video loading → ${videoURL}`)}
          onCanPlay={() => {
            setVideoReady(true);
            log("onCanPlay → first frame ready");
          }}
          onPlay={() => log("onPlay → video started")}
          onWaiting={() => log("onWaiting → buffering…")}
          onPlaying={() => log("onPlaying → playing resumed")}
          onError={(e) => {
            const err = e.currentTarget.error;
            log(`onError → code=${err?.code} message=${err?.message}`);
            setVideoError(`Playback error code=${err?.code}`);
          }}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 12 && !fadeOut) {
              log("Time reached ≥12s → triggering fadeOut");
              setFadeOut(true);
            }
          }}
        >
          <source src={videoURL} type="video/mp4" />
        </video>

        {/* ❗ Debug overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-black/70 text-green-400 text-xs font-mono max-h-[40%] overflow-y-auto p-2 z-[10050]">
          {logs.slice(0, 12).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          {videoError && (
            <div className="text-red-400">Error: {videoError}</div>
          )}
        </div>
      </div>

      {/* ⏭ Skip Button */}
      <button
        onClick={() => {
          log("Skip button clicked → skipping to rewards");
          skipSummon();
        }}
        className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition animate-fadeIn delay-1000 cursor-pointer"
      >
        Skip &gt;
      </button>
    </>
  );
}
