'use client';

export default function RuneFlicker({ level }: { level: number }) {
  const runeCount = 5 + level * 3;
  const runes = Array.from({ length: runeCount }, (_, i) => i);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {runes.map((rune) => (
        <div
          key={rune}
          className="absolute w-[8px] h-[8px] bg-gold opacity-10 animate-ping rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}