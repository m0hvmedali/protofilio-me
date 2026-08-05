import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { projects } from '@/src/db/schema';
import { adminAuth } from '@/lib/firebase-admin';
import { eq } from 'drizzle-orm';

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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAuth(req);
    const id = parseInt((await params).id, 10);
    const body = await req.json();
    const result = await db.update(projects).set({
      title: body.title,
      description: body.description,
      posterUrl: body.posterUrl,
      techStack: body.techStack,
      liveLink: body.liveLink,
      repoLink: body.repoLink,
    }).where(eq(projects.id, id)).returning();
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAuth(req);
    const id = parseInt((await params).id, 10);
    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}
