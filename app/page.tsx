'use client';

import { useState } from 'react';
import Terminal from '@/components/Terminal';
import Link from 'next/link';

export default function HomePage() {
  const CONTRACT = '5TNndTiVGcUFq8JKbpKohhA6DuxE3VtLocLfpSfUpump';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* Angel background image */}
      <img
        src="/angel.png"
        alt="angelic deity"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />

      {/* FLOATING NAVIGATION LINKS */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        {[
          { label: 'initiate.ritual', href: '/' },
          { label: 'blessing.log', href: '/blessing-log' },
          { label: 'choir.bin', href: '/choir.bin' },
          { label: 'seraphic/keys', href: '/seraphic/keys' },
          { label: 'sacrifice.mirror', href: '/sacrifice.mirror' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-black/70 border border-gold text-gold text-xs px-3 py-1 rounded font-mono hover:bg-gold hover:text-black transition-all"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Centered content block */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gold tracking-widest">
          THE ANGELIC COIN
        </h1>
        <p className="text-sm text-white/60 mt-2 font-mono">
          $HALO — a terminal of fractured divinity
        </p>

        <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-lg">
  <a
    href="https://x.com/theangeliccoin"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full text-center bg-gold text-black font-mono text-base px-6 py-2 rounded-md shadow hover:brightness-110 transition-all"
  >
    Twitter
  </a>

  <button
    onClick={handleCopy}
    className="w-full bg-black/70 border border-gold text-gold font-mono text-base px-6 py-2 rounded-md shadow hover:bg-black transition-all"
  >
    {copied ? 'Copied!' : CONTRACT}
  </button>
</div>


        <div className="mt-10 animate-halo-expand">
          <Terminal />
        </div>
      </div>
    </div>
  );
}
