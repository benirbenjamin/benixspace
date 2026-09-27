import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_COMPANY_DATA } from '../../src/server/db/seed-data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      Object.assign(INITIAL_COMPANY_DATA, body);
      return res.status(200).json({ success: true, message: 'Company settings updated successfully.' });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to update settings.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
