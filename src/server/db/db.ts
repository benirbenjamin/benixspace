import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Support standard DATABASE_URL or Vercel POSTGRES_URL / POSTGRES_URL_NON_POOLING
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

export const pool = new Pool({
  connectionString: connectionString || 'postgresql://postgres:postgres@localhost:5432/benixspace',
  ssl: isProduction || (connectionString && !connectionString.includes('localhost'))
    ? { rejectUnauthorized: false }
    : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Generic Query Wrapper supporting PostgreSQL Pool
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
    console.error('Database Query Error:', err?.message || err);
    throw err;
  }
}
