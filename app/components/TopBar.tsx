'use client';

import React from 'react';
import { Search, Bell, Mail, ChevronDown, Zap } from 'lucide-react';

export const TopBar = () => (
  <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-obsidian/50 backdrop-blur-xl">
    <div className="flex items-center gap-4 w-80">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
        <input 
          type="text" 
          placeholder="Search anything..." 
          className="w-full bg-white/5 border border-white/5 rounded-lg py-1.5 pl-9 pr-12 text-[11px] focus:outline-none focus:border-neon-pink/50 transition-colors"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] text-white/20 font-bold">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 border-r border-white/5 pr-4">
        <button className="text-white/30 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg">
          <Zap size={16} />
        </button>
        <button className="relative text-white/30 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-neon-pink rounded-full border border-obsidian" />
        </button>
        <button className="text-white/30 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg">
          <Mail size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2.5 cursor-pointer group">
        <div className="text-right">
          <p className="text-[11px] font-bold">Lily Carter</p>
          <p className="text-[9px] text-white/30 font-medium">Admin Account</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple p-[1px]">
          <div className="w-full h-full rounded-[7px] bg-obsidian flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lily" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <ChevronDown size={12} className="text-white/30 group-hover:text-white transition-colors" />
      </div>
    </div>
  </header>
);
