import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { profiles } from '@/src/db/schema';
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
    const allProfiles = await db.select().from(profiles).limit(1);
    if (allProfiles.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json(allProfiles[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await verifyAuth(req);
    const body = await req.json();
    
    // Check if profile exists
    const existing = await db.select().from(profiles).limit(1);
    let result;
    
    if (existing.length === 0) {
      // Insert if doesn't exist
      result = await db.insert(profiles).values({
        name: body.name,
        role: body.role,
        bio: body.bio,
        location: body.location,
        avatarUrl: body.avatarUrl,
        resumeUrl: body.resumeUrl,
        email: body.email,
        linkedinUrl: body.linkedinUrl,
        githubUrl: body.githubUrl,
        whatsapp: body.whatsapp,
      }).returning();
    } else {
      // Update existing
      result = await db.update(profiles).set({
        name: body.name,
        role: body.role,
        bio: body.bio,
        location: body.location,
        avatarUrl: body.avatarUrl,
        resumeUrl: body.resumeUrl,
        email: body.email,
        linkedinUrl: body.linkedinUrl,
        githubUrl: body.githubUrl,
        whatsapp: body.whatsapp,
      }).returning();
    }
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}
