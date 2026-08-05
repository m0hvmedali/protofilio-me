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
    const { data: allProfiles, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) throw error;
    if (!allProfiles || allProfiles.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    const dbProfile = allProfiles[0];
    return NextResponse.json({
      id: dbProfile.id,
      name: dbProfile.name,
      role: dbProfile.role,
      bio: dbProfile.bio,
      location: dbProfile.location,
      avatarUrl: dbProfile.avatar_url,
      resumeUrl: dbProfile.resume_url,
      email: dbProfile.email,
      linkedinUrl: dbProfile.linkedin_url,
      githubUrl: dbProfile.github_url,
      whatsapp: dbProfile.whatsapp,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await verifyAuth(req);
    const body = await req.json();
    
    // Check if profile exists
    const { data: existing, error: existError } = await supabase.from('profiles').select('*').limit(1);
    if (existError) throw existError;
    
    let result;
    
    if (!existing || existing.length === 0) {
      // Insert if doesn't exist
      const { data, error } = await supabase.from('profiles').insert([{
        name: body.name,
        role: body.role,
        bio: body.bio,
        location: body.location,
        avatar_url: body.avatarUrl,
        resume_url: body.resumeUrl,
        email: body.email,
        linkedin_url: body.linkedinUrl,
        github_url: body.githubUrl,
        whatsapp: body.whatsapp,
      }]).select();
      if (error) throw error;
      result = data;
    } else {
      // Update existing
      const { data, error } = await supabase.from('profiles').update({
        name: body.name,
        role: body.role,
        bio: body.bio,
        location: body.location,
        avatar_url: body.avatarUrl,
        resume_url: body.resumeUrl,
        email: body.email,
        linkedin_url: body.linkedinUrl,
        github_url: body.githubUrl,
        whatsapp: body.whatsapp,
      }).eq('id', existing[0].id).select();
      if (error) throw error;
      result = data;
    }
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}
