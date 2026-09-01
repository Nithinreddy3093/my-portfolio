import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    playClickSound();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <header
      id="top-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#090a0d]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl shadow-black/80'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 py-4 shadow-lg shadow-slate-200/40'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Clean Bold Geometric "MR" Logo */}
        <button
          id="logo-button"
          onClick={() => handleNavClick('hero')}
          className="group flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg cursor-pointer"
          aria-label="Marthala Nithin Reddy - Home"
        >
          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-transform group-hover:scale-105 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            MR
          </span>
        </button>

        {/* Center: Clean Nav Links with Active Underline Pill */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'text-white font-semibold'
                      : 'text-slate-950 font-bold'
                    : isDark
                    ? 'text-gray-300/80 hover:text-white'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(59,130,246,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sleek Theme Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            id="theme-toggle-btn"
            onClick={() => {
              playClickSound();
              onToggleTheme();
            }}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shadow-sm ${
              isDark
                ? 'bg-[#12141a] border-white/10 text-gray-300 hover:text-white hover:border-white/25 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 hover:border-slate-300 hover:shadow-md'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={17} className="text-gray-200" /> : <Moon size={17} className="text-slate-800" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`md:hidden p-2 rounded-xl border transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 text-gray-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden mt-3 mx-4 p-5 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all animate-in fade-in duration-200 ${
          isDark
            ? 'bg-[#090a0d]/95 border-white/10 shadow-black'
            : 'bg-white/95 border-slate-200 shadow-slate-200/50'
        }`}>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/10 text-white font-bold border border-white/15'
                      : isDark
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
