'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, Badge, Avatar, EmptyState, Modal } from '@/app/components/UI';
import { Calendar, MoreVertical, Plus, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/app/components/AuthContext';
import { useToast } from '@/app/components/ToastContext';

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

const TaskCard = ({ task, isSelected, onSelect, onUpdateStatus, onDelete }: { task: any, isSelected: boolean, onSelect: () => void, onUpdateStatus: (status: string) => void, onDelete: () => void }) => (
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
        <PriorityBadge priority={task.priority || 'Medium'} />
        <div className="flex gap-1">
          <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.status === 'todo' ? 'in-progress' : 'done'); }} className="text-muted-theme hover:text-theme transition-colors">
            <Plus size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-muted-theme hover:text-theme transition-colors">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
      <h4 className="text-sm font-bold mb-2">{task.title}</h4>
      <p className="text-[11px] text-muted-theme mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-theme">
        <div className="flex items-center gap-2">
          <Avatar name={task.user || 'User'} size="sm" />
          <span className="text-[10px] text-theme">{task.user || 'User'}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-theme opacity-40">
          <Calendar size={10} />
          <span>{new Date(task.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  </motion.div>
);

const KanbanColumn = ({ title, status, tasks, selectedId, onSelect, onUpdateStatus, onDelete }: { title: string, status: string, tasks: any[], selectedId: string | null, onSelect: (id: string) => void, onUpdateStatus: (id: string, status: string) => void, onDelete: (id: string) => void }) => {
  const filteredTasks = tasks.filter(t => t.status === status.toLowerCase());
  
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-theme">{title}</h3>
          <span className="text-[10px] panel-surface-soft text-muted-theme px-1.5 py-0.5 rounded-md font-bold">
            {filteredTasks.length}
          </span>
        </div>
      </div>
      
      <div className="min-h-[500px] rounded-2xl panel-surface-soft p-2 border border-theme">
        {filteredTasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            isSelected={selectedId === task.id}
            onSelect={() => onSelect(task.id)}
            onUpdateStatus={(newStatus) => onUpdateStatus(task.id, newStatus)}
            onDelete={() => onDelete(task.id)}
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
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user?.id);
    
    if (error) {
      console.error('Error fetching tasks:', error);
      showToast('Failed to fetch tasks', 'error');
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const addTask = async () => {
    if (!newTaskTitle) return;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTaskTitle, status: 'todo', user_id: user?.id }])
      .select();
    
    if (error) {
      console.error('Error adding task:', error);
      showToast('Failed to add task', 'error');
    } else {
      setTasks([...tasks, ...(data || [])]);
      showToast('Task added successfully');
      setIsCreateModalOpen(false);
      setNewTaskTitle('');
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating task:', error);
      showToast('Failed to update task', 'error');
    } else {
      setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
      showToast('Task updated');
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting task:', error);
      showToast('Failed to delete task', 'error');
    } else {
      setTasks(tasks.filter(t => t.id !== id));
      showToast('Task deleted');
    }
  };

  const hasTasks = tasks.length > 0;

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
          <button onClick={() => showToast('Coming soon', 'info')} className="px-4 py-2 panel-surface-soft border border-theme rounded-xl text-xs font-bold hover:bg-[var(--color-hover)] transition-all">
            Filter
          </button>
          <button onClick={() => setIsCreateModalOpen(true)} className="px-4 py-2 bg-neon-pink text-theme rounded-xl text-sm font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all flex items-center gap-2">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10">Loading tasks...</div>
      ) : hasTasks ? (
        <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-6">
          <KanbanColumn title="Todo" status="todo" tasks={tasks} selectedId={selectedId} onSelect={setSelectedId} onUpdateStatus={updateTaskStatus} onDelete={deleteTask} />
          <KanbanColumn title="In Progress" status="in-progress" tasks={tasks} selectedId={selectedId} onSelect={setSelectedId} onUpdateStatus={updateTaskStatus} onDelete={deleteTask} />
          <KanbanColumn title="Completed" status="done" tasks={tasks} selectedId={selectedId} onSelect={setSelectedId} onUpdateStatus={updateTaskStatus} onDelete={deleteTask} />
        </div>
      ) : (
        <div className="min-h-[420px] flex items-center justify-center">
          <EmptyState
            icon={<ClipboardList size={30} />}
            title="No tasks yet"
            description="Create a task to start filling the board and keep your projects moving."
            actionLabel="Create First Task"
            onAction={() => setIsCreateModalOpen(true)}
            className="w-full"
          />
        </div>
      )}

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Task">
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full panel-surface-soft border border-theme rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
          />
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 panel-surface-soft border border-theme rounded-xl text-xs font-bold hover:bg-[var(--color-hover)] transition-all">
              Cancel
            </button>
            <button onClick={addTask} className="px-4 py-2 bg-neon-pink text-theme rounded-xl text-xs font-bold neon-glow-pink hover:bg-neon-pink/80 transition-all">
              Create Task
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
