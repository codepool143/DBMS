import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function PUT(req: NextRequest, context: { params: Record<string, string> }): Promise<NextResponse> {
  try {
    const { id } = context.params;
    const { title, message } = await req.json();

    const connection = await db();
    await connection.query(
      'UPDATE announcements SET title = ?, message = ? WHERE id = ?',
      [title, message, id]
    );

    return NextResponse.json({ message: 'Announcement updated successfully' });
  } catch (err) {
    console.error('PUT Error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


export async function DELETE(req: NextRequest, context: { params: Record<string, string> }): Promise<NextResponse> {
  try {
    const { id } = context.params;

    const connection = await db();
    await connection.query('DELETE FROM announcements WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error('DELETE Error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
