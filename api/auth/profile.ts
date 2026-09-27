import type { VercelRequest, VercelResponse } from '@vercel/node';

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
      const { name, email } = body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        user: { id: 1, name: String(name).trim(), email: String(email).trim(), role: 'admin' }
      });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to update profile.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
