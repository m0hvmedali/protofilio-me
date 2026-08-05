import { NextResponse } from 'next/server';
import { supabase } from '@/src/db/supabase';
import { adminAuth } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

async function verifyAuth(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }
  const token = authHeader.split('Bearer ')[1];
  const decoded = await adminAuth.verifyIdToken(token);
  if (decoded.email !== 'mohamedalix546@gmail.com') {
    throw new Error('Forbidden: Not an admin');
  }
  return decoded;
}

export async function GET() {
  try {
    const { data: allCourses, error } = await supabase.from('courses').select('*');
    if (error) throw error;
    
    const mapped = allCourses.map(c => ({
      id: c.id,
      title: c.title,
      provider: c.provider,
      date: c.date,
      keyTakeaway: c.key_takeaway,
    }));
    
    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAuth(req);
    const body = await req.json();
    const { data: result, error } = await supabase.from('courses').insert([{
      title: body.title,
      provider: body.provider,
      date: body.date,
      key_takeaway: body.keyTakeaway,
    }]).select();
    if (error) throw error;
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}
