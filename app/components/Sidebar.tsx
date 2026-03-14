'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
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
import { useSidebar } from './SidebarContext';

const SidebarItem = ({ icon: Icon, label, href, hasSubmenu = false, isActive, isNavigating, onClick }: any) => {
  const stateClass = isActive
    ? "bg-neon-pink text-white neon-glow-pink"
    : isNavigating
    ? "bg-white/10 text-white/70 border border-white/10"
    : "text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]";
  const iconColor = isActive ? "text-white" : isNavigating ? "text-white/70" : "group-hover:text-white";

  return (
    <motion.div
      animate={{ x: isActive ? 4 : 0 }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link 
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden",
          stateClass
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={cn("transition-colors", iconColor)} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {hasSubmenu && <ChevronDown size={14} className={cn("transition-colors", isActive ? "text-white" : "text-white/30 group-hover:text-white")} />}
      </Link>
    </motion.div>
  );
};
export const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();
  const [navigatingHref, setNavigatingHref] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (navigatingHref && pathname === navigatingHref) {
      setNavigatingHref(null);
    }
  }, [pathname, navigatingHref]);

  const handleClick = (href: string) => () => {
    setNavigatingHref(href);
  };

  const isActive = (href: string) => pathname === href;
  const isNavigating = (href: string) => !isActive(href) && navigatingHref === href;

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
            <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" isActive={isActive('/')} isNavigating={isNavigating('/')} onClick={handleClick('/')} />
            <SidebarItem icon={Folder} label="File Manager" href="/file-manager" isActive={isActive('/file-manager')} isNavigating={isNavigating('/file-manager')} onClick={handleClick('/file-manager')} />
            <SidebarItem icon={FileText} label="Notes" href="/notes" isActive={isActive('/notes')} isNavigating={isNavigating('/notes')} onClick={handleClick('/notes')} />
            <SidebarItem icon={CheckSquare} label="Tasks" href="/tasks" isActive={isActive('/tasks')} isNavigating={isNavigating('/tasks')} onClick={handleClick('/tasks')} />
            <SidebarItem icon={BarChart3} label="Analytics" href="/analytics" isActive={isActive('/analytics')} isNavigating={isNavigating('/analytics')} onClick={handleClick('/analytics')} />
            <SidebarItem icon={CreditCard} label="Subscription" href="/subscription" isActive={isActive('/subscription')} isNavigating={isNavigating('/subscription')} onClick={handleClick('/subscription')} />
            <SidebarItem icon={CalendarIcon} label="Calendar" href="/calendar" isActive={isActive('/calendar')} isNavigating={isNavigating('/calendar')} onClick={handleClick('/calendar')} />
            <SidebarItem icon={Bell} label="Notifications" href="/notifications" isActive={isActive('/notifications')} isNavigating={isNavigating('/notifications')} onClick={handleClick('/notifications')} />
            <SidebarItem icon={MessageSquare} label="Messages" href="/messages" isActive={isActive('/messages')} isNavigating={isNavigating('/messages')} onClick={handleClick('/messages')} />
            <SidebarItem icon={User} label="Users" href="/users" isActive={isActive('/users')} isNavigating={isNavigating('/users')} onClick={handleClick('/users')} />
            <SidebarItem icon={Building2} label="Companies" href="/companies" isActive={isActive('/companies')} isNavigating={isNavigating('/companies')} onClick={handleClick('/companies')} />
          </nav>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-3 px-3">Support</p>
          <nav className="space-y-0.5">
            <SidebarItem icon={Settings} label="Settings" href="/settings" isActive={isActive('/settings')} isNavigating={isNavigating('/settings')} onClick={handleClick('/settings')} />
            <SidebarItem icon={Grid2X2} label="Integrations" href="/integrations" isActive={isActive('/integrations')} isNavigating={isNavigating('/integrations')} onClick={handleClick('/integrations')} />
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
