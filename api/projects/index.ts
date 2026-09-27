import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_PROJECTS } from '../../src/server/db/seed-data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, featured } = req.query;

  let projects = [...INITIAL_PROJECTS];

  if (featured === 'true') {
    projects = projects.filter((p) => p.featured);
  }

  if (category && category !== 'All') {
    projects = projects.filter((p) => p.category === category);
  }

  return res.status(200).json({ projects });
}
