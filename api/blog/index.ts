import type { VercelRequest, VercelResponse } from '@vercel/node';
import { articles, saveArticleData } from '../../src/lib/data.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET /api/blog
    if (req.method === 'GET') {
      const { category, search, status } = req.query;
      let result = [...articles];

      if (category && category !== 'All') {
        result = result.filter((a) => a.category === category);
      }
      if (status && status !== 'all') {
        result = result.filter((a) => a.status === status);
      }
      if (search) {
        const q = String(search).toLowerCase();
        result = result.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.content.toLowerCase().includes(q)
        );
      }

      return res.status(200).json({ articles: result });
    }

    // POST /api/blog (Save Article)
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { title, slug, content } = body;

      if (!title || !slug || !content) {
        return res.status(400).json({ error: 'Title, slug, and content are required.' });
      }

      const saved = saveArticleData(body);
      return res.status(200).json({
        article: saved,
        message: 'Article saved successfully.'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Blog index API error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to process blog request.' });
  }
}
