'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { revenueData, acquisitionData, activityFeed } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const AnalyticsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-sm text-white/50">
          Last 12 Months
        </div>
      </div>

      {/* Revenue Over Time */}
      <div className="glass-card p-8">
        <h3 className="text-lg font-bold mb-6">Revenue Over Time</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9D00FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9D00FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#161922', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#9D00FF' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#9D00FF" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#revenueGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Acquisition */}
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold mb-6">User Acquisition</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={acquisitionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#161922', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="users" fill="#00FFD1" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold mb-6">Activity Feed</h3>
          <div className="space-y-6">
            {activityFeed.map((event) => (
              <div key={event.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10">
                    <Image 
                      src={event.avatar} 
                      alt={event.user} 
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{event.user}</p>
                    <p className="text-xs text-white/50">{event.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold mb-1 inline-block",
                  )} style={{ backgroundColor: `${event.badgeColor}20`, color: event.badgeColor }}>
                    {event.badge}
                  </span>
                  <p className="text-[10px] text-white/30">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
