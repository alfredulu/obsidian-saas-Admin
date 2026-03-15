'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { companies } from '@/lib/mockData';
import { Building2, Search, Filter, MoreHorizontal, ExternalLink, Users } from 'lucide-react';
import {
  Card,
  Badge,
  Table,
  TableRow,
  TableCell,
  EmptyState,
  Skeleton,
} from '@/app/components/UI';

type CompanySortKey = 'name' | 'industry' | 'employees' | 'plan';

export default function CompaniesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sortKey, setSortKey] = useState<CompanySortKey>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  const sortedCompanies = useMemo(() => {
    const compare = (a: string | number, b: string | number) => {
      if (typeof a === 'number' || typeof b === 'number') {
        return Number(a) - Number(b);
      }
      return String(a)
        .toLowerCase()
        .localeCompare(String(b).toLowerCase(), undefined, { sensitivity: 'base' });
    };

    return [...companies].sort((a, b) => {
      const base = compare(a[sortKey], b[sortKey]);
      return sortDirection === 'asc' ? base : -base;
    });
  }, [sortKey, sortDirection]);

  const handleSort = (key: CompanySortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection('asc');
  };

  const tableHeaders = [
    {
      label: 'Company',
      sortable: true,
      sortDirection: sortKey === 'name' ? sortDirection : null,
      onSort: () => handleSort('name'),
    },
    {
      label: 'Industry',
      sortable: true,
      sortDirection: sortKey === 'industry' ? sortDirection : null,
      onSort: () => handleSort('industry'),
    },
    {
      label: 'Employees',
      sortable: true,
      sortDirection: sortKey === 'employees' ? sortDirection : null,
      onSort: () => handleSort('employees'),
    },
    {
      label: 'Plan',
      sortable: true,
      sortDirection: sortKey === 'plan' ? sortDirection : null,
      onSort: () => handleSort('plan'),
    },
    { label: 'Action', className: 'text-right' },
  ];

  const hasCompanies = companies.length > 0;
  const shouldShowEmpty = !hasCompanies && !isLoading;

  const skeletonRows = Array.from({ length: 4 }).map((_, index) => (
    <TableRow key={`company-skeleton-${index}`}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="w-9 h-9" />
          <div className="space-y-2">
            <Skeleton className="w-24 h-3 rounded" />
            <Skeleton className="w-16 h-2 rounded" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="w-32 h-3 rounded" />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-16 h-3 rounded" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="w-24 h-5 rounded-full" />
      </TableCell>
      <TableCell align="right">
        <Skeleton className="w-20 h-3 rounded" />
      </TableCell>
    </TableRow>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company Directory</h1>
          <p className="text-sm text-muted-theme">Overview of all registered companies and their subscription status.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-neon-cyan text-background rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-neon-cyan/80 transition-all">
          <Building2 size={18} />
          <span>Register Company</span>
        </button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme opacity-40" size={16} />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full panel-surface-soft border border-theme rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-cyan/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 panel-surface-soft border border-theme rounded-xl text-xs font-medium hover:bg-[var(--color-hover)] transition-all">
              <Filter size={14} />
              <span>Industry</span>
            </button>
          </div>
        </div>

        {shouldShowEmpty ? (
          <div className="py-16">
            <EmptyState
              icon={<Building2 size={32} />}
              title="No companies registered yet"
              description="Add a company profile so teams can be connected to your dashboard."
              actionLabel="Register Company"
              onAction={() => {}}
            />
          </div>
        ) : (
          <Table headers={tableHeaders}>
            {isLoading
              ? skeletonRows
              : sortedCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl panel-surface-soft flex items-center justify-center font-bold text-neon-cyan border border-theme group-hover:border-neon-cyan/50 transition-colors">
                          {company.logo}
                        </div>
                        <span className="font-bold">{company.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-theme">{company.industry}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users size={12} className="text-muted-theme opacity-40" />
                        <span>{company.employees}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          company.plan === 'Enterprise'
                            ? 'purple'
                            : company.plan === 'Pro'
                            ? 'pink'
                            : 'default'
                        }
                      >
                        {company.plan}
                      </Badge>
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg panel-surface-soft text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] transition-all">
                          <ExternalLink size={14} />
                        </button>
                        <button className="p-2 rounded-lg panel-surface-soft text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] transition-all">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </Table>
        )}
      </Card>
    </motion.div>
  );
}
