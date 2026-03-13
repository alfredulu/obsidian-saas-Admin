'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, Lock } from 'lucide-react';
import { pricingTiers } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const SubscriptionPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Plan</h2>
        <p className="text-white/50">Scale your business with our flexible pricing options. No hidden fees, cancel anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <div 
            key={tier.name}
            className={cn(
              "glass-card p-8 flex flex-col relative transition-transform hover:scale-[1.02] duration-300",
              tier.isPopular && "border-neon-pink/50 neon-glow-pink"
            )}
          >
            {tier.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-pink text-white text-[10px] font-bold px-3 py-1 rounded-full neon-glow-pink uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-white/30 text-sm">/month</span>
              </div>
              <p className="text-xs text-white/50 mt-4 leading-relaxed">{tier.description}</p>
            </div>

            <div className="space-y-4 flex-1 mb-8">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center",
                    tier.isPopular ? "bg-neon-pink/20 text-neon-pink" : "bg-white/10 text-white/50"
                  )}>
                    <Check size={12} />
                  </div>
                  <span className="text-xs text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <button className={cn(
              "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
              tier.isPopular 
                ? "bg-neon-pink text-white neon-glow-pink hover:bg-neon-pink/80" 
                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
            )}>
              {tier.buttonText}
              {!tier.isPopular && <Lock size={14} className="text-white/30" />}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Section */}
      <div className="glass-card p-8 mt-12 overflow-hidden relative">
        <h3 className="text-xl font-bold mb-8">Feature Comparison</h3>
        <div className="space-y-6">
          {[
            { name: 'Custom Domain', starter: false, pro: true, enterprise: true },
            { name: 'API Access', starter: false, pro: 'Limited', enterprise: 'Full' },
            { name: 'Team Members', starter: '1', pro: '10', enterprise: 'Unlimited' },
            { name: 'Support', starter: 'Community', pro: 'Priority', enterprise: '24/7 Dedicated' },
          ].map((row) => (
            <div key={row.name} className="grid grid-cols-4 items-center py-4 border-b border-white/5 last:border-0">
              <span className="text-sm font-medium text-white/70">{row.name}</span>
              <div className="text-center text-xs text-white/30">
                {typeof row.starter === 'boolean' ? (row.starter ? <Check size={14} className="mx-auto text-neon-green" /> : '—') : row.starter}
              </div>
              <div className="text-center text-xs text-neon-pink font-bold">
                {typeof row.pro === 'boolean' ? (row.pro ? <Check size={14} className="mx-auto" /> : '—') : row.pro}
              </div>
              <div className="text-center text-xs text-white/70">
                {typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check size={14} className="mx-auto text-neon-green" /> : '—') : row.enterprise}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-purple/10 blur-3xl rounded-full" />
      </div>
    </motion.div>
  );
};

export default SubscriptionPage;
