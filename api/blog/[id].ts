import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_BLOG_ARTICLES } from '../../src/server/db/seed-data';
import { query, hasValidDbConfig } from '../../src/server/db/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const articleId = String(id);

  // PUT /api/blog/:id (Edit Article)
  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const {
        title, slug, summary, content, featured_image_url, category, tags, author_name, status
      } = body;

      if (hasValidDbConfig) {
        try {
          const dbRes = await query(
            `UPDATE articles SET title = $1, slug = $2, summary = $3, content = $4,
             featured_image_url = $5, category = $6, tags = $7, author_name = $8, status = $9,
             updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *`,
            [
              title, slug, summary, content, featured_image_url, category,
              typeof tags === 'string' ? tags : JSON.stringify(tags || []),
              author_name, status || 'published', articleId
            ]
          );
          if (dbRes.rows.length > 0) {
            return res.status(200).json({ article: dbRes.rows[0] });
          }
        } catch (dbErr: any) {
          console.warn('Article DB update warning:', dbErr?.message || dbErr);
        }
      }

      const idx = (INITIAL_BLOG_ARTICLES as any[]).findIndex((a) => String(a.id) === articleId || a.slug === articleId);
      if (idx !== -1) {
        INITIAL_BLOG_ARTICLES[idx] = { ...INITIAL_BLOG_ARTICLES[idx], ...body };
        return res.status(200).json({ article: INITIAL_BLOG_ARTICLES[idx] });
      }

      return res.status(200).json({ article: { id: articleId, ...body } });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to update article.' });
    }
  }

  // DELETE /api/blog/:id
  if (req.method === 'DELETE') {
    try {
      if (hasValidDbConfig) {
        try {
          await query('DELETE FROM articles WHERE id = $1', [articleId]);
        } catch (dbErr: any) {
          console.warn('Article DB delete warning:', dbErr?.message || dbErr);
        }
      }

      const idx = (INITIAL_BLOG_ARTICLES as any[]).findIndex((a) => String(a.id) === articleId);
      if (idx !== -1) {
        INITIAL_BLOG_ARTICLES.splice(idx, 1);
      }

      return res.status(200).json({ success: true, message: 'Article deleted successfully.' });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to delete article.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
