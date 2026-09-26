import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { fetchArticles, deleteArticle, updateArticleStatus } from '../../services/api';
import { Article } from '../../types';
import { Plus, Edit, Trash2, Calendar, User, Eye, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AdminBlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = async () => {
    try {
      const data = await fetchArticles({ status: 'all' });
      setArticles(data);
    } catch (err) {
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await updateArticleStatus(id, 'published');
      loadArticles();
    } catch (err: any) {
      alert(err.message || 'Failed to approve article.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (err: any) {
      alert(err.message || 'Failed to delete article.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Blog CMS Management</h1>
            <p className="text-slate-600 text-sm">Write articles, review editor submissions, optimize SEO, and publish content.</p>
          </div>
          <Link
            to="/admin/blog/new"
            className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-lg shadow-sky-600/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Article
          </Link>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs uppercase font-extrabold border-b border-slate-200">
                  <th className="p-4">Article Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">Loading articles...</td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">No articles published yet. Click "Create New Article".</td>
                  </tr>
                ) : (
                  articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <img src={art.featured_image_url || 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg'} alt={art.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                          <div className="truncate max-w-xs">
                            <span className="block truncate">{art.title}</span>
                            <span className="text-[11px] text-slate-400 font-mono">/blog/{art.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 text-xs font-semibold">{art.category}</td>
                      <td className="p-4 text-slate-600 text-xs font-semibold">{art.author_name}</td>
                      <td className="p-4">
                        {art.status === 'published' ? (
                          <span className="text-xs px-3 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                            Published
                          </span>
                        ) : art.status === 'pending_review' ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Pending Review
                            </span>
                            <button
                              onClick={() => handleApprove(art.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition-all flex items-center gap-1"
                              title="Approve & Publish Live"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs px-3 py-1 rounded-full font-bold bg-slate-200 text-slate-700">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          to={`/blog/${art.slug}`}
                          target="_blank"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex transition-colors"
                          title="View Live Article"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/blog/edit/${art.id}`}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 inline-flex transition-colors"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(art.id)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
