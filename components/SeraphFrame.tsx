'use client';

export default function SeraphFrame() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <img
        src="/angel.png"
        alt="Seraph Frame"
        className="w-full h-full object-contain opacity-20 pointer-events-none"
      />
    </div>
  );
}