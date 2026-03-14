'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  LayoutDashboard, 
  BarChart3, 
  CheckSquare, 
  FileText, 
  User, 
  Building2, 
  Bell, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  Folder, 
  Settings, 
  Grid2X2, 
  CreditCard,
  X,
  Plus,
  Upload,
  UserPlus,
  Moon,
  Sun
} from 'lucide-react';
import { useCommandPalette } from './CommandPaletteContext';
import { useGlobalModals } from './GlobalModalsContext';
import { useToast } from './ToastContext';
import { cn } from '@/lib/utils';

const commands = [
  // Navigation
  { id: 'dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard, type: 'nav' },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3, type: 'nav' },
  { id: 'tasks', label: 'Tasks', href: '/tasks', icon: CheckSquare, type: 'nav' },
  { id: 'notes', label: 'Notes', href: '/notes', icon: FileText, type: 'nav' },
  { id: 'users', label: 'Users', href: '/users', icon: User, type: 'nav' },
  { id: 'companies', label: 'Companies', href: '/companies', icon: Building2, type: 'nav' },
  { id: 'notifications', label: 'Notifications', href: '/notifications', icon: Bell, type: 'nav' },
  { id: 'messages', label: 'Messages', href: '/messages', icon: MessageSquare, type: 'nav' },
  { id: 'calendar', label: 'Calendar', href: '/calendar', icon: CalendarIcon, type: 'nav' },
  { id: 'file-manager', label: 'File Manager', href: '/file-manager', icon: Folder, type: 'nav' },
  { id: 'settings', label: 'Settings', href: '/settings', icon: Settings, type: 'nav' },
  { id: 'integrations', label: 'Integrations', href: '/integrations', icon: Grid2X2, type: 'nav' },
  { id: 'subscription', label: 'Subscription', href: '/subscription', icon: CreditCard, type: 'nav' },
  
  // Actions
  { id: 'create-task', label: 'Create Task', icon: Plus, type: 'action', action: 'createTask' },
  { id: 'create-note', label: 'Create Note', icon: FileText, type: 'action', action: 'createNote' },
  { id: 'create-user', label: 'Create User', icon: UserPlus, type: 'action', action: 'createUser' },
  { id: 'upload-file', label: 'Upload File', icon: Upload, type: 'action', action: 'uploadFile' },
  { id: 'toggle-theme', label: 'Toggle Theme', icon: Moon, type: 'action', action: 'toggleTheme' },
  { id: 'open-settings', label: 'Open Settings', icon: Settings, type: 'nav', href: '/settings' },
];

export const CommandPalette = () => {
  const { isOpen, close } = useCommandPalette();
  const { openCreateTask, openCreateNote, openCreateUser, openUploadFile } = useGlobalModals();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const executeCommand = (cmd: any) => {
    if (cmd.type === 'nav') {
      router.push(cmd.href);
    } else if (cmd.type === 'action') {
      switch (cmd.action) {
        case 'createTask':
          openCreateTask();
          break;
        case 'createNote':
          openCreateNote();
          break;
        case 'createUser':
          openCreateUser();
          break;
        case 'uploadFile':
          openUploadFile();
          break;
        case 'toggleTheme':
          showToast('Theme toggled (Demo)', 'info');
          break;
      }
    }
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Palette */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
              className="w-full max-w-xl bg-obsidian/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Search Input */}
              <div className="relative border-b border-white/5 p-4">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent pl-10 pr-4 py-2 text-sm text-white focus:outline-none placeholder:text-white/20"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/40 font-bold uppercase tracking-widest">Esc</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd, index) => {
                      const isSelected = index === selectedIndex;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => executeCommand(cmd)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                            isSelected 
                              ? "bg-neon-pink text-white neon-glow-pink" 
                              : "text-white/50 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <cmd.icon size={18} className={cn(
                              "transition-colors",
                              isSelected ? "text-white" : "text-white/30 group-hover:text-white"
                            )} />
                            <span className="text-sm font-medium">{cmd.label}</span>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-60">
                              <span>Enter</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-sm text-white/20">No results found for "{search}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/5 p-3 bg-white/[0.02] flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      <span className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/40 font-bold">↑</span>
                      <span className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/40 font-bold">↓</span>
                    </div>
                    <span className="text-[10px] text-white/20 font-medium">to navigate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/40 font-bold">↵</span>
                    <span className="text-[10px] text-white/20 font-medium">to select</span>
                  </div>
                </div>
                <div className="text-[10px] text-white/20 font-medium">
                  Global Search
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
