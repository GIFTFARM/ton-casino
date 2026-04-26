import { NextRequest, NextResponse } from 'next/server';

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, betAmount, betType } = await request.json();

    if (!walletAddress || !betAmount || !betType) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const result = Math.floor(Math.random() * 37);
    const isRed = RED_NUMBERS.includes(result);
    const isEven = result % 2 === 0;

    let winAmount = 0;
    let isWin = false;

    switch (betType) {
      case 'red':
        isWin = isRed;
        break;
      case 'black':
        isWin = !isRed && result !== 0;
        break;
      case 'even':
        isWin = isEven && result !== 0;
        break;
      case 'odd':
        isWin = !isEven && result !== 0;
        break;
    }

    if (isWin) {
      winAmount = betAmount * 2;
    }

    return NextResponse.json({
      result,
      isWin,
      winAmount,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}