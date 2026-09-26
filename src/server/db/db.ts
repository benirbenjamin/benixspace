import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { Pool } = pg;

// PostgreSQL Connection Pool
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString || 'postgresql://postgres:postgres@localhost:5432/benixspace',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Generic Query Wrapper supporting PostgreSQL Pool with fallback
export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.DEBUG_DB) {
      console.log('Executed Query:', { text: text.substring(0, 100), duration, rows: res.rowCount });
    }
    return { rows: res.rows as T[], rowCount: res.rowCount || 0 };
  } catch (err: any) {
    // If PostgreSQL isn't running locally during dev, log graceful database message
    console.error('Database Query Exception:', err?.message || err);
    throw err;
  }
}
