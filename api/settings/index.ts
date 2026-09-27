import type { VercelRequest, VercelResponse } from '@vercel/node';
import { companyData, socialLinks } from '../../src/lib/data.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.status(200).json({
      company: companyData,
      social: socialLinks,
    });
  } catch (err: any) {
    console.error('Settings API error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to fetch settings.' });
  }
}
