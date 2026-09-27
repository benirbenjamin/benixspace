import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_PROJECTS } from '../../src/server/db/seed-data';

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

  // GET /api/projects
  if (req.method === 'GET') {
    try {
      const { category, featured, status } = req.query;
      let projects = [...INITIAL_PROJECTS];

      if (featured === 'true') {
        projects = projects.filter((p) => p.featured);
      }
      if (category && category !== 'All') {
        projects = projects.filter((p) => p.category === category);
      }
      if (status && status !== 'all') {
        projects = projects.filter((p) => p.status === status);
      }

      return res.status(200).json({ projects });
    } catch (err: any) {
      return res.status(200).json({ projects: INITIAL_PROJECTS });
    }
  }

  // POST /api/projects (Save Project)
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const {
        name, slug, url, short_description, full_description, image_url,
        category, tags, technologies, status, featured, embed_mode, sort_order
      } = body;

      if (!name || !slug || !url || !short_description) {
        return res.status(400).json({ error: 'Name, slug, URL, and short description are required.' });
      }

      const newProject = {
        id: Date.now(),
        name: String(name).trim(),
        slug: String(slug).trim(),
        url: String(url).trim(),
        short_description: String(short_description),
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

      (INITIAL_PROJECTS as any[]).unshift(newProject);

      return res.status(200).json({
        project: newProject,
        message: 'Project saved successfully.'
      });
    } catch (err: any) {
      return res.status(400).json({ error: err?.message || 'Failed to save project.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
