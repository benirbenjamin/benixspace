import type { VercelRequest, VercelResponse } from '@vercel/node';
import { articles, saveArticleData, deleteArticleData } from '../../src/lib/data.js';

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

  try {
    const { id } = req.query;
    const articleId = String(id);

    if (req.method === 'GET') {
      const article = articles.find(
        (a) => String(a.id) === articleId || a.slug === articleId
      );
      if (!article) {
        return res.status(404).json({ error: 'Article not found.' });
      }
      return res.status(200).json({ article });
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const saved = saveArticleData({ id: articleId, ...body });
      return res.status(200).json({ article: saved, message: 'Article updated successfully.' });
    }

    if (req.method === 'DELETE') {
      deleteArticleData(articleId);
      return res.status(200).json({ success: true, message: 'Article deleted successfully.' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Blog [id] API error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to process article request.' });
  }
}
