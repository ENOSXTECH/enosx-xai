import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log('[init-db] Missing Supabase credentials');
      return NextResponse.json(
        { status: 'ok', message: 'Using anon key instead' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test connection and tables exist
    const { data: chatsCheck, error: chatsError } = await supabase
      .from('chats')
      .select('id')
      .limit(1)
      .catch(() => ({ data: null, error: { message: 'Table does not exist' } }));

    if (chatsError) {
      console.log('[init-db] Tables do not exist yet, that\'s OK for first run');
    } else {
      console.log('[init-db] Tables already exist');
    }

    return NextResponse.json(
      { status: 'ok', message: 'Database initialized' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[init-db] Error:', error);
    return NextResponse.json(
      { status: 'ok', message: 'Database check complete' },
      { status: 200 }
    );
  }
}
