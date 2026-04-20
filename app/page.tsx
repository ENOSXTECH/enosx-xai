'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleStart() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat' }),
      });

      const data = await res.json();
      if (data.chat?.id) {
        router.push(`/chat/${data.chat.id}`);
      }
    } catch (error) {
      console.error('Failed:', error);
      alert('Error creating chat');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-red-950 to-black" />

      {/* Navigation */}
      <nav className="border-b border-red-900/50 bg-black/80 px-8 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-sm">
              EX
            </div>
            <span className="text-lg font-bold">ENOSX AI</span>
          </div>
          <button
            onClick={handleStart}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold text-sm disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Get Started'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-8 py-32 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Meet <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">ENOSX AI</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Advanced Windows AI Assistant powered by Groq. Control apps, execute commands, and get instant help.
        </p>
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg disabled:opacity-50"
        >
          {isLoading ? 'Starting...' : 'Start Chatting'}
        </button>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-8">
        <div className="border border-red-900/30 bg-red-900/10 rounded-lg p-6">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
          <p className="text-gray-400">Groq-powered streaming responses</p>
        </div>
        <div className="border border-red-900/30 bg-red-900/10 rounded-lg p-6">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-xl font-bold mb-2">Advanced Chat</h3>
          <p className="text-gray-400">Context-aware conversations</p>
        </div>
        <div className="border border-red-900/30 bg-red-900/10 rounded-lg p-6">
          <div className="text-3xl mb-3">🎮</div>
          <h3 className="text-xl font-bold mb-2">App Control</h3>
          <p className="text-gray-400">Launch & manage Windows apps</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-red-900/50 py-8 text-center text-gray-500 mt-20">
        <p>ENOSX AI © 2024 Enosx Technologies</p>
      </footer>
    </main>
  );
}
