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
import { Card, Avatar, Badge, Table, TableRow, TableCell } from './UI';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const SparklineCard = ({ label, value, data, color }: any) => {
  const mounted = useMounted();
  return (
    <Card className="p-5 flex flex-col gap-2 flex-1" title={label} action={<MoreHorizontal size={14} className="text-muted-theme" />}>
      <div className="flex items-end justify-between gap-2 overflow-hidden">
        <h3 className="text-xl sm:text-2xl font-bold min-w-0">{value}</h3>
        <div className="h-10 w-24 shrink-0">
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
    </Card>
  );
};

export const SaleHistoryBar = () => {
  const mounted = useMounted();

  return (
    <Card className="p-6" title="Sale History" action={
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-pink" />
          <span className="text-[10px] text-muted-theme">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
          <span className="text-[10px] text-muted-theme">Revenue</span>
        </div>
      </div>
    }>
      <div className="h-[240px] w-full relative">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'var(--color-muted)', fontSize: 10}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'var(--color-muted)', fontSize: 10}}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: '8px'}}
              />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={12}>
                {salesData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-sales-${index}`} 
                    fill={entry.isCurrent ? '#FF00D6' : 'var(--color-panel-strong)'} 
                  />
                ))}
              </Bar>
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]} barSize={12}>
                {salesData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-rev-${index}`} 
                    fill={entry.isCurrent ? '#FFD700' : 'var(--color-panel-soft)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full panel-surface-soft animate-pulse rounded-xl" />
        )}
      </div>
    </Card>
  );
};

export const TopPeopleTable = () => {
  const tableHeaders = [
    { label: <div className="w-4 h-4 rounded border border-theme flex items-center justify-center panel-surface-soft"><Check size={10} className="text-muted-theme opacity-40" /></div>, className: 'w-10' },
    { label: 'Name' },
    { label: 'Email' },
    { label: 'Status' },
    { label: 'Action', className: 'text-right' },
  ];

  return (
    <Card className="p-6" title="Top People" action={<button className="text-[10px] font-bold text-neon-pink hover:underline">View All</button>}>
      <Table headers={tableHeaders}>
        {topPeople.map((person) => (
          <TableRow key={person.id}>
            <TableCell>
              <div className="w-4 h-4 rounded border border-theme flex items-center justify-center panel-surface-soft group-hover:border-neon-pink/50 transition-colors">
                <Check size={10} className="hidden group-hover:block text-neon-pink" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <Avatar name={person.name} size="sm" />
                <span className="font-bold">{person.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-theme">{person.email}</TableCell>
            <TableCell>
              <Badge variant={
                person.status === 'Employee' ? 'pink' :
                person.status === 'Customer' ? 'cyan' :
                'purple'
              }>
                {person.status}
              </Badge>
            </TableCell>
            <TableCell align="right">
              <div className="flex items-center justify-end gap-2">
                <button className="p-1.5 rounded-lg panel-surface-soft text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] transition-all">
                  <Phone size={12} />
                </button>
                <button className="p-1.5 rounded-lg panel-surface-soft text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] transition-all">
                  <Mail size={12} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
};
