'use client';

export default function GlitchEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-5 animate-glow-fast">
      <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,#fff,transparent)] mix-blend-soft-light"></div>
    </div>
  );
}