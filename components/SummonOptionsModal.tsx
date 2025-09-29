"use client";

import React from "react";

interface SummonOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (count: number) => void;
  availableBooks: number;
}

export default function SummonOptionsModal({
  isOpen,
  onClose,
  onSelect,
  availableBooks,
}: SummonOptionsModalProps) {
  if (!isOpen) return null;

  const options = [1, 5, 10];

  return (
    <div className="fixed inset-0 z-[10020] bg-black/60 flex items-center justify-center">
      <div className="bg-[#0a1d3b] rounded-xl shadow-lg p-6 w-[320px] text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Choose Summon Amount
        </h2>

        <p className="text-sm text-gray-300 mb-4">
          You have{" "}
          <span className="font-semibold text-white">{availableBooks}</span>{" "}
          book
          {availableBooks === 1 ? "" : "s"} remaining
        </p>

        {/* Summon amount buttons */}
        <div className="flex flex-col gap-3 mb-6">
          {options.map((opt) => {
            const canSummon = availableBooks >= opt;
            return (
              <button
                key={opt}
                disabled={!canSummon}
                onClick={() => onSelect(opt)}
                className={`w-full py-3 rounded-md font-semibold transition
                  ${
                    canSummon
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  }`}
              >
                {opt} × Summon
              </button>
            );
          })}
        </div>

        {/* Mint Books (only if none left) */}
        {availableBooks === 0 && (
          <button
            onClick={() => (window.location.href = "/home#mint")}
            className="w-full py-3 rounded-md font-semibold bg-emerald-600 hover:bg-emerald-500 text-white mb-4"
          >
            Mint Books
          </button>
        )}

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
