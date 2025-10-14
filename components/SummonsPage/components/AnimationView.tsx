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
  const [isIOS, setIsIOS] = useState(false);
  const [primed, setPrimed] = useState(false);

  const videoURL =
    summonVideos[selectedBookColor]?.[selectedRarity ?? "normal"] ??
    summonVideos["ruby"].normal;

  const log = (msg: string) => {
    const t = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${t}] ${msg}`, ...prev]);
    console.log(`[${t}] ${msg}`);
  };

  // 🔍 Detect iOS Safari / WKWebView
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isiOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(isiOS);
    log(`Detected iOS: ${isiOS}`);
  }, []);

  // 🧠 Setup video event handlers
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleCanPlay = () => {
      log("onCanPlay → first frame ready");
      setVideoReady(true);
    };

    const handleEnded = () => {
      log("onEnded → setFadeOut(true)");
      setFadeOut(true);
    };

    const handleTimeUpdate = () => {
      if (!vid || fadeOut) return;
      const remaining = vid.duration - vid.currentTime;
      if (remaining < 0.5 || vid.currentTime > 12) {
        log(`⏳ Triggering fadeOut (remaining=${remaining.toFixed(2)})`);
        setFadeOut(true);
      }
    };

    vid.addEventListener("canplay", handleCanPlay);
    vid.addEventListener("ended", handleEnded);
    vid.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      vid.removeEventListener("canplay", handleCanPlay);
      vid.removeEventListener("ended", handleEnded);
      vid.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef, fadeOut]);

  // 🎬 Handle playback when visible
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    let cancelled = false;
    let hasStarted = false;

    const startPlayback = async () => {
      if (cancelled || hasStarted) return;
      hasStarted = true;
      log(`▶️ startPlayback (iOS=${isIOS})`);
      try {
        vid.muted = isIOS ? true : muted;
        await vid.play();
        log("✅ Video play() success");
      } catch (e) {
        log(`⚠️ play() error: ${e}`);
        if (isIOS && !cancelled) {
          log("Retrying iOS play() in 500ms...");
          setTimeout(() => startPlayback(), 500);
        }
      }
    };

    if (isVisible && (primed || !isIOS)) {
      log(`isVisible=true → preparing playback (iOS=${isIOS})`);
      if (!vid.src.endsWith(videoURL)) {
        vid.src = videoURL;
        vid.load();
        log("🎬 Video source set & load() called");
      }
      setTimeout(() => {
        if (!cancelled) startPlayback();
      }, 150);
    } else if (!isVisible) {
      log("isVisible=false → pause & reset");
      cancelled = true;
      vid.pause();
      vid.currentTime = 0;
      setVideoReady(false);
    }

    return () => {
      cancelled = true;
    };
  }, [isVisible, videoURL, isIOS, muted, primed]);

  // ✅ Trigger onFinish when fade-out completes
  useEffect(() => {
    if (fadeOut) {
      log("Fade-out flag triggered → onFinish()");
      const t = setTimeout(() => {
        log("Fade-out → onFinish() executing");
        onFinish();
      }, 700);
      return () => clearTimeout(t);
    }
  }, [fadeOut]);

  // 🖱️ Handle iOS tap-to-summon unlock
  const handleTapToSummon = async () => {
    const vid = videoRef.current;
    if (!vid) return;
    try {
      vid.muted = true;
      await vid.play();
      setPrimed(true);
      log("🎥 iOS video unlocked on tap");
    } catch (err) {
      log(`⚠️ Unlock failed: ${err}`);
    }
  };

  return (
    <>
      {/* 🔈 Mute Toggle */}
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

      {/* 🎥 Video Wrapper */}
      <div
        className={`fixed inset-0 z-[10000] transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Spinner (non-iOS only) */}
        {!videoReady && !isIOS && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Tap-to-Summon Overlay (iOS only) */}
        {!primed && isIOS && isVisible && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer z-[10010]"
            onClick={handleTapToSummon}
          >
            <p className="text-3xl font-bold text-white animate-pulse-summon select-none">
              Tap to Summon ✨
            </p>
          </div>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          poster="/images/fallbackPoster.jpg"
          className={`absolute inset-0 w-full h-full object-cover z-[10005] transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => {
            const err = e.currentTarget.error;
            log(`onError → code=${err?.code}`);
            setVideoError(`Playback error code=${err?.code}`);
          }}
        >
          <source src={videoURL} type="video/mp4" />
        </video>
      </div>

      {/* ⏩ Skip Button */}
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

      <style jsx>{`
        @keyframes pulseSummon {
          0%,
          100% {
            opacity: 1;
            text-shadow:
              0 0 10px white,
              0 0 20px white;
          }
          50% {
            opacity: 0.5;
            text-shadow:
              0 0 25px #ffffff,
              0 0 50px #ffffff;
          }
        }
        .animate-pulse-summon {
          animation: pulseSummon 1.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
