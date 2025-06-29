'use client';

import { useState } from 'react';

const CONTRACT = '5TNndTiVGcUFq8JKbpKohhA6DuxE3VtLocLfpSfUpump';

export default function SiteActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
      <a
        href="https://x.com/theangeliccoin"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center bg-gold text-black font-mono text-sm px-4 py-2 rounded-lg shadow-md hover:brightness-110 transition-all"
      >
        Twitter
      </a>

      <button
        onClick={handleCopy}
        className="w-full bg-black/80 border border-gold text-gold font-mono text-sm px-4 py-2 rounded-lg shadow-md hover:bg-black transition-all"
      >
        {copied ? 'Copied!' : CONTRACT}
      </button>
    </div>
  );
}
