import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ chats: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: chats, error } = await supabase
      .from('chats')
      .select('*')
      .order('created_at', { ascending: false })
      .catch((err) => {
        console.warn('[chats GET] Table might not exist:', err.message);
        return { data: [], error: null };
      });

    if (error) {
      console.warn('[chats GET] Error fetching chats:', error.message);
      return NextResponse.json({ chats: [] });
    }

    return NextResponse.json({ chats: chats || [] });
  } catch (error) {
    console.error('[API] Get chats error:', error);
    return NextResponse.json({ chats: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('[chats POST] Missing Supabase credentials, creating mock chat');
      // Return a mock chat ID for demo purposes
      return NextResponse.json({ 
        chat: { 
          id: `mock-${Date.now()}`,
          title: title || 'New Chat',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } 
      }, { status: 201 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('chats')
      .insert([{ title: title || 'New Chat' }])
      .select()
      .single()
      .catch((err) => {
        console.warn('[chats POST] Table might not exist, creating mock chat:', err.message);
        return { 
          data: { 
            id: `mock-${Date.now()}`,
            title: title || 'New Chat',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, 
          error: null 
        };
      });

    if (error) {
      console.warn('[chats POST] Supabase error, using mock:', error.message);
      return NextResponse.json({ 
        chat: { 
          id: `mock-${Date.now()}`,
          title: title || 'New Chat',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } 
      }, { status: 201 });
    }

    return NextResponse.json({ chat: data }, { status: 201 });
  } catch (error) {
    console.error('[API] Create chat error:', error);
    // Fallback to mock data
    return NextResponse.json({ 
      chat: { 
        id: `mock-${Date.now()}`,
        title: 'New Chat',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } 
    }, { status: 201 });
  }
}
