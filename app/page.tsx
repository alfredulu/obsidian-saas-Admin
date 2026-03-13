'use client';

import React from 'react';
import { 
  StatCard, 
  SaleHistory, 
  ProductHighlight 
} from './components/DashboardComponents';
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  ArrowUpRight 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-white/30 text-sm mt-1">Welcome back, Alfred! Here's what's happening today.</p>
        </div>
        <button className="bg-neon-pink hover:bg-neon-pink/80 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all neon-glow-pink flex items-center gap-2">
          Download Report <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={DollarSign} 
          label="Total Revenue" 
          value="$128,430" 
          trend="+12.5%" 
          colorClass="bg-neon-pink" 
        />
        <StatCard 
          icon={Users} 
          label="Active Users" 
          value="43,210" 
          trend="+8.2%" 
          colorClass="bg-neon-cyan" 
        />
        <StatCard 
          icon={ShoppingBag} 
          label="Total Sales" 
          value="12,450" 
          trend="+15.3%" 
          colorClass="bg-neon-purple" 
        />
        <StatCard 
          icon={Users} 
          label="New Customers" 
          value="1,240" 
          trend="+5.7%" 
          colorClass="bg-white" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SaleHistory />
        <ProductHighlight />
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <button className="text-neon-cyan text-xs font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-white/30 text-[10px] uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 font-bold">Customer</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-bold">
                        JD
                      </div>
                      <div>
                        <p className="font-bold">John Doe</p>
                        <p className="text-[10px] text-white/30">john@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-md bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase">Completed</span>
                  </td>
                  <td className="py-4 text-white/50">Oct 24, 2023</td>
                  <td className="py-4 text-right font-bold">$240.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
