'use client';

import React from 'react';
import { motion } from 'motion/react';
import { companies } from '@/lib/mockData';
import { Building2, Search, Filter, MoreHorizontal, ExternalLink, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CompaniesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company Directory</h1>
          <p className="text-sm text-white/40">Overview of all registered companies and their subscription status.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-neon-cyan text-obsidian rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-neon-cyan/80 transition-all">
          <Building2 size={18} />
          <span>Register Company</span>
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-cyan/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-medium hover:bg-white/10 transition-all">
              <Filter size={14} />
              <span>Industry</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-medium hover:bg-white/10 transition-all">
              <span>Plan Type</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-white/20 text-[9px] uppercase tracking-widest border-b border-white/5">
                <th className="pb-3 font-bold">Company</th>
                <th className="pb-3 font-bold">Industry</th>
                <th className="pb-3 font-bold">Employees</th>
                <th className="pb-3 font-bold">Plan</th>
                <th className="pb-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-[11px]">
              {companies.map((company) => (
                <tr key={company.id} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center font-bold text-neon-cyan border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                        {company.logo}
                      </div>
                      <span className="font-bold">{company.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-white/40">{company.industry}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Users size={12} className="text-white/20" />
                      <span>{company.employees}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[9px] font-bold uppercase",
                      company.plan === 'Enterprise' ? 'bg-neon-purple/10 text-neon-purple' :
                      company.plan === 'Pro' ? 'bg-neon-pink/10 text-neon-pink' :
                      'bg-white/10 text-white/50'
                    )}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                        <ExternalLink size={14} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
