'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { users } from '@/lib/mockData';
import { Edit2, Trash2, Eye, UserPlus, Search, Filter } from 'lucide-react';
import { Card, Badge, Avatar, Table, TableRow, TableCell, Skeleton, EmptyState } from '@/app/components/UI';

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const tableHeaders = [
    { label: 'User' },
    { label: 'Email' },
    { label: 'Role' },
    { label: 'Status' },
    { label: 'Action', className: 'text-right' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-theme">Manage your team members and their account permissions.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-neon-pink text-theme rounded-xl text-sm font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all">
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme opacity-40" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full panel-surface-soft border border-theme rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 panel-surface-soft border border-theme rounded-xl text-xs font-medium hover:bg-[var(--color-hover)] transition-all">
              <Filter size={14} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {users.length > 0 ? (
          <Table headers={tableHeaders}>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton variant="circle" className="w-8 h-8" />
                      <Skeleton className="w-24 h-4 rounded" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="w-40 h-4 rounded" /></TableCell>
                  <TableCell><Skeleton className="w-16 h-4 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="w-20 h-4 rounded" /></TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <Skeleton className="w-8 h-8 rounded-lg" />
                      <Skeleton className="w-8 h-8 rounded-lg" />
                      <Skeleton className="w-8 h-8 rounded-lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} />
                      <span className="font-bold">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-theme">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.role === 'Admin' ? 'pink' :
                      user.role === 'Staff' ? 'cyan' :
                      'purple'
                    }>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'panel-surface-strong'}`} />
                      <span className={user.status === 'Active' ? 'text-emerald-400' : 'text-muted-theme'}>
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg panel-surface-soft text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="p-2 rounded-lg panel-surface-soft text-muted-theme hover:text-theme hover:bg-[var(--color-hover)] transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2 rounded-lg panel-surface-soft text-muted-theme hover:text-red-500 hover:bg-red-500/10 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </Table>
        ) : (
          <div className="py-16">
            <EmptyState
              icon={<UserPlus size={32} />}
              title="No users yet"
              description="Add team members so you can manage their roles and keep things secure."
              actionLabel="Add New User"
              onAction={() => {}}
            />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
