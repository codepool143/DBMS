"use server";
import mysql from "mysql2/promise";

export async function db() {
  const connection = await mysql.createConnection({
    host: "mysql-224ba36a-incognitotemporary-1d7f.h.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_VjQ8qQI-0OdSoeqW7Vc",
    database: "defaultdb",
    port: 17297,
  });

  return connection;
}
