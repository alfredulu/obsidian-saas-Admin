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
    <motion.div
      animate={{ x: isActive ? 4 : 0 }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link 
        href={href}
        className={cn(
          "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group",
          isActive ? "bg-neon-pink text-white neon-glow-pink" : "text-white/50 hover:text-white hover:bg-white/5"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={cn("transition-colors", isActive ? "text-white" : "group-hover:text-white")} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {hasSubmenu && <ChevronDown size={14} className={cn("transition-colors", isActive ? "text-white" : "text-white/30 group-hover:text-white")} />}
      </Link>
    </motion.div>
  );
};

import { useSidebar } from './SidebarContext';
import { motion, AnimatePresence } from 'motion/react';

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();

  const SidebarContent = () => (
    <aside className="w-60 min-w-[240px] h-full flex flex-col border-r border-white/5 p-5 overflow-y-auto shrink-0 bg-obsidian/50 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-8">
        <motion.div 
          whileHover={{ rotate: 90 }}
          className="w-7 h-7 bg-neon-pink rounded-lg flex items-center justify-center neon-glow-pink"
        >
          <div className="w-3.5 h-3.5 border-2 border-white rotate-45" />
        </motion.div>
        <h1 className="text-lg font-bold tracking-tight">Sass Admin</h1>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-3 px-3">Menu</p>
          <nav className="space-y-0.5">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" />
            <SidebarItem icon={FileText} label="Notes" href="/notes" />
            <SidebarItem icon={CheckSquare} label="Task" href="/task" />
            <SidebarItem icon={BarChart3} label="Analytics" href="/analytics" />
            <SidebarItem icon={CreditCard} label="Subscription" href="/subscription" />
            <SidebarItem icon={CalendarIcon} label="Calendar" href="/calendar" />
            <SidebarItem icon={Bell} label="Notification" href="/notifications" />
            <SidebarItem icon={MessageSquare} label="Messages" href="/messages" />
            <SidebarItem icon={User} label="User" href="/users" />
            <SidebarItem icon={Building2} label="Companies" href="/companies" />
          </nav>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-3 px-3">Support</p>
          <nav className="space-y-0.5">
            <SidebarItem icon={Settings} label="Settings" href="/settings" />
            <SidebarItem icon={Grid2X2} label="Integrations" href="/integrations" />
          </nav>
        </div>
      </div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="mt-8 p-4 glass-card relative overflow-hidden bg-white/5 shrink-0"
      >
        <div className="relative z-10">
          <h3 className="text-[11px] font-bold mb-1">Sasste Pro. Subsection</h3>
          <p className="text-[9px] text-white/50 mb-3 leading-tight">Get All Dashboards access and 300+ use pre-ready tools.</p>
          <Link href="/subscription" className="w-full py-2 bg-neon-pink text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-neon-pink/80 transition-all neon-glow-pink">
            Upgrade pro <Lock size={10} />
          </Link>
        </div>
      </motion.div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-obsidian shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
