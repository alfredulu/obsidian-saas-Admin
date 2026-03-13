'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  BarChart3, 
  CreditCard, 
  Calendar as CalendarIcon, 
  Bell, 
  MessageSquare, 
  User, 
  Building2, 
  Folder, 
  Settings, 
  Grid2X2, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarItem = ({ icon: Icon, label, href, hasSubmenu = false }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group",
        isActive ? "bg-neon-pink text-white neon-glow-pink" : "text-white/50 hover:text-white hover:bg-white/5"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className="group-hover:text-white" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {hasSubmenu && <ChevronDown size={14} className="text-white/30 group-hover:text-white" />}
    </Link>
  );
};

export const Sidebar = () => (
  <aside className="w-64 h-screen flex flex-col border-r border-white/5 p-6 overflow-y-auto shrink-0">
    <div className="flex items-center gap-2 mb-10">
      <div className="w-8 h-8 bg-neon-pink rounded-lg flex items-center justify-center neon-glow-pink">
        <div className="w-4 h-4 border-2 border-white rotate-45" />
      </div>
      <h1 className="text-xl font-bold tracking-tight">Sass Admin</h1>
      <div className="ml-auto flex gap-1">
        <ChevronLeft size={16} className="text-white/30" />
        <ChevronRight size={16} className="text-white/30" />
      </div>
    </div>

    <div className="space-y-6 flex-1">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 px-4">Menu</p>
        <nav className="space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" />
          <SidebarItem icon={FileText} label="Notes" href="/notes" />
          <SidebarItem icon={CheckSquare} label="Task" href="/task" />
          <SidebarItem icon={BarChart3} label="Analytics" href="/analytics" />
          <SidebarItem icon={CreditCard} label="Subscription" href="/subscription" hasSubmenu />
          <SidebarItem icon={CalendarIcon} label="Calendar" href="/calendar" />
          <SidebarItem icon={Bell} label="Notification" href="/notification" />
          <SidebarItem icon={MessageSquare} label="Messages" href="/messages" />
          <SidebarItem icon={User} label="User" href="/user" />
          <SidebarItem icon={Building2} label="Companies" href="/companies" />
          <SidebarItem icon={Folder} label="File Manager" href="/files" />
        </nav>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 px-4">Support</p>
        <nav className="space-y-1">
          <SidebarItem icon={Settings} label="Settings" href="/settings" />
          <SidebarItem icon={Grid2X2} label="Integrations" href="/integrations" />
        </nav>
      </div>
    </div>

    <div className="mt-10 p-4 glass-card relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xs font-bold mb-1">Sasste Pro. Subsection</h3>
        <p className="text-[10px] text-white/50 mb-4 leading-relaxed">Get All Dashboards access and 300+ use pre-ready tools.</p>
        <Link href="/subscription" className="w-full py-2 bg-white text-obsidian rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-neon-pink hover:text-white transition-colors group">
          Upgrade pro <Lock size={12} className="group-hover:text-white" />
        </Link>
      </div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-neon-pink/20 blur-2xl rounded-full" />
    </div>
  </aside>
);
