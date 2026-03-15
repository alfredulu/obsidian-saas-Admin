'use client';

import React, { useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { productHighlights } from '@/lib/mockData';
import { Calendar as CalendarIcon, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const ProductHighlight = () => {
  const mounted = useMounted();
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-theme">Product Highlight</h3>
        <MoreHorizontal size={14} className="text-muted-theme" />
      </div>
      
      <div className="h-40 w-full relative">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productHighlights}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {productHighlights.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full bg-white/5 animate-pulse rounded-full" />
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-1">
            <span className="text-neon-pink font-black text-sm">P</span>
          </div>
          <p className="text-lg font-bold">25,018</p>
          <p className="text-[9px] text-muted-theme uppercase font-bold">Product Hunt</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {productHighlights.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.color}} />
              <span className="text-[10px] text-muted-theme font-medium">{item.name}</span>
            </div>
            <span className="text-[10px] font-bold">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TaskSchedule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-theme">Task Schedule</h3>
      <CalendarIcon size={14} className="text-muted-theme" />
    </div>

    {/* Mini Calendar Placeholder */}
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold">October 2023</span>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded bg-white/5 flex items-center justify-center text-[8px]">{'<'}</div>
          <div className="w-4 h-4 rounded bg-white/5 flex items-center justify-center text-[8px]">{'>'}</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <span key={`${d}-${i}`} className="text-[8px] text-muted-theme font-bold">{d}</span>
        ))}
        {Array.from({length: 31}).map((_, i) => (
          <span key={i} className={cn(
            "text-[9px] py-1 rounded cursor-pointer hover:bg-white/5 transition-colors",
            i + 1 === 24 ? "bg-neon-pink text-white font-bold neon-glow-pink" : "text-muted-theme"
          )}>
            {i + 1}
          </span>
        ))}
      </div>
    </div>

    {/* Agenda List */}
    <div className="space-y-3">
      <div className="glass-card p-4 border-l-2 border-l-red-500">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-[11px] font-bold">Meeting Client</h4>
          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[8px] font-bold uppercase">Starting</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-muted-theme">
          <Clock size={10} />
          <span>09:00 AM - 10:30 AM</span>
        </div>
      </div>

      <div className="glass-card p-4 border-l-2 border-l-emerald-500">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-[11px] font-bold">App Design</h4>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase">Design</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-muted-theme">
          <Clock size={10} />
          <span>01:00 PM - 03:00 PM</span>
        </div>
      </div>
    </div>
  </div>
);

export const RightSidebar = () => {
  return (
    <aside className="hidden xl:flex w-72 h-screen flex-col border-l border-theme p-6 overflow-y-auto shrink-0 panel-surface-soft backdrop-blur-xl">
      <div className="space-y-8">
        <ProductHighlight />
        <TaskSchedule />
      </div>
    </aside>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
