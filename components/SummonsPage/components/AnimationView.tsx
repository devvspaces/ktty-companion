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
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [videoURL, setVideoURL] = useState("");

  // Push message to onscreen debug overlay
  const logMsg = (msg: string) => {
    const stamp = new Date().toLocaleTimeString();
    setDebugLog((prev) => [...prev, `[${stamp}] ${msg}`]);
  };

  // Force muted at mount for autoplay on iOS
  useEffect(() => {
    logMsg("Mounted AnimationView");
    if (!muted) {
      setMuted(true);
      logMsg("Forced muted for autoplay");
    }

    const url =
      summonVideos[selectedBookColor]?.[selectedRarity ?? "normal"] ??
      summonVideos["ruby"].normal;

    setVideoURL(url || "");
    logMsg(url ? `Video URL loaded → ${url}` : "⚠️ No video URL found");
  }, [selectedBookColor, selectedRarity]);

  return (
    <>
      {/* 🔊 Sound toggle */}
      <button
        onClick={() => {
          setMuted((m) => !m);
          logMsg(`Toggled mute → ${!muted ? "ON" : "OFF"}`);
        }}
        className="fixed top-4 left-4 z-[10015] p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
      >
        {muted ? (
          <SpeakerXMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* 🌑 Fullscreen container */}
      <div
        className={`fixed inset-0 z-[10000] transition-opacity duration-1500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        onTransitionEnd={() => {
          if (fadeOut) {
            logMsg("Fade out complete → triggering onFinish");
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
          muted={muted}
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          poster="/images/fallbackPoster.jpg"
          className={`absolute inset-0 w-full h-full object-cover z-[10005] transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          onLoadStart={() => logMsg("onLoadStart fired")}
          onLoadedMetadata={() => logMsg("onLoadedMetadata fired")}
          onCanPlay={() => {
            logMsg("onCanPlay fired → videoReady=true");
            setVideoReady(true);
          }}
          onPlay={() => logMsg("onPlay fired")}
          onError={(e) =>
            logMsg(`onError fired → ${JSON.stringify(e.currentTarget.error)}`)
          }
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 12 && !fadeOut) {
              logMsg("Reached 12s → triggering fadeOut");
              setFadeOut(true);
            }
          }}
        >
          {videoURL ? <source src={videoURL} type="video/mp4" /> : <></>}
        </video>

        {/* URL Status */}
        <div className="absolute top-2 left-2 px-2 py-1 text-xs rounded bg-black/60 text-white">
          {videoURL ? "✅ URL OK" : "❌ No URL"}
        </div>
      </div>

      {/* ⏭ Skip button */}
      <button
        onClick={() => {
          skipSummon();
          logMsg("Skip clicked → skipping to reward");
        }}
        className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition animate-fadeIn delay-1000 cursor-pointer"
      >
        Skip &gt;
      </button>

      {/* 🟩 Debug overlay */}
      <div className="fixed bottom-0 left-0 w-full max-h-[40%] overflow-y-auto bg-black/70 text-green-400 font-mono text-xs p-2 z-[20000]">
        {debugLog.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </>
  );
}
