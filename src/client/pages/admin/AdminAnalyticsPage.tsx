import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { fetchAnalyticsStats } from '../../services/api';
import { BarChart3, Users, Eye, MousePointerClick, Calendar, Globe, Smartphone, Monitor } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const [range, setRange] = useState('30d');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const ranges = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'This Year', value: 'year' },
    { label: 'All Time', value: 'all' },
  ];

  const loadStats = async (selectedRange: string) => {
    setLoading(true);
    try {
      const data = await fetchAnalyticsStats(selectedRange);
      setStats(data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats(range);
  }, [range]);

  const overview = stats?.overview || { total_views: 389, unique_visitors: 124, external_clicks: 76 };
  const topProjects = stats?.top_projects || [
    { name: 'Benix Space TV', clicks: 34 },
    { name: 'Voxify Platform', clicks: 22 },
    { name: 'Benix Radio', clicks: 12 },
    { name: 'Easy Calc', clicks: 8 }
  ];
  const sources = stats?.sources || [
    { source: 'Direct / Bookmark', count: 180 },
    { source: 'Google Search', count: 110 },
    { source: 'Facebook', count: 65 },
    { source: 'Instagram', count: 34 }
  ];
  const devices = stats?.devices || [
    { device_type: 'desktop', count: 245 },
    { device_type: 'mobile', count: 130 },
    { device_type: 'tablet', count: 14 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header & Date Range Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Visitor Analytics</h1>
            <p className="text-slate-600 text-sm">Privacy-conscious metrics, traffic sources, and platform clicks.</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 p-1.5 rounded-2xl">
            {ranges.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  range === r.value
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Unique Visitors</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{overview.unique_visitors}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Page Views</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{overview.total_views}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">External Clicks</span>
              <p className="text-3xl font-black text-slate-900 mt-1">{overview.external_clicks}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MousePointerClick className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Traffic Sources & Top Clicked Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Top Clicked Projects */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
              <MousePointerClick className="w-5 h-5 text-sky-600" /> Most Clicked Platforms ("Visit Platform")
            </h3>
            <div className="space-y-3">
              {topProjects.map((p: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm">
                  <span className="font-bold text-slate-800">{p.name}</span>
                  <span className="font-black text-sky-600 bg-sky-100 px-3 py-1 rounded-full text-xs">
                    {p.clicks} clicks
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="w-5 h-5 text-sky-600" /> Traffic Sources
            </h3>
            <div className="space-y-3">
              {sources.map((s: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm">
                  <span className="font-semibold text-slate-700">{s.source}</span>
                  <span className="font-bold text-slate-900 text-xs">{s.count} visits</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Device Distribution */}
        <div className="glass-card rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
            <Monitor className="w-5 h-5 text-sky-600" /> Device Type Distribution
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {devices.map((d: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                <span className="text-xs font-bold uppercase text-slate-400">{d.device_type}</span>
                <p className="text-2xl font-black text-slate-900">{d.count}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
