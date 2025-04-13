// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.query(
      "SELECT id, name, email, role FROM users WHERE role = 'student'"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
