"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Book = {
  id: string;
  icon: string;
  amount: number;
  color: string; // 🔹 for borders (e.g., "red", "green", "purple")
};

export default function SummonBookModal({
  isOpen,
  onClose,
  onConfirm,
  countRequired,
  inventory,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: Record<string, number>) => void;
  countRequired: number;
  inventory: Book[];
}) {
  const [selection, setSelection] = useState<Record<string, number>>({});

  // 🔄 Reset selection whenever modal opens
  useEffect(() => {
    if (isOpen) setSelection({});
  }, [isOpen]);

  const totalSelected = Object.values(selection).reduce((sum, v) => sum + v, 0);

  const adjustSelection = (id: string, delta: number) => {
    setSelection((prev) => {
      const current = prev[id] || 0;
      const book = inventory.find((b) => b.id === id);
      if (!book) return prev;

      const remaining = countRequired - totalSelected;
      let newValue = current + delta;

      if (delta > 0) {
        // Adding
        newValue = Math.min(current + delta, book.amount, current + remaining);
      } else {
        // Subtracting
        newValue = Math.max(0, current + delta);
      }

      return { ...prev, [id]: newValue };
    });
  };

  const handleMax = (id: string) => {
    const book = inventory.find((b) => b.id === id);
    if (!book) return;

    const current = selection[id] || 0;
    const remaining = countRequired - totalSelected + current;
    const maxValue = Math.min(book.amount, remaining);

    setSelection((prev) => ({ ...prev, [id]: maxValue }));
  };

  const handleUseOnly = (id: string) => {
    const book = inventory.find((b) => b.id === id);
    if (!book) return;

    const useAmount = Math.min(book.amount, countRequired);
    setSelection({ [id]: useAmount }); // replace everything
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[20000] bg-black/70 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#0a1d3b] to-[#091024] py-8 px-6 rounded-lg w-full max-w-md md:max-w-2xl lg:max-w-5xl text-white shadow-xl">
        <h2 className="text-lg md:text-2xl font-bold mb-8 text-center">
          Choose your Summoning Book{countRequired > 1 ? "s" : ""}
        </h2>

        {/* 🔹 Responsive layout */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {inventory.map((book) => {
            const current = selection[book.id] || 0;
            const remaining = countRequired - totalSelected + current;

            const plusDisabled =
              current >= book.amount || totalSelected >= countRequired;
            const minusDisabled = current <= 0;
            const maxDisabled =
              book.amount <= 0 || current >= Math.min(book.amount, remaining);
            const useOnlyDisabled = book.amount <= 0;

            return (
              <div
                key={book.id}
                className="bg-black/40 border border-white/20 rounded-lg p-4 flex flex-col items-center text-center w-[140px] sm:w-[160px] md:w-[180px]"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2">
                  <Image
                    src={book.icon}
                    alt={book.id}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm md:text-base mb-1">{book.id}</p>
                <p className="text-xs md:text-sm text-gray-300">
                  Owned: {book.amount}
                </p>

                {countRequired > 1 ? (
                  <>
                    {/* + / - Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => adjustSelection(book.id, -1)}
                        disabled={minusDisabled}
                        className={`px-2 py-1 rounded ${
                          minusDisabled
                            ? "bg-purple-700 opacity-50 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-500"
                        }`}
                      >
                        -
                      </button>
                      <span className="text-sm md:text-base">{current}</span>
                      <button
                        onClick={() => adjustSelection(book.id, 1)}
                        disabled={plusDisabled}
                        className={`px-2 py-1 rounded ${
                          plusDisabled
                            ? "bg-purple-700 opacity-50 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-500"
                        }`}
                      >
                        +
                      </button>
                    </div>

                    {/* QoL: Max + Use Only */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleMax(book.id)}
                        disabled={maxDisabled}
                        className={`px-2 py-1 rounded text-xs md:text-sm font-semibold shadow-md ${
                          maxDisabled
                            ? "bg-purple-700 opacity-50 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-500 text-white"
                        }`}
                      >
                        Max
                      </button>
                      <button
                        onClick={() => handleUseOnly(book.id)}
                        disabled={useOnlyDisabled}
                        className={`px-2 py-1 rounded text-xs md:text-sm font-semibold shadow-md ${
                          useOnlyDisabled
                            ? "bg-purple-700 opacity-50 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-500 text-white"
                        }`}
                      >
                        Use Only
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => onConfirm({ [book.id]: 1 })}
                    className="mt-2 px-4 py-1 bg-purple-600 rounded hover:bg-purple-500 disabled:opacity-50"
                    disabled={book.amount <= 0}
                  >
                    Select
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {countRequired > 1 ? (
          <>
            <p className="text-center text-sm md:text-base mb-6">
              Selected: {totalSelected} / {countRequired}
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(selection)}
                className="flex-1 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 disabled:opacity-50"
                disabled={totalSelected !== countRequired}
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
