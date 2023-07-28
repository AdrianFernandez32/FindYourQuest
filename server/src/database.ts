import { createPool } from "mysql2/promise";

export async function connect() {
  const pool = await createPool({
    host: "localhost",
    user: "FYQ_user",
    password: "soypro11!",
    database: "FindYourQuest",
    connectionLimit: 1000,
  });

  return pool;
}
