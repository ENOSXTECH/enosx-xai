'use client';

import { useRef, useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function MessageInput({ onSend, disabled = false, isLoading = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled && !isLoading) {
      onSend(message);
      setMessage('');
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-t border-red-500/20 bg-black p-4"
    >
      <div className="flex gap-3">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask ENOSX anything... (Shift+Enter for new line)"
          disabled={disabled || isLoading}
          className="flex-1 bg-neutral-900 border border-red-500/20 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 resize-none disabled:opacity-50"
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />

        <div className="flex flex-col gap-2">
          <button
            onClick={handleSend}
            disabled={disabled || isLoading || !message.trim()}
            className="w-11 h-11 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 text-white flex items-center justify-center transition-colors font-medium"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-5 h-5 border-2 border-white border-t-red-600 rounded-full"
              />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
