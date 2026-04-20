'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Chat {
  id: string;
  title: string;
  created_at: string;
}

interface ChatSidebarProps {
  currentChatId?: string;
  onNewChat: () => void;
}

export function ChatSidebar({ currentChatId, onNewChat }: ChatSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  async function fetchChats() {
    try {
      const res = await fetch('/api/chats');
      const data = await res.json();
      setChats(data.chats || []);
    } catch (error) {
      console.error('[ChatSidebar] Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteChat(id: string, e: React.MouseEvent) {
    e.preventDefault();
    try {
      await fetch(`/api/chats/${id}`, { method: 'DELETE' });
      setChats(chats.filter(c => c.id !== id));
    } catch (error) {
      console.error('[ChatSidebar] Failed to delete chat:', error);
    }
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 h-full bg-gradient-to-b from-neutral-900 to-black border-r border-red-500/20 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-red-500/20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            ENOSX
          </h1>
          <span className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded">AI</span>
        </div>
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors text-white"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <div className="text-neutral-500 text-sm text-center py-8">Loading...</div>
        ) : chats.length === 0 ? (
          <div className="text-neutral-500 text-sm text-center py-8">No chats yet</div>
        ) : (
          chats.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
              className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                currentChatId === chat.id
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <Link href={`/chat/${chat.id}`} className="block pr-8">
                <p className="text-sm truncate">{chat.title}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {new Date(chat.created_at).toLocaleDateString()}
                </p>
              </Link>
              <button
                onClick={(e) => deleteChat(chat.id, e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded transition-all"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-red-500/20 text-xs text-neutral-500">
        <p>ENOSX AI v1.0</p>
        <p>Windows Assistant</p>
      </div>
    </motion.div>
  );
}
