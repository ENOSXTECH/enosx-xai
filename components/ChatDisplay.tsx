'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ChatDisplayProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatDisplay({ messages, isLoading = false }: ChatDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto p-6 space-y-4"
      ref={scrollRef}
    >
      {messages.length === 0 ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center h-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center mb-4">
            <Bot size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to ENOSX AI</h2>
          <p className="text-neutral-400 max-w-md">
            Your advanced Windows assistant powered by AI. Start a conversation to control your applications and get intelligent assistance.
          </p>
        </motion.div>
      ) : (
        messages.map((message, idx) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-red-400" />
              </div>
            )}

            <div
              className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-red-600 text-white rounded-br-none'
                  : 'bg-neutral-800 text-neutral-100 rounded-bl-none border border-red-500/20'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
            )}
          </motion.div>
        ))
      )}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
            <Bot size={18} className="text-red-400" />
          </div>
          <div className="bg-neutral-800 px-4 py-3 rounded-lg border border-red-500/20 flex gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              className="w-2 h-2 rounded-full bg-red-400"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
              className="w-2 h-2 rounded-full bg-red-400"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-red-400"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
