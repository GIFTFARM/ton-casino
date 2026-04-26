import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    url: 'https://ton-casino.vercel.app',
    name: 'TON Casino',
    iconUrl: 'https://ton-casino.vercel.app/icon.png',
    termsOfUseUrl: 'https://ton-casino.vercel.app/terms',
    privacyPolicyUrl: 'https://ton-casino.vercel.app/privacy',
  });
}