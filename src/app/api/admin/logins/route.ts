import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.query(`
      SELECT login_logs.id, login_logs.user_id, users.name, users.email, login_logs.login_time
      FROM login_logs
      JOIN users ON login_logs.user_id = users.id
      ORDER BY login_logs.login_time DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching login logs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
