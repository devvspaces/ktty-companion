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

  // 🔹 On-screen debug log
  const [debug, setDebug] = useState<string[]>([]);
  const log = (msg: string) => {
    setDebug((prev) => [
      ...prev.slice(-8),
      `[${new Date().toLocaleTimeString()}] ${msg}`,
    ]);
    console.log(msg);
  };

  useEffect(() => {
    // iOS autoplay only works muted
    if (!muted) setMuted(true);
    log("Mounted AnimationView");
  }, []);

  return (
    <>
      {/* 🔊 Sound Toggle */}
      <button
        onClick={() => {
          setMuted((m) => !m);
          log(`Toggled sound → ${!muted ? "Muted" : "Unmuted"}`);
        }}
        className="fixed top-4 left-4 z-[10015] p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
      >
        {muted ? (
          <SpeakerXMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* 🌑 Overlay */}
      <div
        className={`fixed inset-0 z-[10000] pointer-events-none transition-opacity duration-1500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        onTransitionEnd={() => {
          if (fadeOut) {
            log("FadeOut finished → calling onFinish()");
            onFinish();
          }
        }}
      >
        {/* Spinner until first frame */}
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
          muted={muted}
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover z-[10005] ${
            videoReady ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          onLoadStart={() => log("Video: loadstart")}
          onLoadedMetadata={() => log("Video: loadedmetadata")}
          onCanPlay={() => {
            log("Video: canplay → showing first frame");
            setVideoReady(true);
          }}
          onPlay={() => log("Video: playing")}
          onPause={() => log("Video: paused")}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 12 && !fadeOut) {
              log("Reached 12s → triggering fadeOut");
              setFadeOut(true);
            }
          }}
          onError={(e) => log(`Video error: ${JSON.stringify(e)}`)}
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

      {/* ⏭ Skip */}
      <button
        onClick={() => {
          skipSummon();
          log("Skip button clicked → skipSummon()");
        }}
        className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition animate-fadeIn delay-1000 cursor-pointer"
      >
        Skip &gt;
      </button>

      {/* 🟩 Debug Overlay */}
      <div className="fixed bottom-4 left-4 w-72 max-h-48 overflow-y-auto bg-black/70 text-green-400 text-xs p-2 rounded z-[20000]">
        {debug.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </>
  );
}
