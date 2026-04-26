'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTonConnectUI } from '@/lib/ton-connect';

export interface WalletState {
  isConnected: boolean;
  walletAddress: string | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
}

export function useTonWallet() {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    walletAddress: null,
    balance: null,
    isConnecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    try {
      await getTonConnectUI().connectWallet();
    } catch (err) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err.message : 'Connection failed',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    getTonConnectUI().disconnect();
  }, []);

  useEffect(() => {
    const ui = getTonConnectUI();

    const checkConnection = async () => {
      if (ui.account?.address) {
        setState({
          isConnected: true,
          walletAddress: ui.account.address,
          balance: null,
          isConnecting: false,
          error: null,
        });
      }
    };

    checkConnection();

    const unsubscribe = ui.onStatusChange((wallet) => {
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