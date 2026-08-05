import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { courses } from '@/src/db/schema';
import { adminAuth } from '@/lib/firebase-admin';

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
    const allCourses = await db.select().from(courses);
    return NextResponse.json(allCourses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAuth(req);
    const body = await req.json();
    const result = await db.insert(courses).values({
      title: body.title,
      provider: body.provider,
      date: body.date,
      keyTakeaway: body.keyTakeaway,
    }).returning();
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.message.includes('Forbidden') ? 403 : 401 });
  }
}
