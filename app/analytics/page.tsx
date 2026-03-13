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
  Bar
} from 'recharts';
import { analyticsData } from '@/lib/mockData';
import { motion } from 'motion/react';
import { Users, Clock, MousePointer2, Percent } from 'lucide-react';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

const AnalyticsCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="glass-card p-6">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-${color}-400/10 text-${color}-400`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-emerald-400 text-[10px] font-bold mt-1">{trend}</p>
      </div>
    </div>
  </div>
);

export default function AnalyticsPage() {
  const mounted = useMounted();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-white/30 text-sm mt-1">Deep dive into your application performance and user behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard icon={Users} label="Total Users" value="124.5k" trend="+12.5%" color="pink" />
        <AnalyticsCard icon={Clock} label="Avg. Session" value="12m 45s" trend="+2.4%" color="cyan" />
        <AnalyticsCard icon={MousePointer2} label="Click Rate" value="24.8%" trend="+5.1%" color="purple" />
        <AnalyticsCard icon={Percent} label="Bounce Rate" value="32.4%" trend="-1.2%" color="emerald" />
      </div>

      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-bold">User Engagement</h3>
            <p className="text-white/30 text-xs mt-1">Real-time tracking of active users and session duration.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors">Hourly</button>
            <button className="px-4 py-2 bg-neon-pink text-white rounded-lg text-xs font-bold neon-glow-pink transition-colors">Daily</button>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF2D95" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF2D95" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#ffffff30', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#ffffff30', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0A0A0B', border: '1px solid #ffffff10', borderRadius: '12px'}}
                  itemStyle={{color: '#fff'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#00F5FF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#FF2D95" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSessions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Device Distribution</h3>
          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Mobile', value: 45 },
                  { name: 'Desktop', value: 35 },
                  { name: 'Tablet', value: 15 },
                  { name: 'Other', value: 5 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#ffffff30', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#ffffff30', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0A0A0B', border: '1px solid #ffffff10', borderRadius: '12px'}}
                  />
                  <Bar dataKey="value" fill="#BC13FE" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-white/5 animate-pulse rounded-xl" />
            )}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6">Top Traffic Sources</h3>
          <div className="space-y-6">
            {[
              { source: 'Direct', value: '45,230', percent: 45, color: 'bg-neon-pink' },
              { source: 'Google Search', value: '32,120', percent: 35, color: 'bg-neon-cyan' },
              { source: 'Social Media', value: '12,450', percent: 15, color: 'bg-neon-purple' },
              { source: 'Referral', value: '5,670', percent: 5, color: 'bg-white' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">{item.source}</span>
                  <span className="text-white/50">{item.value}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{width: `${item.percent}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
