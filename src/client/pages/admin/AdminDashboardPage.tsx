import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { fetchAnalyticsStats, fetchProjects, fetchArticles } from '../../services/api';
import { Project, Article } from '../../types';
import {
  Users, Eye, MousePointerClick, FileText, Plus,
  Layers, ExternalLink, TrendingUp, Sparkles, ArrowRight
} from 'lucide-react';

import { getProjectImageUrl } from '../../utils/images';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, projData, artData] = await Promise.all([
          fetchAnalyticsStats('30d').catch(() => null),
          fetchProjects({ status: 'published' }),
          fetchArticles({ status: 'published' })
        ]);
        setStats(statsData);
        setProjects(projData);
        setArticles(artData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const totalVisitors = stats?.overview?.unique_visitors || 0;
  const totalViews = stats?.overview?.total_views || 0;
  const projectClicks = stats?.overview?.external_clicks || 0;

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Welcome Top Banner */}
        <div className="rounded-3xl p-8 border border-slate-800 shadow-xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full">
              System Overview
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Welcome back, Benir Benjamin 👋</h1>
            <p className="text-slate-300 text-sm">
              BenixSpace Digital Ecosystem overview for NebeluRw Co. Ltd.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin/projects"
              className="px-5 py-2.5 rounded-full bg-white text-sky-700 font-bold text-xs shadow-md hover:bg-sky-50 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Project
            </Link>
            <Link
              to="/admin/blog/new"
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" /> Write Article
            </Link>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unique Visitors</span>
              <p className="text-3xl font-black text-slate-900">{totalVisitors}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Active Sessions</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Page Views</span>
              <p className="text-3xl font-black text-slate-900">{totalViews}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Logged Analytics</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Clicks</span>
              <p className="text-3xl font-black text-slate-900">{projectClicks}</p>
              <span className="text-[11px] text-emerald-600 font-semibold">"Visit Platform" Clicks</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MousePointerClick className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Published Content</span>
              <p className="text-3xl font-black text-slate-900">{projects.length + articles.length}</p>
              <span className="text-[11px] text-sky-600 font-semibold">{projects.length} Proj | {articles.length} Posts</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Popular Projects & Recent Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Ecosystem Projects */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-600" /> NebeluRw Ecosystem Platforms
              </h3>
              <Link to="/admin/projects" className="text-xs font-bold text-sky-600 hover:underline">
                Manage All
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 5).map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 truncate">
                    <img src={getProjectImageUrl(p)} alt={p.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <div className="truncate">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{p.name}</h4>
                      <span className="text-[11px] text-slate-500 block truncate">{p.url}</span>
                    </div>
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-sky-600 shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Analytics Summary */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sky-600" /> Platform Traffic Overview
              </h3>
              <Link to="/admin/analytics" className="text-xs font-bold text-sky-600 hover:underline">
                Full Analytics
              </Link>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
                <span className="font-bold text-slate-900 block">Top Traffic Referral</span>
                <p className="text-slate-600">Direct Visit & Google Search Engine Indexing</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                <span className="font-bold text-slate-900 block">Device Distribution</span>
                <p className="text-slate-600">65% Mobile Devices • 35% Desktop Browsers</p>
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/admin/analytics"
                  className="inline-flex items-center gap-1.5 text-sky-600 font-extrabold text-xs hover:underline"
                >
                  <span>View Detailed Geolocation & Click Analytics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};
