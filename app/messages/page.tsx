'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MoreVertical, Send, Paperclip, Smile, Phone, Video, Info } from 'lucide-react';
import { chats } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];
  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-[calc(100vh-140px)] flex gap-6"
    >
      {/* Left Panel: Chat List */}
      <div className="w-80 flex flex-col glass-card overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={cn(
                "p-4 flex gap-3 cursor-pointer transition-all border-l-2",
                selectedChatId === chat.id 
                  ? "bg-white/5 border-neon-pink" 
                  : "border-transparent hover:bg-white/[0.02]"
              )}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
                  <div className="w-full h-full rounded-[9px] bg-obsidian flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} 
                      alt={chat.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {chat.status === 'online' && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-obsidian rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="text-[11px] font-bold truncate">{chat.name}</h4>
                  <span className="text-[9px] text-white/20">{chat.time}</span>
                </div>
                <p className="text-[10px] text-white/40 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Active Chat */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
              <div className="w-full h-full rounded-[9px] bg-obsidian flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedChat.name}`} 
                  alt={selectedChat.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">{selectedChat.name}</h3>
              <p className="text-[10px] text-emerald-400 font-medium">
                {selectedChat.status === 'online' ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white/30">
            <button className="hover:text-white transition-colors"><Phone size={18} /></button>
            <button className="hover:text-white transition-colors"><Video size={18} /></button>
            <button className="hover:text-white transition-colors"><Info size={18} /></button>
            <button className="hover:text-white transition-colors"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-obsidian/20">
          {selectedChat.messages.length > 0 ? (
            selectedChat.messages.map((msg) => (
              <div 
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[70%]",
                  msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-xs leading-relaxed",
                  msg.sender === 'me' 
                    ? "bg-neon-pink text-white neon-glow-pink rounded-tr-none" 
                    : "bg-white/5 text-white/80 border border-white/5 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-white/20 mt-1 px-1">{msg.time}</span>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Send size={24} />
              </div>
              <p className="text-sm font-medium">No messages yet</p>
              <p className="text-xs">Start the conversation with {selectedChat.name}</p>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 text-white/30">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-all"><Paperclip size={18} /></button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-all"><Smile size={18} /></button>
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setMessageInput('')}
              />
            </div>
            <button 
              onClick={() => setMessageInput('')}
              className="w-10 h-10 bg-neon-pink text-white rounded-xl flex items-center justify-center neon-glow-pink hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
