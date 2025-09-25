"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Reward } from "@/lib/reward";
import React from "react";

type KttyCardProps = {
  reward: Reward;
  isRare?: boolean;
};

const KttyCard: React.FC<KttyCardProps> = ({ reward, isRare = false }) => {
  return (
    <motion.div
      className="relative bg-black/40 rounded-lg p-3 flex flex-col items-center"
      style={{
        border: `2px solid ${reward.borderColor || "#a855f7"}`,
        boxShadow: `0 0 12px ${reward.borderColor || "#a855f7"}`,
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Rare shine effect */}
      {isRare && (
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
          }}
        />
      )}

      <div className="relative w-20 h-20 mb-2">
        <Image
          src={reward.image}
          alt={reward.name}
          fill
          className="object-contain rounded"
        />
      </div>

      <p className="text-xs font-bold">
        {reward.name} #{reward.id}
      </p>
    </motion.div>
  );
};

export default KttyCard;
