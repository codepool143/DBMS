import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { FieldPacket, QueryResult } from "mysql2";

// Define a type for the user
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function authenticateUser(email: string, password: string) {
  const connection = await db();

  // Execute query and get the result
  const [result]: [QueryResult, FieldPacket[]] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);

  // Access the rows from the result
  const rows = result as User[];  // Cast the result to User[]

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
