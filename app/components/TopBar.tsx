"use client";

import React from "react";
import {
  Search,
  Bell,
  Mail,
  ChevronDown,
  Zap,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useCommandPalette } from "./CommandPaletteContext";
import { useTheme } from "./ThemeProvider";

export const TopBar = () => {
  const { toggle } = useSidebar();
  const { open } = useCommandPalette();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 border-b border-theme px-6 shrink-0 panel-surface-soft backdrop-blur-xl">
      <div className="flex items-center h-full gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            onClick={toggle}
            className="lg:hidden text-muted-theme hover:text-theme p-1.5 hover:bg-[var(--color-hover)] rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={open}
            className="sm:hidden text-muted-theme hover:text-theme p-1.5 hover:bg-[var(--color-hover)] rounded-lg transition-colors max-[400px]:hidden"
          >
            <Search size={20} />
          </button>
          <div
            onClick={open}
            className="relative hidden lg:flex flex-1 min-w-0 max-w-[360px] cursor-pointer group"
          >
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme group-hover:text-theme transition-colors"
              size={14}
            />
            <div className="w-full panel-surface-soft border border-theme rounded-lg py-1.5 pl-9 pr-12 text-[11px] text-muted-theme group-hover:text-theme transition-colors overflow-hidden text-ellipsis">
              Search anything...
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] text-muted-theme font-bold">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="flex-none sm:flex-1 flex items-center justify-center gap-3 text-muted-theme">
          <button className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors hidden sm:flex">
            <Zap size={16} />
          </button>
          <button className="relative p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-neon-pink rounded-full border border-obsidian" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors hidden sm:flex">
            <Mail size={16} />
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex items-center gap-3 cursor-pointer group pt-1 ml-auto">
          <div className="text-right">
            <p className="text-[11px] font-bold text-theme">WorkLoad Hq</p>
            <p className="text-[9px] text-muted-theme font-medium">
              Admin Account
            </p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple p-[1px]">
            <div className="w-full h-full rounded-[7px] panel-surface flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lily"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <ChevronDown
            size={12}
            className="text-muted-theme group-hover:text-theme transition-colors"
          />
        </div>
      </div>
    </header>
  );
};
