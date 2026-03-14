'use client';

import React from 'react';
import { motion } from 'motion/react';
import { users } from '@/lib/mockData';
import { MoreVertical, Edit2, Trash2, Eye, UserPlus, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UsersPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-white/40">Manage your team members and their account permissions.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-neon-pink text-white rounded-xl text-sm font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all">
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-medium hover:bg-white/10 transition-all">
              <Filter size={14} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-medium hover:bg-white/10 transition-all">
              <span>Sort by: Name</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-white/20 text-[9px] uppercase tracking-widest border-b border-white/5">
                <th className="pb-3 font-bold">User</th>
                <th className="pb-3 font-bold">Email</th>
                <th className="pb-3 font-bold">Role</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-[11px]">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
                        <div className="w-full h-full rounded-[9px] bg-obsidian flex items-center justify-center overflow-hidden">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <span className="font-bold">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-white/40">{user.email}</td>
                  <td className="py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[9px] font-bold uppercase",
                      user.role === 'Admin' ? 'bg-neon-pink/10 text-neon-pink' :
                      user.role === 'Staff' ? 'bg-neon-cyan/10 text-neon-cyan' :
                      'bg-neon-purple/10 text-neon-purple'
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-white/20'
                      )} />
                      <span className={user.status === 'Active' ? 'text-emerald-400' : 'text-white/30'}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-red-500 hover:bg-red-500/10 transition-all">
                        <Trash2 size={14} />
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
