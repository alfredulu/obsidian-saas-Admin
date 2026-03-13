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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { salesData, productHighlights } from '@/lib/mockData';
import { TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const StatCard = ({ icon: Icon, label, value, trend, colorClass }: any) => (
  <div className="glass-card p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
        <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
        <TrendingUp size={14} />
        {trend}
      </div>
    </div>
    <div>
      <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  </div>
);

export const SaleHistory = () => {
  const mounted = useMounted();

  return (
    <div className="glass-card p-6 col-span-2">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold">Sale History</h3>
        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="h-[280px] w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF2D95" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF2D95" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#ffffff50', fontSize: 12}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#ffffff50', fontSize: 12}}
              />
              <Tooltip 
                contentStyle={{backgroundColor: '#1A1A1B', border: '1px solid #ffffff10', borderRadius: '12px'}}
                itemStyle={{color: '#fff'}}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#FF2D95" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full bg-white/5 animate-pulse rounded-xl" />
        )}
      </div>
    </div>
  );
};

export const ProductHighlight = () => {
  const mounted = useMounted();

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-8">Product Highlight</h3>
      <div className="h-40 w-full relative">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productHighlights}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[10px] text-white/30 uppercase font-bold">Total</p>
          <p className="text-xl font-bold">1,200</p>
        </div>
      </div>
      <div className="mt-8 space-y-3">
        {productHighlights.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
              <span className="text-xs text-white/50">{item.name}</span>
            </div>
            <span className="text-xs font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
