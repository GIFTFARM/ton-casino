import { NextRequest, NextResponse } from 'next/server';

const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];
const WIN_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, betAmount } = await request.json();

    if (!walletAddress || !betAmount) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const symbols: string[] = [];
    for (let i = 0; i < 9; i++) {
      symbols.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }

    let multiplier = 0;
    for (const combo of WIN_COMBINATIONS) {
      if (symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
        const symbolIndex = SYMBOLS.indexOf(symbols[combo[0]]);
        multiplier = Math.max(multiplier, 2 + symbolIndex);
      }
    }

    const totalWin = betAmount * multiplier;
    const isWin = multiplier > 0;

    return NextResponse.json({
      symbols,
      totalWin,
      isWin,
      multiplier: multiplier || 1,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}