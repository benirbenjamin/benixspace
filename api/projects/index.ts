import type { VercelRequest, VercelResponse } from '@vercel/node';
import { projects, saveProjectData } from '../_data';

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
    // GET /api/projects
    if (req.method === 'GET') {
      const { category, featured, status } = req.query;
      let result = [...projects];

      if (featured === 'true') {
        result = result.filter((p) => p.featured);
      }
      if (category && category !== 'All') {
        result = result.filter((p) => p.category === category);
      }
      if (status && status !== 'all') {
        result = result.filter((p) => p.status === status);
      }

      return res.status(200).json({ projects: result });
    }

    // POST /api/projects (Save Project)
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { name, slug, url, short_description } = body;

      if (!name || !slug || !url || !short_description) {
        return res.status(400).json({ error: 'Name, slug, URL, and short description are required.' });
      }

      const saved = saveProjectData(body);
      return res.status(200).json({
        project: saved,
        message: 'Project saved successfully.'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Projects index API error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to process projects request.' });
  }
}
