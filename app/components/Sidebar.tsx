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
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';

type NavItem = {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  hasSubmenu?: boolean;
};

const menuItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Folder, label: 'File Manager', href: '/file-manager' },
  { icon: FileText, label: 'Notes', href: '/notes' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: CreditCard, label: 'Subscription', href: '/subscription' },
  { icon: CalendarIcon, label: 'Calendar', href: '/calendar' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
  { icon: User, label: 'Users', href: '/users' },
  { icon: Building2, label: 'Companies', href: '/companies' },
];

const supportItems: NavItem[] = [
  { icon: Settings, label: 'Settings', href: '/settings', hasSubmenu: true },
  { icon: Grid2X2, label: 'Integrations', href: '/integrations' },
];

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  hasSubmenu = false,
  isActive,
  isPending,
  onClick
}: NavItem & { isActive: boolean; isPending: boolean; onClick?: () => void }) => {
  const stateClass = isActive
    ? 'bg-neon-pink text-theme neon-glow-pink'
    : isPending
    ? 'panel-surface-strong text-muted-theme border border-theme cursor-default'
    : 'text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] hover:shadow-[0_0_15px_var(--color-shadow)]';

  return (
    <motion.div
      animate={{ x: isActive ? 4 : 0 }}
      whileHover={!isPending ? { x: 4 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Link
        href={href}
        scroll={false}
        onClick={onClick}
        className={cn(
          'flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden sidebar-interactive',
          stateClass
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={cn('transition-colors', isActive || isPending ? 'text-theme' : 'group-hover:text-theme')} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {isPending && (
            <span className="w-3 h-3 border-[2px] border-theme border-t-[var(--color-text)] rounded-full animate-spin" aria-hidden />
          )}
          {hasSubmenu && (
            <ChevronDown
              size={14}
              className={cn(
                'transition-colors',
                isActive ? 'text-theme' : 'text-muted-theme group-hover:text-theme'
              )}
            />
          )}
        </div>
      </Link>
    </motion.div>
  );
};
const SidebarSection = ({
  title,
  items,
  pathname,
  pendingHref,
  onItemClick
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  pendingHref: string | null;
  onItemClick: (href: string) => void;
}) => (
  <div>
    <p className="text-[10px] uppercase tracking-widest text-muted-theme font-bold mb-3 px-3">{title}</p>
    <nav className="space-y-0.5">
      {items.map((item) => (
        <SidebarItem
          key={item.href}
          {...item}
          isActive={pathname === item.href}
          isPending={pendingHref === item.href && pathname !== item.href}
          onClick={() => onItemClick(item.href)}
        />
      ))}
    </nav>
  </div>
);

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (pendingHref && pathname === pendingHref) {
      setPendingHref(null);
    }
  }, [pathname, pendingHref]);

  const handleItemClick = (href: string) => {
    if (href === pathname) return;
    setPendingHref(href);
  };

  return (
    <>
      <div className="hidden lg:flex h-full">
        <SidebarContent pathname={pathname} pendingHref={pendingHref} onItemClick={handleItemClick} />
      </div>
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
              className="absolute left-0 top-0 bottom-0 w-64 panel-surface-strong shadow-2xl"
            >
              <SidebarContent pathname={pathname} pendingHref={pendingHref} onItemClick={handleItemClick} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </>
    );
  };

const SidebarContent = ({
  pathname,
  pendingHref,
  onItemClick
}: {
  pathname: string;
  pendingHref: string | null;
  onItemClick: (href: string) => void;
}) => (
  <aside className="w-60 min-w-[240px] h-full flex flex-col border-r border-theme p-5 panel-surface-soft backdrop-blur-xl">
    <div className="flex items-center gap-2 mb-8">
      <motion.div
        whileHover={{ rotate: 90 }}
        className="w-7 h-7 bg-neon-pink rounded-lg flex items-center justify-center neon-glow-pink"
      >
        <div className="w-3.5 h-3.5 border-2 border-theme rotate-45" />
      </motion.div>
      <h1 className="text-lg font-bold tracking-tight">Sass Admin</h1>
    </div>

    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <SidebarSection title="Menu" items={menuItems} pathname={pathname} pendingHref={pendingHref} onItemClick={onItemClick} />
          <SidebarSection title="Support" items={supportItems} pathname={pathname} pendingHref={pendingHref} onItemClick={onItemClick} />
        </div>
      </div>
    </div>

    <motion.div
      whileHover={{ scale: 1.02 }}
      className="mt-8 p-4 glass-card relative overflow-hidden panel-surface-soft shrink-0"
    >
      <div className="relative z-10">
        <h3 className="text-[11px] font-bold mb-1">Sasste Pro. Subsection</h3>
        <p className="text-[9px] text-muted-theme mb-3 leading-tight">Get All Dashboards access and 300+ use pre-ready tools.</p>
        <Link href="/subscription" scroll={false} className="w-full py-2 bg-neon-pink text-theme rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-neon-pink/80 transition-all neon-glow-pink">
          Upgrade pro <Lock size={10} />
        </Link>
      </div>
    </motion.div>
  </aside>
);
