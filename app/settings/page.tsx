'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Card, Avatar } from '@/app/components/UI';
import { User, Lock, Bell, Moon, Globe, Shield, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-white/40">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation - Desktop */}
        <div className="hidden md:block space-y-1">
          {[
            { icon: User, label: 'Profile' },
            { icon: Lock, label: 'Account' },
            { icon: Bell, label: 'Notifications' },
            { icon: Moon, label: 'Appearance' },
            { icon: Globe, label: 'Language' },
            { icon: Shield, label: 'Security' },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-neon-pink text-white neon-glow-pink' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card title="Profile Settings" subtitle="This information will be displayed publicly.">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar name="Cody Fish" size="lg" />
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    Change Avatar
                  </button>
                  <button className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all">
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Cody Fish"
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="codyfish@gmail.com"
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card title="Account Settings" subtitle="Manage your password and security.">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card title="Preferences" subtitle="Customize your experience.">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold">Dark Mode</h4>
                  <p className="text-[10px] text-white/20">Use the Obsidian Noir theme.</p>
                </div>
                <div className="w-10 h-5 bg-neon-pink rounded-full relative cursor-pointer neon-glow-pink">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold">Email Notifications</h4>
                  <p className="text-[10px] text-white/20">Receive weekly activity reports.</p>
                </div>
                <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <button className="px-6 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
              Discard Changes
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-neon-pink text-white rounded-xl text-xs font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all">
              <Save size={16} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
