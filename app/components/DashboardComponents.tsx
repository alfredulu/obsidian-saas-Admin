'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { salesData, taskProgressData, taskExpensesData, topPeople } from '@/lib/mockData';
import { MoreHorizontal, Phone, Mail, Check } from 'lucide-react';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const SparklineCard = ({ label, value, data, color }: any) => {
  const mounted = useMounted();
  return (
    <div className="glass-card p-5 flex flex-col gap-2 flex-1">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{label}</p>
        <MoreHorizontal size={14} className="text-white/30" />
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className="h-10 w-24">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color} 
                  strokeWidth={2} 
                  dot={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export const SaleHistoryBar = () => {
  const mounted = useMounted();

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Sale History</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-pink" />
            <span className="text-[10px] text-white/30">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <span className="text-[10px] text-white/30">Revenue</span>
          </div>
        </div>
      </div>
      <div className="h-[240px] w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#ffffff20', fontSize: 10}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#ffffff20', fontSize: 10}}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{backgroundColor: '#0A0A0B', border: '1px solid #ffffff10', borderRadius: '8px'}}
              />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={30}>
                {salesData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isCurrent ? '#FF00D6' : '#ffffff10'} 
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
  );
};

export const TopPeopleTable = () => (
  <div className="glass-card p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Top People</h3>
      <button className="text-[10px] font-bold text-neon-pink hover:underline">View All</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-white/20 text-[9px] uppercase tracking-widest border-b border-white/5">
            <th className="pb-3 font-bold w-10">
              <div className="w-4 h-4 rounded border border-white/10 flex items-center justify-center bg-white/5">
                <Check size={10} className="text-white/20" />
              </div>
            </th>
            <th className="pb-3 font-bold">Name</th>
            <th className="pb-3 font-bold">Email</th>
            <th className="pb-3 font-bold">Status</th>
            <th className="pb-3 font-bold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="text-[11px]">
          {topPeople.map((person) => (
            <tr key={person.id} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
              <td className="py-3">
                <div className="w-4 h-4 rounded border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-neon-pink/50 transition-colors">
                  <Check size={10} className="hidden group-hover:block text-neon-pink" />
                </div>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[9px] font-bold">
                    {person.avatar}
                  </div>
                  <span className="font-bold">{person.name}</span>
                </div>
              </td>
              <td className="py-3 text-white/40">{person.email}</td>
              <td className="py-3">
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                  person.status === 'Employee' ? 'bg-neon-pink/10 text-neon-pink' :
                  person.status === 'Customer' ? 'bg-neon-cyan/10 text-neon-cyan' :
                  'bg-neon-purple/10 text-neon-purple'
                }`}>
                  {person.status}
                </span>
              </td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                    <Phone size={12} />
                  </button>
                  <button className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                    <Mail size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
