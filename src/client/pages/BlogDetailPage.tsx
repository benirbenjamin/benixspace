import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SeoHead } from '../components/common/SeoHead';
import { fetchArticleBySlug } from '../services/api';
import { trackPageView } from '../analytics/tracker';
import { Article } from '../types';
import { ArrowLeft, Calendar, User, Tag, Share2, AlertCircle } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    async function loadArticle() {
      try {
        const data = await fetchArticleBySlug(slug as string);
        setArticle(data);
        trackPageView(window.location.href, 'blog', undefined, data.id);
      } catch (err) {
        setError('Article not found.');
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 flex flex-col items-center justify-center text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h1 className="text-2xl font-bold text-slate-900">Article Not Found</h1>
        <Link to="/blog" className="px-6 py-2.5 rounded-full bg-sky-600 text-white font-semibold text-sm">
          Return to Blog
        </Link>
      </div>
    );
  }

  const tags: string[] = typeof article.tags === 'string'
    ? JSON.parse(article.tags || '[]')
    : (article.tags || []);

  // Schema.org Article JSON-LD
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: [article.featured_image_url],
    datePublished: article.published_at || article.created_at,
    author: {
      '@type': 'Person',
      name: article.author_name || 'Benir Benjamin'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NebeluRw Co. Ltd',
      logo: {
        '@type': 'ImageObject',
        url: 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg'
      }
    },
    description: article.summary
  };

  return (
    <>
      <SeoHead
        title={article.seo_title || `${article.title} — NebeluRw Blog`}
        description={article.seo_description || article.summary}
        keywords={article.seo_keywords || `${article.title}, NebeluRw, Benir Benjamin, Rwanda tech`}
        ogImage={article.og_image_url || article.featured_image_url}
        canonicalUrl={article.canonical_url}
        type="article"
        schemaJsonLd={schemaJsonLd}
      />

      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog Articles</span>
            </Link>
          </div>

          <article className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl space-y-8">
            
            {/* Meta Top Header */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-100">
                {article.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-sky-600" />
                  <span className="text-slate-800 font-semibold">{article.author_name}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span>{new Date(article.published_at || article.created_at || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featured_image_url && (
              <div className="rounded-2xl overflow-hidden bg-slate-900 max-h-[450px] shadow-lg">
                <img
                  src={article.featured_image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article HTML Content */}
            <div
              className="prose prose-sky max-w-none text-slate-700 leading-relaxed text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-sky-600" />
                {tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Box */}
            <div className="mt-8 p-6 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                BB
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{article.author_name}</h4>
                <p className="text-xs text-slate-600 mt-0.5">Founder & Technical Lead at NebeluRw Co. Ltd.</p>
              </div>
            </div>

          </article>

        </div>
      </div>
    </>
  );
};
