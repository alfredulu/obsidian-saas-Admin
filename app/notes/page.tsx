'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { notes as initialNotes } from '@/lib/mockData';
import { Card } from '@/app/components/UI';
import { Plus, Edit2, Trash2, X, Search, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;

    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '' });
    setIsModalOpen(false);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Personal Notes</h1>
          <p className="text-sm text-white/40">Capture your thoughts and organize your ideas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-neon-cyan text-obsidian rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-neon-cyan/80 transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Create Note</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
        <input 
          type="text" 
          placeholder="Search notes..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-cyan/30 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col group">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-bold group-hover:text-neon-cyan transition-colors">{note.title}</h3>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                      <Edit2 size={12} />
                    </button>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-lg bg-white/5 text-white/30 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed mb-6 flex-1 line-clamp-4">
                  {note.content}
                </p>
                <div className="flex items-center gap-1.5 text-[9px] text-white/20 font-bold uppercase tracking-widest pt-4 border-t border-white/5">
                  <Clock size={10} />
                  <span>{note.createdAt}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create Note Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card p-8 bg-obsidian border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-tight">Create New Note</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/5 text-white/30 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateNote} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">Note Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-cyan/30 transition-all"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-1">Content</label>
                  <textarea 
                    placeholder="Write your note here..."
                    rows={6}
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-neon-cyan/30 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-neon-cyan text-obsidian rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-neon-cyan/80 transition-all"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
