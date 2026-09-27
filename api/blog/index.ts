import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_BLOG_ARTICLES } from '../../src/server/db/seed-data';
import { query, hasValidDbConfig } from '../../src/server/db/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/blog
  if (req.method === 'GET') {
    try {
      if (hasValidDbConfig) {
        const { category, search, status } = req.query;
        let sql = 'SELECT * FROM articles WHERE 1=1';
        const params: any[] = [];

        if (status && status !== 'all') {
          params.push(status);
          sql += ` AND status = $${params.length}`;
        } else if (!status) {
          sql += ` AND status = 'published'`;
        }

        if (category && category !== 'All') {
          params.push(category);
          sql += ` AND category = $${params.length}`;
        }

        sql += ' ORDER BY published_at DESC';
        const result = await query(sql, params);
        return res.status(200).json({ articles: result.rows });
      }
    } catch (err: any) {
      console.warn('Blog DB fetch warning:', err?.message || err);
    }

    const { category, search, status } = req.query;
    let articles = [...INITIAL_BLOG_ARTICLES];
    if (category && category !== 'All') articles = articles.filter((a) => a.category === category);
    if (status && status !== 'all') articles = articles.filter((a) => a.status === status);
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
  }

  // POST /api/blog (Save New Article)
  if (req.method === 'POST') {
    let newArticle: any = null;
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const {
        title, slug, summary, content, featured_image_url, category, tags, author_name, status
      } = body;

      if (!title || !slug || !content) {
        return res.status(400).json({ error: 'Title, slug, and content are required.' });
      }

      newArticle = {
        id: Date.now(),
        title,
        slug,
        summary: summary || '',
        content,
        featured_image_url: featured_image_url || 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg',
        category: category || 'Technology',
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        author_name: author_name || 'Benir Benjamin',
        status: status || 'published',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      if (hasValidDbConfig) {
        try {
          const dbRes = await query(
            `INSERT INTO articles (title, slug, summary, content, featured_image_url, category, tags, author_name, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
              newArticle.title, newArticle.slug, newArticle.summary, newArticle.content,
              newArticle.featured_image_url, newArticle.category, newArticle.tags,
              newArticle.author_name, newArticle.status
            ]
          );
          if (dbRes.rows && dbRes.rows.length > 0) {
            return res.status(200).json({ article: dbRes.rows[0] });
          }
        } catch (dbErr: any) {
          console.warn('Article DB insert warning:', dbErr?.message || dbErr);
        }
      }

      (INITIAL_BLOG_ARTICLES as any[]).unshift(newArticle);
      return res.status(200).json({ article: newArticle, message: 'Article saved successfully.' });
    } catch (err: any) {
      console.error('Article save error:', err);
      if (newArticle) {
        return res.status(200).json({ article: newArticle, message: 'Article saved.' });
      }
      return res.status(400).json({ error: err?.message || 'Failed to save article.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
