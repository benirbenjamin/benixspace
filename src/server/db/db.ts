import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Support standard DATABASE_URL or Vercel POSTGRES_URL / POSTGRES_URL_NON_POOLING
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

const isVercel = !!process.env.VERCEL;
const isProduction = process.env.NODE_ENV === 'production' || isVercel;

// Check if a valid remote or explicit database connection is configured
export const hasValidDbConfig = Boolean(
  connectionString && (!isVercel || !connectionString.includes('localhost:5432'))
);

export const pool = new Pool({
  connectionString: connectionString || 'postgresql://postgres:postgres@localhost:5432/benixspace',
  ssl: isProduction || (connectionString && !connectionString.includes('localhost'))
    ? { rejectUnauthorized: false }
    : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000, // Fail fast to prevent Vercel Serverless Function timeouts
});

// Generic Query Wrapper supporting PostgreSQL Pool with fail-fast check
export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> {
  // If running on Vercel without a configured PostgreSQL DATABASE_URL, return empty result immediately
  if (!hasValidDbConfig && isVercel) {
    return { rows: [], rowCount: 0 };
  }

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
