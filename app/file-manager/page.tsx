'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { files } from '@/lib/mockData';
import { Card, EmptyState } from '@/app/components/UI';
import { Folder, FileText, Image as ImageIcon, Video, MoreVertical, Search, Plus, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const getFileIcon = (type: string) => {
  switch (type) {
    case 'folder': return <Folder size={24} className="text-neon-cyan" />;
    case 'image': return <ImageIcon size={24} className="text-neon-pink" />;
    case 'video': return <Video size={24} className="text-neon-purple" />;
    default: return <FileText size={24} className="text-muted-theme" />;
  }
};

export default function FileManagerPage() {
  const hasFiles = files.length > 0;

  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">File Manager</h1>
          <p className="text-sm text-muted-theme">Manage your cloud storage and shared assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 panel-surface-soft border border-theme rounded-xl text-muted-theme hover:text-theme transition-all">
            <Grid size={18} />
          </button>
          <button className="p-2 panel-surface-soft border border-theme rounded-xl text-muted-theme hover:text-theme transition-all">
            <List size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-background rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-neon-cyan/80 transition-all">
            <Plus size={18} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme opacity-40" size={16} />
          <input 
            type="text" 
            placeholder="Search files..." 
            className="w-full panel-surface-soft border border-theme rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-cyan/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-theme opacity-40 font-bold uppercase tracking-widest">
          <span>Storage: 45.8 GB / 100 GB</span>
          <div className="w-32 h-1.5 panel-surface-soft rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan w-[45.8%]" />
          </div>
        </div>
      </div>

      {hasFiles ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {files.map((file) => {
            const isSelected = selectedId === file.id;
            return (
              <motion.div
                key={file.id}
                whileHover={{ y: -4, scale: 1.02 }}
                animate={{ 
                  scale: isSelected ? 1.02 : 1,
                  y: isSelected ? -4 : 0
                }}
                onClick={() => setSelectedId(file.id)}
                className="cursor-pointer"
              >
                <Card className={cn(
                  "p-4 flex flex-col items-center text-center group transition-all duration-200",
                  isSelected ? "border-neon-cyan/50 panel-surface-soft" : "border-theme"
                )}>
                  <div className="w-full flex justify-end mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-theme opacity-40 hover:text-theme">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                  
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                    isSelected ? "bg-neon-cyan/10" : "panel-surface-soft group-hover:bg-[var(--color-hover)]"
                  )}>
                    {getFileIcon(file.type)}
                  </div>

                  <h3 className="text-xs font-bold truncate w-full mb-1">{file.name}</h3>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-theme opacity-40">{file.size}</span>
                    <span className="text-[9px] text-muted-theme opacity-20 uppercase tracking-tighter">{file.modified}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="min-h-[360px] flex items-center justify-center">
          <EmptyState
            icon={<Folder size={32} />}
            title="No files uploaded yet"
            description="Upload files to keep your assets and documents in one secure workspace."
            actionLabel="Upload File"
            onAction={() => {}}
            className="w-full"
          />
        </div>
      )}
    </motion.div>
  );
}
