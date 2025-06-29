'use client';

const LAYERS = ['The Silence', 'The Choir', 'The Wheel', 'The Blade', 'The Eye'];

export default function LayerAscensionHUD({ level }: { level: number }) {
  return (
    <div className="absolute top-4 left-4 z-20 text-xs text-white/60 tracking-wide">
      <div className="uppercase mb-1 text-gold">Ascension</div>
      <ul>
        {LAYERS.map((layer, index) => (
          <li key={index} className={index + 1 <= level ? 'text-gold' : 'opacity-30'}>
            {index + 1}. {layer}
          </li>
        ))}
      </ul>
    </div>
  );
}
