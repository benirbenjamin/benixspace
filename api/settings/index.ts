import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_COMPANY_DATA, INITIAL_SOCIAL_LINKS } from '../../src/server/db/seed-data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    company: INITIAL_COMPANY_DATA,
    social: INITIAL_SOCIAL_LINKS,
  });
}
