import { useState } from 'react';
import { Activity, BellRing, Inbox, ShieldCheck, Smartphone, Tablet, Monitor } from 'lucide-react';
import AccountLayout from '../profile/account-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/ui/card';
import { Switch } from '@/src/components/ui/switch';
import { Button } from '@/src/components/buttons/button';
import { Separator } from '@/src/components/ui/separator';

const channelPreferences = [
  {
    id: 'email',
    label: 'Email notifications',
    description: 'Weekly summary, bids, royals, and system alerts sent to lucky@dottie.xyz.'
  },
  {
    id: 'push',
    label: 'Push notifications',
    description: 'Instant alerts on desktop & mobile when a watchlist rule is triggered.'
  },
  {
    id: 'sms',
    label: 'SMS backup',
    description: 'Fallback text message when high-priority alerts fail on other channels.'
  }
];

const watchlistAlerts = [
  {
    id: 'azuki-floor',
    label: 'Azuki Elements floor',
    rule: 'Ping me when ±5% of 5.8 ETH',
    delivery: ['push', 'email']
  },
  {
    id: 'chronos-offer',
    label: 'Chronos Cat top bid',
    rule: 'Alert when bid > 2.4 ETH',
    delivery: ['push']
  },
  {
    id: 'royalty-drop',
    label: 'Royalty run-rate',
    rule: 'Send weekly recap every Monday 09:00 UTC',
    delivery: ['email']
  }
];

const recentAlerts = [
  {
    id: 'alert-1',
    title: 'Chronos Cat #214 received a 2.3 ETH bid',
    timestamp: '5m ago',
    channel: 'Push'
  },
  {
    id: 'alert-2',
    title: 'Royalty sweep deposited 0.32 ETH',
    timestamp: '1h ago',
    channel: 'Email'
  },
  {
    id: 'alert-3',
    title: 'Azuki Elements floor dropped 4.6%',
    timestamp: 'Yesterday',
    channel: 'Push'
  }
];

const connectedDevices = [
  { id: 'desktop', label: 'Mac Studio · Safari', icon: Monitor, lastSeen: 'Active now' },
  { id: 'tablet', label: 'iPad Pro · WalletConnect', icon: Tablet, lastSeen: 'Last seen 2h ago' },
  { id: 'mobile', label: 'Pixel 8 Pro · Rainbow', icon: Smartphone, lastSeen: 'Last seen 1d ago' }
];

export default function NotificationCenter() {
  const [enabledChannels, setEnabledChannels] = useState<Record<string, boolean>>({
    email: true,
    push: true,
    sms: false
  });

  const toggleChannel = (channelId: string) => {
    setEnabledChannels((prev) => ({ ...prev, [channelId]: !prev[channelId] }));
  };

  return (
    <AccountLayout
      title="Notifications"
      description="Control which events trigger pings, which channels they use, and how watchlist alerts behave."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-pink-100 p-2 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Channel preferences</CardTitle>
              <CardDescription>Choose the fallback order for critical alerts.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelPreferences.map((channel) => (
              <div
                key={channel.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-medium">{channel.label}</p>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                </div>
                <Switch checked={enabledChannels[channel.id]} onCheckedChange={() => toggleChannel(channel.id)} />
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between rounded-2xl border border-dashed p-4 text-sm">
              <p>Pipeline status: All outbound webhooks healthy. Next heartbeat in 12s.</p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="font-medium text-emerald-600">Secure</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Watchlist alerts</CardTitle>
              <CardDescription>Trigger logic synced with your portfolio page.</CardDescription>
            </div>
            <Button variant="outline" className="text-sm font-medium">
              Add rule
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {watchlistAlerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-base font-semibold">{alert.label}</p>
                  <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                    {alert.delivery.map((channel) => (
                      <span
                        key={channel}
                        className="rounded-full bg-pink-100 px-3 py-1 font-semibold text-pink-700 dark:bg-pink-500/20 dark:text-pink-100"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{alert.rule}</p>
              </div>
            ))}
            <Separator />
            <div className="text-sm text-muted-foreground">
              Alerts sync to Blur, OpenSea, and on-chain oracle feeds every 60s.
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Activity className="h-5 w-5 text-pink-600" />
              <div>
                <CardTitle>Recent alerts</CardTitle>
                <CardDescription>Latest pings delivered across channels.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((event) => (
                <div key={event.id} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{event.title}</p>
                    <span className="text-xs uppercase text-muted-foreground">{event.channel}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-sm font-medium">
                View full notification log
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Inbox className="h-5 w-5 text-pink-600" />
              <div>
                <CardTitle>Connected devices</CardTitle>
                <CardDescription>Wallet clients that can receive push.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between rounded-xl border p-3">
                  <div className="flex items-center gap-3">
                    <device.icon className="h-5 w-5 text-pink-600" />
                    <div>
                      <p className="font-medium">{device.label}</p>
                      <p className="text-xs text-muted-foreground">Last seen: {device.lastSeen}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              ))}
              <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">Register new device</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AccountLayout>
  );
}


