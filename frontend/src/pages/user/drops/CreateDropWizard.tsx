import { useState } from 'react';
import AccountLayout from '../profile/account-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Button } from '@/src/components/buttons/button';
import { Input } from '@/src/components/user-inputs/input';
import { Label } from '@/src/components/ui/label';
import { Switch } from '@/src/components/ui/switch';
import { Separator } from '@/src/components/ui/separator';
import { Sparkles, UploadCloud, Wallet2, ShieldCheck, ListChecks } from 'lucide-react';

const wizardSteps = [
  { id: 'metadata', label: 'Metadata', description: 'Name, symbol, artist split' },
  { id: 'supply', label: 'Supply & pricing', description: 'Max supply, mint price, royalties' },
  { id: 'schedule', label: 'Schedule', description: 'Allowlist and public windows' },
  { id: 'assets', label: 'Artwork', description: 'Upload and IPFS pinning' },
  { id: 'review', label: 'Review', description: 'Simulation + deploy' }
];

const defaultFormState = {
  collectionName: 'Lumen City Season 02',
  symbol: 'LUMEN2',
  supply: 1500,
  mintPrice: 0.12,
  royalty: 7.5,
  allowlistStart: '2024-11-21T17:00',
  publicStart: '2024-11-22T19:00',
  description:
    'Second season of the Lumen City story arc. Dynamic skyline renders, on-chain lighting transitions, and soundtrack stems unlocked to holders.'
};

export default function CreateDropWizard() {
  const [formState, setFormState] = useState(defaultFormState);
  const [autoReveal, setAutoReveal] = useState(true);
  const [allowlistEnabled, setAllowlistEnabled] = useState(true);

  const updateField = (key: keyof typeof formState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AccountLayout
      title="Create drop"
      description="Ship a new collection with guided steps. Configure metadata, economics, launch windows, and compliance checks in one place."
    >
      <div className="space-y-6">
        <Card className="border-pink-200 bg-pink-50/60 dark:border-pink-900 dark:bg-pink-950/20">
          <CardContent className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-pink-600">Drop pipeline</p>
              <h2 className="text-2xl font-semibold text-pink-900 dark:text-pink-100">Launch in under 10 minutes</h2>
              <p className="mt-1 text-sm text-pink-700 dark:text-pink-200">
                Drafts autosave locally. Connect a deployer wallet when you are ready to push to mainnet.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <UploadCloud className="h-4 w-4" />
                Import metadata CSV
              </Button>
              <Button className="gap-2 bg-pink-600 text-white hover:bg-pink-700">
                <Sparkles className="h-4 w-4" />
                Run pre-flight checks
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress overview</CardTitle>
            <CardDescription>Each section must read “Ready” before deploying.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-5">
            {wizardSteps.map((step, index) => (
              <div
                key={step.id}
                className="rounded-xl border p-3 text-sm shadow-sm transition hover:border-pink-300 hover:bg-pink-50/60 dark:hover:border-pink-700/60 dark:hover:bg-pink-950/20"
              >
                <p className="text-xs uppercase text-muted-foreground">Step {index + 1}</p>
                <p className="text-base font-semibold">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
                <span className="mt-2 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                  Ready
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collection metadata</CardTitle>
            <CardDescription>Define the identity and discovery details for marketplaces.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="collectionName">Collection name</Label>
                <Input
                  id="collectionName"
                  value={formState.collectionName}
                  onChange={(e) => updateField('collectionName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="symbol">Ticker symbol</Label>
                <Input id="symbol" value={formState.symbol} onChange={(e) => updateField('symbol', e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Story / description</Label>
              <textarea
                id="description"
                rows={4}
                className="mt-2 w-full rounded-md border border-slate-200 bg-transparent p-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 dark:border-slate-700"
                value={formState.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="supply">Supply</Label>
                <Input
                  id="supply"
                  type="number"
                  value={formState.supply}
                  onChange={(e) => updateField('supply', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="mintPrice">Mint price (ETH)</Label>
                <Input
                  id="mintPrice"
                  type="number"
                  step="0.01"
                  value={formState.mintPrice}
                  onChange={(e) => updateField('mintPrice', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="royalty">Royalty %</Label>
                <Input
                  id="royalty"
                  type="number"
                  step="0.5"
                  value={formState.royalty}
                  onChange={(e) => updateField('royalty', Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule & allowlist</CardTitle>
            <CardDescription>Coordinate allowlist and public windows. Syncs with notification rules.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <p className="font-medium">Enable allowlist window</p>
                <p className="text-sm text-muted-foreground">Recommended to avoid gas wars. Supports CSV import.</p>
              </div>
              <Switch checked={allowlistEnabled} onCheckedChange={setAllowlistEnabled} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="allowlistStart">Allowlist start</Label>
                <Input
                  id="allowlistStart"
                  type="datetime-local"
                  value={formState.allowlistStart}
                  onChange={(e) => updateField('allowlistStart', e.target.value)}
                  disabled={!allowlistEnabled}
                />
              </div>
              <div>
                <Label htmlFor="publicStart">Public sale start</Label>
                <Input
                  id="publicStart"
                  type="datetime-local"
                  value={formState.publicStart}
                  onChange={(e) => updateField('publicStart', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border p-4">
              <div>
                <p className="font-medium">Auto-reveal assets after sellout</p>
                <p className="text-sm text-muted-foreground">Automatically flips metadata once treasury reaches target.</p>
              </div>
              <Switch checked={autoReveal} onCheckedChange={setAutoReveal} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artwork pipeline</CardTitle>
            <CardDescription>Upload ZIP, trigger IPFS pinning, and assign rarity tables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center justify-between rounded-2xl border border-dashed p-4">
              <div>
                <p className="font-medium">Upload assets</p>
                <p className="text-sm text-muted-foreground">Drag & drop 1500 PNG/GLB files.</p>
              </div>
              <Button variant="outline" className="gap-2">
                <UploadCloud className="h-4 w-4" />
                Select files
              </Button>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">IPFS pinning</p>
                <span className="text-xs text-muted-foreground">Est. 3m remaining</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: '68%' }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">1024 / 1500 assets pinned.</p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="font-medium">Rarity table</p>
              <p className="text-sm text-muted-foreground">Upload CSV or edit traits inline.</p>
              <Button variant="ghost" className="mt-2 px-0 text-sm font-medium text-pink-600">
                Open rarity editor
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Launch checklist</CardTitle>
            <CardDescription>Last run before hitting “Deploy”.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="font-medium">Smart contract audit</p>
                    <p className="text-sm text-muted-foreground">No critical issues · Gas optimized</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border p-4">
                <div className="flex items-center gap-3">
                  <Wallet2 className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Treasury wallet</p>
                    <p className="text-sm text-muted-foreground">Multisig · 3/5 signers connected</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="flex items-center gap-3">
                <ListChecks className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="font-medium">Pre-flight simulation</p>
                  <p className="text-sm text-muted-foreground">Sepolia dry-run succeeded (block 5219032).</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap justify-end gap-3">
              <Button variant="outline">Save draft</Button>
              <Button className="bg-pink-600 text-white hover:bg-pink-700">Deploy to mainnet</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
}


