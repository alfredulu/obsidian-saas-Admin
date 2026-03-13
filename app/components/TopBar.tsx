'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Search, 
  Sun, 
  Bell, 
  MessageSquare, 
  ChevronDown, 
  Command
} from 'lucide-react';

export const TopBar = () => (
  <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 shrink-0">
    <div className="flex-1 max-w-md">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-neon-pink transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-12 text-sm focus:outline-none focus:border-neon-pink/50 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-white/30">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white">
          <Sun size={20} />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-neon-pink rounded-full border-2 border-obsidian" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white">
          <MessageSquare size={20} />
        </button>
      </div>
      
      <div className="h-8 w-[1px] bg-white/10 mx-2" />
      
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="text-right">
          <p className="text-sm font-bold group-hover:text-neon-pink transition-colors">Lily Carter</p>
        </div>
        <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10">
          <Image 
            src="https://picsum.photos/seed/lily/40/40" 
            alt="Avatar" 
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <ChevronDown size={16} className="text-white/30" />
      </div>
    </div>
  </header>
);
