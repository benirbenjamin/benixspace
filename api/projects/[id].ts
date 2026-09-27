import type { VercelRequest, VercelResponse } from '@vercel/node';
import { projects, saveProjectData, deleteProjectData } from '../../src/lib/data.js';

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
    const projectId = String(id);

    if (req.method === 'GET') {
      const project = projects.find(
        (p) => String(p.id) === projectId || p.slug === projectId
      );
      if (!project) {
        return res.status(404).json({ error: 'Project not found.' });
      }
      return res.status(200).json({ project });
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const saved = saveProjectData({ id: projectId, ...body });
      return res.status(200).json({ project: saved, message: 'Project updated successfully.' });
    }

    if (req.method === 'DELETE') {
      deleteProjectData(projectId);
      return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('Projects [id] API error:', err);
    return res.status(500).json({ error: err?.message || 'Failed to process project request.' });
  }
}
