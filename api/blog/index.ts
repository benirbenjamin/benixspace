import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_BLOG_ARTICLES } from '../../src/server/db/seed-data';

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

  // GET /api/blog
  if (req.method === 'GET') {
    try {
      const { category, search, status } = req.query;
      let articles = [...INITIAL_BLOG_ARTICLES];

      if (category && category !== 'All') {
        articles = articles.filter((a) => a.category === category);
      }
      if (status && status !== 'all') {
        articles = articles.filter((a) => a.status === status);
      }
      if (search) {
        const q = String(search).toLowerCase();
        articles = articles.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            a.content.toLowerCase().includes(q)
        );
      }

      return res.status(200).json({ articles });
    } catch (err: any) {
      return res.status(200).json({ articles: INITIAL_BLOG_ARTICLES });
    }
  }

  // POST /api/blog (Save Article)
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const {
        title, slug, summary, content, featured_image_url, category, tags, author_name, status
      } = body;

      if (!title || !slug || !content) {
        return res.status(400).json({ error: 'Title, slug, and content are required.' });
      }

      const newArticle = {
        id: Date.now(),
        title: String(title).trim(),
        slug: String(slug).trim(),
        summary: summary || '',
        content: String(content),
        featured_image_url: featured_image_url || 'https://i.postimg.cc/Hnj1LYRT/online-banks.png',
        category: category || 'Technology',
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        author_name: author_name || 'Benir Benjamin',
        status: status || 'published',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      (INITIAL_BLOG_ARTICLES as any[]).unshift(newArticle);

      return res.status(200).json({
        article: newArticle,
        message: 'Article saved successfully.'
      });
    } catch (err: any) {
      return res.status(400).json({ error: err?.message || 'Failed to save article.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
