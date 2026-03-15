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

const TaskCard = ({ task, isSelected, onSelect }: { task: any, isSelected: boolean, onSelect: () => void }) => (
  <motion.div
    animate={{ 
      y: isSelected ? -4 : 0, 
      scale: isSelected ? 1.02 : 1,
      boxShadow: isSelected ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : "none"
    }}
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    onClick={onSelect}
  >
    <Card className={cn(
      "p-4 mb-4 cursor-pointer transition-all duration-200",
      isSelected ? "border-neon-pink/50 panel-surface-soft" : "border-theme"
    )}>
      <div className="flex justify-between items-start mb-3">
        <PriorityBadge priority={task.priority} />
        <button className="text-muted-theme opacity-40 hover:text-theme transition-colors">
          <MoreVertical size={14} />
        </button>
      </div>
      <h4 className="text-sm font-bold mb-2">{task.title}</h4>
      <p className="text-[11px] text-muted-theme mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-theme">
        <div className="flex items-center gap-2">
          <Avatar name={task.user} size="sm" />
          <span className="text-[10px] text-theme">{task.user}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-theme opacity-40">
          <Calendar size={10} />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </Card>
  </motion.div>
);

const KanbanColumn = ({ title, status, tasks, selectedId, onSelect }: { title: string, status: string, tasks: any[], selectedId: number | null, onSelect: (id: number) => void }) => {
  const filteredTasks = tasks.filter(t => t.status === status);
  
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-theme">{title}</h3>
          <span className="text-[10px] panel-surface-soft text-muted-theme px-1.5 py-0.5 rounded-md font-bold">
            {filteredTasks.length}
          </span>
        </div>
        <button className="p-1 rounded-md hover:bg-[var(--color-hover)] text-muted-theme hover:text-theme transition-all">
          <Plus size={14} />
        </button>
      </div>
      
      <div className="min-h-[500px] rounded-2xl panel-surface-soft p-2 border border-theme">
        {filteredTasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            isSelected={selectedId === task.id}
            onSelect={() => onSelect(task.id)}
          />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="h-32 flex items-center justify-center border-2 border-dashed border-theme rounded-xl">
            <p className="text-[10px] text-muted-theme opacity-20 uppercase tracking-widest font-bold">No Tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TasksPage() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

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
          <p className="text-sm text-muted-theme">Manage your projects and track progress across the team.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 panel-surface-soft border border-theme rounded-xl text-xs font-bold hover:bg-[var(--color-hover)] transition-all">
            Filter
          </button>
          <button className="px-4 py-2 bg-neon-pink text-theme rounded-xl text-sm font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all flex items-center gap-2">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6">
        <KanbanColumn title="Todo" status="Todo" tasks={tasks} selectedId={selectedId} onSelect={setSelectedId} />
        <KanbanColumn title="In Progress" status="In Progress" tasks={tasks} selectedId={selectedId} onSelect={setSelectedId} />
        <KanbanColumn title="Completed" status="Completed" tasks={tasks} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
    </motion.div>
  );
}
