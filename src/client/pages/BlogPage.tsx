import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { fetchArticles } from '../services/api';
import { trackPageView } from '../analytics/tracker';
import { Article } from '../types';
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Software Development', 'Digital Marketing & SEO', 'NebeluRw News'];

  useEffect(() => {
    trackPageView(window.location.href, 'blog');
    async function loadArticles() {
      try {
        const data = await fetchArticles();
        setArticles(data);
        setFilteredArticles(data);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  useEffect(() => {
    let result = [...articles];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    setFilteredArticles(result);
  }, [searchQuery, selectedCategory, articles]);

  return (
    <>
      <SeoHead
        title="Blog & Insights — NebeluRw Co. Ltd Tech Articles"
        description="Read articles, software insights, tech guides, and updates from NebeluRw Co. Ltd and Benir Benjamin."
      />

      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/80 px-4 py-1.5 rounded-full border border-sky-200">
              NebeluRw Content & News
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Blog & Technology Insights
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Explore articles on web application engineering, streaming media infrastructure, SEO optimization, and digital platforms.
            </p>
          </div>

          {/* Search & Categories */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, content, or category..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="glass-card rounded-3xl p-6 h-96 animate-pulse bg-slate-200/50" />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-3xl">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-700 font-bold text-lg">No articles found.</p>
              <p className="text-slate-500 text-sm">Check back soon for new publications from NebeluRw.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-52 overflow-hidden bg-slate-900 relative">
                      <img
                        src={article.featured_image_url || 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(article.published_at || article.created_at || '').toLocaleDateString()}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-sky-600" />
                      {article.author_name}
                    </span>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-sky-600 font-bold text-xs hover:text-sky-700 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};
