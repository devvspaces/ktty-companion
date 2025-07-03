'use client';

import { useEffect, useState } from 'react';

type Rune = {
  top: string;
  left: string;
  delay: string;
};

export default function RuneFlicker({ level = 1 }: { level?: number }) {
  const [runes, setRunes] = useState<Rune[]>([]);

  useEffect(() => {
    const newRunes = Array.from({ length: 8 + level * 2 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));

    setRunes(newRunes);
  }, [level]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {runes.map((rune, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-gold rounded-full animate-pulse-glow"
          style={{
            top: rune.top,
            left: rune.left,
            animationDelay: rune.delay,
          }}
        />
      ))}
    </div>
  );
}
