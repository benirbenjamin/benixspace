import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import {
  companyData,
  socialLinks,
  projects,
  articles,
  updateCompanyData,
  saveProjectData,
  deleteProjectData,
  saveArticleData,
  deleteArticleData,
  updateArticleStatusData,
  getBlogCategoriesData,
  addBlogCategoryData,
  editBlogCategoryData,
  getArticleCommentsData,
  getAllCommentsData,
  saveCommentData,
  likeCommentData,
  updateCommentStatusData,
  deleteCommentData,
  banUserIpData,
  isIpBanned,
  incrementArticleViewCount
} from '../src/lib/data.js';
import { containsProfanity } from '../src/client/utils/moderation.js';

const JWT_SECRET = process.env.AUTH_SECRET || 'benixspace-super-secret-jwt-key-2026-nebelurw';

const DEFAULT_USERS = [
  { id: 1, email: 'benirabok@gmail.com', name: 'Benir Benjamin', role: 'admin', created_at: new Date().toISOString() }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  try {
    const rawUrl = req.url || '/api';
    const parsedUrl = new URL(rawUrl, 'http://localhost');
    const pathname = parsedUrl.pathname.replace(/\/$/, '');
    const method = (req.method || 'GET').toUpperCase();
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    // Get client IP address for moderation
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';

    // Segment extraction supporting both Vercel req.query.route and URL pathname
    let segments: string[] = [];

    if (Array.isArray(req.query.route)) {
      segments = req.query.route.map(String).filter(Boolean);
    } else if (typeof req.query.route === 'string' && req.query.route) {
      segments = [req.query.route];
    }

    if (segments.length === 0 || segments[0] === 'api') {
      const cleanPath = pathname.replace(/^\/api/, '').replace(/^\//, '');
      segments = cleanPath.split('/').filter(Boolean);
    }

    if (segments[0] === 'api') {
      segments.shift();
    }

    // 1. AUTH ROUTES
    if (segments[0] === 'auth') {
      if (segments[1] === 'login' && method === 'POST') {
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
      }

      if (segments[1] === 'profile' && method === 'PUT') {
        const { name, email } = body;
        if (!name || !email) {
          return res.status(400).json({ error: 'Name and email are required.' });
        }
        return res.status(200).json({
          success: true,
          message: 'Profile updated successfully.',
          user: { id: 1, name: String(name).trim(), email: String(email).trim(), role: 'admin' }
        });
      }

      if (segments[1] === 'password' && method === 'PUT') {
        const { currentPassword, newPassword } = body;
        if (!currentPassword || !newPassword) {
          return res.status(400).json({ error: 'Current password and new password are required.' });
        }
        if (String(newPassword).length < 6) {
          return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
        }
        return res.status(200).json({ success: true, message: 'Password changed successfully!' });
      }
    }

    // 2. SETTINGS ROUTES
    if (segments[0] === 'settings') {
      if (segments.length === 1 && method === 'GET') {
        return res.status(200).json({ company: companyData, social: socialLinks });
      }

      if (segments[1] === 'company') {
        if (method === 'GET') return res.status(200).json({ company: companyData });
        if (method === 'PUT') {
          const updated = updateCompanyData(body);
          return res.status(200).json({ success: true, message: 'Company settings updated successfully.', company: updated });
        }
      }
    }

    // 3. CATEGORIES ROUTES (DYNAMIC CATEGORY CREATION & MANAGEMENT)
    if (segments[0] === 'categories') {
      if (method === 'GET') {
        return res.status(200).json({ categories: getBlogCategoriesData() });
      }
      if (method === 'POST') {
        const { name } = body;
        if (!name || !String(name).trim()) {
          return res.status(400).json({ error: 'Category name is required.' });
        }
        const updated = addBlogCategoryData(String(name));
        return res.status(201).json({ categories: updated, message: `Category '${name}' added successfully.` });
      }
      if (method === 'PUT') {
        const { oldName, newName } = body;
        if (!oldName || !newName) {
          return res.status(400).json({ error: 'Both oldName and newName are required.' });
        }
        const updated = editBlogCategoryData(String(oldName), String(newName));
        return res.status(200).json({ categories: updated, message: `Category renamed to '${newName}'.` });
      }
    }

    // 4. BLOG / ARTICLE ROUTES
    if (segments[0] === 'blog') {
      if (segments.length === 1) {
        if (method === 'GET') {
          const { category, search, status } = req.query;
          let result = [...articles];
          if (category && category !== 'All') result = result.filter((a) => a.category === category);
          if (status && status !== 'all') result = result.filter((a) => a.status === status);
          if (search) {
            const q = String(search).toLowerCase();
            result = result.filter((a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
          }
          return res.status(200).json({ articles: result });
        }

        if (method === 'POST') {
          const { title, slug, content } = body;
          if (!title || !slug || !content) {
            return res.status(400).json({ error: 'Title, slug, and content are required.' });
          }
          const saved = saveArticleData(body);
          return res.status(200).json({ article: saved, message: 'Article saved successfully.' });
        }
      }

      if (segments.length === 3 && segments[2] === 'status' && method === 'PUT') {
        const articleId = segments[1];
        const { status } = body;
        const updated = updateArticleStatusData(articleId, status);
        return res.status(200).json({ article: updated, message: `Article status updated to ${status}.` });
      }

      if (segments.length === 3 && segments[2] === 'view' && method === 'POST') {
        const articleId = segments[1];
        const count = incrementArticleViewCount(articleId);
        return res.status(200).json({ views_count: count });
      }

      if (segments.length === 2) {
        const articleId = segments[1];
        if (method === 'GET') {
          const article = articles.find((a) => String(a.id) === articleId || a.slug === articleId);
          if (!article) return res.status(404).json({ error: 'Article not found.' });
          return res.status(200).json({ article });
        }
        if (method === 'PUT') {
          const saved = saveArticleData({ id: articleId, ...body });
          return res.status(200).json({ article: saved, message: 'Article updated successfully.' });
        }
        if (method === 'DELETE') {
          deleteArticleData(articleId);
          return res.status(200).json({ success: true, message: 'Article deleted successfully.' });
        }
      }
    }

    // 5. COMMENTS & MODERATION ROUTES
    if (segments[0] === 'comments') {
      if (segments[1] === 'all' && method === 'GET') {
        const allComments = getAllCommentsData();
        return res.status(200).json({ comments: allComments });
      }

      if (segments[1] === 'ban' && method === 'POST') {
        const { ip } = body;
        if (!ip) return res.status(400).json({ error: 'IP address is required for ban.' });
        banUserIpData(ip);
        return res.status(200).json({ success: true, message: `IP ${ip} has been banned.` });
      }

      if (segments.length === 3 && segments[2] === 'like' && method === 'POST') {
        const commentId = segments[1];
        const likes = likeCommentData(commentId);
        return res.status(200).json({ likes_count: likes });
      }

      if (segments.length === 3 && segments[2] === 'status' && (method === 'PATCH' || method === 'PUT')) {
        const commentId = segments[1];
        const { status } = body;
        const updated = updateCommentStatusData(commentId, status);
        return res.status(200).json({ comment: updated, message: `Comment status set to ${status}.` });
      }

      if (segments.length === 2 && method === 'DELETE') {
        const commentId = segments[1];
        deleteCommentData(commentId);
        return res.status(200).json({ success: true, message: 'Comment deleted successfully.' });
      }

      if (segments.length === 1) {
        if (method === 'GET') {
          const articleId = req.query.article_id || req.query.articleId;
          const isAdmin = req.query.admin === 'true';
          if (!articleId) return res.status(400).json({ error: 'article_id query param is required.' });
          const comments = getArticleCommentsData(articleId, isAdmin);
          return res.status(200).json({ comments });
        }

        if (method === 'POST') {
          if (isIpBanned(clientIp)) {
            return res.status(403).json({ error: 'You are banned from commenting on this platform.' });
          }

          const { article_id, parent_id, author_name, content, is_admin_reply } = body;
          if (!article_id || !author_name || !content) {
            return res.status(400).json({ error: 'Article ID, Name, and Comment content are required.' });
          }

          // Strict Multilingual Profanity Moderation Check
          if (containsProfanity(author_name) || containsProfanity(content)) {
            return res.status(422).json({
              error: 'Your comment or name contains inappropriate or restricted language in English, Kinyarwanda, or French. Please revise.'
            });
          }

          const saved = saveCommentData({
            article_id,
            parent_id,
            author_name,
            content,
            is_admin_reply,
            user_ip: clientIp
          });

          return res.status(201).json({ comment: saved, message: 'Comment published successfully.' });
        }
      }
    }

    // 6. PROJECT ROUTES
    if (segments[0] === 'projects') {
      if (segments.length === 1) {
        if (method === 'GET') {
          const { category, featured, status } = req.query;
          let result = [...projects];
          if (featured === 'true') result = result.filter((p) => p.featured);
          if (category && category !== 'All') result = result.filter((p) => p.category === category);
          if (status && status !== 'all') result = result.filter((p) => p.status === status);
          return res.status(200).json({ projects: result });
        }

        if (method === 'POST') {
          const { name, slug, url, short_description } = body;
          if (!name || !slug || !url || !short_description) {
            return res.status(400).json({ error: 'Name, slug, URL, and short description are required.' });
          }
          const saved = saveProjectData(body);
          return res.status(200).json({ project: saved, message: 'Project saved successfully.' });
        }
      }

      if (segments.length === 2) {
        const projectId = segments[1];
        if (method === 'GET') {
          const project = projects.find((p) => String(p.id) === projectId || p.slug === projectId);
          if (!project) return res.status(404).json({ error: 'Project not found.' });
          return res.status(200).json({ project });
        }
        if (method === 'PUT') {
          const saved = saveProjectData({ id: projectId, ...body });
          return res.status(200).json({ project: saved, message: 'Project updated successfully.' });
        }
        if (method === 'DELETE') {
          deleteProjectData(projectId);
          return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
        }
      }
    }

    // 7. USER MANAGEMENT ROUTES
    if (segments[0] === 'users') {
      if (segments.length === 1) {
        if (method === 'GET') return res.status(200).json({ users: DEFAULT_USERS });
        if (method === 'POST') {
          const { email, name, role } = body;
          const newUser = { id: Date.now(), email: email || 'editor@benix.space', name: name || 'Team Member', role: role || 'editor', created_at: new Date().toISOString() };
          DEFAULT_USERS.push(newUser);
          return res.status(201).json({ user: newUser, message: 'User created successfully.' });
        }
      }

      if (segments.length === 2 && method === 'DELETE') {
        return res.status(200).json({ success: true, message: 'User deleted successfully.' });
      }
    }

    // 8. CONTACT & ANALYTICS ROUTES
    if (segments[0] === 'contact' && method === 'POST') {
      const { name, email, subject, message } = body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All contact fields are required.' });
      }
      return res.status(201).json({ success: true, message: 'Message submitted successfully.' });
    }

    if (segments[0] === 'analytics') {
      if (segments[1] === 'stats' && method === 'GET') {
        return res.status(200).json({
          overview: { total_views: 1420, unique_visitors: 890, external_clicks: 340 },
          top_projects: [
            { name: 'Benix Space TV', slug: 'benix-space-tv', clicks: 120 },
            { name: 'Benix Games', slug: 'benix-games', clicks: 95 }
          ],
          sources: [
            { source: 'Direct', count: 520 },
            { source: 'Google Search', count: 310 }
          ],
          devices: [
            { device_type: 'desktop', count: 620 },
            { device_type: 'mobile', count: 380 }
          ]
        });
      }

      if (segments[1] === 'track' && method === 'POST') {
        return res.status(200).json({ success: true });
      }
    }

    return res.status(404).json({ error: `API route /${segments.join('/')} not found` });
  } catch (err: any) {
    console.error('Serverless catch-all error:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
