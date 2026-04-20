import { createClient } from '@supabase/supabase-js';
import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages, chatId } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    // Stream response using Groq
    const result = await streamText({
      model: groq('mixtral-8x7b-32768'),
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      system: 'You are ENOSX AI, an advanced Windows assistant. Help users with their questions, control applications when requested, and provide intelligent assistance.',
    });

    // Save to Supabase if available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey && chatId) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const userMessage = messages[messages.length - 1];
      await supabase.from('messages').insert([
        {
          chat_id: chatId,
          role: userMessage.role,
          content: userMessage.content,
        }
      ]).catch(err => console.error('DB save error:', err));
    }

    return new Response(result.toAIStream(), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
  }
}
