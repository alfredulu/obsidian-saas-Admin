'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { integrations } from '@/lib/mockData';
import { Card, Badge } from '@/app/components/UI';
import { Slack, Github, Chrome, CreditCard, Plus, ExternalLink, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const getIntegrationIcon = (name: string) => {
  switch (name) {
    case 'Slack': return <Slack size={24} className="text-[#4A154B]" />;
    case 'Google': return <Chrome size={24} className="text-[#4285F4]" />;
    case 'GitHub': return <Github size={24} className="text-white" />;
    case 'Stripe': return <CreditCard size={24} className="text-[#635BFF]" />;
    default: return <Plus size={24} />;
  }
};

export default function IntegrationsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-white/40">Connect your favorite tools to streamline your workflow.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
          <Plus size={18} />
          <span>Request Integration</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((app) => {
          const isSelected = selectedId === app.id;
          return (
            <motion.div
              key={app.id}
              onClick={() => setSelectedId(app.id)}
              animate={{ 
                y: isSelected ? -4 : 0,
                scale: isSelected ? 1.02 : 1
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="cursor-pointer"
            >
              <Card className={cn(
                "h-full flex flex-col transition-all duration-300",
                isSelected ? "border-neon-pink shadow-[0_0_20px_rgba(255,0,128,0.1)] bg-white/[0.07]" : "border-white/5"
              )}>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    {getIntegrationIcon(app.name)}
                  </div>
                  {app.connected ? (
                    <Badge variant="emerald" className="flex items-center gap-1">
                      <Check size={10} />
                      Connected
                    </Badge>
                  ) : (
                    <Badge>Disconnected</Badge>
                  )}
                </div>

                <h3 className={cn(
                  "text-sm font-bold mb-2 transition-colors",
                  isSelected ? "text-neon-pink" : "text-white"
                )}>{app.name}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed mb-8 flex-1">
                  {app.description}
                </p>

                <div className="flex gap-2 pt-4 border-t border-white/5">
                  <button className={cn(
                    "flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                    app.connected 
                      ? "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white" 
                      : "bg-neon-pink text-white neon-glow-pink hover:bg-neon-pink/80"
                  )}>
                    {app.connected ? 'Configure' : 'Connect'}
                  </button>
                  <button className="p-2 bg-white/5 border border-white/5 rounded-xl text-white/30 hover:text-white transition-all">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="mt-12 bg-gradient-to-br from-neon-pink/5 to-neon-purple/5 border-neon-pink/10">
        <div className="flex flex-col md:flex-row items-center gap-8 py-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
            <Plus size={32} className="text-white/20" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold mb-1">Build your own integration</h3>
            <p className="text-xs text-white/40">Use our powerful API to connect your custom tools and automate your business.</p>
          </div>
          <button className="px-6 py-2.5 bg-white text-obsidian rounded-xl text-xs font-bold hover:bg-white/90 transition-all">
            Developer Docs
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
