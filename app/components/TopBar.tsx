"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Mail,
  ChevronDown,
  Zap,
  Menu,
  Moon,
  Sun,
  User as UserIcon,
  LogOut,
  CreditCard,
  Settings
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useCommandPalette } from "./CommandPaletteContext";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { ToggleSwitch } from "./ToggleSwitch";
import { Avatar } from "./UI";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export const TopBar = () => {
  const { toggle } = useSidebar();
  const { open } = useCommandPalette();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  return (
    <header className="h-14 border-b border-theme px-6 shrink-0 panel-surface-soft backdrop-blur-xl z-50">
      <div className="flex items-center h-full gap-3">
        {/* ... (rest of search bar) */}
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
          <button onClick={() => showToast('Zap feature coming soon!')} className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors hidden sm:flex">
            <Zap size={16} />
          </button>
          <button onClick={() => showToast('Notifications coming soon!')} className="relative p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-neon-pink rounded-full border border-obsidian" />
          </button>
          <button onClick={() => showToast('Mail feature coming soon!')} className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors hidden sm:flex">
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

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-3 cursor-pointer group pt-1 ml-auto" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-theme">
                {user?.user_metadata?.full_name || user?.email || 'Guest'}
              </p>
              {user?.user_metadata?.full_name && (
                <p className="text-[9px] text-muted-theme font-medium">
                  {user.email}
                </p>
              )}
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple p-[1px]">
              <div className="w-full h-full rounded-[7px] panel-surface flex items-center justify-center overflow-hidden">
                <Avatar name={user?.user_metadata?.avatar_seed || user?.email || 'Guest'} size="sm" />
              </div>
            </div>
            <ChevronDown
              size={12}
              className={`text-muted-theme group-hover:text-theme transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-obsidian border border-theme rounded-xl shadow-xl z-[100] p-1 animate-in fade-in zoom-in duration-200">
              <button onClick={() => { router.push('/settings'); setIsDropdownOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] rounded-lg transition-colors">
                <UserIcon size={14} /> Profile
              </button>
              <button onClick={() => { router.push('/settings?tab=account'); setIsDropdownOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] rounded-lg transition-colors">
                <Settings size={14} /> Account Settings
              </button>
              <button onClick={() => { router.push('/billing'); setIsDropdownOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] rounded-lg transition-colors">
                <CreditCard size={14} /> Billing
              </button>
              <div className="h-px bg-theme my-1" />
              <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <LogOut size={14} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
