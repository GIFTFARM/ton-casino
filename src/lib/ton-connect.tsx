'use client';

import { createContext, useContext, ReactNode } from 'react';
import { TonConnectUI } from '@tonconnect/ui';

interface TonConnectContextValue {
  tonConnect: TonConnectUI;
}

const TonConnectContext = createContext<TonConnectContextValue | null>(null);

let tonConnectInstance: TonConnectUI | null = null;

export function TonConnectProvider({ children }: { children: ReactNode }) {
  if (!tonConnectInstance) {
    tonConnectInstance = new TonConnectUI({
      manifestUrl: process.env.NEXT_PUBLIC_MANIFEST_URL || 'https://ton-casino.vercel.app/tonconnect-manifest.json',
    });
  }

  return (
    <TonConnectContext.Provider value={{ tonConnect: tonConnectInstance }}>
      {children}
    </TonConnectContext.Provider>
  );
}

export function useTonConnect() {
  const context = useContext(TonConnectContext);
  if (!context) {
    throw new Error('useTonConnect must be used within TonConnectProvider');
  }
  return context.tonConnect;
}