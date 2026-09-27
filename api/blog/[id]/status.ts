import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_BLOG_ARTICLES } from '../../../../src/server/db/seed-data';
import { query, hasValidDbConfig } from '../../../../src/server/db/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const articleId = String(id);

  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { status } = body;

      if (hasValidDbConfig) {
        try {
          const dbRes = await query(
            'UPDATE articles SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
            [status, articleId]
          );
          if (dbRes.rows.length > 0) {
            return res.status(200).json({ article: dbRes.rows[0], message: `Article status updated to ${status}.` });
          }
        } catch (dbErr: any) {
          console.warn('Article status DB update warning:', dbErr?.message || dbErr);
        }
      }

      const idx = (INITIAL_BLOG_ARTICLES as any[]).findIndex((a) => String(a.id) === articleId);
      if (idx !== -1) {
        INITIAL_BLOG_ARTICLES[idx].status = status;
        return res.status(200).json({ article: INITIAL_BLOG_ARTICLES[idx], message: `Article status updated to ${status}.` });
      }

      return res.status(200).json({ article: { id: articleId, status }, message: `Article status updated to ${status}.` });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to update article status.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
