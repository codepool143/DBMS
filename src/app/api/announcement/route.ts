import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const connection = await db();
  const [rows] = await connection.query('SELECT * FROM announcements ORDER BY created_at DESC');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  try {
    const { title, message } = await req.json();
    if (!title || !message) {
      return new NextResponse('Missing title or message', { status: 400 });
    }

    const connection = await db();
    await connection.query(
      'INSERT INTO announcements (title, message, created_by, visible_to) VALUES (?, ?, ?, ?)',
      [title, message, 1, 'all']
    );

    return new NextResponse('Announcement created', { status: 201 });
  } catch (err) {
    console.error('POST Error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
