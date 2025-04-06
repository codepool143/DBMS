"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function authenticateUser(email: string, password: string) {
  const connection = await db();
  const [rows]: any = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);

  await connection.end();

  const user = rows[0];
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
