'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { calendarEvents } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); // Oct 2023
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    const events = calendarEvents.filter(e => e.date === dateStr);
    
    return {
      dayNumber,
      isCurrentMonth,
      dateStr,
      events,
      isToday: dayNumber === 24 && currentDate.getMonth() === 9 // Mock today as Oct 24
    };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold tracking-tight">{monthName} {year}</h2>
          <div className="flex gap-2">
            <button className="p-2 panel-surface-soft hover:bg-[var(--color-hover)] rounded-xl border border-theme transition-all">
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 panel-surface-soft hover:bg-[var(--color-hover)] rounded-xl border border-theme transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
          <button className="px-4 py-2 panel-surface-soft hover:bg-[var(--color-hover)] rounded-xl text-xs font-bold border border-theme transition-all">
            Today
          </button>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neon-pink text-theme rounded-xl text-xs font-bold neon-glow-pink hover:scale-105 transition-all"
        >
          <Plus size={16} /> Schedule Event
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card overflow-hidden">
        <div className="grid grid-cols-7 border-b border-theme panel-surface-soft">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-muted-theme">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 h-[700px]">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "border-r border-b border-theme p-2 transition-all hover:bg-[var(--color-hover)] flex flex-col gap-1",
                !day.isCurrentMonth && "opacity-20",
                i % 7 === 6 && "border-r-0"
              )}
            >
              <div className="flex justify-between items-start">
                <span className={cn(
                  "w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-lg transition-all",
                  day.isToday ? "bg-neon-pink text-theme neon-glow-pink" : "text-muted-theme"
                )}>
                  {day.isCurrentMonth ? day.dayNumber : ''}
                </span>
              </div>
              
              <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-1">
                {day.events.map(event => (
                  <div 
                    key={event.id}
                    className={cn(
                      "px-2 py-1 rounded-md text-[9px] font-bold truncate border-l-2",
                      event.type === 'Design' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500" :
                      event.type === 'Starting' ? "bg-red-500/10 text-red-500 border-red-500" :
                      "bg-neon-cyan/10 text-neon-cyan border-neon-cyan"
                    )}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card p-8 panel-surface shadow-2xl border-theme"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Schedule New Event</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-[var(--color-hover)] rounded-lg transition-all text-muted-theme hover:text-theme"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold">Event Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Design Review" 
                    className="w-full panel-surface-soft border border-theme rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-pink/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold">Date</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme opacity-40" size={16} />
                      <input 
                        type="text" 
                        defaultValue="2023-10-24"
                        className="w-full panel-surface-soft border border-theme rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-pink/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme opacity-40" size={16} />
                      <input 
                        type="text" 
                        placeholder="10:00 AM"
                        className="w-full panel-surface-soft border border-theme rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-pink/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme opacity-40" size={16} />
                    <input 
                      type="text" 
                      placeholder="Virtual Meeting"
                      className="w-full panel-surface-soft border border-theme rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-pink/50 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 panel-surface-soft hover:bg-[var(--color-hover)] rounded-xl text-sm font-bold border border-theme transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-neon-pink text-theme rounded-xl text-sm font-bold neon-glow-pink hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
