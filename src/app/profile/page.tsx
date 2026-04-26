'use client';

import { useTonWallet } from '@/hooks/useTonWallet';
import Link from 'next/link';

export default function ProfilePage() {
  const { isConnected, walletAddress } = useTonWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!isConnected || !walletAddress) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 rounded-2xl glass max-w-md mx-auto">
          <span className="text-6xl mb-4 block">🔒</span>
          <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
          <p className="text-gray-400 mb-6">Connect your TON wallet to view profile</p>
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            ← Back to games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
        </div>

        <div className="p-6 rounded-2xl glass mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
              🎰
            </div>
            <div>
              <p className="text-xl font-bold">{formatAddress(walletAddress)}</p>
              <p className="text-sm text-gray-400">TON Wallet</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#2B2D31] text-center">
            <p className="text-2xl font-bold text-purple-400">0</p>
            <p className="text-sm text-gray-400">Games</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2B2D31] text-center">
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-sm text-gray-400">Won</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2B2D31] text-center">
            <p className="text-2xl font-bold text-red-400">0</p>
            <p className="text-sm text-gray-400">Lost</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#2B2D31]">
          <h2 className="font-semibold mb-4">Recent Games</h2>
          <p className="text-gray-400 text-sm">No games yet. Start playing!</p>
        </div>
      </div>
    </div>
  );
}