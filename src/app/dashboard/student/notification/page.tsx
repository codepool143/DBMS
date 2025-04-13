import { db } from "@/lib/db";
import NotificationClient from "./notification-client";
import { RowDataPacket } from "mysql2";

interface NotificationRow extends RowDataPacket {
  id: string;
  message: string;
  timestamp: Date;
}

async function getNotifications() {
  const connection = await db();
  const [rows] = await connection.execute<NotificationRow[]>(
    'SELECT * FROM notifications ORDER BY timestamp DESC'
  );
  await connection.end();
  return rows;
}

export default async function NotificationPage() {
  const notifications = await getNotifications();
  return <NotificationClient initialNotifications={notifications} />;
}
