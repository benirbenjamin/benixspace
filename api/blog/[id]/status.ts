import type { VercelRequest, VercelResponse } from '@vercel/node';
import { updateArticleStatusData } from '../../../../src/lib/data.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id } = req.query;
    const articleId = String(id);

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { status } = body;

      const updated = updateArticleStatusData(articleId, status);
      return res.status(200).json({ article: updated, message: `Article status updated to ${status}.` });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Blog status API error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to update article status.' });
  }
}
