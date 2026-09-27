import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_PROJECTS } from '../../src/server/db/seed-data';

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
  const projectId = String(id);

  if (req.method === 'GET') {
    const project = (INITIAL_PROJECTS as any[]).find(
      (p) => String(p.id) === projectId || p.slug === projectId
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    return res.status(200).json({ project });
  }

  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const idx = (INITIAL_PROJECTS as any[]).findIndex(
        (p) => String(p.id) === projectId || p.slug === projectId
      );
      if (idx !== -1) {
        INITIAL_PROJECTS[idx] = { ...INITIAL_PROJECTS[idx], ...body };
        return res.status(200).json({ project: INITIAL_PROJECTS[idx], message: 'Project updated successfully.' });
      }
      return res.status(200).json({ project: { id: projectId, ...body }, message: 'Project updated successfully.' });
    } catch (err: any) {
      return res.status(400).json({ error: err?.message || 'Failed to update project.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const idx = (INITIAL_PROJECTS as any[]).findIndex((p) => String(p.id) === projectId);
      if (idx !== -1) {
        INITIAL_PROJECTS.splice(idx, 1);
      }
      return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
    } catch (err: any) {
      return res.status(400).json({ error: err?.message || 'Failed to delete project.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
