import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, Smartphone, Wallet2 } from 'lucide-react';
import { Button } from '@/src/components/buttons/button';
import { useWalletConnection } from '@/src/hooks/useWalletConnection';
import { cn } from '@/src/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';

const walletOptions = [
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Browser extension wallet. Works best on desktop.',
    installUrl: 'https://metamask.io/download/',
    cta: 'Connect MetaMask',
    supportsDirectConnect: true
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    description: 'Use your favorite mobile wallet via QR code bridge.',
    installUrl: 'https://walletconnect.com/explorer',
    cta: 'View compatible wallets',
    supportsDirectConnect: false
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    description: 'Standalone mobile wallet with fiat on-ramp.',
    installUrl: 'https://www.coinbase.com/wallet/downloads',
    cta: 'Install Coinbase Wallet',
    supportsDirectConnect: false
  }
];

const readinessChecklist = [
  {
    title: 'Install the wallet',
    description: 'Choose one wallet and download the browser extension or mobile app.',
    tips: ['Enable the extension after install', 'Create or import a recovery phrase', 'Store the seed phrase offline']
  },
  {
    title: 'Fund your wallet',
    description: 'Add ETH or the currency required for the next drop.',
    tips: [
      'Use Coinbase, MoonPay, or Ramp for fiat on-ramps',
      'Bridge to Polygon if you want lower fees',
      'Leave extra funds for gas fees (5-10% buffer)'
    ]
  },
  {
    title: 'Connect & verify',
    description: 'Connect the wallet inside the marketplace and confirm the account matches your profile.',
    tips: ['Check the URL before signing', 'Read transaction details carefully', 'Never share your private key']
  }
];

const onRampOptions = [
  {
    label: 'MoonPay',
    description: 'Buy ETH with debit/credit in 160+ countries.',
    url: 'https://www.moonpay.com/buy/eth'
  },
  {
    label: 'Ramp',
    description: 'Fast settlements with Apple Pay, cards, and bank transfers.',
    url: 'https://ramp.network/buy/eth'
  },
  {
    label: 'Coinbase',
    description: 'Use your Coinbase balance and send to your wallet.',
    url: 'https://www.coinbase.com/price/ethereum'
  }
];

const connectionStatusCopy: Record<string, { label: string; tone: string }> = {
  idle: { label: 'Wallet not connected', tone: 'text-muted-foreground' },
  connecting: { label: 'Awaiting wallet confirmation…', tone: 'text-blue-500' },
  connected: { label: 'Wallet connected', tone: 'text-green-600' },
  error: { label: 'Connection failed', tone: 'text-destructive' }
};

export default function WalletOnboardingSection() {
  const { status, networkLabel, displayAddress, error, connectMetaMask } = useWalletConnection();

  return (
    <section className="bg-slate-50 px-6 py-20 dark:bg-slate-900/50">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            Wallet onboarding
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">Get wallet-ready in three steps</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Connect any supported wallet, add funds, and verify your connection before jumping into drops.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Wallet2 className="h-6 w-6 text-pink-500" />
                  Choose your wallet
                </CardTitle>
                <CardDescription>Pick the connector that matches your setup.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {walletOptions.map((wallet) => (
                  <div
                    key={wallet.id}
                    className={cn(
                      'rounded-xl border p-4 shadow-sm transition hover:border-pink-500 hover:shadow-md',
                      wallet.supportsDirectConnect && status === 'connected'
                        ? 'border-green-500'
                        : 'border-slate-200 dark:border-slate-800'
                    )}
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {wallet.name}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{wallet.description}</p>
                    <Button
                      variant={wallet.supportsDirectConnect ? 'default' : 'outline'}
                      className="mt-4 w-full"
                      onClick={() => {
                        if (wallet.supportsDirectConnect) {
                          connectMetaMask();
                          return;
                        }
                        window.open(wallet.installUrl, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      {wallet.cta}
                    </Button>
                    <Button
                      variant="ghost"
                      className="mt-2 w-full text-xs font-semibold"
                      onClick={() => window.open(wallet.installUrl, '_blank', 'noopener,noreferrer')}
                    >
                      Install guide
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ShieldCheck className="h-6 w-6 text-pink-500" />
                  Wallet readiness checklist
                </CardTitle>
                <CardDescription>Follow the recommended setup flow to avoid failed mints.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {readinessChecklist.map((step, index) => (
                  <div key={step.title}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-lg font-bold text-pink-600">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                          {step.tips.map((tip) => (
                            <li key={tip}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {index < readinessChecklist.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-pink-500" />
                  Connection status
                </CardTitle>
                <CardDescription>Verify your wallet before heading to minting flows.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800/60">
                  <p
                    className={cn(
                      'text-sm font-semibold uppercase tracking-wide',
                      connectionStatusCopy[status].tone
                    )}
                  >
                    {connectionStatusCopy[status].label}
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {displayAddress || 'No wallet detected'}
                  </p>
                  <p className="text-sm text-muted-foreground">{networkLabel}</p>
                </div>
                {error && (
                  <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-300">
                    {error}
                  </p>
                )}
                <Button onClick={connectMetaMask} disabled={status === 'connecting'} className="w-full">
                  {status === 'connecting' ? 'Confirm in wallet…' : 'Reconnect MetaMask'}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Need help? Reach us on Discord before signing any transaction from an unknown site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fiat on-ramps</CardTitle>
                <CardDescription>Buy crypto with a card or bank transfer.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {onRampOptions.map((option) => (
                  <div
                    key={option.label}
                    className="rounded-lg border border-slate-200 p-4 hover:border-pink-500 dark:border-slate-800"
                  >
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <Button
                      variant="ghost"
                      className="mt-2 px-0 text-sm font-semibold text-pink-600"
                      onClick={() => window.open(option.url, '_blank', 'noopener,noreferrer')}
                    >
                      Open site
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

