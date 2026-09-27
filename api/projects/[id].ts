import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_PROJECTS } from '../../src/server/db/seed-data';
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
  const projectId = String(id);

  // PUT /api/projects/:id (Edit Project)
  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const {
        name, slug, url, short_description, full_description, image_url,
        category, tags, technologies, status, featured, embed_mode, sort_order
      } = body;

      if (hasValidDbConfig) {
        try {
          const dbRes = await query(
            `UPDATE projects SET name = $1, slug = $2, url = $3, short_description = $4, full_description = $5,
             image_url = $6, category = $7, tags = $8, technologies = $9, status = $10, featured = $11,
             embed_mode = $12, sort_order = $13, updated_at = CURRENT_TIMESTAMP WHERE id = $14 RETURNING *`,
            [
              name, slug, url, short_description, full_description, image_url, category,
              typeof tags === 'string' ? tags : JSON.stringify(tags || []),
              typeof technologies === 'string' ? technologies : JSON.stringify(technologies || []),
              status, featured, embed_mode, sort_order, projectId
            ]
          );
          if (dbRes.rows.length > 0) {
            return res.status(200).json({ project: dbRes.rows[0] });
          }
        } catch (dbErr: any) {
          console.warn('Project DB update warning:', dbErr?.message || dbErr);
        }
      }

      // Update in-memory seed list
      const idx = (INITIAL_PROJECTS as any[]).findIndex((p) => String(p.id) === projectId || p.slug === projectId);
      if (idx !== -1) {
        INITIAL_PROJECTS[idx] = { ...INITIAL_PROJECTS[idx], ...body };
        return res.status(200).json({ project: INITIAL_PROJECTS[idx] });
      }

      return res.status(200).json({ project: { id: projectId, ...body } });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to update project.' });
    }
  }

  // DELETE /api/projects/:id
  if (req.method === 'DELETE') {
    try {
      if (hasValidDbConfig) {
        try {
          await query('DELETE FROM projects WHERE id = $1', [projectId]);
        } catch (dbErr: any) {
          console.warn('Project DB delete warning:', dbErr?.message || dbErr);
        }
      }

      const idx = (INITIAL_PROJECTS as any[]).findIndex((p) => String(p.id) === projectId);
      if (idx !== -1) {
        INITIAL_PROJECTS.splice(idx, 1);
      }

      return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || 'Failed to delete project.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
