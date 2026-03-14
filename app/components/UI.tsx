'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

// --- Card ---
export const Card = ({ children, className, title, subtitle, action }: any) => (
  <div className={cn("glass-card p-6", className)}>
    {(title || action) && (
      <div className="flex items-center justify-between mb-6">
        <div>
          {title && <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">{title}</h3>}
          {subtitle && <p className="text-[10px] text-white/20 mt-1">{subtitle}</p>}
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
    default: 'bg-white/10 text-white/50',
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
      "bg-gradient-to-br from-white/10 to-white/5 p-[1px] shrink-0",
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
        <tr className="text-white/20 text-[9px] uppercase tracking-widest">
          {headers.map((header: any, i: number) => (
            <th key={i} className={cn("pb-3 font-bold border-b border-white/5", header.className)}>
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
      "group hover:bg-white/[0.02] transition-colors cursor-pointer",
      className
    )}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className, align = 'left' }: any) => (
  <td className={cn(
    "py-4 border-b border-white/5 group-last:border-0",
    align === 'right' && "text-right",
    align === 'center' && "text-center",
    className
  )}>
    {children}
  </td>
);
