import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket, OkPacket } from "mysql2";

interface NotificationRow extends RowDataPacket {
  id: string;
  message: string;
  timestamp: Date;
}

export async function GET() {
  try {
    const connection = await db();
    const [rows] = await connection.execute<NotificationRow[]>(
      'SELECT * FROM notifications ORDER BY timestamp DESC'
    );
    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const connection = await db();
    const [] = await connection.execute<OkPacket>(
      'INSERT INTO notifications (message, timestamp) VALUES (?, NOW())',
      [message]
    );
    const [[newNotification]] = await connection.execute<NotificationRow[]>(
      'SELECT * FROM notifications WHERE id = LAST_INSERT_ID()'
    );
    await connection.end();
    return NextResponse.json(newNotification);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const connection = await db();
    await connection.execute<OkPacket>(
      'DELETE FROM notifications WHERE id = ?', 
      [id]
    );
    await connection.end();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}