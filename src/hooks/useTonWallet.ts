'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTonConnect } from './ton-connect';

export interface WalletState {
  isConnected: boolean;
  walletAddress: string | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
}

export function useTonWallet() {
  const tonConnect = useRef(useTonConnect());
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
      await tonConnect.current.connectWallet();
    } catch (err) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err.message : 'Connection failed',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    tonConnect.current.disconnect();
  }, []);

  useEffect(() => {
    const checkConnection = () => {
      if (tonConnect.current.account?.address) {
        setState({
          isConnected: true,
          walletAddress: tonConnect.current.account.address,
          balance: null,
          isConnecting: false,
          error: null,
        });
      }
    };

    checkConnection();

    const unsubscribe = tonConnect.current.onStatusChange((wallet) => {
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