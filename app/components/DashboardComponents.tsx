'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { salesData, taskProgressSeries, taskExpensesSeries, topPeople } from '@/lib/mockData';
import { MoreHorizontal, Phone, Mail, Check } from 'lucide-react';
import { Card, Avatar, Badge, Table, TableRow, TableCell, EmptyState, Skeleton } from './UI';

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export const AnalyticsMiniWidget = ({ title, value, trend, data, color, gradientId }: any) => {
  const mounted = useMounted();
  return (
    <div
      style={{ borderColor: 'var(--color-widget-border)' }}
      className="glass-card border p-5 flex gap-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex-[0_0_60%] h-32">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 6, left: 0, bottom: 6 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.45} />
                  <stop offset="75%" stopColor={color} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={false} />
              <YAxis axisLine={false} tickLine={false} tick={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                fill={`url(#${gradientId})`}
                fillOpacity={1}
                style={{ filter: `drop-shadow(0 0 16px ${color}33)` }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full panel-surface-soft animate-pulse rounded-2xl" />
        )}
      </div>
      <div className="flex flex-col justify-between gap-3 flex-[0_0_40%] min-w-0">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-theme">{title}</p>
          <h3 className="text-3xl font-bold text-theme">{value}</h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-neon-pink/10 text-neon-pink text-[10px] font-bold tracking-widest uppercase">
            {trend}
          </span>
          <span className="text-[10px] text-muted-theme">This Month</span>
        </div>
      </div>
    </div>
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

type TopPeopleSortKey = 'name' | 'email' | 'status';

export const TopPeopleTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortKey, setSortKey] = useState<TopPeopleSortKey>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const sortedPeople = useMemo(() => {
    const compare = (a: string | number, b: string | number) => {
      if (typeof a === 'number' || typeof b === 'number') {
        return Number(a) - Number(b);
      }
      return String(a)
        .toLowerCase()
        .localeCompare(String(b).toLowerCase(), undefined, { sensitivity: 'base' });
    };

    return [...topPeople].sort((a, b) => {
      const base = compare(a[sortKey], b[sortKey]);
      return sortDirection === 'asc' ? base : -base;
    });
  }, [sortKey, sortDirection]);

  const handleSort = (key: TopPeopleSortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection('asc');
  };

  const tableHeaders = [
    {
      label: (
        <div className="w-4 h-4 rounded border border-theme flex items-center justify-center panel-surface-soft">
          <Check size={10} className="text-muted-theme opacity-40" />
        </div>
      ),
      className: 'w-10',
    },
    {
      label: 'Name',
      sortable: true,
      sortDirection: sortKey === 'name' ? sortDirection : null,
      onSort: () => handleSort('name'),
    },
    {
      label: 'Email',
      sortable: true,
      sortDirection: sortKey === 'email' ? sortDirection : null,
      onSort: () => handleSort('email'),
    },
    {
      label: 'Status',
      sortable: true,
      sortDirection: sortKey === 'status' ? sortDirection : null,
      onSort: () => handleSort('status'),
    },
    { label: 'Action', className: 'text-right' },
  ];

  const hasPeople = topPeople.length > 0;
  const shouldShowEmpty = !hasPeople && !isLoading;

  const skeletonRows = Array.from({ length: 4 }).map((_, index) => (
    <TableRow key={`top-person-skeleton-${index}`}>
      <TableCell>
        <div className="w-4 h-4 rounded border border-theme flex items-center justify-center panel-surface-soft">
          <Skeleton className="w-full h-full rounded-sm" />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" className="w-8 h-8" />
          <div className="space-y-2">
            <Skeleton className="w-24 h-3 rounded" />
            <Skeleton className="w-20 h-2 rounded" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="w-32 h-3 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-4 rounded-full" />
      </TableCell>
      <TableCell align="right">
        <Skeleton className="w-24 h-3 rounded" />
      </TableCell>
    </TableRow>
  ));

  return (
    <Card className="p-6" title="Top People" action={<button className="text-[10px] font-bold text-neon-pink hover:underline">View All</button>}>
      {shouldShowEmpty ? (
        <div className="py-16">
          <EmptyState
            icon={<Check size={32} />}
            title="No people yet"
            description="Add team members or customers to surface their activity here."
            actionLabel="Add Person"
            onAction={() => {}}
          />
        </div>
      ) : (
        <Table headers={tableHeaders}>
          {isLoading
            ? skeletonRows
            : sortedPeople.map((person) => (
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
                    <Badge
                      variant={
                        person.status === 'Employee'
                          ? 'pink'
                          : person.status === 'Customer'
                          ? 'cyan'
                          : 'purple'
                      }
                    >
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
      )}
    </Card>
  );
};
