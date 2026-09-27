import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_BLOG_ARTICLES } from '../../src/server/db/seed-data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const articleId = String(id);

  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const idx = (INITIAL_BLOG_ARTICLES as any[]).findIndex(
        (a) => String(a.id) === articleId || a.slug === articleId
      );
      if (idx !== -1) {
        INITIAL_BLOG_ARTICLES[idx] = { ...INITIAL_BLOG_ARTICLES[idx], ...body };
        return res.status(200).json({ article: INITIAL_BLOG_ARTICLES[idx] });
      }
      return res.status(200).json({ article: { id: articleId, ...body } });
    } catch (err: any) {
      return res.status(400).json({ error: err?.message || 'Failed to update article.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const idx = (INITIAL_BLOG_ARTICLES as any[]).findIndex((a) => String(a.id) === articleId);
      if (idx !== -1) {
        INITIAL_BLOG_ARTICLES.splice(idx, 1);
      }
      return res.status(200).json({ success: true, message: 'Article deleted successfully.' });
    } catch (err: any) {
      return res.status(400).json({ error: err?.message || 'Failed to delete article.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
