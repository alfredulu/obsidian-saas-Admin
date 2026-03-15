'use client';

import React from 'react';
import { Search, Bell, Mail, ChevronDown, Zap, Menu } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { useCommandPalette } from './CommandPaletteContext';

export const TopBar = () => {
  const { toggle } = useSidebar();
  const { open } = useCommandPalette();

  return (
    <header className="h-14 border-b border-white/5 px-6 shrink-0 bg-obsidian/50 backdrop-blur-xl">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 h-full">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={toggle}
            className="lg:hidden text-white/50 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          <button 
            onClick={open}
            className="sm:hidden text-white/50 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Search size={20} />
          </button>
          <div 
            onClick={open}
            className="relative hidden sm:flex flex-1 min-w-0 max-w-[360px] cursor-pointer group"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-white transition-colors" size={14} />
            <div className="w-full bg-white/5 border border-white/5 rounded-lg py-1.5 pl-9 pr-12 text-[11px] text-white/30 group-hover:text-white/50 transition-colors overflow-hidden text-ellipsis">
              Search anything...
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] text-white/20 font-bold">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 text-white/30">
          <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <Zap size={16} />
          </button>
          <button className="relative p-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-neon-pink rounded-full border border-obsidian" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <Mail size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3 cursor-pointer group pt-1">
          <div className="text-right">
            <p className="text-[11px] font-bold">WorkLoad Hq</p>
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
};
