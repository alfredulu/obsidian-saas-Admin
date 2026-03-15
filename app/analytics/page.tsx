'use client';

import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { revenueOverTime, userAcquisition, recentEvents } from '@/lib/mockData';
import { motion } from 'motion/react';
import { TrendingUp, Users, Activity, DollarSign, MoreHorizontal, Clock } from 'lucide-react';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="glass-card p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
          <Icon size={20} />
        </div>
        <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{label}</p>
      </div>
      <MoreHorizontal size={16} className="text-white/20" />
    </div>
    <div className="grid grid-rows-[auto_auto] gap-1 mt-2">
      <h3 className="text-xl sm:text-2xl font-bold leading-tight whitespace-nowrap">{value}</h3>
      <span className="text-emerald-400 text-[10px] font-bold text-right w-full">{trend}</span>
    </div>
  </div>
);

export default function AnalyticsPage() {
  const mounted = useMounted();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
          <p className="text-white/30 text-sm mt-1">Comprehensive performance metrics and user insights.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/5">Export CSV</button>
          <button className="px-4 py-2 bg-neon-pink text-white rounded-xl text-xs font-bold neon-glow-pink transition-all">Live View</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} label="Total Revenue" value="$128,430" trend="+14.2%" color="neon-pink" />
        <StatCard icon={Users} label="Active Users" value="42,510" trend="+8.1%" color="neon-cyan" />
        <StatCard icon={Activity} label="Conversion Rate" value="3.24%" trend="+2.4%" color="neon-purple" />
        <StatCard icon={TrendingUp} label="Growth Rate" value="24.8%" trend="+5.6%" color="white" />
      </div>

      {/* Revenue Over Time */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-bold">Revenue Over Time</h3>
            <p className="text-white/30 text-xs mt-1">Monthly revenue growth with projection analysis.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold transition-colors">6 Months</button>
            <button className="px-3 py-1.5 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-lg text-[10px] font-bold transition-colors">1 Year</button>
          </div>
        </div>
        
        <div className="h-[400px] w-full relative">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BC13FE" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#BC13FE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#ffffff20', fontSize: 11}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#ffffff20', fontSize: 11}}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0A0A0B', border: '1px solid #ffffff10', borderRadius: '12px'}}
                  itemStyle={{color: '#fff'}}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#BC13FE" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Acquisition */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">User Acquisition</h3>
            <MoreHorizontal size={16} className="text-white/20" />
          </div>
          <div className="h-[300px] w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userAcquisition} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#ffffff20', fontSize: 11}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#ffffff20', fontSize: 11}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0A0A0B', border: '1px solid #ffffff10', borderRadius: '12px'}}
                    cursor={{fill: 'white', opacity: 0.05}}
                  />
                  <Bar dataKey="newUsers" radius={[4, 4, 0, 0]} barSize={32}>
                    {userAcquisition.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === userAcquisition.length - 1 ? '#00F5FF' : '#ffffff10'} 
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-white/5 animate-pulse rounded-xl" />
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <button className="text-[10px] font-bold text-neon-pink hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-5">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
                    <div className="w-full h-full rounded-[11px] bg-obsidian flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.user}`} 
                        alt={event.user} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold group-hover:text-neon-pink transition-colors">{event.user}</p>
                    <p className="text-[10px] text-white/30">{event.event}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase ${
                    event.type === 'Upgrade' ? 'bg-neon-pink/10 text-neon-pink' :
                    event.type === 'New' ? 'bg-neon-cyan/10 text-neon-cyan' :
                    event.type === 'Payment' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-white/5 text-white/40'
                  }`}>
                    {event.type}
                  </span>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[8px] text-white/20">
                    <Clock size={8} />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
