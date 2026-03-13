/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  BarChart3, 
  CreditCard, 
  Calendar as CalendarIcon, 
  Bell, 
  MessageSquare, 
  User, 
  Building2, 
  Folder, 
  Settings, 
  Grid2X2, 
  Search, 
  Sun, 
  ChevronDown, 
  Command,
  MoreHorizontal,
  Phone,
  Plus,
  ChevronLeft,
  ChevronRight,
  Lock
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
import { cn } from './lib/utils';
import { 
  taskProgressData, 
  taskExpensesData, 
  saleHistoryData, 
  topPeople, 
  scheduleItems 
} from './lib/mockData';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false, hasSubmenu = false }: any) => (
  <div className={cn(
    "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group",
    active ? "bg-neon-pink text-white neon-glow-pink" : "text-white/50 hover:text-white hover:bg-white/5"
  )}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={cn(active ? "text-white" : "group-hover:text-white")} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {hasSubmenu && <ChevronDown size={14} className={active ? "text-white" : "text-white/30"} />}
  </div>
);

const Sidebar = () => (
  <aside className="w-64 h-screen flex flex-col border-r border-white/5 p-6 overflow-y-auto">
    <div className="flex items-center gap-2 mb-10">
      <div className="w-8 h-8 bg-neon-pink rounded-lg flex items-center justify-center neon-glow-pink">
        <div className="w-4 h-4 border-2 border-white rotate-45" />
      </div>
      <h1 className="text-xl font-bold tracking-tight">Sass Admin</h1>
      <div className="ml-auto flex gap-1">
        <ChevronLeft size={16} className="text-white/30" />
        <ChevronRight size={16} className="text-white/30" />
      </div>
    </div>

    <div className="space-y-6 flex-1">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 px-4">Menu</p>
        <nav className="space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
          <SidebarItem icon={FileText} label="Notes" />
          <SidebarItem icon={CheckSquare} label="Task" />
          <SidebarItem icon={BarChart3} label="Analytics" />
          <SidebarItem icon={CreditCard} label="Subscription" hasSubmenu />
          <SidebarItem icon={CalendarIcon} label="Calendar" />
          <SidebarItem icon={Bell} label="Notification" />
          <SidebarItem icon={MessageSquare} label="Messages" />
          <SidebarItem icon={User} label="User" />
          <SidebarItem icon={Building2} label="Companies" />
          <SidebarItem icon={Folder} label="File Manager" />
        </nav>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-4 px-4">Support</p>
        <nav className="space-y-1">
          <SidebarItem icon={Settings} label="Settings" />
          <SidebarItem icon={Grid2X2} label="Integrations" />
        </nav>
      </div>
    </div>

    <div className="mt-10 p-4 glass-card relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xs font-bold mb-1">Sasste Pro. Subsection</h3>
        <p className="text-[10px] text-white/50 mb-4 leading-relaxed">Get All Dashboards access and 300+ use pre-ready tools.</p>
        <button className="w-full py-2 bg-white text-obsidian rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-neon-pink hover:text-white transition-colors group">
          Upgrade pro <Lock size={12} className="group-hover:text-white" />
        </button>
      </div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-neon-pink/20 blur-2xl rounded-full" />
    </div>
  </aside>
);

const TopBar = () => (
  <header className="h-20 px-8 flex items-center justify-between border-b border-white/5">
    <div className="flex-1 max-w-md">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-neon-pink transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-12 text-sm focus:outline-none focus:border-neon-pink/50 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-white/30">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white">
          <Sun size={20} />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-neon-pink rounded-full border-2 border-obsidian" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white">
          <MessageSquare size={20} />
        </button>
      </div>
      
      <div className="h-8 w-[1px] bg-white/10 mx-2" />
      
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="text-right">
          <p className="text-sm font-bold group-hover:text-neon-pink transition-colors">Lily Carter</p>
        </div>
        <img src="https://picsum.photos/seed/lily/40/40" alt="Avatar" className="w-10 h-10 rounded-xl border border-white/10" referrerPolicy="no-referrer" />
        <ChevronDown size={16} className="text-white/30" />
      </div>
    </div>
  </header>
);

const Sparkline = ({ data, color }: any) => (
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

const StatCard = ({ title, value, total, percentage, isPositive, data, color }: any) => (
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

const SaleHistory = () => (
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

const TopPeopleTable = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="glass-card p-6"
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold">Top People</h3>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-white/5 border border-white/5 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-neon-pink/30 w-48"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-xs text-white/70 hover:bg-white/10">
          <BarChart3 size={14} /> Sort By
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-xs text-white/70 hover:bg-white/10">
          <Grid2X2 size={14} /> Filter
        </button>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-white/30">
            <th className="pb-4 font-bold w-10">
              <div className="w-4 h-4 border border-white/20 rounded cursor-pointer" />
            </th>
            <th className="pb-4 font-bold">Name <ChevronDown size={10} className="inline" /></th>
            <th className="pb-4 font-bold">Email <ChevronDown size={10} className="inline" /></th>
            <th className="pb-4 font-bold">Category <ChevronDown size={10} className="inline" /></th>
            <th className="pb-4 font-bold text-right">Action <ChevronDown size={10} className="inline" /></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {topPeople.map((person) => (
            <tr key={person.id} className="group hover:bg-white/5 transition-colors">
              <td className="py-4">
                <div className="w-4 h-4 border border-white/20 rounded cursor-pointer group-hover:border-neon-pink" />
              </td>
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
                <div className="flex items-center justify-end gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold hover:bg-neon-pink hover:text-white transition-all">
                    <Phone size={10} /> Call
                  </button>
                  <button className="p-1 text-white/30 hover:text-white">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const ProductHighlight = () => {
  const data = [
    { name: 'Pink', value: 40, color: '#FF00D6' },
    { name: 'Purple', value: 30, color: '#9D00FF' },
    { name: 'Yellow', value: 30, color: '#FACC15' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold">Product Highlight</h3>
        <div className="flex items-center gap-1 text-[10px] text-white/50 bg-white/5 px-2 py-1 rounded border border-white/5 cursor-pointer">
          Monthly <ChevronDown size={10} />
        </div>
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
    </motion.div>
  );
};

const TaskSchedule = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 }}
    className="glass-card p-6 mt-6"
  >
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

    <div className="flex items-center justify-between mb-4">
      <h4 className="text-xs font-bold">April 23, 2024</h4>
      <button className="text-neon-pink text-[10px] font-bold flex items-center gap-1">
        <Plus size={10} /> Add New
      </button>
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
              {item.extraAttendees && (
                <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-obsidian flex items-center justify-center text-[8px] font-bold">
                  +{item.extraAttendees}
                </div>
              )}
              <span className="ml-4 text-[8px] text-white/50 self-center">People</span>
            </div>
            <div className="flex items-center gap-3">
              {item.todoCount && (
                <div className="flex items-center gap-1 text-[8px] text-white/30">
                  <CheckSquare size={10} /> {item.todoCount} Todo List
                </div>
              )}
              {item.duration && (
                <div className="flex items-center gap-1 text-[8px] text-white/30">
                  <BarChart3 size={10} /> {item.duration}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="flex h-screen bg-obsidian text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex gap-8">
            {/* Left Content */}
            <div className="flex-[2.5] space-y-8">
              {/* Top Row Stats */}
              <div className="flex gap-6">
                <StatCard 
                  title="Task Progress" 
                  value="120" 
                  total="236" 
                  percentage="-2.5" 
                  isPositive={false} 
                  data={taskProgressData} 
                  color="#FF00D6" 
                />
                <StatCard 
                  title="Task Expenses" 
                  value="$6,045" 
                  total="" 
                  percentage="25" 
                  isPositive={true} 
                  data={taskExpensesData} 
                  color="#00FFD1" 
                />
              </div>

              {/* Charts & Tables */}
              <SaleHistory />
              <TopPeopleTable />
            </div>

            {/* Right Content */}
            <div className="flex-1 space-y-6">
              <ProductHighlight />
              <TaskSchedule />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
