import 'dotenv/config';
import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'db',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

export const db = {
  query: (text: string, params?: any[]): Promise<QueryResult> => pool.query(text, params),
};
