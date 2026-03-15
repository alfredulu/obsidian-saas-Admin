'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const PricingCard = ({ title, price, description, features, isPopular, color }: any) => (
  <div className={cn(
    "glass-card p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:translate-y-[-8px]",
    isPopular ? "border-neon-pink/50 ring-1 ring-neon-pink/20" : ""
  )}>
    {isPopular && (
      <div className="absolute top-4 right-[-32px] rotate-45 bg-neon-pink text-theme text-[10px] font-bold py-1 px-10 neon-glow-pink">
        POPULAR
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-theme opacity-40 text-xs">{description}</p>
    </div>

    <div className="mb-8">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-muted-theme opacity-40 text-sm">/month</span>
      </div>
    </div>

    <div className="space-y-4 flex-1 mb-10">
      {features.map((feature: string, i: number) => (
        <div key={i} className="flex items-center gap-3">
          <div className={cn("p-1 rounded-full", color === 'pink' ? "bg-neon-pink/20 text-neon-pink" : "bg-neon-cyan/20 text-neon-cyan")}>
            <Check size={12} />
          </div>
          <span className="text-xs text-theme opacity-70">{feature}</span>
        </div>
      ))}
    </div>

    <button className={cn(
      "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group",
      isPopular 
        ? "bg-neon-pink text-theme neon-glow-pink hover:bg-neon-pink/80" 
        : "panel-surface-soft text-theme hover:bg-[var(--color-hover)] border border-theme"
    )}>
      Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

export default function SubscriptionPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-16 py-10"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">Choose Your Plan</h2>
        <p className="text-muted-theme opacity-40 text-lg max-w-2xl mx-auto">
          Unlock the full potential of your business with our premium subscription plans. 
          Scale faster and smarter with Obsidian.
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="text-sm font-medium">Monthly</span>
          <button className="w-12 h-6 panel-surface-strong rounded-full relative p-1">
            <div className="w-4 h-4 bg-neon-pink rounded-full neon-glow-pink" />
          </button>
          <span className="text-sm font-medium text-muted-theme opacity-40">Yearly <span className="text-neon-cyan text-[10px] font-bold ml-1">SAVE 20%</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Starter"
          price="29"
          description="Perfect for individuals and small side projects."
          features={[
            "Up to 5 Projects",
            "Basic Analytics",
            "24/7 Support",
            "1GB Storage",
            "Public API Access"
          ]}
          color="cyan"
        />
        <PricingCard 
          title="Professional"
          price="99"
          description="The ultimate plan for growing businesses and teams."
          features={[
            "Unlimited Projects",
            "Advanced Analytics",
            "Priority Support",
            "10GB Storage",
            "Custom Domain",
            "Team Collaboration",
            "Advanced Security"
          ]}
          isPopular
          color="pink"
        />
        <PricingCard 
          title="Enterprise"
          price="299"
          description="Custom solutions for large scale organizations."
          features={[
            "Everything in Pro",
            "Unlimited Storage",
            "Dedicated Account Manager",
            "Custom Integrations",
            "SLA Guarantee",
            "White-labeling",
            "SSO Authentication"
          ]}
          color="cyan"
        />
      </div>

      <div className="glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Need a custom solution?</h3>
          <p className="text-muted-theme opacity-40 text-sm max-w-md">
            We offer tailored plans for companies with unique requirements. 
            Contact our sales team for a personalized demo.
          </p>
        </div>
        <button className="px-8 py-4 bg-theme text-background rounded-xl font-bold hover:bg-neon-cyan hover:text-theme transition-all">
          Contact Sales
        </button>
      </div>
    </motion.div>
  );
}
