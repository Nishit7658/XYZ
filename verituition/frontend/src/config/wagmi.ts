import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalancheFuji } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'VeriTuition',
  projectId: 'YOUR_PROJECT_ID', // Replaced with WalletConnect Project ID if needed for production
  chains: [avalancheFuji],
  ssr: true,
});
