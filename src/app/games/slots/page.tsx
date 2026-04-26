'use client';

import { useState, useCallback } from 'react';
import { useTonWallet } from '@/hooks/useTonWallet';
import Link from 'next/link';

const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];
const BET_AMOUNTS = [1, 5, 10, 50];

interface SpinResult {
  symbols: string[][];
  totalWin: number;
  isWin: boolean;
}

function SlotMachine({ onSpin, disabled }: { onSpin: () => void; disabled: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-3 gap-2 p-4 bg-[#2B2D31] rounded-xl">
        {SYMBOLS.slice(0, 9).map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] rounded-lg border-2 border-white/10"
          >
            ?
          </div>
        ))}
      </div>
      <button
        onClick={onSpin}
        disabled={disabled}
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:opacity-90 disabled:opacity-50 transition-all transform hover:scale-105 disabled:hover:scale-100"
      >
        SPIN
      </button>
    </div>
  );
}

export default function SlotsPage() {
  const { isConnected, walletAddress } = useTonWallet();
  const [selectedBet, setSelectedBet] = useState<number>(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [balance] = useState(100);

  const handleSpin = useCallback(async () => {
    if (!isConnected || !walletAddress || isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    try {
      const response = await fetch('/api/games/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, betAmount: selectedBet }),
      });

      const data = await response.json();
      setResult({
        symbols: [
          [data.symbols[0], data.symbols[1], data.symbols[2]],
          [data.symbols[3], data.symbols[4], data.symbols[5]],
          [data.symbols[6], data.symbols[7], data.symbols[8]],
        ],
        totalWin: data.totalWin,
        isWin: data.isWin,
      });
    } catch (error) {
      console.error('Spin error:', error);
    } finally {
      setIsSpinning(false);
    }
  }, [isConnected, walletAddress, selectedBet, isSpinning]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="p-8 rounded-2xl glass max-w-md mx-auto">
          <span className="text-6xl mb-4 block">🔒</span>
          <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
          <p className="text-gray-400 mb-6">Connect your TON wallet to play Slots</p>
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
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Slot Machine
          </span>
        </h1>

        <SlotMachine onSpin={handleSpin} disabled={!isConnected || isSpinning} />

        <div className="mt-8">
          <p className="text-center text-gray-400 mb-4">Select Bet Amount</p>
          <div className="flex justify-center gap-3">
            {BET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedBet(amount)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedBet === amount
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#2B2D31] text-gray-300 hover:bg-[#3a3a3a]'
                }`}
              >
                {amount} TON
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div className="mt-8 p-6 rounded-xl glass text-center">
            <p className={`text-2xl font-bold ${result.isWin ? 'text-green-400' : 'text-red-400'}`}>
              {result.isWin ? `You won ${result.totalWin} TON!` : 'Better luck next time!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}