import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.AUTH_SECRET || 'benixspace-super-secret-jwt-key-2026-nebelurw';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const email = body.email ? String(body.email).trim() : '';
    const password = body.password ? String(body.password) : '';

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'benirabok@gmail.com';
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'BenixSpace2026!';

    if (email.toLowerCase() === defaultEmail.toLowerCase() && password === defaultPassword) {
      const token = jwt.sign(
        { id: 1, email: defaultEmail, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        token,
        user: { id: 1, email: defaultEmail, name: 'Benir Benjamin', role: 'admin' }
      });
    }

    return res.status(401).json({ error: 'Invalid email or password.' });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Login error.' });
  }
}
