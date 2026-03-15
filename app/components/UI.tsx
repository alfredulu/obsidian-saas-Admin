'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

// --- Card ---
export const Card = ({ children, className, title, subtitle, action }: any) => (
  <div className={cn("glass-card p-6", className)}>
    {(title || action) && (
      <div className="flex items-center justify-between mb-6">
        <div>
          {title && <h3 className="text-xs font-bold uppercase tracking-widest text-muted-theme">{title}</h3>}
          {subtitle && <p className="text-[10px] text-muted-theme opacity-40 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

// --- Badge ---
export const Badge = ({ children, variant = 'default', className }: any) => {
  const variants: any = {
    default: 'panel-surface-soft text-muted-theme',
    pink: 'bg-neon-pink/10 text-neon-pink',
    cyan: 'bg-neon-cyan/10 text-neon-cyan',
    purple: 'bg-neon-purple/10 text-neon-purple',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    red: 'bg-red-500/10 text-red-500',
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider",
      variants[variant] || variants.default,
      className
    )}>
      {children}
    </span>
  );
};

// --- Avatar ---
export const Avatar = ({ name, size = 'md', className }: any) => {
  const sizes: any = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-8 h-8 rounded-xl',
    lg: 'w-10 h-10 rounded-xl',
  };

  const innerSizes: any = {
    sm: 'rounded-[7px]',
    md: 'rounded-[9px]',
    lg: 'rounded-[9px]',
  };

  return (
    <div className={cn(
      "bg-gradient-to-br from-[var(--color-border)] to-[var(--color-panel-soft)] p-[1px] shrink-0",
      sizes[size] || sizes.md,
      className
    )}>
      <div className={cn(
        "w-full h-full bg-obsidian flex items-center justify-center overflow-hidden",
        innerSizes[size] || innerSizes.md
      )}>
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// --- Table ---
export const Table = ({ headers, children, className }: any) => (
  <div className={cn("overflow-x-auto", className)}>
    <table className="w-full text-left border-separate border-spacing-0">
      <thead>
        <tr className="text-muted-theme opacity-40 text-[9px] uppercase tracking-widest">
          {headers.map((header: any, i: number) => (
            <th key={i} className={cn("pb-3 font-bold border-b border-theme", header.className)}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[11px]">
        {children}
      </tbody>
    </table>
  </div>
);

export const TableRow = ({ children, className, onClick }: any) => (
  <tr 
    onClick={onClick}
    className={cn(
      "group hover:bg-[var(--color-hover)] transition-colors cursor-pointer interactive-row",
      className
    )}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className, align = 'left' }: any) => (
  <td className={cn(
    "py-4 border-b border-theme group-last:border-0",
    align === 'right' && "text-right",
    align === 'center' && "text-center",
    className
  )}>
    {children}
  </td>
);

// --- Skeleton ---
export const Skeleton = ({ className, variant = 'default' }: any) => {
  const variants: any = {
    default: 'panel-surface-soft',
    circle: 'panel-surface-soft rounded-full',
    card: 'glass-card panel-surface-soft',
  };

  return (
    <div className={cn(
      "animate-pulse",
      variants[variant] || variants.default,
      className
    )} />
  );
};

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-4 text-center text-muted-theme border border-dashed border-theme rounded-[26px] panel-surface-strong p-10 mx-auto max-w-md shadow-[0_0_40px_rgba(0,0,0,0.2)]",
      className
    )}
  >
    {icon && (
      <div className="text-[32px] text-neon-pink shadow-[0_0_18px_rgba(255,0,214,0.45)]">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-bold text-theme">{title}</h3>
    {description && (
      <p className="text-xs leading-relaxed opacity-80 max-w-[18rem]">
        {description}
      </p>
    )}
    {actionLabel && (
      <button
        type="button"
        onClick={onAction}
        className="px-6 py-2 text-sm font-bold rounded-xl bg-neon-pink text-theme neon-glow-pink hover:bg-neon-pink/80 transition-all"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// --- Modal ---
export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "relative w-full glass-card p-8 bg-obsidian border border-theme shadow-2xl",
              maxWidth
            )}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold tracking-tight">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-[var(--color-hover)] text-muted-theme opacity-60 hover:text-theme transition-all"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
