"use client";

import SummonBookModal from "@/components/SummonBookModal";
import { BookDetail } from "@/hooks/useUserBooks";

type BookSelectViewProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    selectedBooks: BookDetail[],
    selection: Record<string, number>
  ) => void;
  countRequired: number;
  inventory: {
    id: string;
    icon: string;
    amount: number;
    color: string;
  }[];
  booksMap: Record<string, any>;
};

export default function BookSelectView({
  isOpen,
  onClose,
  onConfirm,
  countRequired,
  inventory,
  booksMap,
}: BookSelectViewProps) {
  return (
    <SummonBookModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      countRequired={countRequired}
      inventory={inventory}
      booksMap={booksMap}
    />
  );
}
