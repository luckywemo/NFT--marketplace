import { ArrowUpRight, Bell, Coins, Sparkles, TrendingUp, Wallet2 } from 'lucide-react';
import { Button } from '@/src/components/buttons/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';

const portfolioStats = [
  {
    label: 'Portfolio value',
    value: '42.6 ETH',
    fiat: '$128,400',
    change: '+8.6% this week',
    trend: 'up'
  },
  {
    label: 'Liquid balance',
    value: '6.4 ETH',
    fiat: '$19,300',
    change: 'Ready to bid',
    trend: 'neutral'
  },
  {
    label: 'Royalties earned',
    value: '11.2 ETH',
    fiat: '$33,700',
    change: '+1.1 ETH last 24h',
    trend: 'up'
  },
  {
    label: 'Active listings',
    value: '7 collectibles',
    fiat: 'Floor 14.3 ETH',
    change: '3 ending today',
    trend: 'neutral'
  }
];

const holdings = [
  {
    id: 'chronos-cat-214',
    name: 'Chronos Cat #214',
    collection: 'Chronos Cats',
    floor: '2.4 ETH',
    cost: '1.1 ETH',
    performance: '+118%',
    lastActivity: '2h ago'
  },
  {
    id: 'neon-bloom-77',
    name: 'Neon Bloom #77',
    collection: 'Neon Bloom',
    floor: '4.1 ETH',
    cost: '2.9 ETH',
    performance: '+41%',
    lastActivity: '6h ago'
  },
  {
    id: 'soho-shell-15',
    name: 'Soho Shell #15',
    collection: 'Soho Shells',
    floor: '1.3 ETH',
    cost: '0.9 ETH',
    performance: '+22%',
    lastActivity: '1d ago'
  }
];

const activities = [
  {
    id: 'activity-1',
    type: 'Sale',
    description: 'Sold Neon Bloom #77',
    value: '+1.8 ETH',
    channel: 'Marketplace',
    timestamp: 'Today · 09:24'
  },
  {
    id: 'activity-2',
    type: 'Bid',
    description: 'Received bid on Chronos Cat #214',
    value: '2.2 ETH',
    channel: 'Blur Relay',
    timestamp: 'Today · 07:18'
  },
  {
    id: 'activity-3',
    type: 'Royalty',
    description: 'Secondary sale royalty',
    value: '+0.3 ETH',
    channel: 'Creator split',
    timestamp: 'Yesterday · 21:04'
  }
];

const watchlist = [
  {
    id: 'azuki',
    name: 'Azuki Elements',
    floor: '5.9 ETH',
    change: '+12.4%',
    listings: 482
  },
  {
    id: 'synthetic',
    name: 'Synthetic Waves',
    floor: '1.1 ETH',
    change: '+4.1%',
    listings: 211
  },
  {
    id: 'lumen',
    name: 'Lumen City',
    floor: '0.74 ETH',
    change: '-2.5%',
    listings: 137
  }
];

const revenueSplit = [
  { label: 'Primary sales', value: 45 },
  { label: 'Secondary sales', value: 35 },
  { label: 'Creator royalties', value: 20 }
];

const GaugeBar = ({ value }: { value: number }) => (
  <div className="h-2 rounded-full bg-muted">
    <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${value}%` }} />
  </div>
);

export default function PortfolioDashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Analytics</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Collector performance</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Monitor holdings, recent activity, royalty flow, and watchlists. Updated every 15 seconds.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="gap-2">
            <Wallet2 className="h-4 w-4" />
            Manage wallets
          </Button>
          <Button className="gap-2 bg-pink-600 text-white hover:bg-pink-700">
            <Sparkles className="h-4 w-4" />
            Create drop
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {portfolioStats.map((stat) => (
          <Card key={stat.label} className="border-muted">
            <CardHeader className="pb-3">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">
              <div>{stat.fiat}</div>
              <div
                className={`mt-1 flex items-center gap-1 font-medium ${
                  stat.trend === 'up'
                    ? 'text-emerald-500'
                    : stat.trend === 'down'
                      ? 'text-red-500'
                      : 'text-muted-foreground'
                }`}
              >
                {stat.trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Top holdings</CardTitle>
              <CardDescription>Floor vs. cost basis to highlight upside.</CardDescription>
            </div>
            <Button variant="ghost" className="gap-2 text-sm font-medium">
              View ledger
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {holdings.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border p-4 transition hover:border-pink-200 hover:bg-pink-50/40 dark:hover:border-pink-900/50 dark:hover:bg-pink-950/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase text-muted-foreground">{item.collection}</p>
                    <p className="text-lg font-semibold">{item.name}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Floor</p>
                    <p className="text-base font-semibold">{item.floor}</p>
                  </div>
                </div>
                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Cost basis</p>
                    <p className="font-medium">{item.cost}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Performance</p>
                    <p className="font-medium text-emerald-500">{item.performance}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Last activity</p>
                    <p className="font-medium">{item.lastActivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Royalty inflow</CardTitle>
              <CardDescription>Split between primary/secondary sales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueSplit.map((slice) => (
                <div key={slice.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{slice.label}</span>
                    <span className="font-semibold">{slice.value}%</span>
                  </div>
                  <GaugeBar value={slice.value} />
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex items-center gap-3 rounded-xl border p-3">
                <Coins className="h-10 w-10 rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/20 dark:text-amber-200" />
                <div>
                  <p className="text-sm font-medium">Auto-withdraw enabled</p>
                  <p className="text-xs text-muted-foreground">Royalties sweep to treasury every Sunday.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Watchlist</CardTitle>
              <CardDescription>Floor alerts when ±5% from target.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {watchlist.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.listings} listings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{asset.floor}</p>
                    <p
                      className={`text-xs font-semibold ${
                        asset.change.startsWith('-') ? 'text-red-500' : 'text-emerald-500'
                      }`}
                    >
                      {asset.change}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 text-sm">
                <Bell className="h-4 w-4" />
                Manage alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Activity</CardTitle>
              <CardDescription>Live events from marketplaces, bids, and royalties.</CardDescription>
            </div>
            <Button variant="ghost" className="text-sm font-medium">
              Export log
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((event) => (
              <div key={event.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3">
                <div>
                  <p className="text-sm font-semibold">{event.type}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <div className="text-sm text-muted-foreground">{event.channel}</div>
                <div className="text-right">
                  <p className="text-base font-semibold">{event.value}</p>
                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Drop readiness</CardTitle>
            <CardDescription>Checklist before launching your next collection.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border p-3">
              <p className="text-sm font-semibold">Mint contract</p>
              <p className="text-xs text-muted-foreground">Audit complete · Ready to deploy</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="text-sm font-semibold">Artwork pipeline</p>
              <p className="text-xs text-muted-foreground">118/150 assets approved</p>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-pink-500" style={{ width: '78%' }} />
              </div>
            </div>
            <div className="rounded-xl border p-3">
              <p className="text-sm font-semibold">Allowlist window</p>
              <p className="text-xs text-muted-foreground">Opens in 2 days</p>
            </div>
            <Button className="w-full gap-2 bg-pink-600 text-white hover:bg-pink-700">
              Launch checklist
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


