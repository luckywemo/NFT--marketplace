import { useCallback, useEffect, useMemo, useState } from 'react';

type WalletConnectionStatus = 'idle' | 'connecting' | 'connected' | 'error';

const NETWORK_LABELS: Record<string, string> = {
  '0x1': 'Ethereum Mainnet',
  '0x5': 'Goerli Testnet',
  '0xaa36a7': 'Sepolia Testnet',
  '0x89': 'Polygon Mainnet',
  '0x13881': 'Polygon Mumbai',
  '0xa4b1': 'Arbitrum One',
  '0xa': 'Optimism'
};

const getNetworkLabel = (chainId: string | null): string => {
  if (!chainId) {
    return 'Unknown network';
  }
  return NETWORK_LABELS[chainId] ?? `Chain ${parseInt(chainId, 16)}`;
};

export function useWalletConnection() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletConnectionStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const truncateAddress = useCallback((address: string | null) => {
    if (!address) {
      return '';
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  const connectMetaMask = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setStatus('error');
      setError('MetaMask is not detected. Install it to continue.');
      return;
    }

    try {
      setStatus('connecting');
      setError(null);
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const selectedAccount = accounts?.[0] ?? null;
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      setAccount(selectedAccount);
      setChainId(currentChainId);
      setStatus('connected');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unable to connect wallet');
    }
  }, []);

  const resetConnection = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setStatus('idle');
    setError(null);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) {
      return;
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (!accounts || accounts.length === 0) {
        resetConnection();
        return;
      }
      setAccount(accounts[0]);
    };

    const handleChainChanged = (newChainId: string) => {
      setChainId(newChainId);
    };

    window.ethereum.on?.('accountsChanged', handleAccountsChanged);
    window.ethereum.on?.('chainChanged', handleChainChanged);

    return () => {
      window.ethereum?.removeListener?.('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener?.('chainChanged', handleChainChanged);
    };
  }, [resetConnection]);

  const networkLabel = useMemo(() => getNetworkLabel(chainId), [chainId]);
  const displayAddress = useMemo(() => truncateAddress(account), [account, truncateAddress]);

  return {
    account,
    displayAddress,
    chainId,
    networkLabel,
    status,
    error,
    connectMetaMask,
    resetConnection
  };
}

