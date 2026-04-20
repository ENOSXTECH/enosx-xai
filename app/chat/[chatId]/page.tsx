'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatDisplay } from '@/components/ChatDisplay';
import { MessageInput } from '@/components/MessageInput';

interface Message {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export default function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const router = useRouter();
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    params.then(({ chatId }) => {
      setChatId(chatId);
      fetchMessages(chatId);
      setPageLoading(false);
    });
  }, [params]);

  async function fetchMessages(id: string) {
    try {
      const res = await fetch(`/api/chats/${id}/messages`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('[ChatPage] Failed to fetch messages:', error);
    }
  }

  async function handleSendMessage(content: string) {
    if (!chatId) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      chat_id: chatId,
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);

    try {
      // Save user message
      await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'user', content }),
      });

      // Get AI response
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content }
          ],
          chatId,
        }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      let assistantMessage = '';
      const decoder = new TextDecoder();

      // Read streaming response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const data = JSON.parse(line.slice(5));
              if (data.type === 'text-delta' && data.delta) {
                assistantMessage += data.delta;
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }

      // Save assistant message
      if (assistantMessage) {
        await fetch(`/api/chats/${chatId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: 'assistant', content: assistantMessage }),
        });

        const aiMessage: Message = {
          id: Date.now().toString() + '_ai',
          chat_id: chatId,
          role: 'assistant',
          content: assistantMessage,
          created_at: new Date().toISOString(),
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('[ChatPage] Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleNewChat() {
    try {
      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat' }),
      });
      const data = await res.json();
      router.push(`/chat/${data.chat.id}`);
    } catch (error) {
      console.error('[ChatPage] Failed to create chat:', error);
    }
  }

  if (pageLoading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-black">
      <ChatSidebar currentChatId={chatId || undefined} onNewChat={handleNewChat} />
      <div className="flex-1 flex flex-col">
        <ChatDisplay messages={messages} isLoading={isLoading} />
        <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
