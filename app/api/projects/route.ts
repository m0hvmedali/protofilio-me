import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { projects } from '@/src/db/schema';
import { adminAuth } from '@/lib/firebase-admin';

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
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAuth(req);
    const body = await req.json();
    const result = await db.insert(projects).values({
      title: body.title,
      description: body.description,
      posterUrl: body.posterUrl,
      techStack: body.techStack,
      liveLink: body.liveLink,
      repoLink: body.repoLink,
    }).returning();
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}
