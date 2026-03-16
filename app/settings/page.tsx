'use client';

import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Avatar } from '@/app/components/UI';
import { usePathname, useRouter, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation';
import { User, Lock, Bell, Moon, Globe, Shield, Save } from 'lucide-react';

const navItems = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'account', icon: Lock, label: 'Account' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'appearance', icon: Moon, label: 'Appearance' },
  { id: 'language', icon: Globe, label: 'Language' },
  { id: 'security', icon: Shield, label: 'Security' },
];

const tabWhitelist = new Set(navItems.map((item) => item.id));

const getTabFromParam = (searchParams: ReadonlyURLSearchParams | null, pathname: string) => {
  if (pathname !== '/settings') return null;
  if (!searchParams) return 'profile';
  const tabParam = searchParams.get('tab')?.toLowerCase();
  return tabParam && tabWhitelist.has(tabParam) ? tabParam : 'profile';
};

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPageContent />
    </Suspense>
  );
}

function SettingsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeSection = React.useMemo(() => getTabFromParam(searchParams, pathname) ?? 'profile', [searchParams, pathname]);

  const handleTabClick = (id: string) => {
    if (activeSection === id) return;
    router.replace(`/settings?tab=${id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-theme">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button 
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 md:shrink ${isActive ? 'bg-neon-pink text-theme neon-glow-pink' : 'text-muted-theme hover:text-theme hover:bg-[var(--color-hover)]'}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeSection === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card title="Profile Settings" subtitle="This information will be displayed publicly.">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar name="Cody Fish" size="lg" />
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 panel-surface-soft border border-theme rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--color-hover)] transition-all">
                          Change Avatar
                        </button>
                        <button className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all">
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Full Name</label>
                        <input 
                          type="text" 
                          defaultValue="Cody Fish"
                          className="w-full panel-surface-soft border border-theme rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue="codyfish@gmail.com"
                          className="w-full panel-surface-soft border border-theme rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeSection === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card title="Account Settings" subtitle="Manage your password and security.">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Current Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full panel-surface-soft border border-theme rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">New Password</label>
                          <input 
                            type="password" 
                            className="w-full panel-surface-soft border border-theme rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Confirm New Password</label>
                          <input 
                            type="password" 
                            className="w-full panel-surface-soft border border-theme rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeSection === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card title="Notifications" subtitle="Manage how you receive updates.">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold">Email Notifications</h4>
                        <p className="text-[10px] text-muted-theme opacity-40">Receive weekly activity reports.</p>
                      </div>
                      <div className="w-10 h-5 bg-neon-pink rounded-full relative cursor-pointer neon-glow-pink">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-theme rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold">Push Notifications</h4>
                        <p className="text-[10px] text-muted-theme opacity-40">Get real-time alerts on your device.</p>
                      </div>
                      <div className="w-10 h-5 panel-surface-strong rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-muted-theme opacity-40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeSection === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card title="Appearance" subtitle="Customize the look and feel of the dashboard.">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold">Dark Mode</h4>
                        <p className="text-[10px] text-muted-theme opacity-40">Use the Obsidian Noir theme.</p>
                      </div>
                      <div className="w-10 h-5 bg-neon-pink rounded-full relative cursor-pointer neon-glow-pink">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-theme rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold">Compact Mode</h4>
                        <p className="text-[10px] text-muted-theme opacity-40">Reduce spacing in tables and lists.</p>
                      </div>
                      <div className="w-10 h-5 panel-surface-strong rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-muted-theme opacity-40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {(activeSection === 'language' || activeSection === 'security') && (
              <motion.div
                key="other"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card title={`${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings`} subtitle={`Manage your ${activeSection} preferences.`}>
                  <div className="h-32 flex items-center justify-center border-2 border-dashed border-theme rounded-xl">
                    <p className="text-[10px] text-muted-theme opacity-40 uppercase tracking-widest font-bold">Coming Soon</p>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end gap-3">
            <button className="px-6 py-2.5 panel-surface-soft border border-theme rounded-xl text-xs font-bold hover:bg-[var(--color-hover)] transition-all">
              Discard Changes
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-neon-pink text-theme rounded-xl text-xs font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all">
              <Save size={16} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
