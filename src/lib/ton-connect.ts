import { TonConnectUI } from '@tonconnect/ui';

let tonConnectUI: TonConnectUI | null = null;

export function getTonConnectUI(): TonConnectUI {
  if (!tonConnectUI) {
    tonConnectUI = new TonConnectUI({
      manifestUrl: process.env.NEXT_PUBLIC_MANIFEST_URL || 'https://example.com/tonconnect-manifest.json',
    });
  }
  return tonConnectUI;
}

export const tonConnectBtnStyles = {
  width: '100%',
  height: '48px',
  borderRadius: '8px',
};