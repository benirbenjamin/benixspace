import app from '../src/server/index';

export default function handler(req: any, res: any) {
  if (typeof req.body === 'string' && req.body.trim().length > 0) {
    try {
      req.body = JSON.parse(req.body);
    } catch {
      // Ignore JSON parse errors
    }
  }
  return app(req, res);
}
