'use client';

import React from 'react';
import { Search, Bell, Mail, ChevronDown } from 'lucide-react';

export const TopBar = () => (
  <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 shrink-0">
    <div className="flex items-center gap-4 w-96">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
        <input 
          type="text" 
          placeholder="Search anything..." 
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-pink/50 transition-colors"
        />
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4 border-r border-white/5 pr-6">
        <button className="relative text-white/50 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-neon-pink rounded-full border-2 border-obsidian" />
        </button>
        <button className="text-white/50 hover:text-white transition-colors">
          <Mail size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="text-right">
          <p className="text-sm font-bold">Alfred Ulu</p>
          <p className="text-[10px] text-white/30 font-medium">Admin Account</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple p-[1px]">
          <div className="w-full h-full rounded-[11px] bg-obsidian flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alfred" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <ChevronDown size={14} className="text-white/30 group-hover:text-white transition-colors" />
      </div>
    </div>
  </header>
);
