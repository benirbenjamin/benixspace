import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    overview: {
      total_views: 1420,
      unique_visitors: 890,
      external_clicks: 340,
    },
    top_projects: [
      { name: 'Benix Space TV', slug: 'benix-space-tv', clicks: 120 },
      { name: 'Benix Games', slug: 'benix-games', clicks: 95 },
      { name: 'Benix Easy Calc', slug: 'benix-easy-calc', clicks: 65 }
    ],
    sources: [
      { source: 'Direct', count: 520 },
      { source: 'Google Search', count: 310 },
      { source: 'Social Media', count: 180 }
    ],
    devices: [
      { device_type: 'desktop', count: 620 },
      { device_type: 'mobile', count: 380 }
    ]
  });
}
