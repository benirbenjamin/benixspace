import type { VercelRequest, VercelResponse } from '@vercel/node';
import { companyData, updateCompanyData } from '../../src/lib/data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json({ company: companyData });
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const updated = updateCompanyData(body);
      return res.status(200).json({ success: true, message: 'Company settings updated successfully.', company: updated });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Company settings API error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to process company settings request.' });
  }
}
