'use client';

import { useState } from 'react';
import { useTonWallet } from '@/hooks/useTonWallet';
import Link from 'next/link';

const BET_TYPES = [
  { type: 'red', label: 'Red', payout: 2, color: '#ef4444' },
  { type: 'black', label: 'Black', payout: 2, color: '#1f2937' },
  { type: 'even', label: 'Even', payout: 2, color: '#3b82f6' },
  { type: 'odd', label: 'Odd', payout: 2, color: '#8b5cf6' },
];

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

export default function RoulettePage() {
  const { isConnected, walletAddress } = useTonWallet();
  const [selectedBetType, setSelectedBetType] = useState('red');
  const [betAmount, setBetAmount] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ number: number; color: string; win: number } | null>(null);
  const [balance] = useState(100);

  const handleSpin = async () => {
    if (!isConnected || !walletAddress || isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    try {
      const response = await fetch('/api/games/roulette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, betAmount, betType: selectedBetType }),
      });

      const data = await response.json();
      setResult({
        number: data.result,
        color: RED_NUMBERS.includes(data.result) ? 'red' : 'black',
        win: data.winAmount,
      });
    } catch (error) {
      console.error('Roulette error:', error);
    } finally {
      setIsSpinning(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 rounded-2xl glass max-w-md mx-auto">
          <span className="text-6xl mb-4 block">🔒</span>
          <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
          <p className="text-gray-400 mb-6">Connect your TON wallet to play Roulette</p>
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
          <Link href="/" className="text-gray-400 hover:text-white">
            ← Back
          </Link>
          <div className="text-right">
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-2xl font-bold text-yellow-400">{balance} TON</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Roulette
          </span>
        </h1>

        <div className="flex justify-center mb-8">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold border-4 ${
            result ? (RED_NUMBERS.includes(result.number) ? 'border-red-500 bg-red-500/20' : 'border-gray-600 bg-gray-600/20') : 'border-yellow-400 bg-yellow-400/20'
          }`}>
            {result ? result.number : '🎡'}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-center text-gray-400 mb-4">Select Bet Type</p>
          <div className="grid grid-cols-4 gap-2">
            {BET_TYPES.map((bet) => (
              <button
                key={bet.type}
                onClick={() => setSelectedBetType(bet.type)}
                className={`p-3 rounded-lg font-semibold transition-all text-sm ${
                  selectedBetType === bet.type
                    ? 'bg-green-600 text-white'
                    : 'bg-[#2B2D31] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                {bet.label}
                <span className="block text-xs opacity-70">{bet.payout}x</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-center text-gray-400 mb-4">Bet Amount (TON)</p>
          <div className="flex justify-center gap-2">
            {[1, 5, 10, 50].map((amount) => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  betAmount === amount
                    ? 'bg-green-600 text-white'
                    : 'bg-[#2B2D31] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>

        {result && (
          <div className="mt-6 p-6 rounded-xl glass text-center">
            <p className={`text-2xl font-bold ${result.win > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {result.win > 0 ? `You won ${result.win} TON!` : 'Better luck next time!'}
            </p>
            <p className="text-gray-400 mt-2">
              Result: {result.number} ({result.color})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}