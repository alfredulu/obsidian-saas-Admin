'use client';

import React from 'react';
import { motion } from 'motion/react';
import { tasks } from '@/lib/mockData';
import { Card, Badge, Avatar } from '@/app/components/UI';
import { Calendar, MoreVertical, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case 'High':
      return <Badge variant="red">{priority}</Badge>;
    case 'Medium':
      return <Badge variant="cyan">{priority}</Badge>;
    case 'Low':
      return <Badge variant="emerald">{priority}</Badge>;
    default:
      return <Badge>{priority}</Badge>;
  }
};

const TaskCard = ({ task }: { task: any }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Card className="p-4 mb-4 cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start mb-3">
        <PriorityBadge priority={task.priority} />
        <button className="text-white/20 hover:text-white transition-colors">
          <MoreVertical size={14} />
        </button>
      </div>
      <h4 className="text-sm font-bold mb-2">{task.title}</h4>
      <p className="text-[11px] text-white/40 mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Avatar name={task.user} size="sm" />
          <span className="text-[10px] text-white/60">{task.user}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/30">
          <Calendar size={10} />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </Card>
  </motion.div>
);

const KanbanColumn = ({ title, status, tasks }: { title: string, status: string, tasks: any[] }) => {
  const filteredTasks = tasks.filter(t => t.status === status);
  
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">{title}</h3>
          <span className="text-[10px] bg-white/5 text-white/30 px-1.5 py-0.5 rounded-md font-bold">
            {filteredTasks.length}
          </span>
        </div>
        <button className="p-1 rounded-md hover:bg-white/5 text-white/30 hover:text-white transition-all">
          <Plus size={14} />
        </button>
      </div>
      
      <div className="min-h-[500px] rounded-2xl bg-white/[0.02] p-2 border border-white/[0.03]">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="h-32 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
            <p className="text-[10px] text-white/10 uppercase tracking-widest font-bold">No Tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TasksPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Board</h1>
          <p className="text-sm text-white/40">Manage your projects and track progress across the team.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
            Filter
          </button>
          <button className="px-4 py-2 bg-neon-pink text-white rounded-xl text-sm font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all flex items-center gap-2">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6">
        <KanbanColumn title="Todo" status="Todo" tasks={tasks} />
        <KanbanColumn title="In Progress" status="In Progress" tasks={tasks} />
        <KanbanColumn title="Completed" status="Completed" tasks={tasks} />
      </div>
    </motion.div>
  );
}
