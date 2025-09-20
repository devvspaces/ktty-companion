"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LeaderboardModal from "../LeaderboardModal";
import MyBagModal from "../MyBagModal";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showBag, setShowBag] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile nav on outside click (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
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
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/kttywrldlogo.png"
              alt="KTTY World"
              width={40}
              height={40}
              className="lg:w-[100px] lg:h-[80px] w-[60px] h-[40px]"
            />
          </Link>
        </div>

        {/* Center nav links */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 items-center text-lg font-semibold text-white">
          <li>
            <Link
              href="/#mint"
              className="hover:text-purple-300 transition-all"
            >
              Mint
            </Link>
          </li>
          <li>
            <span className="text-gray-500">Summon KTTYs</span>
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

        {/* Social icons */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <Link href="https://x.com/Kttyworld" target="_blank">
            <Image src="/x-icon.png" alt="X" width={32} height={32} />
          </Link>
          <Link href="https://discord.com/invite/sC3Hv46BKC" target="_blank">
            <Image
              src="/discord-icon.png"
              alt="Discord"
              width={32}
              height={32}
            />
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="lg:hidden flex items-center"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden relative z-50 pb-6 bg-black/90 backdrop-blur text-white w-full">
          <div className="flex flex-col items-center text-center max-w-sm mx-auto pt-6 gap-4">
            <ul className="flex flex-col gap-6 text-lg font-medium w-full px-4">
              <li>
                <Link
                  href="/#mint"
                  className="text-xl font-bold hover:text-purple-300 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Mint
                </Link>
              </li>
              <li>
                <span className="text-gray-500 text-xl font-bold">
                  Summon KTTYs
                </span>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowLeaderboard(true);
                    setMobileOpen(false);
                  }}
                  className="text-xl font-bold hover:text-purple-300 transition-all"
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
                  className="text-xl font-bold hover:text-purple-300 transition-all"
                >
                  My Bag
                </button>
              </li>
            </ul>

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

      {/* Leaderboard Modal */}
      <LeaderboardModal
        show={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        leaderboard={[
          { rank: 1, wallet: "0x1234...abcd", mints: 50 },
          { rank: 2, wallet: "0x5678...efgh", mints: 42 },
          { rank: 3, wallet: "0x9abc...ijkl", mints: 38 },
        ]}
      />

      {/* My Bag Modal */}
      <MyBagModal isOpen={showBag} onClose={() => setShowBag(false)} />
    </header>
  );
}
