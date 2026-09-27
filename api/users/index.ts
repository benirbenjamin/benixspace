import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEFAULT_USERS = [
  { id: 1, email: 'benirabok@gmail.com', name: 'Benir Benjamin', role: 'admin', created_at: new Date().toISOString() }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ users: DEFAULT_USERS });
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const { email, name, role } = body;

      const newUser = {
        id: Date.now(),
        email: email || 'editor@benix.space',
        name: name || 'Team Member',
        role: role || 'editor',
        created_at: new Date().toISOString()
      };

      DEFAULT_USERS.push(newUser);
      return res.status(201).json({ user: newUser, message: 'User created successfully.' });
    } catch (err: any) {
      return res.status(400).json({ error: err?.message || 'Failed to create user.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
