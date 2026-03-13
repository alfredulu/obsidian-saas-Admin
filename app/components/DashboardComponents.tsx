'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  MoreHorizontal,
  Phone,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  BarChart3
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from '@/lib/utils';
import { 
  saleHistoryData, 
  topPeople, 
  scheduleItems 
} from '@/lib/mockData';

export const Sparkline = ({ data, color }: any) => (
  <ResponsiveContainer width="100%" height={60}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
          <stop offset="95%" stopColor={color} stopOpacity={0}/>
        </linearGradient>
      </defs>
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke={color} 
        strokeWidth={2} 
        fillOpacity={1} 
        fill={`url(#gradient-${color})`} 
        isAnimationActive={true}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export const StatCard = ({ title, value, total, percentage, isPositive, data, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 flex-1 flex items-center justify-between gap-4"
  >
    <div className="w-1/2">
      <Sparkline data={data} color={color} />
    </div>
    <div className="flex-1 text-right">
      <p className="text-xs font-medium text-white/50 mb-1">{title}</p>
      <div className="flex items-center justify-end gap-2 mb-1">
        <h3 className="text-xl font-bold">{value}/{total}</h3>
        <span className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5",
          isPositive ? "bg-neon-green/10 text-neon-green" : "bg-red-500/10 text-red-500"
        )}>
          {isPositive ? '↗' : '↘'} {percentage}%
        </span>
      </div>
      <p className="text-[10px] text-white/30">This Month</p>
    </div>
  </motion.div>
);

export const SaleHistory = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="glass-card p-6"
  >
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="text-lg font-bold mb-1">Sale History</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neon-pink" />
            <span className="text-[10px] text-white/50">Avg: Sell Price</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-[10px] text-white/50">Total Sell</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
        <span className="text-xs text-white/70">Apr 25 - Apr 29</span>
        <CalendarIcon size={14} className="text-white/30" />
      </div>
    </div>

    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={saleHistoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: '#161922', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Bar dataKey="avg" radius={[4, 4, 0, 0]} barSize={12}>
            {saleHistoryData.map((entry: any, index) => (
              <Cell key={`cell-${index}`} fill={entry.active ? '#FF00D6' : 'rgba(255,255,255,0.1)'} className={entry.active ? "neon-glow-pink" : ""} />
            ))}
          </Bar>
          <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={12}>
            {saleHistoryData.map((entry: any, index) => (
              <Cell key={`cell-${index}`} fill={entry.active ? '#FACC15' : 'rgba(255,255,255,0.05)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export const TopPeopleTable = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="glass-card p-6"
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold">Top People</h3>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-xs text-white/70 hover:bg-white/10">
          <BarChart3 size={14} /> Sort By
        </button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-white/30">
            <th className="pb-4 font-bold">Name</th>
            <th className="pb-4 font-bold">Email</th>
            <th className="pb-4 font-bold">Category</th>
            <th className="pb-4 font-bold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {topPeople.map((person) => (
            <tr key={person.id} className="group hover:bg-white/5 transition-colors">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-lg" referrerPolicy="no-referrer" />
                  <span className="text-xs font-medium">{person.name}</span>
                </div>
              </td>
              <td className="py-4 text-xs text-white/50">{person.email}</td>
              <td className="py-4">
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  person.category === 'Employee' ? "bg-neon-pink/10 text-neon-pink" : 
                  person.category === 'Customer' ? "bg-neon-green/10 text-neon-green" : 
                  "bg-yellow-500/10 text-yellow-500"
                )}>
                  {person.category}
                </span>
              </td>
              <td className="py-4 text-right">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold hover:bg-neon-pink hover:text-white transition-all ml-auto">
                  <Phone size={10} /> Call
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

export const ProductHighlight = () => {
  const data = [
    { name: 'Pink', value: 40, color: '#FF00D6' },
    { name: 'Purple', value: 30, color: '#9D00FF' },
    { name: 'Yellow', value: 30, color: '#FACC15' },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold">Product Highlight</h3>
      </div>

      <div className="relative h-40 flex items-center justify-center mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 text-center">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-1">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <p className="text-[10px] text-white/50">Product Hunt</p>
          <h4 className="text-lg font-bold">25,018</h4>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-pink" />
            <span className="text-[10px] text-white/50">Get Pro.</span>
          </div>
          <span className="text-xs font-bold">758</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <span className="text-[10px] text-white/50">Active Visitor</span>
          </div>
          <span className="text-xs font-bold">412</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[10px] text-white/50">Cancel</span>
          </div>
          <span className="text-xs font-bold">128</span>
        </div>
      </div>
    </div>
  );
};

export const TaskSchedule = () => (
  <div className="glass-card p-6">
    <h3 className="text-sm font-bold mb-6">Task Schedule</h3>
    
    <div className="bg-white/5 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <ChevronLeft size={14} className="text-white/30 cursor-pointer" />
        <div className="flex items-center gap-2 text-xs font-bold">
          <CalendarIcon size={14} className="text-neon-pink" />
          April, 2024
        </div>
        <ChevronRight size={14} className="text-white/30 cursor-pointer" />
      </div>
      <div className="flex justify-between items-center">
        {[
          { d: 'Sat', n: 20 },
          { d: 'Sun', n: 21 },
          { d: 'Mon', n: 22, active: true },
          { d: 'Tue', n: 23 },
          { d: 'Wed', n: 24 },
          { d: 'Thu', n: 25 },
        ].map((day, i) => (
          <div key={i} className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer",
            day.active ? "bg-neon-pink neon-glow-pink" : "hover:bg-white/5"
          )}>
            <span className={cn("text-[8px] uppercase font-bold", day.active ? "text-white" : "text-white/30")}>{day.d}</span>
            <span className={cn("text-xs font-bold", day.active ? "text-white" : "text-white/70")}>{day.n}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      {scheduleItems.map((item) => (
        <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-4 relative group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h5 className="text-xs font-bold">{item.title}</h5>
              <span className={cn(
                "text-[8px] px-1.5 py-0.5 rounded font-bold uppercase",
                item.status === 'Starting' ? "bg-red-500/20 text-red-500" : "bg-neon-green/20 text-neon-green"
              )}>
                {item.status}
              </span>
            </div>
            <MoreHorizontal size={14} className="text-white/30 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/30 mb-4">
            <BarChart3 size={10} /> {item.time}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {item.attendees.map((a, i) => (
                <img key={i} src={a} className="w-6 h-6 rounded-full border-2 border-obsidian" referrerPolicy="no-referrer" />
              ))}
              <span className="ml-4 text-[8px] text-white/50 self-center">People</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
