import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { initDb } from './db/init';
import { query } from './db/db';
import { generateToken, comparePassword, authenticateAdmin, requireAdminRole, AuthenticatedRequest } from './auth/auth';
import {
  INITIAL_COMPANY_DATA,
  INITIAL_SOCIAL_LINKS,
  INITIAL_PROJECTS,
  INITIAL_CATEGORIES,
  INITIAL_BLOG_ARTICLES
} from './db/seed-data';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Database on Boot
initDb().catch((err) => console.error('Database Init Failed:', err));

// ==================== AUTHENTICATION API ==================== //

app.post('/api/auth/login', async (req, res) => {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const email = body.email ? String(body.email).trim() : '';
    const password = body.password ? String(body.password) : '';

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    let user: any = null;

    try {
      const userRes = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (userRes && userRes.rowCount > 0) {
        user = userRes.rows[0];
      }
    } catch (dbErr: any) {
      console.warn('Login DB query warning:', dbErr?.message || dbErr);
    }

    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'benirabok@gmail.com';
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'BenixSpace2026!';

    if (!user) {
      if (email.toLowerCase() === defaultEmail.toLowerCase() && password === defaultPassword) {
        const token = generateToken({ id: 1, email: defaultEmail, role: 'admin' });
        return res.json({
          token,
          user: { id: 1, email: defaultEmail, name: 'Benir Benjamin', role: 'admin' }
        });
      }
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    let match = false;
    try {
      match = await comparePassword(password, user.password_hash);
    } catch {
      match = false;
    }

    if (!match) {
      // Check fallback password if user exists but hash compare failed
      if (email.toLowerCase() === defaultEmail.toLowerCase() && password === defaultPassword) {
        const token = generateToken({ id: user.id || 1, email: defaultEmail, role: user.role || 'admin' });
        return res.json({
          token,
          user: { id: user.id || 1, email: defaultEmail, name: user.name || 'Benir Benjamin', role: user.role || 'admin' }
        });
      }
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err: any) {
    console.error('Login Endpoint Exception:', err);
    return res.status(500).json({ error: err?.message || 'Login failed.' });
  }
});

app.get('/api/auth/me', authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const userRes = await query('SELECT id, email, name, role FROM users WHERE id = $1', [req.user?.id]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.json({ user: userRes.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/auth/profile', authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const result = await query(
      'UPDATE users SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, email, name, role',
      [name, email, req.user?.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    return res.json({ success: true, message: 'Profile updated successfully.', user: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/auth/password', authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const userRes = await query('SELECT * FROM users WHERE id = $1', [req.user?.id]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = userRes.rows[0];
    const match = await comparePassword(currentPassword, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    await query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [newHash, req.user?.id]);

    return res.json({ success: true, message: 'Password changed successfully!' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ==================== USER MANAGEMENT API ==================== //

app.get('/api/users', authenticateAdmin, requireAdminRole, async (req, res) => {
  try {
    const result = await query('SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC');
    return res.json({ users: result.rows });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', authenticateAdmin, requireAdminRole, async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required.' });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rowCount! > 0) {
      return res.status(400).json({ error: 'A user with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userRole = role === 'admin' ? 'admin' : 'editor';

    const result = await query(
      'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at',
      [email, hash, name, userRole]
    );

    return res.status(201).json({ user: result.rows[0], message: `User ${name} created successfully as ${userRole}.` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', authenticateAdmin, requireAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const result = await query(
      'UPDATE users SET name = $1, email = $2, role = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, email, name, role',
      [name, email, role, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({ user: result.rows[0], message: 'User updated successfully.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', authenticateAdmin, requireAdminRole, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    if (parseInt(id, 10) === req.user?.id) {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }

    await query('DELETE FROM users WHERE id = $1', [id]);
    return res.json({ success: true, message: 'User deleted successfully.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ==================== PROJECTS API ==================== //

app.get('/api/projects', async (req, res) => {
  try {
    const { category, search, featured, status } = req.query;
    let sql = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];

    // Public API defaults to published projects unless admin requests draft
    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    } else {
      sql += ` AND status = 'published'`;
    }

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (featured === 'true') {
      sql += ` AND featured = true`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (name ILIKE $${params.length} OR short_description ILIKE $${params.length} OR technologies ILIKE $${params.length})`;
    }

    sql += ' ORDER BY sort_order ASC, created_at DESC';

    const result = await query(sql, params);
    return res.json({ projects: result.rows });
  } catch (err: any) {
    console.warn('Projects query fallback triggered:', err?.message || err);
    let fallback = INITIAL_PROJECTS as any[];
    if (req.query.featured === 'true') fallback = fallback.filter((p) => p.featured);
    if (req.query.category && req.query.category !== 'All') fallback = fallback.filter((p) => p.category === req.query.category);
    return res.json({ projects: fallback });
  }
});

app.get('/api/projects/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await query('SELECT * FROM projects WHERE slug = $1', [slug]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    return res.json({ project: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', authenticateAdmin, async (req, res) => {
  try {
    const {
      name, slug, url, short_description, full_description, image_url,
      gallery_images, category, tags, technologies, status, featured,
      embed_mode, sort_order, seo_title, seo_description, seo_keywords, og_image_url
    } = req.body;

    if (!name || !slug || !url || !short_description) {
      return res.status(400).json({ error: 'Name, slug, URL, and short description are required.' });
    }

    const result = await query(
      `INSERT INTO projects 
        (name, slug, url, short_description, full_description, image_url, gallery_images, category, tags, technologies, status, featured, embed_mode, sort_order, seo_title, seo_description, seo_keywords, og_image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING *`,
      [
        name, slug, url, short_description, full_description || '', image_url || '',
        JSON.stringify(gallery_images || []), category || 'Web Application',
        JSON.stringify(tags || []), JSON.stringify(technologies || []),
        status || 'published', featured || false, embed_mode || 'both',
        sort_order || 0, seo_title || name, seo_description || short_description,
        seo_keywords || '', og_image_url || image_url || ''
      ]
    );

    return res.status(201).json({ project: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, slug, url, short_description, full_description, image_url,
      gallery_images, category, tags, technologies, status, featured,
      embed_mode, sort_order, seo_title, seo_description, seo_keywords, og_image_url
    } = req.body;

    const result = await query(
      `UPDATE projects SET 
        name = $1, slug = $2, url = $3, short_description = $4, full_description = $5,
        image_url = $6, gallery_images = $7, category = $8, tags = $9, technologies = $10,
        status = $11, featured = $12, embed_mode = $13, sort_order = $14, seo_title = $15,
        seo_description = $16, seo_keywords = $17, og_image_url = $18, updated_at = CURRENT_TIMESTAMP
       WHERE id = $19 RETURNING *`,
      [
        name, slug, url, short_description, full_description, image_url,
        typeof gallery_images === 'string' ? gallery_images : JSON.stringify(gallery_images || []),
        category, typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        typeof technologies === 'string' ? technologies : JSON.stringify(technologies || []),
        status, featured, embed_mode, sort_order, seo_title, seo_description,
        seo_keywords, og_image_url, id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.json({ project: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM projects WHERE id = $1', [id]);
    return res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ==================== BLOG API ==================== //

app.get('/api/blog', async (req, res) => {
  try {
    const { category, search, status } = req.query;
    let sql = 'SELECT * FROM articles WHERE 1=1';
    const params: any[] = [];

    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    } else {
      sql += ` AND status = 'published'`;
    }

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search}%`);
      sql += ` AND (title ILIKE $${params.length} OR summary ILIKE $${params.length} OR content ILIKE $${params.length})`;
    }

    sql += ' ORDER BY published_at DESC';

    const result = await query(sql, params);
    return res.json({ articles: result.rows });
  } catch (err: any) {
    console.warn('Blog query fallback triggered:', err?.message || err);
    let fallback = INITIAL_BLOG_ARTICLES as any[];
    if (req.query.category && req.query.category !== 'All') fallback = fallback.filter((a) => a.category === req.query.category);
    return res.json({ articles: fallback });
  }
});

app.get('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await query('SELECT * FROM articles WHERE slug = $1', [slug]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    return res.json({ article: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/blog', authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const {
      title, slug, summary, content, featured_image_url, category, tags,
      author_name, status, seo_title, seo_description, seo_keywords, canonical_url, og_image_url
    } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'Title, slug, and content are required.' });
    }

    // Editors submit articles as pending_review unless created directly by admin
    const initialStatus = req.user?.role === 'admin' ? (status || 'published') : 'pending_review';

    const result = await query(
      `INSERT INTO articles 
        (title, slug, summary, content, featured_image_url, category, tags, author_name, author_id, status, seo_title, seo_description, seo_keywords, canonical_url, og_image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING *`,
      [
        title, slug, summary || '', content, featured_image_url || '',
        category || 'Technology', JSON.stringify(tags || []), author_name || req.user?.email || 'Author',
        req.user?.id || null, initialStatus, seo_title || title, seo_description || summary || title,
        seo_keywords || '', canonical_url || '', og_image_url || featured_image_url || ''
      ]
    );

    return res.status(201).json({ article: result.rows[0], message: initialStatus === 'pending_review' ? 'Article submitted for admin review.' : 'Article published.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/blog/:id', authenticateAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const {
      title, slug, summary, content, featured_image_url, category, tags,
      author_name, status, seo_title, seo_description, seo_keywords, canonical_url, og_image_url
    } = req.body;

    // Editors cannot force published status directly unless admin
    const targetStatus = req.user?.role === 'admin' ? (status || 'published') : 'pending_review';

    const result = await query(
      `UPDATE articles SET 
        title = $1, slug = $2, summary = $3, content = $4, featured_image_url = $5,
        category = $6, tags = $7, author_name = $8, status = $9, seo_title = $10,
        seo_description = $11, seo_keywords = $12, canonical_url = $13, og_image_url = $14,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $15 RETURNING *`,
      [
        title, slug, summary, content, featured_image_url, category,
        typeof tags === 'string' ? tags : JSON.stringify(tags || []), author_name,
        targetStatus, seo_title, seo_description, seo_keywords, canonical_url, og_image_url, id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    return res.json({ article: result.rows[0] });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin Approval Endpoint
app.put('/api/blog/:id/status', authenticateAdmin, requireAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'published' | 'pending_review' | 'draft'

    if (!['published', 'pending_review', 'draft'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const result = await query(
      'UPDATE articles SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    return res.json({ article: result.rows[0], message: `Article status updated to ${status}.` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/blog/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM articles WHERE id = $1', [id]);
    return res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await query('SELECT * FROM categories ORDER BY name ASC');
    return res.json({ categories: result.rows });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ==================== ANALYTICS API ==================== //

app.post('/api/analytics/track', async (req, res) => {
  try {
    const { event_type, page_url, page_type, project_id, article_id, referrer, user_agent, device_type, browser, os, session_id } = req.body;

    if (!event_type || !page_url) {
      return res.status(400).json({ error: 'event_type and page_url are required.' });
    }

    await query(
      `INSERT INTO analytics_events 
        (event_type, page_url, page_type, project_id, article_id, referrer, user_agent, device_type, browser, os, session_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        event_type, page_url, page_type || 'other', project_id || null, article_id || null,
        referrer || 'Direct', user_agent || '', device_type || 'desktop', browser || 'Unknown',
        os || 'Unknown', session_id || 'anon'
      ]
    );

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/analytics/stats', authenticateAdmin, async (req, res) => {
  try {
    const { range } = req.query; // 'today' | 'yesterday' | '7d' | '30d' | 'year' | 'all'
    let dateFilter = "created_at >= NOW() - INTERVAL '30 days'";

    if (range === 'today') {
      dateFilter = "created_at >= CURRENT_DATE";
    } else if (range === 'yesterday') {
      dateFilter = "created_at >= CURRENT_DATE - INTERVAL '1 day' AND created_at < CURRENT_DATE";
    } else if (range === '7d') {
      dateFilter = "created_at >= NOW() - INTERVAL '7 days'";
    } else if (range === '30d') {
      dateFilter = "created_at >= NOW() - INTERVAL '30 days'";
    } else if (range === 'year') {
      dateFilter = "created_at >= NOW() - INTERVAL '1 year'";
    } else if (range === 'all') {
      dateFilter = "1=1";
    }

    const totalViews = await query(`SELECT COUNT(*) as count FROM analytics_events WHERE ${dateFilter} AND event_type = 'page_view'`);
    const uniqueVisitors = await query(`SELECT COUNT(DISTINCT session_id) as count FROM analytics_events WHERE ${dateFilter}`);
    const externalClicks = await query(`SELECT COUNT(*) as count FROM analytics_events WHERE ${dateFilter} AND event_type = 'project_external_click'`);

    // Top Clicked Projects
    const topProjects = await query(
      `SELECT p.name, p.slug, COUNT(e.id) as clicks 
       FROM analytics_events e 
       JOIN projects p ON e.project_id = p.id 
       WHERE e.event_type = 'project_external_click' AND ${dateFilter.replace(/created_at/g, 'e.created_at')}
       GROUP BY p.id, p.name, p.slug 
       ORDER BY clicks DESC LIMIT 5`
    );

    // Traffic Sources
    const sources = await query(
      `SELECT COALESCE(referrer, 'Direct') as source, COUNT(*) as count 
       FROM analytics_events 
       WHERE ${dateFilter}
       GROUP BY source ORDER BY count DESC LIMIT 5`
    );

    // Device breakdown
    const devices = await query(
      `SELECT device_type, COUNT(*) as count 
       FROM analytics_events 
       WHERE ${dateFilter}
       GROUP BY device_type`
    );

    return res.json({
      overview: {
        total_views: parseInt(totalViews.rows[0]?.count || '0', 10),
        unique_visitors: parseInt(uniqueVisitors.rows[0]?.count || '0', 10),
        external_clicks: parseInt(externalClicks.rows[0]?.count || '0', 10),
      },
      top_projects: topProjects.rows,
      sources: sources.rows,
      devices: devices.rows
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ==================== CONTACT FORM API ==================== //

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All contact fields are required.' });
    }

    await query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject, message]
    );

    return res.status(201).json({ success: true, message: 'Message submitted successfully. We will reach out shortly!' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/contact', authenticateAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return res.json({ messages: result.rows });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ==================== COMPANY SETTINGS API ==================== //

app.get('/api/settings', async (req, res) => {
  try {
    const companyRes = await query('SELECT * FROM company_settings LIMIT 1');
    const socialRes = await query('SELECT * FROM social_links ORDER BY sort_order ASC');
    return res.json({
      company: companyRes.rows[0] || INITIAL_COMPANY_DATA,
      social: socialRes.rows.length > 0 ? socialRes.rows : INITIAL_SOCIAL_LINKS
    });
  } catch (err: any) {
    return res.json({
      company: INITIAL_COMPANY_DATA,
      social: INITIAL_SOCIAL_LINKS
    });
  }
});

app.put('/api/settings/company', authenticateAdmin, async (req, res) => {
  try {
    const { company_name, company_description, history, founder_name, founder_bio, email, phone, address, services_json } = req.body;
    
    await query(
      `UPDATE company_settings SET 
        company_name = $1, company_description = $2, history = $3, founder_name = $4,
        founder_bio = $5, email = $6, phone = $7, address = $8, services_json = $9,
        updated_at = CURRENT_TIMESTAMP`,
      [company_name, company_description, history, founder_name, founder_bio, email, phone, address, services_json]
    );

    return res.json({ success: true, message: 'Company settings updated successfully.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ==================== SEO & SITEMAP GENERATOR ==================== //

app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.APP_URL || 'https://benix.space';
    const projects = await query("SELECT slug, updated_at FROM projects WHERE status = 'published'");
    const articles = await query("SELECT slug, updated_at FROM articles WHERE status = 'published'");

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    const staticPages = ['', '/projects', '/services', '/about', '/blog', '/contact', '/privacy', '/cookies'];
    staticPages.forEach((path) => {
      xml += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${path === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    // Dynamic project pages
    projects.rows.forEach((p) => {
      xml += `  <url>\n    <loc>${baseUrl}/projects/${p.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    // Dynamic blog article pages
    articles.rows.forEach((a) => {
      xml += `  <url>\n    <loc>${baseUrl}/blog/${a.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    return res.send(xml);
  } catch (err: any) {
    return res.status(500).send('Error generating sitemap');
  }
});

app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.APP_URL || 'https://benix.space';
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml`;
  res.header('Content-Type', 'text/plain');
  return res.send(robots);
});

// Global Express Error Middleware (Guarantees valid JSON error responses)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled API Error:', err);
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ error: err?.message || 'Internal server error.' });
});

// Start Server locally when not running in Vercel Serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🌐 BenixSpace Express Server running on port ${PORT}`);
  });
}

export default app;
