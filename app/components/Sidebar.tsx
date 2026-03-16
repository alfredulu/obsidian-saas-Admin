'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
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
  { icon: Grid2X2, label: 'Integrations', href: '/integrations' },
];

const settingsSubmenuItems = [
  { id: 'profile', label: 'Profile', href: '/settings?tab=profile' },
  { id: 'account', label: 'Account', href: '/settings?tab=account' },
  { id: 'notifications', label: 'Notifications', href: '/settings?tab=notifications' },
  { id: 'appearance', label: 'Appearance', href: '/settings?tab=appearance' },
  { id: 'language', label: 'Language', href: '/settings?tab=language' },
  { id: 'security', label: 'Security', href: '/settings?tab=security' },
];

const navStateClass = (isActive: boolean, isPending: boolean) =>
  isActive
    ? 'bg-neon-pink text-theme neon-glow-pink'
    : isPending
    ? 'panel-surface-strong text-muted-theme border border-theme cursor-default'
    : 'text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] hover:shadow-[0_0_15px_var(--color-shadow)]';

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  hasSubmenu = false,
  isActive,
  isPending,
  onClick
}: NavItem & { isActive: boolean; isPending: boolean; onClick?: () => void }) => {
  const stateClass = navStateClass(isActive, isPending);

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

const STORAGE_KEY = 'sidebar-settings-open';

const SettingsSupportBlock = ({
  pathname,
  pendingHref,
  onItemClick,
  activeTab
}: {
  pathname: string;
  pendingHref: string | null;
  onItemClick: (href: string) => void;
  activeTab: string | null;
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    setIsSubmenuOpen(storedValue === 'true');
  }, []);

  const isSettingsActive = pathname === '/settings';
  const isMainPending = pendingHref === '/settings';

  const toggleSubmenu = () => {
    setIsSubmenuOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, next.toString());
      }
      return next;
    });
  };

  return (
    <>
      <motion.div
        animate={{ x: isSettingsActive ? 4 : 0 }}
        whileHover={!isMainPending ? { x: 4 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div
          className={cn(
            'flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden sidebar-interactive',
            navStateClass(isSettingsActive, isMainPending)
          )}
        >
          <Link
            href="/settings"
            scroll={false}
            onClick={() => onItemClick('/settings')}
            className="flex items-center gap-3 flex-1"
          >
            <Settings size={18} className={isSettingsActive ? 'text-theme' : 'text-muted-theme'} />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <div className="flex items-center gap-2">
            {isMainPending && (
              <span className="w-3 h-3 border-[2px] border-theme border-t-[var(--color-text)] rounded-full animate-spin" aria-hidden />
            )}
            <button
              type="button"
              aria-expanded={isSubmenuOpen}
              onClick={toggleSubmenu}
              className="flex items-center justify-center p-1 rounded-full hover:bg-[var(--color-hover)] transition-colors"
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isSubmenuOpen && (
          <motion.div
            key="settings-submenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 mt-1">
              {settingsSubmenuItems.map((item) => {
                const isActive = activeTab === item.id;
                const isPending = pendingHref === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    scroll={false}
                    onClick={() => onItemClick(item.href)}
                    className={cn(
                      'flex items-center gap-2 rounded-xl px-10 py-2.5 text-xs font-medium transition-all',
                      isActive
                        ? 'bg-[rgba(255,0,214,0.15)] text-theme'
                        : 'text-muted-theme hover:text-theme hover:bg-[var(--color-hover)]'
                    )}
                  >
                    {isPending && (
                      <span className="w-3 h-3 border-[2px] border-theme border-t-[var(--color-text)] rounded-full animate-spin" aria-hidden />
                    )}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const normalizedTabParam = tabParam ? tabParam.toLowerCase() : null;
  const activeTab =
    pathname === '/settings'
      ? normalizedTabParam && settingsSubmenuItems.some((item) => item.id === normalizedTabParam)
        ? normalizedTabParam
        : 'profile'
      : null;
  const [pendingHref, setPendingHref] = React.useState<string | null>(null);
  const queryString = searchParams?.toString();
  const currentRoute = React.useMemo(
    () => (queryString ? `${pathname}?${queryString}` : pathname),
    [pathname, queryString]
  );

  React.useEffect(() => {
    if (pendingHref && currentRoute === pendingHref) {
      setPendingHref(null);
    }
  }, [currentRoute, pendingHref]);

  const handleItemClick = (href: string) => {
    if (href === pathname) return;
    setPendingHref(href);
  };

  return (
    <>
      <div className="hidden lg:flex h-full">
        <SidebarContent pathname={pathname} pendingHref={pendingHref} onItemClick={handleItemClick} activeTab={activeTab} />
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
              <SidebarContent pathname={pathname} pendingHref={pendingHref} onItemClick={handleItemClick} activeTab={activeTab} />
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
  onItemClick,
  activeTab
}: {
  pathname: string;
  pendingHref: string | null;
  onItemClick: (href: string) => void;
  activeTab: string | null;
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
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-theme font-bold mb-3 px-3">Support</p>
            <nav className="space-y-1">
              <SettingsSupportBlock pathname={pathname} pendingHref={pendingHref} onItemClick={onItemClick} activeTab={activeTab} />
              {supportItems.map((item) => (
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
