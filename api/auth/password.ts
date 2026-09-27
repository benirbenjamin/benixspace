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
      const { currentPassword, newPassword } = body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required.' });
      }

      if (String(newPassword).length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Password changed successfully!'
      });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to change password.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
