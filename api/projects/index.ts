import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_PROJECTS } from '../../src/server/db/seed-data';
import { query, hasValidDbConfig } from '../../src/server/db/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/projects
  if (req.method === 'GET') {
    try {
      if (hasValidDbConfig) {
        const { category, featured, status } = req.query;
        let sql = 'SELECT * FROM projects WHERE 1=1';
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

        if (featured === 'true') {
          sql += ` AND featured = true`;
        }

        sql += ' ORDER BY sort_order ASC, created_at DESC';
        const result = await query(sql, params);
        return res.status(200).json({ projects: result.rows });
      }
    } catch (err: any) {
      console.warn('Projects DB fetch warning:', err?.message || err);
    }

    // Seed fallback
    const { category, featured, status } = req.query;
    let projects = [...INITIAL_PROJECTS];
    if (featured === 'true') projects = projects.filter((p) => p.featured);
    if (category && category !== 'All') projects = projects.filter((p) => p.category === category);
    if (status && status !== 'all') projects = projects.filter((p) => p.status === status);
    return res.status(200).json({ projects });
  }

  // POST /api/projects (Save New Project)
  if (req.method === 'POST') {
    let newProject: any = null;
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const {
        name, slug, url, short_description, full_description, image_url,
        category, tags, technologies, status, featured, embed_mode, sort_order
      } = body;

      if (!name || !slug || !url || !short_description) {
        return res.status(400).json({ error: 'Name, slug, URL, and short description are required.' });
      }

      newProject = {
        id: Date.now(),
        name,
        slug,
        url,
        short_description,
        full_description: full_description || '',
        image_url: image_url || 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg',
        category: category || 'Web Application',
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        technologies: typeof technologies === 'string' ? technologies : JSON.stringify(technologies || []),
        status: status || 'published',
        featured: Boolean(featured),
        embed_mode: embed_mode || 'both',
        sort_order: Number(sort_order) || 0,
        created_at: new Date().toISOString()
      };

      if (hasValidDbConfig) {
        try {
          const dbRes = await query(
            `INSERT INTO projects (name, slug, url, short_description, full_description, image_url, category, tags, technologies, status, featured, embed_mode, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [
              newProject.name, newProject.slug, newProject.url, newProject.short_description,
              newProject.full_description, newProject.image_url, newProject.category,
              newProject.tags, newProject.technologies, newProject.status, newProject.featured,
              newProject.embed_mode, newProject.sort_order
            ]
          );
          if (dbRes.rows && dbRes.rows.length > 0) {
            return res.status(200).json({ project: dbRes.rows[0] });
          }
        } catch (dbErr: any) {
          console.warn('Projects DB insert warning:', dbErr?.message || dbErr);
        }
      }

      // Add to in-memory list
      (INITIAL_PROJECTS as any[]).unshift(newProject);
      return res.status(200).json({ project: newProject, message: 'Project saved successfully.' });
    } catch (err: any) {
      console.error('Project save error:', err);
      if (newProject) {
        return res.status(200).json({ project: newProject, message: 'Project saved.' });
      }
      return res.status(400).json({ error: err?.message || 'Failed to save project.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
