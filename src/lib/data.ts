export let companyData = {
  company_name: 'NebeluRw Co. Ltd',
  company_description: 'NebeluRw Co. Ltd is a modern technology and digital services company developing digital platforms, web applications, streaming services, and professional media solutions.',
  history: 'Founded by Benir Benjamin, NebeluRw Co. Ltd started as an innovative technology venture aimed at delivering high-performance digital platforms and audio-visual services across Rwanda and internationally.',
  founder_name: 'Benir Benjamin',
  founder_bio: 'Benir Benjamin is the founder and lead developer behind NebeluRw Co. Ltd and the BenixSpace ecosystem, pioneering digital media, web platforms, and streaming solutions.',
  email: 'benirabok@gmail.com',
  phone: '0783987223',
  address: 'Kigali, Rwanda',
  services_json: JSON.stringify([
    {
      id: 'web-dev',
      title: 'Software & Web Development',
      description: 'Custom websites, web applications, business platforms, management systems, and utility applications.',
      icon: 'Code'
    },
    {
      id: 'seo-marketing',
      title: 'Digital Marketing & SEO',
      description: 'Search engine optimization, content strategy, social media marketing, and online brand promotion.',
      icon: 'TrendingUp'
    },
    {
      id: 'social-mgmt',
      title: 'Social Media Management',
      description: 'Comprehensive social media management, content publishing, promotional campaigns, and brand visibility.',
      icon: 'Share2'
    },
    {
      id: 'youtube',
      title: 'YouTube Services',
      description: 'Channel creation, video optimization, publishing strategies, and subscriber growth management.',
      icon: 'Youtube'
    },
    {
      id: 'audio-music',
      title: 'Audio & Music Production',
      description: 'Music recording, professional audio mixing, gospel & commercial music projects, and studio production.',
      icon: 'Music'
    },
    {
      id: 'video-prod',
      title: 'Video Production',
      description: 'High-quality promotional videos, social media video content, event coverage, and music videos.',
      icon: 'Video'
    },
    {
      id: 'music-dist',
      title: 'Music Distribution',
      description: 'Global music distribution to platforms like Spotify, Deezer, Boomplay, Apple Music, and YouTube Music.',
      icon: 'Radio'
    },
    {
      id: 'design-photo',
      title: 'Photography & Graphic Design',
      description: 'Event photography, promotional artwork, digital flyers, logo design, and corporate branding.',
      icon: 'Camera'
    },
    {
      id: 'instruments',
      title: 'Musical Instruments Assistance',
      description: 'Connecting customers with reliable vendors to source and purchase quality musical instruments.',
      icon: 'Sliders'
    }
  ])
};

export const socialLinks = [
  { id: 1, platform: 'Facebook', handle: 'benir.thegeneral', custom_url: 'https://facebook.com/benir.thegeneral', sort_order: 1 },
  { id: 2, platform: 'Instagram', handle: 'benirbenjamin', custom_url: 'https://instagram.com/benirbenjamin', sort_order: 2 },
  { id: 3, platform: 'X', handle: 'benirbenjamin', custom_url: 'https://x.com/benirbenjamin', sort_order: 3 },
  { id: 4, platform: 'TikTok', handle: 'benir250', custom_url: 'https://tiktok.com/@benir250', sort_order: 4 },
  { id: 5, platform: 'YouTube', handle: 'nebelurw', custom_url: 'https://youtube.com/@nebelurw', sort_order: 5 },
];

export let projects = [
  {
    id: 1,
    name: 'Benix Space TV',
    slug: 'benix-space-tv',
    url: 'https://tv.benix.space',
    short_description: 'An online digital TV and radio streaming platform bringing entertainment, news, and live media.',
    full_description: 'Benix Space TV is an online television and radio streaming platform developed by NebeluRw Co. Ltd. It delivers high-quality live video streaming, scheduled broadcasts, and interactive digital media channels accessible seamlessly across desktop and mobile devices.',
    image_url: 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg',
    gallery_images: JSON.stringify(['https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg']),
    category: 'Streaming & Media',
    tags: JSON.stringify(['TV Streaming', 'Live Broadcast', 'NebeluRw', 'Media Platform']),
    technologies: JSON.stringify(['React', 'TypeScript', 'HLS Video', 'Node.js', 'PostgreSQL']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 1,
    seo_title: 'Benix Space TV — Live Streaming & Radio Platform by NebeluRw',
    seo_description: 'Watch live TV streaming, video broadcasts, and radio stations on Benix Space TV, developed by NebeluRw Co. Ltd.',
    seo_keywords: 'Benix Space TV, streaming Rwanda, online TV Rwanda, NebeluRw media, live radio streaming'
  },
  {
    id: 2,
    name: 'Benix Games',
    slug: 'benix-games',
    url: 'https://games.benix.space',
    short_description: 'Interactive online gaming portal featuring HTML5 games, entertainment, and leaderboard challenges.',
    full_description: 'Benix Games is a digital gaming platform designed to provide instant online web games, interactive challenges, and engaging leisure activities for users across all browser platforms.',
    image_url: 'https://i.postimg.cc/Y9Z6qM5p/benix-games-cover.jpg',
    gallery_images: JSON.stringify(['https://i.postimg.cc/Y9Z6qM5p/benix-games-cover.jpg']),
    category: 'Gaming & Entertainment',
    tags: JSON.stringify(['Games', 'Web Games', 'Interactive', 'NebeluRw']),
    technologies: JSON.stringify(['HTML5 Canvas', 'React', 'JavaScript', 'Tailwind CSS']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 2,
    seo_title: 'Benix Games — Instant Browser Games & Entertainment Portal',
    seo_description: 'Play fun online web games on Benix Games. Lightweight, fast, and entertaining games developed by NebeluRw.',
    seo_keywords: 'Benix Games, web games, browser gaming Rwanda, Benix space games, NebeluRw platforms'
  },
  {
    id: 3,
    name: 'Benix Easy Calc',
    slug: 'easy-calc',
    url: 'https://easycalc.benix.space',
    short_description: 'A comprehensive collection of online calculators, converters, and smart digital utility tools.',
    full_description: 'Benix Easy Calc provides instant calculation utilities for business, finance, unit conversion, engineering math, and daily productivity. Designed for speed, precision, and mobile usability.',
    image_url: 'https://i.postimg.cc/q79Rcx49/easy-calc-cover.jpg',
    gallery_images: JSON.stringify(['https://i.postimg.cc/q79Rcx49/easy-calc-cover.jpg']),
    category: 'Utility & Tools',
    tags: JSON.stringify(['Calculators', 'Productivity', 'Utilities', 'Math Tools']),
    technologies: JSON.stringify(['React', 'TypeScript', 'Tailwind CSS', 'Vite']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 3,
    seo_title: 'Benix Easy Calc — Online Calculators & Smart Utility Tools',
    seo_description: 'Use fast, accurate online calculators for finance, unit conversions, math, and business with Benix Easy Calc by NebeluRw.',
    seo_keywords: 'Easy Calc, online calculator, unit converter, Benix calculators, NebeluRw software'
  },
  {
    id: 4,
    name: 'Benix Radio',
    slug: 'radio',
    url: 'https://radio.benix.space',
    short_description: 'Online digital radio and music streaming station broadcasting music, podcasts, and audio shows.',
    full_description: 'Benix Radio provides 24/7 digital audio streaming, live DJ sets, music podcasts, and news commentary with crystal clear sound quality and responsive audio player controls.',
    image_url: 'https://i.postimg.cc/pT30vS1z/benix-radio-cover.jpg',
    gallery_images: JSON.stringify(['https://i.postimg.cc/pT30vS1z/benix-radio-cover.jpg']),
    category: 'Streaming & Media',
    tags: JSON.stringify(['Radio', 'Audio Streaming', 'Music Station', 'NebeluRw']),
    technologies: JSON.stringify(['React', 'Web Audio API', 'Node.js', 'PostgreSQL']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 4,
    seo_title: 'Benix Radio — 24/7 Digital Radio & Music Streaming Station',
    seo_description: 'Listen to live digital radio broadcasts, music playlists, and audio shows on Benix Radio by NebeluRw Co. Ltd.',
    seo_keywords: 'Benix Radio, online radio Rwanda, music streaming, digital radio station, NebeluRw audio'
  },
  {
    id: 5,
    name: 'Voxify',
    slug: 'voxify',
    url: 'https://voxify.space',
    short_description: 'Digital platform for choirs, gospel artists, music distribution, and audio composition showcase.',
    full_description: 'Voxify is a dedicated music and choir ecosystem created by NebeluRw Co. Ltd to empower gospel choirs, independent vocalists, and musical groups with digital streaming, song catalogs, and distribution management.',
    image_url: 'https://i.postimg.cc/J0BwDk7L/voxify-cover.jpg',
    gallery_images: JSON.stringify(['https://i.postimg.cc/J0BwDk7L/voxify-cover.jpg']),
    category: 'Music Ecosystem',
    tags: JSON.stringify(['Choirs', 'Gospel Music', 'Artists Platform', 'Music Hub']),
    technologies: JSON.stringify(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']),
    status: 'published',
    featured: true,
    embed_mode: 'both',
    sort_order: 5,
    seo_title: 'Voxify — Digital Music & Choir Platform by NebeluRw',
    seo_description: 'Discover gospel music, choir catalogs, artist profiles, and song releases on Voxify platform.',
    seo_keywords: 'Voxify space, choir platform, gospel music Rwanda, choir digital library, NebeluRw music'
  }
];

export let blogCategories: string[] = [
  'Technology',
  'Software Development',
  'Digital Marketing & SEO',
  'NebeluRw News'
];

export let articles = [
  {
    id: 1,
    title: 'Building Modern Web Applications for Rwanda’s Digital Ecosystem',
    slug: 'building-modern-web-applications-rwanda-digital-ecosystem',
    summary: 'An insight into how NebeluRw Co. Ltd designs scalable digital platforms, streaming services, and custom software solutions.',
    content: `<h2>The Rise of Rwanda's Digital Transformation</h2>
<p>Rwanda has rapidly emerged as a vibrant technology hub in East Africa. At <strong>NebeluRw Co. Ltd</strong>, led by Benir Benjamin, our primary mission is to build robust, scalable, and user-friendly digital platforms that empower local businesses, creators, and online communities.</p>

<h3>Key Pillars of NebeluRw Digital Ecosystem</h3>
<ul>
  <li><strong>BenixSpace Platform:</strong> The central digital portfolio and CMS engine.</li>
  <li><strong>Streaming Media:</strong> Benix Space TV & Benix Radio delivering 24/7 audio-visual content.</li>
  <li><strong>Productivity Utilities:</strong> Easy Calc bringing smart calculation tools to everyday users.</li>
  <li><strong>Music Ecosystem:</strong> Voxify providing dedicated spaces for gospel choirs and vocal artists.</li>
</ul>

<p>Our commitment remains centered on delivering high performance, responsive interfaces, and clean UI engineering across all our products.</p>`,
    featured_image_url: 'https://i.postimg.cc/Hnj1LYRT/online-banks.png',
    category: 'Technology',
    tags: JSON.stringify(['Software Development', 'Rwanda Tech', 'NebeluRw', 'Web Applications']),
    author_name: 'Benir Benjamin',
    status: 'published',
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    views_count: 142,
    comments_count: 2,
    seo_title: 'Building Modern Web Applications for Rwanda Digital Ecosystem | NebeluRw',
    seo_description: 'Discover how NebeluRw Co. Ltd develops web platforms, streaming tools, and software solutions in Rwanda.',
    seo_keywords: 'NebeluRw, software development Rwanda, Benir Benjamin, web apps Rwanda'
  }
];

export let articleComments: any[] = [];

export let bannedIps: string[] = [];

export function updateCompanyData(newData: any) {
  companyData = { ...companyData, ...newData };
  return companyData;
}

export function saveProjectData(projectData: any) {
  if (projectData.id) {
    const idx = projects.findIndex((p) => p.id === Number(projectData.id) || p.slug === String(projectData.id));
    if (idx !== -1) {
      projects[idx] = { ...projects[idx], ...projectData };
      return projects[idx];
    }
  }
  const newProject = {
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
    sort_order: Number(projectData.sort_order) || 0,
    created_at: new Date().toISOString(),
    ...projectData
  };
  projects.unshift(newProject);
  return newProject;
}

export function deleteProjectData(id: any) {
  const idx = projects.findIndex((p) => String(p.id) === String(id));
  if (idx !== -1) {
    projects.splice(idx, 1);
  }
  return true;
}

export function getBlogCategoriesData() {
  return blogCategories;
}

export function addBlogCategoryData(name: string) {
  const trimmed = String(name || '').trim();
  if (trimmed && !blogCategories.includes(trimmed)) {
    blogCategories.push(trimmed);
  }
  return blogCategories;
}

export function editBlogCategoryData(oldName: string, newName: string) {
  const trimmed = String(newName || '').trim();
  const idx = blogCategories.indexOf(oldName);
  if (idx !== -1 && trimmed) {
    blogCategories[idx] = trimmed;
    articles.forEach((art) => {
      if (art.category === oldName) {
        art.category = trimmed;
      }
    });
  }
  return blogCategories;
}

export function saveArticleData(articleData: any) {
  if (articleData.id) {
    const idx = articles.findIndex((a) => a.id === Number(articleData.id) || a.slug === String(articleData.id));
    if (idx !== -1) {
      articles[idx] = { ...articles[idx], ...articleData };
      return articles[idx];
    }
  }
  const newArticle = {
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
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    views_count: 0,
    comments_count: 0,
    ...articleData
  };
  articles.unshift(newArticle);
  if (newArticle.category && !blogCategories.includes(newArticle.category)) {
    blogCategories.push(newArticle.category);
  }
  return newArticle;
}

export function deleteArticleData(id: any) {
  const idx = articles.findIndex((a) => String(a.id) === String(id));
  if (idx !== -1) {
    articles.splice(idx, 1);
  }
  return true;
}

export function updateArticleStatusData(id: any, status: string) {
  const idx = articles.findIndex((a) => String(a.id) === String(id));
  if (idx !== -1) {
    articles[idx].status = status as any;
    return articles[idx];
  }
  return { id, status };
}

export function incrementArticleViewCount(articleIdOrSlug: any) {
  const art = articles.find((a) => String(a.id) === String(articleIdOrSlug) || a.slug === String(articleIdOrSlug));
  if (art) {
    art.views_count = (art.views_count || 0) + 1;
    return art.views_count;
  }
  return 1;
}

export function getArticleCommentsData(articleId: any, isAdmin: boolean = false) {
  const numericId = Number(articleId);
  const targetArticles = articles.filter((a) => a.id === numericId || a.slug === String(articleId));
  const targetId = targetArticles.length > 0 ? targetArticles[0].id : numericId;

  const filtered = articleComments.filter((c) => {
    const matchesArticle = Number(c.article_id) === Number(targetId);
    if (!matchesArticle) return false;
    if (isAdmin) return true;
    return c.status === 'approved';
  });

  const commentMap = new Map<string, any>();
  filtered.forEach((c) => commentMap.set(c.id, { ...c, replies: [] }));

  const rootComments: any[] = [];
  commentMap.forEach((c) => {
    if (c.parent_id && commentMap.has(c.parent_id)) {
      commentMap.get(c.parent_id).replies.push(c);
    } else {
      rootComments.push(c);
    }
  });

  return rootComments;
}

export function getAllCommentsData() {
  return articleComments.map((c) => {
    const art = articles.find((a) => a.id === Number(c.article_id));
    return {
      ...c,
      article_title: art ? art.title : `Article #${c.article_id}`
    };
  });
}

export function saveCommentData(commentData: {
  article_id: number;
  parent_id?: string | null;
  author_name: string;
  content: string;
  is_admin_reply?: boolean;
  user_ip?: string;
}) {
  const newComment = {
    id: `c_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    article_id: Number(commentData.article_id),
    parent_id: commentData.parent_id || null,
    author_name: commentData.author_name.trim(),
    content: commentData.content.trim(),
    likes_count: 0,
    status: 'approved',
    is_admin_reply: Boolean(commentData.is_admin_reply),
    user_ip: commentData.user_ip || '127.0.0.1',
    created_at: new Date().toISOString()
  };

  articleComments.unshift(newComment);

  const art = articles.find((a) => a.id === Number(commentData.article_id));
  if (art) {
    art.comments_count = (art.comments_count || 0) + 1;
  }

  return newComment;
}

export function likeCommentData(commentId: string) {
  const c = articleComments.find((item) => item.id === commentId);
  if (c) {
    c.likes_count = (c.likes_count || 0) + 1;
    return c.likes_count;
  }
  return 0;
}

export function updateCommentStatusData(commentId: string, status: 'approved' | 'hidden' | 'flagged') {
  const c = articleComments.find((item) => item.id === commentId);
  if (c) {
    c.status = status;
    return c;
  }
  return null;
}

export function deleteCommentData(commentId: string) {
  const idx = articleComments.findIndex((c) => c.id === commentId);
  if (idx !== -1) {
    const [deleted] = articleComments.splice(idx, 1);
    articleComments = articleComments.filter((c) => c.parent_id !== commentId);
    return deleted;
  }
  return null;
}

export function banUserIpData(ip: string) {
  if (ip && !bannedIps.includes(ip)) {
    bannedIps.push(ip);
  }
  return true;
}

export function isIpBanned(ip: string) {
  return bannedIps.includes(ip);
}

// ================= REAL LIVE VISITOR ANALYTICS ENGINE ================= //

export let analyticsEvents: any[] = [];

export function recordAnalyticsEvent(eventData: any) {
  const newEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    event_type: eventData.event_type || 'page_view',
    page_url: eventData.page_url || '/',
    page_type: eventData.page_type || 'general',
    project_id: eventData.project_id ? Number(eventData.project_id) : null,
    article_id: eventData.article_id ? Number(eventData.article_id) : null,
    referrer: eventData.referrer || 'Direct',
    user_agent: eventData.user_agent || '',
    device_type: eventData.device_type || 'desktop',
    browser: eventData.browser || 'Chrome',
    os: eventData.os || 'Windows',
    session_id: eventData.session_id || `sess_${Date.now()}`,
    created_at: new Date().toISOString()
  };

  analyticsEvents.unshift(newEvent);

  if (analyticsEvents.length > 5000) {
    analyticsEvents = analyticsEvents.slice(0, 5000);
  }

  return newEvent;
}

export function getAnalyticsStatsData(range: string = '30d') {
  const now = new Date();
  let cutoffDate: Date | null = null;

  if (range === 'today') {
    cutoffDate = new Date();
    cutoffDate.setHours(0, 0, 0, 0);
  } else if (range === 'yesterday') {
    cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 1);
    cutoffDate.setHours(0, 0, 0, 0);
  } else if (range === '7d') {
    cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
  } else if (range === '30d') {
    cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);
  } else if (range === 'year') {
    cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
  }

  const filtered = cutoffDate
    ? analyticsEvents.filter((e) => new Date(e.created_at) >= cutoffDate!)
    : analyticsEvents;

  const pageViews = filtered.filter((e) => e.event_type === 'page_view');
  const externalClicks = filtered.filter((e) => e.event_type === 'project_external_click');
  const uniqueSessions = new Set(filtered.map((e) => e.session_id));

  const projectClickCounts = new Map<number, number>();
  externalClicks.forEach((e) => {
    if (e.project_id) {
      projectClickCounts.set(e.project_id, (projectClickCounts.get(e.project_id) || 0) + 1);
    }
  });

  const top_projects = projects.map((p) => {
    const clicks = projectClickCounts.get(p.id) || 0;
    return { name: p.name, slug: p.slug, clicks };
  }).sort((a, b) => b.clicks - a.clicks);

  const sourceCounts = new Map<string, number>();
  filtered.forEach((e) => {
    let src = 'Direct / Bookmark';
    if (e.referrer && e.referrer !== 'Direct' && !e.referrer.includes('benix.space') && !e.referrer.includes('localhost')) {
      if (e.referrer.includes('google')) src = 'Google Search';
      else if (e.referrer.includes('facebook')) src = 'Facebook';
      else if (e.referrer.includes('instagram')) src = 'Instagram';
      else if (e.referrer.includes('x.com') || e.referrer.includes('twitter')) src = 'X (Twitter)';
      else if (e.referrer.includes('youtube')) src = 'YouTube';
      else {
        try {
          src = new URL(e.referrer).hostname;
        } catch {
          src = 'Direct / Bookmark';
        }
      }
    }
    sourceCounts.set(src, (sourceCounts.get(src) || 0) + 1);
  });

  const sources = Array.from(sourceCounts.entries()).map(([source, count]) => ({
    source,
    count
  })).sort((a, b) => b.count - a.count);

  const deviceCounts = new Map<string, number>();
  filtered.forEach((e) => {
    const dev = e.device_type || 'desktop';
    deviceCounts.set(dev, (deviceCounts.get(dev) || 0) + 1);
  });

  const devices = Array.from(deviceCounts.entries()).map(([device_type, count]) => ({
    device_type,
    count
  })).sort((a, b) => b.count - a.count);

  return {
    overview: {
      total_views: pageViews.length,
      unique_visitors: uniqueSessions.size,
      external_clicks: externalClicks.length
    },
    top_projects,
    sources: sources.length > 0 ? sources : [{ source: 'Direct / Bookmark', count: filtered.length }],
    devices: devices.length > 0 ? devices : [{ device_type: 'desktop', count: filtered.length }]
  };
}

