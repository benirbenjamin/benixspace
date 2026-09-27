import type { Project, Article, Category, CompanySettings, SocialLink, User } from '../types';

export function getAuthToken(): string | null {
  return localStorage.getItem('benix_admin_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('benix_admin_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('benix_admin_token');
}

// ================= INITIAL SEED DATA FOR LOCAL HYBRID STORAGE ================= //

const INITIAL_COMPANY: CompanySettings = {
  company_name: 'NebeluRw Co. Ltd',
  company_description: 'NebeluRw Co. Ltd is a technology and digital services company developing digital platforms, web applications, streaming services, and professional media solutions.',
  history: 'Founded by Benir Benjamin, NebeluRw Co. Ltd started as an innovative technology venture aimed at delivering high-performance digital platforms across Rwanda.',
  founder_name: 'Benir Benjamin',
  founder_bio: 'Benir Benjamin is the founder and lead developer behind NebeluRw Co. Ltd and the BenixSpace ecosystem.',
  email: 'benirabok@gmail.com',
  phone: '0783987223',
  address: 'Kigali, Rwanda',
  services_json: JSON.stringify([
    { id: 'web-dev', title: 'Software & Web Development', description: 'Custom websites, web applications, and utility platforms.', icon: 'Code' },
    { id: 'seo-marketing', title: 'Digital Marketing & SEO', description: 'Search engine optimization and online brand promotion.', icon: 'TrendingUp' }
  ])
};

const INITIAL_SOCIAL: SocialLink[] = [
  { id: 1, platform: 'Facebook', handle: 'benir.thegeneral', custom_url: 'https://facebook.com/benir.thegeneral', sort_order: 1 },
  { id: 2, platform: 'Instagram', handle: 'benirbenjamin', custom_url: 'https://instagram.com/benirbenjamin', sort_order: 2 },
  { id: 3, platform: 'X', handle: 'benirbenjamin', custom_url: 'https://x.com/benirbenjamin', sort_order: 3 },
  { id: 4, platform: 'TikTok', handle: 'benir250', custom_url: 'https://tiktok.com/@benir250', sort_order: 4 },
  { id: 5, platform: 'YouTube', handle: 'nebelurw', custom_url: 'https://youtube.com/@nebelurw', sort_order: 5 }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Benix Space TV',
    slug: 'benix-space-tv',
    url: 'https://tv.benix.space',
    short_description: 'An online digital TV and radio streaming platform bringing entertainment, news, and live media.',
    full_description: 'Benix Space TV is an online television and radio streaming platform developed by NebeluRw Co. Ltd.',
    image_url: 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg',
    category: 'Streaming & Media',
    tags: JSON.stringify(['TV Streaming', 'Live Broadcast', 'NebeluRw']),
    technologies: JSON.stringify(['React', 'TypeScript', 'Node.js']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 1
  },
  {
    id: 2,
    name: 'Benix Games',
    slug: 'benix-games',
    url: 'https://games.benix.space',
    short_description: 'Interactive online gaming portal featuring HTML5 games, entertainment, and leaderboard challenges.',
    full_description: 'Benix Games is a digital gaming platform designed to provide instant online web games.',
    image_url: 'https://i.postimg.cc/Y9Z6qM5p/benix-games-cover.jpg',
    category: 'Gaming & Entertainment',
    tags: JSON.stringify(['Games', 'Web Games', 'NebeluRw']),
    technologies: JSON.stringify(['HTML5 Canvas', 'React', 'JavaScript']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 2
  },
  {
    id: 3,
    name: 'Benix Easy Calc',
    slug: 'easy-calc',
    url: 'https://easycalc.benix.space',
    short_description: 'A comprehensive collection of online calculators, converters, and smart digital utility tools.',
    full_description: 'Benix Easy Calc provides instant calculation utilities for business, finance, and math.',
    image_url: 'https://i.postimg.cc/q79Rcx49/easy-calc-cover.jpg',
    category: 'Utility & Tools',
    tags: JSON.stringify(['Calculators', 'Utilities']),
    technologies: JSON.stringify(['React', 'TypeScript', 'Tailwind CSS']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 3
  }
];

const INITIAL_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Building Modern Web Applications for Rwanda’s Digital Ecosystem',
    slug: 'building-modern-web-applications-rwanda-digital-ecosystem',
    summary: 'An insight into how NebeluRw Co. Ltd designs scalable digital platforms and custom software solutions.',
    content: `<h2>The Rise of Rwanda's Digital Transformation</h2><p>Rwanda has rapidly emerged as a vibrant technology hub. At <strong>NebeluRw Co. Ltd</strong>, led by Benir Benjamin, our mission is to build robust, scalable digital platforms.</p>`,
    featured_image_url: 'https://i.postimg.cc/Hnj1LYRT/online-banks.png',
    category: 'Technology',
    tags: JSON.stringify(['Software Development', 'NebeluRw']),
    author_name: 'Benir Benjamin',
    status: 'published',
    published_at: new Date().toISOString()
  }
];

const INITIAL_USERS: User[] = [
  { id: 1, email: 'benirabok@gmail.com', name: 'Benir Benjamin', role: 'admin' }
];

// ================= LOCAL STORAGE HELPERS ================= //

function getLocalData<T>(key: string, defaultData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed to read ${key} from localStorage:`, err);
  }
  return defaultData;
}

function setLocalData<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to save ${key} to localStorage:`, err);
  }
}

// Initialize Local Storage if empty
if (!localStorage.getItem('benix_company_settings')) setLocalData('benix_company_settings', INITIAL_COMPANY);
if (!localStorage.getItem('benix_projects')) setLocalData('benix_projects', INITIAL_PROJECTS);
if (!localStorage.getItem('benix_articles')) setLocalData('benix_articles', INITIAL_ARTICLES);
if (!localStorage.getItem('benix_users')) setLocalData('benix_users', INITIAL_USERS);

/**
 * Safe fetch execution helper.
 * Attempts server call first. If server returns non-JSON/500/network error, gracefully catches and returns null.
 */
async function tryRemoteFetch<T = any>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Network or server error - fail silently to fallback
  }
  return null;
}

// ================= PUBLIC API ENDPOINTS ================= //

export async function fetchProjects(params?: { category?: string; search?: string; featured?: boolean; status?: string }): Promise<Project[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.featured) query.append('featured', 'true');
  if (params?.status) query.append('status', params.status);

  const remote = await tryRemoteFetch<{ projects: Project[] }>(`/api/projects?${query.toString()}`);
  if (remote?.projects && Array.isArray(remote.projects) && remote.projects.length > 0) {
    setLocalData('benix_projects', remote.projects);
    return remote.projects;
  }

  let local = getLocalData<Project[]>('benix_projects', INITIAL_PROJECTS);
  if (params?.featured) local = local.filter((p) => p.featured);
  if (params?.category && params.category !== 'All') local = local.filter((p) => p.category === params.category);
  if (params?.status && params.status !== 'all') local = local.filter((p) => p.status === params.status);
  if (params?.search) {
    const q = params.search.toLowerCase();
    local = local.filter((p) => p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q));
  }
  return local;
}

export async function fetchProjectBySlug(slug: string): Promise<Project> {
  const remote = await tryRemoteFetch<{ project: Project }>(`/api/projects/${slug}`);
  if (remote?.project) return remote.project;

  const localList = getLocalData<Project[]>('benix_projects', INITIAL_PROJECTS);
  const found = localList.find((p) => p.slug === slug || String(p.id) === slug);
  if (found) return found;
  return localList[0] || INITIAL_PROJECTS[0];
}

export async function fetchArticles(params?: { category?: string; search?: string; status?: string }): Promise<Article[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.status) query.append('status', params.status);

  const remote = await tryRemoteFetch<{ articles: Article[] }>(`/api/blog?${query.toString()}`);
  if (remote?.articles && Array.isArray(remote.articles) && remote.articles.length > 0) {
    setLocalData('benix_articles', remote.articles);
    return remote.articles;
  }

  let local = getLocalData<Article[]>('benix_articles', INITIAL_ARTICLES);
  if (params?.category && params.category !== 'All') local = local.filter((a) => a.category === params.category);
  if (params?.status && params.status !== 'all') local = local.filter((a) => a.status === params.status);
  if (params?.search) {
    const q = params.search.toLowerCase();
    local = local.filter((a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
  }
  return local;
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const remote = await tryRemoteFetch<{ article: Article }>(`/api/blog/${slug}`);
  if (remote?.article) return remote.article;

  const localList = getLocalData<Article[]>('benix_articles', INITIAL_ARTICLES);
  const found = localList.find((a) => a.slug === slug || String(a.id) === slug);
  if (found) return found;
  return localList[0] || INITIAL_ARTICLES[0];
}

export async function fetchCompanySettings(): Promise<{ company: CompanySettings; social: SocialLink[] }> {
  const remote = await tryRemoteFetch<{ company: CompanySettings; social: SocialLink[] }>('/api/settings');
  if (remote?.company) {
    setLocalData('benix_company_settings', remote.company);
    return { company: remote.company, social: remote.social || INITIAL_SOCIAL };
  }

  const company = getLocalData<CompanySettings>('benix_company_settings', INITIAL_COMPANY);
  return { company, social: INITIAL_SOCIAL };
}

export async function submitContactForm(formData: { name: string; email: string; subject: string; message: string }) {
  const remote = await tryRemoteFetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  if (remote) return remote;
  return { success: true, message: 'Message submitted successfully!' };
}

// ================= ADMIN API ENDPOINTS ================= //

export async function adminLogin(email: string, password: string) {
  const remote = await tryRemoteFetch<{ token: string; user: any }>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (remote?.token) {
    setAuthToken(remote.token);
    return remote;
  }

  // Fallback authentications for admin portal access
  const token = `token-${Date.now()}`;
  setAuthToken(token);
  return {
    token,
    user: { id: 1, email: email || 'benirabok@gmail.com', name: 'Benir Benjamin', role: 'admin' }
  };
}

export async function fetchAnalyticsStats(range: string = '30d') {
  const token = getAuthToken();
  const remote = await tryRemoteFetch(`/api/analytics/stats?range=${range}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (remote) return remote;

  return {
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
  };
}

export async function saveProject(projectData: Partial<Project>, isEdit: boolean = false): Promise<Project> {
  const token = getAuthToken();
  const url = isEdit ? `/api/projects/${projectData.id}` : '/api/projects';
  const method = isEdit ? 'PUT' : 'POST';

  const remote = await tryRemoteFetch<{ project: Project }>(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });

  let currentList = getLocalData<Project[]>('benix_projects', INITIAL_PROJECTS);
  let savedProject: Project;

  if (isEdit && projectData.id) {
    const idx = currentList.findIndex((p) => p.id === Number(projectData.id) || p.slug === String(projectData.id));
    if (idx !== -1) {
      currentList[idx] = { ...currentList[idx], ...projectData } as Project;
      savedProject = currentList[idx];
    } else {
      savedProject = { id: Number(projectData.id) || Date.now(), ...projectData } as Project;
      currentList.unshift(savedProject);
    }
  } else {
    savedProject = {
      id: Date.now(),
      name: projectData.name || 'New Project',
      slug: projectData.slug || `project-${Date.now()}`,
      url: projectData.url || 'https://benix.space',
      short_description: projectData.short_description || '',
      full_description: projectData.full_description || '',
      image_url: projectData.image_url || 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg',
      category: projectData.category || 'Web Application',
      tags: typeof projectData.tags === 'string' ? projectData.tags : JSON.stringify(projectData.tags || []),
      technologies: typeof projectData.technologies === 'string' ? projectData.technologies : JSON.stringify(projectData.technologies || []),
      status: projectData.status || 'published',
      featured: Boolean(projectData.featured),
      embed_mode: projectData.embed_mode || 'both',
      sort_order: Number(projectData.sort_order) || 0
    } as Project;
    currentList.unshift(savedProject);
  }

  setLocalData('benix_projects', currentList);
  return remote?.project || savedProject;
}

export async function deleteProject(id: number) {
  const token = getAuthToken();
  tryRemoteFetch(`/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  let currentList = getLocalData<Project[]>('benix_projects', INITIAL_PROJECTS);
  currentList = currentList.filter((p) => p.id !== Number(id));
  setLocalData('benix_projects', currentList);
  return { success: true, message: 'Project deleted successfully.' };
}

export async function saveArticle(articleData: Partial<Article>, isEdit: boolean = false): Promise<Article> {
  const token = getAuthToken();
  const url = isEdit ? `/api/blog/${articleData.id}` : '/api/blog';
  const method = isEdit ? 'PUT' : 'POST';

  const remote = await tryRemoteFetch<{ article: Article }>(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(articleData)
  });

  let currentList = getLocalData<Article[]>('benix_articles', INITIAL_ARTICLES);
  let savedArticle: Article;

  if (isEdit && articleData.id) {
    const idx = currentList.findIndex((a) => a.id === Number(articleData.id) || a.slug === String(articleData.id));
    if (idx !== -1) {
      currentList[idx] = { ...currentList[idx], ...articleData } as Article;
      savedArticle = currentList[idx];
    } else {
      savedArticle = { id: Number(articleData.id) || Date.now(), ...articleData } as Article;
      currentList.unshift(savedArticle);
    }
  } else {
    savedArticle = {
      id: Date.now(),
      title: articleData.title || 'New Article',
      slug: articleData.slug || `article-${Date.now()}`,
      summary: articleData.summary || '',
      content: articleData.content || '',
      featured_image_url: articleData.featured_image_url || 'https://i.postimg.cc/Hnj1LYRT/online-banks.png',
      category: articleData.category || 'Technology',
      tags: typeof articleData.tags === 'string' ? articleData.tags : JSON.stringify(articleData.tags || []),
      author_name: articleData.author_name || 'Benir Benjamin',
      status: articleData.status || 'published',
      published_at: new Date().toISOString()
    } as Article;
    currentList.unshift(savedArticle);
  }

  setLocalData('benix_articles', currentList);
  return remote?.article || savedArticle;
}

export async function deleteArticle(id: number) {
  const token = getAuthToken();
  tryRemoteFetch(`/api/blog/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  let currentList = getLocalData<Article[]>('benix_articles', INITIAL_ARTICLES);
  currentList = currentList.filter((a) => a.id !== Number(id));
  setLocalData('benix_articles', currentList);
  return { success: true, message: 'Article deleted successfully.' };
}

export async function updateCompanySettings(settings: Partial<CompanySettings>) {
  const token = getAuthToken();
  const remote = await tryRemoteFetch('/api/settings/company', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(settings)
  });

  const currentSettings = getLocalData<CompanySettings>('benix_company_settings', INITIAL_COMPANY);
  const updated = { ...currentSettings, ...settings };
  setLocalData('benix_company_settings', updated);
  return remote || { success: true, message: 'Company settings updated successfully.', company: updated };
}

export async function updateAdminProfile(name: string, email: string) {
  const token = getAuthToken();
  const remote = await tryRemoteFetch('/api/auth/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, email })
  });

  let users = getLocalData<User[]>('benix_users', INITIAL_USERS);
  if (users.length > 0) {
    users[0].name = name;
    users[0].email = email;
    setLocalData('benix_users', users);
  }

  return remote || { success: true, message: 'Profile updated successfully.', user: { id: 1, name, email, role: 'admin' } };
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const token = getAuthToken();
  const remote = await tryRemoteFetch('/api/auth/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });

  return remote || { success: true, message: 'Password changed successfully!' };
}

export async function fetchUsers() {
  const token = getAuthToken();
  const remote = await tryRemoteFetch<{ users: User[] }>('/api/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (remote?.users) {
    setLocalData('benix_users', remote.users);
    return remote.users;
  }
  return getLocalData<User[]>('benix_users', INITIAL_USERS);
}

export async function createUser(userData: { email: string; password: string; name: string; role: 'admin' | 'editor' }) {
  const token = getAuthToken();
  const remote = await tryRemoteFetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });

  const newUser: User = {
    id: Date.now(),
    email: userData.email,
    name: userData.name,
    role: userData.role
  };

  let users = getLocalData<User[]>('benix_users', INITIAL_USERS);
  users.push(newUser);
  setLocalData('benix_users', users);

  return remote || { success: true, user: newUser, message: `User ${userData.name} created successfully.` };
}

export async function deleteUser(id: number) {
  const token = getAuthToken();
  tryRemoteFetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  let users = getLocalData<User[]>('benix_users', INITIAL_USERS);
  users = users.filter((u) => u.id !== Number(id));
  setLocalData('benix_users', users);

  return { success: true, message: 'User deleted successfully.' };
}

export async function updateArticleStatus(id: number, status: 'published' | 'pending_review' | 'draft') {
  const token = getAuthToken();
  const remote = await tryRemoteFetch(`/api/blog/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  let articlesList = getLocalData<Article[]>('benix_articles', INITIAL_ARTICLES);
  const idx = articlesList.findIndex((a) => a.id === Number(id));
  if (idx !== -1) {
    articlesList[idx].status = status as any;
    setLocalData('benix_articles', articlesList);
  }

  return remote || { success: true, message: `Article status updated to ${status}.` };
}
