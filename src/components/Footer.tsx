import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound } from '../utils/audio';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-slate-200 dark:border-white/5">
        
        {/* Left: MR Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
              MR
            </div>
            <span className="text-base uppercase tracking-widest font-bold text-slate-950 dark:text-white group-hover:text-blue-500 transition-colors">
              {PERSONAL_INFO.name}
            </span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-gray-400">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                playClickSound();
                onNavigate(link.id);
              }}
              className="hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: Social Channels & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full glass-pill text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-400/40 transition-all"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full glass-pill text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-400/40 transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2 rounded-full glass-pill text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-400/40 transition-all"
            aria-label="Send Email"
          >
            <Mail size={16} />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-pill text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-400/40 transition-all ml-2 cursor-pointer"
            title="Scroll back to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>

      {/* Copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-gray-500">
        <div>
          © 2026 {PERSONAL_INFO.name}. All rights reserved.
        </div>
        <div>
          Engineered with React, TypeScript, Three.js & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};
