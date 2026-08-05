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
  // Optional: Restrict to a specific email
  if (decoded.email !== 'mohamedalix546@gmail.com') {
    throw new Error('Forbidden: Not an admin');
  }
  return decoded;
}

export async function GET() {
  try {
    const { data: allProjects, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    
    const mapped = allProjects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      posterUrl: p.poster_url,
      techStack: p.tech_stack,
      liveLink: p.live_link,
      repoLink: p.repo_link,
    }));
    
    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAuth(req);
    const body = await req.json();
    const { data: result, error } = await supabase.from('projects').insert([{
      title: body.title,
      description: body.description,
      poster_url: body.posterUrl,
      tech_stack: body.techStack,
      live_link: body.liveLink,
      repo_link: body.repoLink,
    }]).select();
    
    if (error) throw error;
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}
