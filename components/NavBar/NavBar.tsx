"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LeaderboardModal from "../LeaderboardModal";
import MyBagModal from "../MyBagModal";
import WalletButton from "../WalletButton";
import { useLeaderboard } from "@/hooks/useLeaderboard";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const navRef = useRef<HTMLElement>(null); // ✅ correct type

  // Load leaderboard data
  const {
    topMinters: leaderboard,
    userMints,
    userRank,
    totalUniqueMinters,
    isLoading: isLeaderboardLoading,
    error: leaderboardError,
  } = useLeaderboard();

  // Close dropdown on outside click (desktop only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (window.innerWidth >= 1024) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-white/10">
      <nav
        ref={navRef}
        className="relative w-full max-w-[1920px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/kttywrldlogo.png"
            alt="KTTY World"
            width={64}
            height={64}
          />
        </Link>

        {/* Center links */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-6 items-center text-base font-semibold text-white">
          <li>
            <Link
              href="/#mint"
              className="hover:text-purple-300 transition-all"
            >
              Mint
            </Link>
          </li>
          <li>
            <Link
              href="/summon"
              className="hover:text-purple-300 transition-all"
            >
              Summon
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="hover:text-purple-300 transition-all"
            >
              Leaderboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowBag(true)}
              className="hover:text-purple-300 transition-all"
            >
              My Bag
            </button>
          </li>
        </ul>

        {/* Social & wallet */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <WalletButton />
          <Link href="https://x.com/Kttyworld" target="_blank">
            <Image src="/x-icon.png" alt="X" width={28} height={28} />
          </Link>
          <Link href="https://discord.com/invite/sC3Hv46BKC" target="_blank">
            <Image
              src="/discord-icon.png"
              alt="Discord"
              width={28}
              height={28}
            />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex items-center"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/90 backdrop-blur text-white w-full pb-6">
          <div className="flex flex-col items-center text-center max-w-sm mx-auto pt-6 gap-4">
            <ul className="flex flex-col gap-6 text-lg font-medium w-full px-4">
              <li>
                <Link
                  href="/#mint"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-purple-300 transition-all"
                >
                  Mint
                </Link>
              </li>
              <li>
                <Link
                  href="/summon"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-purple-300 transition-all"
                >
                  Summon
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowLeaderboard(true);
                    setMobileOpen(false);
                  }}
                  className="hover:text-purple-300 transition-all"
                >
                  Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowBag(true);
                    setMobileOpen(false);
                  }}
                  className="hover:text-purple-300 transition-all"
                >
                  My Bag
                </button>
              </li>
            </ul>

            <div className="mt-6 w-full px-4">
              <WalletButton fullWidth />
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Link href="https://x.com/Kttyworld" target="_blank">
                <Image src="/x-icon.png" alt="X" width={36} height={36} />
              </Link>
              <Link
                href="https://discord.com/invite/sC3Hv46BKC"
                target="_blank"
              >
                <Image
                  src="/discord-icon.png"
                  alt="Discord"
                  width={36}
                  height={36}
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <LeaderboardModal
        show={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        leaderboard={leaderboard}
        userMints={userMints}
        userRank={userRank}
        totalUniqueMinters={totalUniqueMinters}
        isLoading={isLeaderboardLoading}
        error={leaderboardError || null}
      />

      <MyBagModal isOpen={showBag} onClose={() => setShowBag(false)} />
    </header>
  );
}
