"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const tabs = ["Utility", "Golden Ticket", "Leaderboard"];

export default function InfoSection() {
  const [activeTab, setActiveTab] = useState("Utility");

  // Tab transitions
  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <section className="w-full px-4 md:px-12 py-6 md:py-10 text-foreground">
      {/* Tab Buttons */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-8 relative">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm sm:text-base md:text-2xl font-semibold transition-colors ${
                activeTab === tab
                  ? "text-purple-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="h-[3px] bg-purple-400 rounded mt-1"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* Utility Tab */}
          {activeTab === "Utility" && (
            <motion.div
              key="utility"
              variants={fadeVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              // 💡 Grid for desktop (art left / text right), stacked on mobile
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center"
            >
              {/* Tamer Forge */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white/10 border border-white/20 rounded-md overflow-hidden">
                  <video
                    src="/video/forge.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-6xl font-bold mb-4">
                  Tamer Forge
                </h3>
                <p className="text-base md:text-xl text-gray-300 leading-relaxed">
                  Put your KTTYs to work in the forge to craft unique and
                  powerful gear to trade or use in the KTTY Ecosystem. <br></br>
                  <br></br>
                  Read more{" "}
                  <Link
                    href="https://www.kttyworld.io/news/dev-blog-07-tamer-forge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    here
                  </Link>
                </p>
              </div>
              {/* Text */}
              <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-6xl font-bold mb-4">
                  KTTY Mining Colony
                </h3>
                <p className="text-base md:text-xl text-gray-300 leading-relaxed">
                  Send your KTTY Companions into the mines and form a mining
                  colony to retrieve back resources and rare catalysts.
                </p>
              </div>
              {/* KTTY Mining Colonies */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white/10 border border-white/20 rounded-md overflow-hidden">
                  <Image
                    src="/images/mine.png"
                    alt="Mine"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Golden Ticket Tab */}
          {activeTab === "Golden Ticket" && (
            <motion.div
              key="golden"
              variants={fadeVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center"
            >
              {/* Artwork */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white/10 border-white/20 rounded-md overflow-hidden">
                  <Image
                    src="/images/otherrewards/gtix.png"
                    alt="Golden Ticket"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-6xl font-bold mb-4">
                  Golden Ticket
                </h3>
                <p className="text-base md:text-xl text-gray-300 leading-relaxed">
                  Hidden in the collection are{" "}
                  <span className="font-semibold text-white">
                    500 Golden Tickets
                  </span>
                  . Each grants{" "}
                  <span className="font-semibold text-white">1 Entry</span> to a
                  raffle for a{" "}
                  <span className="font-semibold text-white">$2,500 Prize</span>
                  .
                </p>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "Leaderboard" && (
            <motion.div
              key="leaderboard"
              variants={fadeVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center"
            >
              {/* Artwork */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white/10 border-white/20 rounded-md overflow-hidden">
                  <Image
                    src="/images/leaderboard.png"
                    alt="Leaderboard"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
                <h3 className="text-4xl md:text-6xl font-bold mb-4">
                  Leaderboard
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed text-center">
                  Climb the ranks by minting — prizes go to the
                  Top&nbsp;3 KTTY Collectors!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
