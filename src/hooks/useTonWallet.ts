'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TonConnectUI } from '@tonconnect/ui';

export interface WalletState {
  isConnected: boolean;
  walletAddress: string | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
}

let tonConnectInstance: TonConnectUI | null = null;

function getTonConnect(): TonConnectUI {
  if (!tonConnectInstance) {
    tonConnectInstance = new TonConnectUI({
      manifestUrl: process.env.NEXT_PUBLIC_MANIFEST_URL || 'https://ton-casino.vercel.app/tonconnect-manifest.json',
    });
  }
  return tonConnectInstance;
}

export function useTonWallet() {
  const [state, setState] = useState<WalletState>(() => {
    const tc = getTonConnect();
    return {
      isConnected: !!tc.account?.address,
      walletAddress: tc.account?.address || null,
      balance: null,
      isConnecting: false,
      error: null,
    };
  });

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    try {
      await getTonConnect().connectWallet();
    } catch (err) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err.message : 'Connection failed',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    getTonConnect().disconnect();
  }, []);

  useEffect(() => {
    const tc = getTonConnect();
    
    const unsubscribe = tc.onStatusChange((wallet) => {
      if (wallet) {
        setState({
          isConnected: true,
          walletAddress: wallet.account.address,
          balance: null,
          isConnecting: false,
          error: null,
        });
      } else {
        setState({
          isConnected: false,
          walletAddress: null,
          balance: null,
          isConnecting: false,
          error: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { ...state, connect, disconnect };
}