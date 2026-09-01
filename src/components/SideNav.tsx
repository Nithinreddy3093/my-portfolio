import React, { useState } from 'react';
import { Home, User, Briefcase, Code, Mail, Download } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface SideNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  theme?: 'dark' | 'light';
}

const SIDE_NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const SideNav: React.FC<SideNavProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  theme = 'dark',
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const handleClick = (id: string) => {
    playClickSound();
    onNavigate(id);
  };

  const handleMouseEnter = (label: string) => {
    playHoverSound();
    setHoveredItem(label);
  };

  return (
    <aside
      id="desktop-left-rail"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 select-none"
      aria-label="Floating Navigation Rail"
    >
      {/* Main Glass Rail Container */}
      <div className={`flex flex-col items-center gap-2 p-2.5 rounded-[26px] border backdrop-blur-2xl shadow-2xl transition-colors duration-300 ${
        isDark
          ? 'bg-[#0e1017]/85 border-white/10 shadow-black/80'
          : 'bg-white/90 border-slate-200 shadow-slate-300/40'
      }`}>
        {SIDE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <div key={item.id} className="relative flex items-center">
              <button
                id={`side-nav-${item.id}`}
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/25 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                    : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100'
                }`}
                aria-label={`Navigate to ${item.label}`}
                title={item.label}
              >
                <Icon size={19} className={`transition-transform duration-200 ${isActive ? 'scale-105' : 'group-hover:scale-110'}`} />
              </button>

              {/* Tooltip */}
              {hoveredItem === item.label && (
                <div className={`absolute left-16 px-3 py-1 rounded-xl border text-xs font-semibold whitespace-nowrap shadow-xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none z-50 ${
                  isDark
                    ? 'bg-[#12141c] border-white/15 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  {item.label}
                </div>
              )}
            </div>
          );
        })}

        {/* Download Resume Button */}
        <div className="relative flex items-center">
          <button
            id="side-nav-resume"
            onClick={() => {
              playClickSound();
              onOpenResume();
            }}
            onMouseEnter={() => handleMouseEnter('Resume')}
            onMouseLeave={() => setHoveredItem(null)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-white/5'
                : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100'
            }`}
            aria-label="Download Resume"
            title="Download Resume"
          >
            <Download size={19} />
          </button>

          {hoveredItem === 'Resume' && (
            <div className={`absolute left-16 px-3 py-1 rounded-xl border text-xs font-semibold whitespace-nowrap shadow-xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none z-50 ${
              isDark
                ? 'bg-[#12141c] border-white/15 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              Resume (PDF)
            </div>
          )}
        </div>
      </div>

      {/* Bottom Glowing Dot Button */}
      <button
        onClick={() => {
          playClickSound();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-xl shadow-lg transition-all duration-300 group cursor-pointer ${
          isDark
            ? 'bg-[#0e1017]/90 border-white/10 hover:border-blue-400/40'
            : 'bg-white border-slate-200 hover:border-blue-500/40'
        }`}
        title="Active Status"
        aria-label="System Status"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_20px_#06b6d4] group-hover:scale-125 transition-transform" />
      </button>
    </aside>
  );
};
