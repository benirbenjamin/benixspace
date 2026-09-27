import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { SeoAssistantPanel } from '../../components/admin/SeoAssistantPanel';
import { fetchArticleBySlug, fetchArticles, saveArticle } from '../../services/api';
import { Article } from '../../types';
import { ArrowLeft, Save, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminBlogEditPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    featured_image_url: 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg',
    category: 'Technology',
    tags: ['NebeluRw', 'Tech'],
    author_name: 'Benir Benjamin',
    status: 'published',
    seo_title: '',
    seo_description: '',
    seo_keywords: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      async function loadArticle() {
        try {
          const all = await fetchArticles({ status: 'all' });
          const target = all.find((a) => String(a.id) === String(id) || a.slug === id);
          if (target) {
            setFormData({
              ...target,
              tags: typeof target.tags === 'string' ? JSON.parse(target.tags || '[]') : target.tags
            });
          }
        } catch (err) {
          setError('Failed to load article details.');
        } finally {
          setLoading(false);
        }
      }
      loadArticle();
    }
  }, [id, isEdit]);

  const handleTitleChange = (newTitle: string) => {
    const slugified = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: prev.slug || slugified,
      seo_title: prev.seo_title || newTitle
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.slug || !formData.content) {
      setError('Title, Slug, and Content are required.');
      return;
    }

    setSaving(true);
    try {
      await saveArticle(formData, isEdit);
      setSuccess('Article saved successfully!');
      setTimeout(() => navigate('/admin/blog'), 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/admin/blog" className="p-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {isEdit ? 'Edit Blog Article' : 'Write New Article'}
              </h1>
              <p className="text-slate-600 text-xs">Craft SEO-friendly content for BenixSpace digital blog.</p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-lg shadow-sky-600/20 transition-all flex items-center gap-2"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Article
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" /> <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 text-xs flex items-center gap-2 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> <span>{success}</span>
          </div>
        )}

        {/* Form & SEO Assistant 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Article Editor Form (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Article Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Building Scalable Web Applications for Rwanda"
                  className="w-full p-3.5 rounded-2xl border border-slate-200 text-slate-900 text-base font-bold focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Category</label>
                  <select
                    value={formData.category || 'Technology'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                    <option value="NebeluRw News">NebeluRw News</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Featured Image URL (Postimages.org Supported)</label>
                <input
                  type="url"
                  value={formData.featured_image_url || ''}
                  onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                  placeholder="https://i.postimg.cc/..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Article Summary (Meta Description)</label>
                <textarea
                  rows={3}
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value, seo_description: e.target.value })}
                  placeholder="Short summary describing the key takeaway..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed"
                />
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Article Body Content (Rich HTML)</label>
              <RichTextEditor
                value={formData.content || ''}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
            </div>

            {/* Publication Settings */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase">Publishing Controls</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Author Name</label>
                  <input
                    type="text"
                    value={formData.author_name || 'Benir Benjamin'}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600">Status</label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Intelligent SEO Assistant Side Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <SeoAssistantPanel
              title={formData.title || ''}
              metaDescription={formData.summary || ''}
              content={formData.content || ''}
              keywords={formData.seo_keywords || ''}
              slug={formData.slug || ''}
              featuredImageUrl={formData.featured_image_url || ''}
              onSelectKeyword={(kwd) => {
                const existing = formData.seo_keywords ? formData.seo_keywords + ', ' : '';
                setFormData({ ...formData, seo_keywords: existing + kwd });
              }}
              onInsertLink={(url, text) => {
                const linkHtml = `<a href="${url}" class="text-sky-600 font-semibold hover:underline">${text}</a>`;
                setFormData({ ...formData, content: (formData.content || '') + ' ' + linkHtml });
              }}
            />
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};
