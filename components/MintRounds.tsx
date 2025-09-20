"use client";

import { useState, useEffect } from "react";
import { useMintRounds } from "@/hooks/useMintRounds";
import { useMinting, PaymentType } from "@/hooks/useMinting";
import { useWhitelistValidation, WhitelistValidation } from "@/hooks/useWhitelistValidation";
import { useKttyApproval } from "@/hooks/useKttyApproval";
import { formatEther } from "viem";
import { 
  showMintNotification, 
  showApprovalNotification, 
  showErrorNotification,
  dismissNotification,
} from "@/lib/notifications";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function getCountdownData(now: number, startTime: number, endTime: number) {
  // Convert from seconds to milliseconds
  const startMs = startTime * 1000;
  const endMs = endTime * 1000;

  let label = "";
  let diff = 0;
  let ended = false;

  if (now < startMs) {
    label = "Starts in:";
    diff = startMs - now;
  } else if (now >= startMs && now < endMs) {
    label = "Ends in:";
    diff = endMs - now;
  } else {
    label = "Ended";
    diff = 0;
    ended = true;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    label,
    days,
    hours,
    minutes,
    seconds,
    ended,
    active: now >= startMs && now < endMs,
  };
}

export default function MintRounds() {
  const mounted = useMounted();
  const [openRound, setOpenRound] = useState<number | null>(1);
  const [quantity, setQuantity] = useState(1);
  const [now, setNow] = useState(Date.now());
  
  // Timer for countdown updates
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Load round data from smart contract
  const { rounds, currentRound, isLoading, error } = useMintRounds();
  
  // Minting functionality
  const minting = useMinting();
  const whitelistValidation = useWhitelistValidation();
  const kttyApproval = useKttyApproval();

  // Notification tracking
  const [currentNotificationId, setCurrentNotificationId] = useState<string | null | undefined>(null);

  // Handle approval state changes
  useEffect(() => {
    if (kttyApproval.isApproving) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      const id = showApprovalNotification('requesting');
      setCurrentNotificationId(id);
    } else if (kttyApproval.isWaitingForApproval) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      const id = showApprovalNotification('pending');
      setCurrentNotificationId(id);
    } else if (kttyApproval.approvalTxHash && !kttyApproval.isWaitingForApproval && !kttyApproval.error) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      showApprovalNotification('success', kttyApproval.approvalTxHash);
      setCurrentNotificationId(null);
    } else if (kttyApproval.error) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      showApprovalNotification('error');
      setCurrentNotificationId(null);
    }
  }, [
    kttyApproval.isApproving, 
    kttyApproval.isWaitingForApproval, 
    kttyApproval.approvalTxHash, 
    kttyApproval.error
  ]);

  // Handle minting state changes
  useEffect(() => {
    if (minting.isSimulating) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      const id = showMintNotification('simulating');
      setCurrentNotificationId(id);
    } else if (minting.isMinting || minting.isWaitingForMint) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      const id = showMintNotification('pending', { quantity });
      setCurrentNotificationId(id);
    } else if (minting.mintTxHash && !minting.isWaitingForMint && !minting.error) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      showMintNotification('success', { quantity, txHash: minting.mintTxHash });
      setCurrentNotificationId(null);
    } else if (minting.error) {
      if (currentNotificationId) dismissNotification(currentNotificationId);
      showMintNotification('error', { error: minting.error });
      setCurrentNotificationId(null);
    }
  }, [
    minting.isSimulating,
    minting.isMinting, 
    minting.isWaitingForMint, 
    minting.mintTxHash, 
    minting.error,
    quantity
  ]);

  const handleMint = async (roundId: number, method: string) => {
    const paymentType = method === "RON" ? PaymentType.NATIVE_ONLY : PaymentType.HYBRID;
    
    try {
      // Clear any existing notifications
      if (currentNotificationId) {
        dismissNotification(currentNotificationId);
      }

      // Check if user can mint
      const validation = minting.canMint(roundId, quantity, paymentType);
      if (!validation.canMint) {
        showErrorNotification(validation.reason || 'Cannot mint');
        return;
      }

      // Start minting process
      const notificationId = showMintNotification('simulating');
      setCurrentNotificationId(notificationId);
      
      await minting.mint(roundId, quantity, paymentType);
    } catch (error) {
      showErrorNotification(error instanceof Error ? error.message : 'Minting failed');
    }
  };

  const handleApproval = async () => {
    try {
      if (currentNotificationId) {
        dismissNotification(currentNotificationId);
      }
      
      const notificationId = showApprovalNotification('requesting');
      setCurrentNotificationId(notificationId);
      kttyApproval.approve();
    } catch (error) {
      showErrorNotification(error instanceof Error ? error.message : 'Approval failed');
    }
  };

  // Check if KTTY approval is needed for hybrid payment
  const needsKttyApproval = (roundId: number): boolean => {
    const roundData = rounds.find(r => r.id === roundId);
    if (!roundData) return false;
    
    const erc20Amount = roundData.hybridPayment.erc20Amount * BigInt(quantity);
    return kttyApproval.needsApproval(erc20Amount);
  };

  // Format price display
  const formatPrice = (nativePrice: bigint, hybridNative: bigint, hybridKtty: bigint): string => {
    const nativeOnly = `${formatEther(nativePrice)} RON`;
    const hybrid = `${formatEther(hybridNative)} RON + ${formatEther(hybridKtty)} KTTY`;
    
    if (nativePrice > BigInt(0) && hybridNative > BigInt(0)) {
      return `${nativeOnly} or ${hybrid}`;
    } else if (nativePrice > BigInt(0)) {
      return nativeOnly;
    } else if (hybridNative > BigInt(0)) {
      return hybrid;
    }
    return "TBD";
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">Loading rounds...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="mb-2">Failed to load round data</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {rounds.map((round) => {
        const { label, days, hours, minutes, seconds, ended } = getCountdownData(
          now,
          round.startTime,
          round.endTime
        );

        const isOpen = openRound === round.id;
        const isCurrentRound = currentRound === round.id;
        const roundValidation = whitelistValidation[`round${round.id}` as keyof typeof whitelistValidation];
        const isEligible = (roundValidation as WhitelistValidation)?.isEligible || round.id === 4; // Round 4 is public
        const canMint = isCurrentRound && !ended && isEligible;
        const isProcessing = minting.isLoading || kttyApproval.isLoading;

        return (
          <div
            key={round.id}
            className={`relative bg-black/40 border border-white/20 rounded-lg overflow-hidden flex flex-col transition-all duration-300 ${
              isOpen ? "flex-1" : "shrink-0"
            }`}
          >
            {isOpen && ended && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                <span className="text-lg md:text-2xl font-bold text-white">
                  Sale Round Ended
                </span>
              </div>
            )}
            {/* Header */}
            <button
              className="w-full px-4 py-3 text-left"
              onClick={() => setOpenRound(isOpen ? null : round.id)}
              disabled={ended}
            >
              <div className="flex items-center justify-between">
                {/* Title + Arrow (always same line) */}
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-2xl font-semibold">
                    {round.config.title}
                  </span>
                  <span className="text-sm md:text-lg text-gray-400">
                    {ended && !isOpen ? "Ended" : isOpen ? "▲" : "▼"}
                  </span>
                </div>

                {/* Countdown (moves below on mobile via flex-col wrapper) */}
                {mounted && !ended && (
                  <span className="hidden md:inline text-xl font-mono text-white whitespace-nowrap">
                    {label}{" "}
                    {`${days.toString().padStart(2, "0")}D 
          ${hours.toString().padStart(2, "0")}H 
          ${minutes.toString().padStart(2, "0")}M 
          ${seconds.toString().padStart(2, "0")}S`}
                  </span>
                )}
              </div>

              {/* Mobile-only countdown (full-width, below title + arrow) */}
              {mounted && !ended && (
                <div className="mt-2 md:hidden text-base font-mono text-white">
                  {label}{" "}
                  {`${days.toString().padStart(2, "0")}D 
        ${hours.toString().padStart(2, "0")}H 
        ${minutes.toString().padStart(2, "0")}M 
        ${seconds.toString().padStart(2, "0")}S`}
                </div>
              )}
            </button>

            {/* Collapsible content */}
            {isOpen && (
              <div className="px-4 pb-4 flex-1 flex flex-col justify-between text-sm md:text-lg text-gray-300">
                <div className="space-y-6 md:space-y-8 overflow-y-auto">
                  <p className="leading-relaxed">{round.config.description}</p>

                  <div>
                    <p className="mb-3 md:mb-5 text-gray-400 text-base md:text-xl">
                      Available to the following:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                      {round.config.eligibility.map((group, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-3 py-1 text-sm md:text-lg bg-purple-900/40 border border-purple-500 rounded-md text-purple-300"
                        >
                          {group}
                        </span>
                      ))}
                    </div>

                    <p className="mb-2 md:mb-3 text-gray-400 text-base md:text-xl">
                      Each Mint Includes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {round.config.includes.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 md:px-3 py-1 text-sm md:text-lg bg-white/10 border border-white/40 rounded-md text-gray-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-base md:text-xl">
                    Mint Price:{" "}
                    <span className="font-semibold">
                      {formatPrice(
                        round.nativeOnlyPayment.nativeAmount,
                        round.hybridPayment.nativeAmount,
                        round.hybridPayment.erc20Amount
                      )}
                    </span>
                  </p>

                  <div>
                    <p className="mb-2 md:mb-3 text-base md:text-xl">
                      {round.progress}% minted
                    </p>
                    <div className="w-full h-2 bg-gray-700 rounded">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${round.progress}%` }}
                      />
                    </div>
                    <p className="text-base md:text-xl mt-2 md:mt-3">
                      {round.minted}/{round.supply}
                    </p>
                  </div>
                </div>

                {!ended && (
                  <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-6">
                    {/* Whitelist status display */}
                    {!isEligible && (
                      <div className="p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-md">
                        <p className="text-yellow-300 text-sm">
                          {round.id === 1 || round.id === 2 
                            ? "You're not whitelisted for this round"
                            : round.id === 3 
                            ? "You're not whitelisted for round 3"
                            : "Eligibility unknown"
                          }
                        </p>
                        {(round.id === 1 || round.id === 2) && roundValidation && (
                          <p className="text-yellow-400 text-xs mt-1">
                            Allowance: {(roundValidation as WhitelistValidation).allowance || 0} | Minted: {(roundValidation as WhitelistValidation).minted || 0}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between w-full bg-gray-800/50 border border-white/20 rounded-md p-2">
                      <button
                        className="px-3 md:px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={!canMint || isProcessing}
                      >
                        -
                      </button>
                      <span className="text-lg md:text-xl font-bold">
                        {quantity}
                      </span>
                      <button
                        className="px-3 md:px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={!canMint || isProcessing}
                      >
                        +
                      </button>
                      <button
                        className="px-3 md:px-4 py-2 bg-gray-600 rounded text-xs md:text-sm hover:bg-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setQuantity(10)}
                        disabled={!canMint || isProcessing}
                      >
                        Max
                      </button>
                    </div>

                    <div className="flex gap-3 md:gap-4">
                      <button
                        className="flex-1 py-2 md:py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                        onClick={() => handleMint(round.id, "RON")}
                        disabled={!canMint || isProcessing}
                      >
                        {isProcessing 
                          ? "Processing..." 
                          : !isCurrentRound && !ended 
                          ? "Not Current Round" 
                          : !isEligible
                          ? "Not Eligible"
                          : "Mint with RON"
                        }
                      </button>
                      <button
                        className="flex-1 py-2 md:py-3 bg-purple-600 rounded font-semibold hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
                        onClick={() => {
                          const needsApproval = needsKttyApproval(round.id);
                          if (needsApproval) {
                            handleApproval();
                          } else {
                            handleMint(round.id, "RON + KTTY");
                          }
                        }}
                        disabled={!canMint || isProcessing}
                      >
                        {isProcessing 
                          ? "Processing..." 
                          : !isCurrentRound && !ended 
                          ? "Not Current Round" 
                          : !isEligible
                          ? "Not Eligible"
                          : needsKttyApproval(round.id)
                          ? "Approve KTTY"
                          : "Mint with RON + KTTY"
                        }
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
