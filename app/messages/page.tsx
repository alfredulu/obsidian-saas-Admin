'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MoreVertical, Send, Paperclip, Smile, Phone, Video, Info, ChevronLeft } from 'lucide-react';
import { chats } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/app/components/UI';

export default function MessagesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activePane, setActivePane] = useState<'list' | 'chat'>('list');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const smallQuery = window.matchMedia('(max-width: 599px)');
    const handleSmallChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsSmallScreen(event.matches);
    };
    handleSmallChange(smallQuery);
    smallQuery.addEventListener('change', handleSmallChange);
    return () => smallQuery.removeEventListener('change', handleSmallChange);
  }, []);

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
    if (isSmallScreen) {
      setActivePane('chat');
    }
  };

  const handleBack = () => {
    setActivePane('list');
  };

  const showList = !isSmallScreen || activePane === 'list';
  const showChat = !isSmallScreen || activePane === 'chat';

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];
  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-[calc(100vh-104px)] flex flex-col min-[600px]:flex-row gap-6 min-[600px]:gap-4 min-[900px]:gap-6 overflow-hidden"
    >
    {/* Left Panel: Chat List */}
      {showList && (
        <div className="w-full min-[600px]:w-[260px] min-[600px]:min-w-[260px] min-[600px]:flex-shrink flex flex-col glass-card overflow-hidden h-[40%] min-[600px]:h-full">
          <div className="p-4 border-b border-theme">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme opacity-40" size={16} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full panel-surface-soft border border-theme rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 flex gap-3 border-l-2 border-transparent">
                  <Skeleton variant="circle" className="w-10 h-10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="w-20 h-3 rounded" />
                      <Skeleton className="w-8 h-2 rounded" />
                    </div>
                    <Skeleton className="w-full h-2 rounded" />
                  </div>
                </div>
              ))
            ) : (
              filteredChats.map((chat) => (
                <motion.div 
                  key={chat.id}
                  whileHover={{ backgroundColor: "var(--color-hover)" }}
                  onClick={() => handleSelectChat(chat.id)}
                  className={cn(
                    "p-4 flex gap-3 cursor-pointer transition-all border-l-2",
                    selectedChatId === chat.id 
                      ? "panel-surface-soft border-neon-pink" 
                      : "border-transparent hover:bg-[var(--color-hover)]"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl panel-surface-soft p-[1px]">
                      <div className="w-full h-full rounded-[9px] bg-background flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} 
                          alt={chat.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {chat.status === 'online' && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="text-[11px] font-bold truncate">{chat.name}</h4>
                      <span className="text-[9px] text-muted-theme opacity-40">{chat.time}</span>
                    </div>
                    <p className="text-[10px] text-muted-theme truncate">{chat.lastMessage}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Right Panel: Active Chat */}
      {showChat && (
        <div className="flex-1 flex flex-col glass-card overflow-hidden h-[60%] min-[600px]:h-full min-[600px]:min-w-[340px] min-[900px]:min-w-[360px] min-w-0">
          {/* Chat Header */}
          <div className="p-4 border-b border-theme flex items-center justify-between panel-surface-soft shrink-0">
            <div className="flex items-center gap-3">
              {!isLoading && isSmallScreen && activePane === 'chat' && (
                <motion.button 
                  onClick={handleBack}
                  whileHover={{ color: "var(--color-text)" }}
                  className="text-muted-theme hover:text-theme transition-colors p-1.5 rounded-lg"
                >
                  <ChevronLeft size={18} />
                </motion.button>
              )}
              {isLoading ? (
                <>
                  <Skeleton variant="circle" className="w-10 h-10" />
                  <div className="space-y-2">
                    <Skeleton className="w-24 h-3 rounded" />
                    <Skeleton className="w-12 h-2 rounded" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl panel-surface-soft p-[1px]">
                    <div className="w-full h-full rounded-[9px] bg-background flex items-center justify-center overflow-hidden">
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
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-muted-theme">
              <motion.button whileHover={{ color: "var(--color-text)" }} className="transition-colors"><Phone size={18} /></motion.button>
              <motion.button whileHover={{ color: "var(--color-text)" }} className="transition-colors"><Video size={18} /></motion.button>
              <motion.button whileHover={{ color: "var(--color-text)" }} className="transition-colors"><Info size={18} /></motion.button>
              <motion.button whileHover={{ color: "var(--color-text)" }} className="transition-colors"><MoreVertical size={18} /></motion.button>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-background/20 min-w-0">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={cn("flex flex-col max-w-[70%]", i % 2 === 0 ? "ml-auto items-end" : "items-start")}>
                  <Skeleton className={cn("h-10 rounded-2xl", i % 2 === 0 ? "w-48 rounded-tr-none" : "w-64 rounded-tl-none")} />
                  <Skeleton className="w-12 h-2 mt-2 rounded" />
                </div>
              ))
            ) : selectedChat.messages.length > 0 ? (
              selectedChat.messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "flex flex-col max-w-[80%] break-words",
                    msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-lg break-words",
                    msg.sender === 'me' 
                      ? "bg-neon-pink text-theme neon-glow-pink rounded-tr-none" 
                      : "panel-surface-soft text-theme border border-theme rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-muted-theme opacity-40 mt-1 px-1">{msg.time}</span>
                </motion.div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-theme opacity-40">
                <div className="w-16 h-16 rounded-full panel-surface-soft flex items-center justify-center mb-4">
                  <Send size={24} />
                </div>
                <p className="text-sm font-medium">No messages yet</p>
                <p className="text-xs">Start the conversation with {selectedChat.name}</p>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-theme panel-surface-soft shrink-0 h-20 flex items-center">
            <div className="flex items-center gap-3 w-full">
              <div className="flex gap-2 text-muted-theme">
                <motion.button whileHover={{ backgroundColor: "var(--color-hover)" }} className="p-2 rounded-lg transition-all"><Paperclip size={18} /></motion.button>
                <motion.button whileHover={{ backgroundColor: "var(--color-hover)" }} className="p-2 rounded-lg transition-all"><Smile size={18} /></motion.button>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="w-full panel-surface-soft border border-theme rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-neon-pink/30 transition-all"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && setMessageInput('')}
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMessageInput('')}
                className="w-10 h-10 bg-neon-pink text-theme rounded-xl flex items-center justify-center neon-glow-pink shadow-lg"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
