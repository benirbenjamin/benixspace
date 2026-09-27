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
    seo_title: 'Building Modern Web Applications for Rwanda Digital Ecosystem | NebeluRw',
    seo_description: 'Discover how NebeluRw Co. Ltd develops web platforms, streaming tools, and software solutions in Rwanda.',
    seo_keywords: 'NebeluRw, software development Rwanda, Benir Benjamin, web apps Rwanda'
  }
];

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
    ...articleData
  };
  articles.unshift(newArticle);
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
