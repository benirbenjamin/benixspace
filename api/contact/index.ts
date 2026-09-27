import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All contact fields are required.' });
    }

    return res.status(201).json({
      success: true,
      message: 'Message submitted successfully. We will reach out shortly!'
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Contact processing error.' });
  }
}
