import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, ExternalLink, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Rocket className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-sky-900 to-sky-600 bg-clip-text text-transparent">
              BenixSpace
            </span>
            <span className="block text-[10px] font-semibold tracking-wider uppercase text-sky-600">
              NebeluRw Co. Ltd
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/80">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-white text-sky-600 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-white/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 text-slate-400 hover:text-sky-600 transition-colors"
            title="Admin Login"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold text-sm shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 hover:-translate-y-0.5 transition-all"
          >
            <span>Explore Projects</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-sky-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-card border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-sky-50 text-sky-600 font-semibold border-l-4 border-sky-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-sky-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <Link
              to="/projects"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold text-center text-sm shadow-md"
            >
              Explore Projects
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-center text-sm"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
