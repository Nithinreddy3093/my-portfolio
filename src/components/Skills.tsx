import React, { useState, useMemo } from 'react';
import { Sparkles, Search, Layers, Server, Database, Cloud, ShieldCheck, Terminal, X, CheckCircle } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillModal, setActiveSkillModal] = useState<{
    name: string;
    category: string;
    description: string;
    level: number;
    yearsOrProjects: string;
  } | null>(null);

  const categories = useMemo(() => ['All', ...SKILL_CATEGORIES.map((c) => c.title)], []);

  const filteredSkills = useMemo(() => {
    return SKILL_CATEGORIES.flatMap((category) => {
      if (selectedCategory !== 'All' && category.title !== selectedCategory) {
        return [];
      }
      return category.skills
        .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((s) => ({ ...s, category: category.title }));
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Frontend': return Layers;
      case 'Backend': return Server;
      case 'Databases': return Database;
      case 'Cloud & DevOps': return Cloud;
      case 'Security': return ShieldCheck;
      default: return Terminal;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500 mb-3">
          <Sparkles size={13} />
          <span>02. TECHNICAL ECOSYSTEM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Skills & Technologies
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mt-3">
          A multi-disciplinary stack spanning full-stack development, cloud automation, defensive cybersecurity, and scalable system design.
        </p>
      </div>

      {/* Central Orbital Badge Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl mb-10 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/15 dark:bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xl shadow-lg shadow-blue-500/20">
              MR
            </div>
            <div>
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">Core Engineering Hub</div>
              <div className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">MARTHALA NITHIN REDDY</div>
              <div className="text-xs text-slate-500 dark:text-gray-400">Full Stack • Cloud & DevOps • SIEM & SecOps</div>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-xs"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-200 dark:border-white/10 pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => {
          return (
            <div
              key={skill.name}
              onClick={() => {
                playClickSound();
                setActiveSkillModal(skill);
              }}
              onMouseEnter={() => playHoverSound()}
              className="group p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 hover:border-blue-500/40 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer shadow-md dark:shadow-xl relative flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon & Category Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{skill.icon || '⚡'}</span>
                    <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-500 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-mono text-slate-600 dark:text-gray-400">
                    {skill.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar & Tag */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-gray-400 mb-1.5">
                  <span>{skill.yearsOrProjects}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 group-hover:from-blue-500 group-hover:to-sky-300 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0e1017] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400">
          <p className="text-sm">No technologies match "{searchQuery}" in this category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Skill Details Modal */}
      {activeSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#11141e] border border-slate-200 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveSkillModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full glass-pill text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase">{activeSkillModal.category}</div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">{activeSkillModal.name}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed mb-6">
              {activeSkillModal.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 space-y-3 text-xs mb-6">
              <div className="flex items-center justify-between text-slate-600 dark:text-gray-400">
                <span>Specialization Focus:</span>
                <span className="text-slate-950 dark:text-white font-medium">{activeSkillModal.yearsOrProjects}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-gray-400">
                <span>Proficiency Level:</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{activeSkillModal.level}%</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-white/5">
                <CheckCircle size={14} />
                <span>Production & Project Ready</span>
              </div>
            </div>

            <button
              onClick={() => setActiveSkillModal(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
