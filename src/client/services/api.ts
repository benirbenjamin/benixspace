import { Project, Article, Category, CompanySettings, SocialLink } from '../types';

export function getAuthToken(): string | null {
  return localStorage.getItem('benix_admin_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('benix_admin_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('benix_admin_token');
}

export async function fetchProjects(params?: { category?: string; search?: string; featured?: boolean; status?: string }): Promise<Project[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.featured) query.append('featured', 'true');
  if (params?.status) query.append('status', params.status);

  const res = await fetch(`/api/projects?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  const data = await res.json();
  return data.projects || [];
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const res = await fetch(`/api/projects/${slug}`);
  if (!res.ok) throw new Error('Project not found');
  const data = await res.json();
  return data.project;
}

export async function fetchArticles(params?: { category?: string; search?: string; status?: string }): Promise<Article[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.status) query.append('status', params.status);

  const res = await fetch(`/api/blog?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  const data = await res.json();
  return data.articles || [];
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(`/api/blog/${slug}`);
  if (!res.ok) throw new Error('Article not found');
  const data = await res.json();
  return data.article;
}

export async function fetchCompanySettings(): Promise<{ company: CompanySettings; social: SocialLink[] }> {
  const res = await fetch('/api/settings');
  if (!res.ok) throw new Error('Failed to fetch settings');
  return res.json();
}

export async function submitContactForm(formData: { name: string; email: string; subject: string; message: string }) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Submission failed');
  return data;
}

// Admin API Endpoints

export async function adminLogin(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setAuthToken(data.token);
  return data;
}

export async function fetchAnalyticsStats(range: string = '30d') {
  const token = getAuthToken();
  const res = await fetch(`/api/analytics/stats?range=${range}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function saveProject(projectData: Partial<Project>, isEdit: boolean = false) {
  const token = getAuthToken();
  const url = isEdit ? `/api/projects/${projectData.id}` : '/api/projects';
  const method = isEdit ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to save project');
  return data.project;
}

export async function deleteProject(id: number) {
  const token = getAuthToken();
  const res = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
}

export async function saveArticle(articleData: Partial<Article>, isEdit: boolean = false) {
  const token = getAuthToken();
  const url = isEdit ? `/api/blog/${articleData.id}` : '/api/blog';
  const method = isEdit ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(articleData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to save article');
  return data.article;
}

export async function deleteArticle(id: number) {
  const token = getAuthToken();
  const res = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete article');
  return res.json();
}

export async function updateCompanySettings(settings: Partial<CompanySettings>) {
  const token = getAuthToken();
  const res = await fetch('/api/settings/company', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(settings)
  });
  if (!res.ok) throw new Error('Failed to update company settings');
  return res.json();
}

export async function updateAdminProfile(name: string, email: string) {
  const token = getAuthToken();
  const res = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, email })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update profile');
  return data;
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const token = getAuthToken();
  const res = await fetch('/api/auth/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to change password');
  return data;
}

export async function fetchUsers() {
  const token = getAuthToken();
  const res = await fetch('/api/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  return data.users || [];
}

export async function createUser(userData: { email: string; password: string; name: string; role: 'admin' | 'editor' }) {
  const token = getAuthToken();
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create user');
  return data;
}

export async function deleteUser(id: number) {
  const token = getAuthToken();
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete user');
  return data;
}

export async function updateArticleStatus(id: number, status: 'published' | 'pending_review' | 'draft') {
  const token = getAuthToken();
  const res = await fetch(`/api/blog/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update article status');
  return data;
}
