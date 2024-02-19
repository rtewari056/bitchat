import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

const connection: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: 3306 || process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10 || process.env.DB_CONNECTION_LIMIT,
});

export default connection;