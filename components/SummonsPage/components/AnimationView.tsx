"use client";

import { useState, useEffect, RefObject } from "react";
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
  videoRef,
  isVisible,
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
  videoRef: RefObject<HTMLVideoElement | null>;
  isVisible: boolean;
}) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const videoURL =
    summonVideos[selectedBookColor]?.[selectedRarity ?? "normal"] ??
    summonVideos["ruby"].normal;

  const log = (msg: string) => {
    const t = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${t}] ${msg}`, ...prev]);
    console.log(`[${t}] ${msg}`);
  };

  // Mount → autoplay muted → pause at first frame
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.play().catch(() => log("Autoplay attempt pending (iOS)"));

    const handleCanPlay = () => {
      if (vid.readyState >= 2) {
        vid.pause();
        vid.currentTime = 0;
        log("Pre-mounted & paused at first frame");
      }
    };

    vid.addEventListener("canplay", handleCanPlay, { once: true });
    return () => vid.removeEventListener("canplay", handleCanPlay);
  }, []);

  // Reveal / hide
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isVisible) {
      log("isVisible → resume from 0");
      vid.currentTime = 0;
    } else {
      log("isVisible=false → pause & reset");
      vid.pause();
      vid.currentTime = 0;
    }
  }, [isVisible]);

  return (
    <>
      {/* Mute toggle */}
      <button
        onClick={() => {
          setMuted((m) => !m);
          log(`Muted → ${!muted}`);
        }}
        className="fixed top-4 left-4 z-[10015] p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
      >
        {muted ? (
          <SpeakerXMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Video wrapper */}
      <div
        className={`fixed inset-0 z-[10000] transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onTransitionEnd={() => {
          if (fadeOut) {
            log("Fade-out finished → onFinish()");
            onFinish();
          }
        }}
      >
        {/* Spinner */}
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

        {/* Video */}
        <video
          ref={videoRef}
          muted={muted}
          playsInline
          preload="auto"
          poster="/images/fallbackPoster.jpg"
          className={`absolute inset-0 w-full h-full object-cover z-[10005] transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          onLoadStart={() => log(`Video loading → ${videoURL}`)}
          onCanPlay={() => {
            setVideoReady(true);
            log("onCanPlay → first frame ready");
          }}
          onPlay={() => log("onPlay → started")}
          onWaiting={() => log("onWaiting → buffering")}
          onPlaying={() => log("onPlaying → resumed")}
          onError={(e) => {
            const err = e.currentTarget.error;
            log(`onError → code=${err?.code} msg=${err?.message}`);
            setVideoError(`Playback error code=${err?.code}`);
          }}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= 12 && !fadeOut) {
              log("Time ≥12s → triggering fadeOut");
              setFadeOut(true);
            }
          }}
        >
          <source src={videoURL} type="video/mp4" />
        </video>

        {/* Debug overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-black/70 text-green-400 text-xs font-mono max-h-[40%] overflow-y-auto p-2 z-[10050]">
          <div className="text-blue-300 break-all mb-1">
            Video URL: {videoURL}
          </div>
          {logs.slice(0, 12).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
          {videoError && (
            <div className="text-red-400">Error: {videoError}</div>
          )}
        </div>
      </div>

      {/* Skip */}
      {isVisible && (
        <button
          onClick={() => {
            log("Skip → rewards");
            skipSummon();
          }}
          className="fixed top-4 right-4 z-[10015] text-white font-semibold hover:opacity-70 transition animate-fadeIn delay-1000 cursor-pointer"
        >
          Skip &gt;
        </button>
      )}
    </>
  );
}
