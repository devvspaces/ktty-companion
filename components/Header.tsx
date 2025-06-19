'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

const CONTRACT_ADDRESS = '5TNndTiVGcUFq8JKbpKohhA6DuxE3VtLocLfpSfUpump';

const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-900 bg-opacity-90 fixed top-0 z-50">
      <div className="flex items-center space-x-4">
        <Image
          src="/auracattext.png"
          alt="Auracat Logo"
          width={120}
          height={40}
          priority
        />
        <button
          onClick={handleCopy}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-mono text-sm px-3 py-1 rounded select-none transition"
          aria-label="Copy Contract Address"
          title="Copy Contract Address"
        >
          {copied ? 'Copied!' : CONTRACT_ADDRESS}
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <a
          href="https://x.com/auracatgame"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="hover:brightness-125 transition"
        >
          <Image src="/x-icon.png" alt="Twitter" width={40} height={40} priority />
        </a>

        <WalletMultiButton className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded px-4 py-2 transition" />
      </div>
    </header>
  );
};

export default Header;
