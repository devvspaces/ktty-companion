"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';
import { useState } from 'react';

interface WalletButtonProps {
  fullWidth?: boolean;
}

export default function WalletButton({ fullWidth = false }: WalletButtonProps) {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleConnect = () => {
    const roninConnector = connectors.find(c => c.name.toLowerCase().includes('ronin'));
    if (roninConnector) {
      connect({ connector: roninConnector });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white rounded-lg transition-all duration-200 border border-purple-600/30 ${fullWidth ? 'w-full justify-center' : ''}`}
        >
          <Wallet size={16} />
          <span className="font-medium">{formatAddress(address)}</span>
        </button>
        
        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-gray-900 border border-white/10 rounded-lg shadow-lg min-w-[180px] z-50">
            <div className="p-3 border-b border-white/10">
              <div className="text-xs text-gray-400">Connected</div>
              <div className="text-sm font-medium text-white">{formatAddress(address)}</div>
            </div>
            <button
              onClick={() => {
                disconnect();
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-all duration-200"
            >
              <LogOut size={16} />
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white rounded-lg transition-all duration-200 border border-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full justify-center' : ''}`}
    >
      <Wallet size={16} />
      <span className="font-medium">
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </span>
    </button>
  );
}