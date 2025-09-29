"use client";

import { useState } from "react";
import AnimationView from "@/components/SummonsPage/components/AnimationView";
import { getSummonVideos } from "@/components/SummonsPage/utils/getSummonVideos";

export default function DevSummonPage() {
  const [step, setStep] = useState<"setup" | "animation">("setup");
  const [selectedBookColor, setSelectedBookColor] = useState("ruby");
  const [selectedRarity, setSelectedRarity] = useState<
    "normal" | "rare" | "ultra"
  >("normal");
  const [muted, setMuted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const summonVideos = getSummonVideos("mobile");

  const handleSummon = () => {
    setStep("animation");
    setFadeOut(false);
  };

  if (step === "animation") {
    return (
      <AnimationView
        summonVideos={summonVideos}
        selectedBookColor={selectedBookColor}
        selectedRarity={selectedRarity}
        muted={muted}
        setMuted={setMuted}
        fadeOut={fadeOut}
        setFadeOut={setFadeOut}
        skipSummon={() => setStep("setup")}
        onFinish={() => setStep("setup")}
      />
    );
  }

  // ---- SETUP UI ----
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Dev Summon Tester</h1>

      <div className="flex flex-col gap-4">
        {/* Book selector */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm">Select Book Type</span>
          <select
            value={selectedBookColor}
            onChange={(e) => setSelectedBookColor(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded"
          >
            <option value="ruby">Ruby</option>
            <option value="emerald">Emerald</option>
            <option value="amethyst">Amethyst</option>
            <option value="bsmith">Blacksmith</option>
            <option value="lucky">Lucky</option>
            <option value="oneeye">One Eye</option>
            <option value="corrupt">Corrupt</option>
          </select>
        </label>

        {/* Rarity selector */}
        <label className="flex flex-col">
          <span className="mb-1 text-sm">Select Rarity</span>
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value as any)}
            className="bg-gray-800 px-4 py-2 rounded"
          >
            <option value="normal">Normal</option>
            <option value="rare">Rare</option>
            <option value="ultra">Ultra</option>
          </select>
        </label>

        <button
          onClick={handleSummon}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded text-lg font-semibold"
        >
          Start Summon
        </button>
      </div>

      <p className="text-gray-400 text-sm mt-4">
        (Dev mode: assumes 99 of each book and skips wallet/NFT checks)
      </p>
    </div>
  );
}
