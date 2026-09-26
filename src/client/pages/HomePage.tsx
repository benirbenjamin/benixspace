import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProjectCard3D } from '../components/projects/ProjectCard3D';
import { SeoHead } from '../components/common/SeoHead';
import { fetchProjects, fetchArticles } from '../services/api';
import { trackPageView } from '../analytics/tracker';
import { Project, Article } from '../types';
import { ArrowRight, Sparkles, CheckCircle2, User, Mail, Phone, ExternalLink } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackPageView(window.location.href, 'home');
    async function loadData() {
      try {
        const [projData, artData] = await Promise.all([
          fetchProjects({ featured: true }),
          fetchArticles()
        ]);
        setProjects(projData);
        setArticles(artData.slice(0, 3));
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <SeoHead
        title="BenixSpace — NebeluRw Co. Ltd Digital Portfolio & Ecosystem"
        description="Official digital platform for NebeluRw Co. Ltd. Showcasing streaming TV & radio, games, easy calc tools, Voxify music, and digital software services."
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Introduction to NebeluRw */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
                About NebeluRw Co. Ltd
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Pioneering Digital Platforms & Media Innovations in Rwanda
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                NebeluRw Co. Ltd is a modern technology company developing scalable web platforms, streaming media infrastructure, audio-visual production, and online business platforms.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Under the leadership of <strong className="text-slate-800">Benir Benjamin</strong>, we build high-impact platforms including Benix Space TV, Benix Radio, Easy Calc, and Voxify.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Scalable Full-Stack Engineering',
                  'High-Performance Streaming',
                  'SEO & Digital Growth Strategy',
                  'Music Distribution Ecosystem'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm shadow-md hover:bg-sky-600 transition-colors"
                >
                  <span>Read Full Company Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Leadership Spotlight Box */}
            <div className="glass-card rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 font-bold text-2xl">
                  BB
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Benir Benjamin</h3>
                  <span className="text-xs font-semibold text-sky-600">Founder & Managing Director — NebeluRw Co. Ltd</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "Our vision with BenixSpace is to create a unified digital ecosystem where software, streaming media, and music tools seamlessly empower our communities."
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-sky-600" />
                  <a href="mailto:benirabok@gmail.com" className="hover:text-sky-600">benirabok@gmail.com</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-sky-600" />
                  <a href="tel:0783987223" className="hover:text-sky-600">0783987223</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Showcase Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/80 px-4 py-1.5 rounded-full border border-sky-200">
                Our Platforms
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                Featured NebeluRw Ecosystem
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="glass-card rounded-3xl p-6 h-96 animate-pulse bg-slate-200/50" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-3xl">
              <p className="text-slate-500 font-medium">No featured projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard3D key={project.id} project={project} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* NebeluRw Services Component */}
      <ServicesSection />

      {/* Latest Blog Teaser Section */}
      {articles.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
                  News & Insights
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                  Latest Articles & Updates
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 overflow-hidden bg-slate-900 relative">
                      <img
                        src={article.featured_image_url || 'https://i.postimg.cc/85zP6mK2/benix-tv-cover.jpg'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sky-600 font-bold text-xs hover:text-sky-700 transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Contact Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Next Digital Platform?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Partner with NebeluRw Co. Ltd for web development, media streaming, SEO optimization, and digital management.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-base shadow-lg shadow-sky-500/25 transition-all"
            >
              <span>Get in Touch with Benir Benjamin</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
