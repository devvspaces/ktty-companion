import React from 'react';

interface AuraMeterProps {
  auraLevel: number;
  maxAura: number;
}

const AuraMeter: React.FC<AuraMeterProps> = ({ auraLevel, maxAura }) => {
  const percentage = (auraLevel / maxAura) * 100;

  return (
    <div className="w-96 h-8 mt-6 bg-gray-700 rounded-full overflow-hidden border-2 border-yellow-400 select-none">
      <div
        className="h-full bg-yellow-400 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default AuraMeter;
