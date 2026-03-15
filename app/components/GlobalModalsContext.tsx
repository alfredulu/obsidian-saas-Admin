'use client';

import React, { createContext, useContext, useState } from 'react';
import { Modal } from './UI';
import { useToast } from './ToastContext';
import { Plus, Upload, UserPlus, FileText } from 'lucide-react';

interface GlobalModalsContextType {
  openCreateTask: () => void;
  openCreateNote: () => void;
  openCreateUser: () => void;
  openUploadFile: () => void;
}

const GlobalModalsContext = createContext<GlobalModalsContextType | undefined>(undefined);

export const GlobalModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { showToast } = useToast();

  const close = () => setActiveModal(null);

  const handleAction = (message: string) => {
    showToast(message);
    close();
  };

  return (
    <GlobalModalsContext.Provider value={{
      openCreateTask: () => setActiveModal('task'),
      openCreateNote: () => setActiveModal('note'),
      openCreateUser: () => setActiveModal('user'),
      openUploadFile: () => setActiveModal('upload'),
    }}>
      {children}

      {/* Create Task Modal */}
      <Modal isOpen={activeModal === 'task'} onClose={close} title="Create New Task">
        <form onSubmit={(e) => { e.preventDefault(); handleAction('Task created successfully'); }} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Task Title</label>
            <input type="text" placeholder="What needs to be done?" className="w-full panel-surface-soft border border-theme rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-pink/30 transition-all" autoFocus />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Description</label>
            <textarea placeholder="Add more details..." rows={3} className="w-full panel-surface-soft border border-theme rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-pink/30 transition-all resize-none" />
          </div>
          <button type="submit" className="w-full py-3 bg-neon-pink text-theme rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(255,0,127,0.3)] hover:bg-neon-pink/80 transition-all">
            Create Task
          </button>
        </form>
      </Modal>

      {/* Create Note Modal */}
      <Modal isOpen={activeModal === 'note'} onClose={close} title="Create New Note">
        <form onSubmit={(e) => { e.preventDefault(); handleAction('Note created successfully'); }} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Note Title</label>
            <input type="text" placeholder="Note title..." className="w-full panel-surface-soft border border-theme rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-cyan/30 transition-all" autoFocus />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Content</label>
            <textarea placeholder="Write your thoughts..." rows={5} className="w-full panel-surface-soft border border-theme rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-cyan/30 transition-all resize-none" />
          </div>
          <button type="submit" className="w-full py-3 bg-neon-cyan text-obsidian rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-neon-cyan/80 transition-all">
            Save Note
          </button>
        </form>
      </Modal>

      {/* Create User Modal */}
      <Modal isOpen={activeModal === 'user'} onClose={close} title="Add New User">
        <form onSubmit={(e) => { e.preventDefault(); handleAction('User added successfully'); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full panel-surface-soft border border-theme rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-purple/30 transition-all" autoFocus />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-theme font-bold px-1">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full panel-surface-soft border border-theme rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-purple/30 transition-all" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-neon-purple text-theme rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(191,0,255,0.3)] hover:bg-neon-purple/80 transition-all">
            Add User
          </button>
        </form>
      </Modal>

      {/* Upload File Modal */}
      <Modal isOpen={activeModal === 'upload'} onClose={close} title="Upload Files">
        <div className="space-y-6">
          <div className="h-48 border-2 border-dashed border-theme rounded-2xl flex flex-col items-center justify-center gap-4 panel-surface-soft hover:bg-[var(--color-hover)] transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl panel-surface-soft flex items-center justify-center text-muted-theme group-hover:text-theme transition-all">
              <Upload size={24} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">Click or drag files to upload</p>
              <p className="text-[10px] text-muted-theme opacity-40 uppercase tracking-widest mt-1">Max file size: 50MB</p>
            </div>
          </div>
          <button onClick={() => handleAction('File uploaded successfully')} className="w-full py-3 panel-surface-strong text-theme rounded-xl text-sm font-bold hover:bg-[var(--color-hover)] transition-all">
            Done
          </button>
        </div>
      </Modal>
    </GlobalModalsContext.Provider>
  );
};

export const useGlobalModals = () => {
  const context = useContext(GlobalModalsContext);
  if (context === undefined) {
    throw new Error('useGlobalModals must be used within a GlobalModalsProvider');
  }
  return context;
};
