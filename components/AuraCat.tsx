import React from 'react';
import Image from 'next/image';

interface AuraCatProps {
  auraLevel: number;
  shake?: boolean;
}

const AuraCat: React.FC<AuraCatProps> = ({ auraLevel, shake = false }) => {
  const intensity = auraLevel / 100;
  const auraColor = `rgba(255, 215, 0, ${0.3 + intensity * 0.7})`;

  return (
    <div className={`relative w-80 h-80 mt-12 flex items-center justify-center ${shake ? 'shake' : ''}`}>
      {/* Pixel block background behind */}
      <div
        style={{
          boxShadow: `0 0 30px 15px ${auraColor}`,
          filter: `blur(${7 * intensity}px)`,
          transition: 'all 0.3s ease',
        }}
        className="absolute w-64 h-64 bg-yellow-900/20 rounded-sm"
      />

      <Image
        src="/pixel-cat.png"
        alt="Aura Cat"
        width={320}
        height={320}
        priority
        className="relative z-10"
      />
    </div>
  );
};

export default AuraCat;
