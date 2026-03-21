'use client';

import React from 'react';
import { motion } from 'motion/react';
import { notifications } from '@/lib/mockData';
import { 
  Bell, 
  UserPlus, 
  Settings, 
  CreditCard, 
  MessageSquare, 
  ShieldAlert,
  CheckCheck,
  MoreHorizontal,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/app/components/ToastContext';
import { Card } from '@/app/components/UI';
import { MoreOptionsButton } from '@/app/components/UI';

const getIcon = (type: string) => {
  switch (type) {
    case 'user': return <UserPlus size={16} className="text-neon-cyan" />;
    case 'system': return <Settings size={16} className="text-neon-purple" />;
    case 'payment': return <CreditCard size={16} className="text-emerald-400" />;
    case 'message': return <MessageSquare size={16} className="text-neon-pink" />;
    case 'security': return <ShieldAlert size={16} className="text-red-500" />;
    default: return <Bell size={16} className="text-muted-theme opacity-40" />;
  }
};

export default function NotificationsPage() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const { showToast } = useToast();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-theme">Stay updated with the latest activity on your platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 panel-surface-soft border border-theme rounded-xl text-xs font-medium hover:bg-[var(--color-hover)] transition-all" onClick={() => showToast('Coming soon!')}>
            <CheckCheck size={14} />
            <span>Mark all as read</span>
          </button>
          <MoreOptionsButton onClick={() => showToast('Coming soon!')} />
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const isSelected = selectedId === notification.id;
          return (
            <motion.div 
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: 1, 
                x: isSelected ? 4 : 0,
                scale: isSelected ? 1.01 : 1
              }}
              whileHover={{ x: 4 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => setSelectedId(notification.id)}
            >
              <Card 
                className={cn(
                  "p-4 flex gap-4 group cursor-pointer transition-all border-l-2",
                  notification.unread ? "panel-surface-soft border-l-neon-pink" : "border-l-transparent",
                  isSelected ? "panel-surface-strong border-theme" : "hover:bg-[var(--color-hover)]"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  notification.unread ? "bg-neon-pink/10" : isSelected ? "panel-surface-strong" : "panel-surface-soft"
                )}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={cn(
                      "text-sm font-bold transition-colors",
                      notification.unread || isSelected ? "text-theme" : "text-theme opacity-70"
                    )}>
                      {notification.title}
                    </h4>
                    <span className="text-[10px] text-muted-theme opacity-40 font-medium">{notification.time}</span>
                  </div>
                  <p className="text-xs text-muted-theme leading-relaxed">
                    {notification.description}
                  </p>
                </div>

                <div className={cn(
                  "flex flex-col justify-center gap-2 transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                  <button className="p-1.5 rounded-lg panel-surface-soft text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] transition-all">
                    <CheckCheck size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg panel-surface-soft text-muted-theme hover:text-red-500 hover:bg-red-500/10 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button className="text-xs font-bold text-muted-theme opacity-40 hover:text-theme transition-all">
          View older notifications
        </button>
      </div>
    </motion.div>
  );
}
