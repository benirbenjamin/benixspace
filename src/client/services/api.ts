import type { Project, Article, Category, CompanySettings, SocialLink } from '../types';

export function getAuthToken(): string | null {
  return localStorage.getItem('benix_admin_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('benix_admin_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('benix_admin_token');
}

/**
 * Robust fetch wrapper that gracefully handles both JSON responses and non-JSON (HTML/error) pages.
 * Prevents "Unexpected token 'A', "A server e"... is not valid JSON" errors across the application.
 */
async function safeFetchJson<T = any>(url: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (err: any) {
    throw new Error(`Network error: ${err?.message || 'Failed to communicate with server'}`);
  }

  const contentType = res.headers.get('content-type') || '';
  let data: any = {};

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      data = {};
    }
  } else {
    // Response is text/html (e.g. 500 error page or SPA index.html rewrite fallback)
    if (!res.ok) {
      throw new Error(`Server returned error (${res.status}): ${res.statusText || 'Error processing request'}`);
    }
    // If request succeeded but response is HTML instead of JSON
    throw new Error('API endpoint returned HTML instead of expected JSON payload.');
  }

  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
  }

  return data as T;
}

export async function fetchProjects(params?: { category?: string; search?: string; featured?: boolean; status?: string }): Promise<Project[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.featured) query.append('featured', 'true');
  if (params?.status) query.append('status', params.status);

  const data = await safeFetchJson<{ projects: Project[] }>(`/api/projects?${query.toString()}`);
  return data.projects || [];
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const data = await safeFetchJson<{ project: Project }>(`/api/projects/${slug}`);
  return data.project;
}

export async function fetchArticles(params?: { category?: string; search?: string; status?: string }): Promise<Article[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.status) query.append('status', params.status);

  const data = await safeFetchJson<{ articles: Article[] }>(`/api/blog?${query.toString()}`);
  return data.articles || [];
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const data = await safeFetchJson<{ article: Article }>(`/api/blog/${slug}`);
  return data.article;
}

export async function fetchCompanySettings(): Promise<{ company: CompanySettings; social: SocialLink[] }> {
  return safeFetchJson<{ company: CompanySettings; social: SocialLink[] }>('/api/settings');
}

export async function submitContactForm(formData: { name: string; email: string; subject: string; message: string }) {
  return safeFetchJson('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
}

// Admin API Endpoints

export async function adminLogin(email: string, password: string) {
  const data = await safeFetchJson<{ token: string; user: any }>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
}

export async function fetchAnalyticsStats(range: string = '30d') {
  const token = getAuthToken();
  return safeFetchJson(`/api/analytics/stats?range=${range}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function saveProject(projectData: Partial<Project>, isEdit: boolean = false) {
  const token = getAuthToken();
  const url = isEdit ? `/api/projects/${projectData.id}` : '/api/projects';
  const method = isEdit ? 'PUT' : 'POST';

  const data = await safeFetchJson<{ project: Project }>(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  return data.project;
}

export async function deleteProject(id: number) {
  const token = getAuthToken();
  return safeFetchJson(`/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function saveArticle(articleData: Partial<Article>, isEdit: boolean = false) {
  const token = getAuthToken();
  const url = isEdit ? `/api/blog/${articleData.id}` : '/api/blog';
  const method = isEdit ? 'PUT' : 'POST';

  const data = await safeFetchJson<{ article: Article }>(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(articleData)
  });
  return data.article;
}

export async function deleteArticle(id: number) {
  const token = getAuthToken();
  return safeFetchJson(`/api/blog/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function updateCompanySettings(settings: Partial<CompanySettings>) {
  const token = getAuthToken();
  return safeFetchJson('/api/settings/company', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(settings)
  });
}

export async function updateAdminProfile(name: string, email: string) {
  const token = getAuthToken();
  return safeFetchJson('/api/auth/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, email })
  });
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const token = getAuthToken();
  return safeFetchJson('/api/auth/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
}

export async function fetchUsers() {
  const token = getAuthToken();
  const data = await safeFetchJson<{ users: any[] }>('/api/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.users || [];
}

export async function createUser(userData: { email: string; password: string; name: string; role: 'admin' | 'editor' }) {
  const token = getAuthToken();
  return safeFetchJson('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
}

export async function deleteUser(id: number) {
  const token = getAuthToken();
  return safeFetchJson(`/api/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function updateArticleStatus(id: number, status: 'published' | 'pending_review' | 'draft') {
  const token = getAuthToken();
  return safeFetchJson(`/api/blog/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
}
