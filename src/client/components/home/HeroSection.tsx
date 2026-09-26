import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Sparkles, ArrowRight, ShieldCheck, Tv, Radio, Music, Gamepad2, Calculator } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-sky-50/60 via-slate-50 to-white">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100/80 border border-sky-200 text-sky-700 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span>NebeluRw Co. Ltd Digital Home & Platform Ecosystem</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Building Digital <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 bg-clip-text text-transparent">Experiences</span> for Rwanda and Beyond
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              BenixSpace is the central ecosystem created by <strong className="text-slate-800">NebeluRw Co. Ltd</strong>. We engineer digital platforms, streaming TV & radio media, online tools, web applications, and digital services.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-700 font-semibold text-base border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-sky-600 transition-all"
              >
                <span>About NebeluRw</span>
                <ShieldCheck className="w-5 h-5 text-sky-600" />
              </Link>
            </div>

            {/* Quick Metrics Badge */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-extrabold text-slate-900">5+</span>
                <span className="text-xs text-slate-500 font-medium">Digital Platforms</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-slate-900">9</span>
                <span className="text-xs text-slate-500 font-medium">Core Services</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-slate-900">100%</span>
                <span className="text-xs text-slate-500 font-medium">Production Ready</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Floating 3D Ecosystem Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Center Core Badge */}
            <div className="relative z-20 glass-card p-8 rounded-3xl border border-slate-200/80 shadow-2xl text-center max-w-sm w-full animate-float">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 mb-4">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">BenixSpace</h3>
              <p className="text-xs text-sky-600 font-bold uppercase tracking-wider mt-1">NebeluRw Co. Ltd</p>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                Centralized hub for streaming TV, radio, games, easy calc tools & Voxify music.
              </p>
            </div>

            {/* Floating Project Card 1: Benix Space TV (Top Left) */}
            <div className="absolute -top-6 -left-4 z-30 glass-card p-3 rounded-2xl border border-sky-100 shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-md">
                <Tv className="w-5 h-5" />
              </div>
              <div className="text-left pr-2">
                <span className="block text-xs font-bold text-slate-900">Benix Space TV</span>
                <span className="text-[10px] text-slate-500">Live Streaming Platform</span>
              </div>
            </div>

            {/* Floating Project Card 2: Benix Radio (Top Right) */}
            <div className="absolute -top-4 -right-4 z-30 glass-card p-3 rounded-2xl border border-sky-100 shadow-xl flex items-center gap-3 animate-float-reverse">
              <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-md">
                <Radio className="w-5 h-5" />
              </div>
              <div className="text-left pr-2">
                <span className="block text-xs font-bold text-slate-900">Benix Radio</span>
                <span className="text-[10px] text-slate-500">24/7 Digital Radio</span>
              </div>
            </div>

            {/* Floating Project Card 3: Voxify (Bottom Left) */}
            <div className="absolute -bottom-6 -left-6 z-30 glass-card p-3 rounded-2xl border border-sky-100 shadow-xl flex items-center gap-3 animate-float-reverse" style={{ animationDelay: '1s' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Music className="w-5 h-5" />
              </div>
              <div className="text-left pr-2">
                <span className="block text-xs font-bold text-slate-900">Voxify</span>
                <span className="text-[10px] text-slate-500">Choirs & Music Hub</span>
              </div>
            </div>

            {/* Floating Project Card 4: Benix Easy Calc (Bottom Right) */}
            <div className="absolute -bottom-8 -right-2 z-30 glass-card p-3 rounded-2xl border border-sky-100 shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="text-left pr-2">
                <span className="block text-xs font-bold text-slate-900">Easy Calc</span>
                <span className="text-[10px] text-slate-500">Calculator Tools</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
