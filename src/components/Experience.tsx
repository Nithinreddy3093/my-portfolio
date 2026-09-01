import React from 'react';
import { Calendar, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { WORK_EXPERIENCE } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500 mb-3">
          <Sparkles size={13} />
          <span>03. CAREER TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Experience & Engineering Journey
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mt-3">
          A track record of engineering full-stack platforms, leading technical student organizations, and architecting resilient software.
        </p>
      </div>

      {/* Futuristic System Timeline */}
      <div className="relative border-l border-slate-200 dark:border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {WORK_EXPERIENCE.map((exp) => (
          <div
            key={exp.id}
            onMouseEnter={() => playHoverSound()}
            className="relative group"
          >
            {/* Glowing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#0A0A0A] group-hover:ring-blue-500/30 group-hover:scale-125 transition-all duration-300 shadow-[0_0_12px_#3b82f6]" />
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 group-hover:border-blue-500/40 group-hover:bg-blue-50/30 dark:group-hover:bg-white/[0.02] transition-all duration-300 shadow-md dark:shadow-2xl backdrop-blur-xl">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-600 dark:text-blue-400">
                      {exp.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      {exp.status}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white group-hover:text-blue-500 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-slate-700 dark:text-gray-300 flex items-center gap-2 mt-1">
                    <span>{exp.company}</span>
                    <span className="text-slate-400 dark:text-gray-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-gray-400 bg-slate-50 dark:bg-black/40 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/5 w-fit">
                  <Calendar size={13} className="text-blue-500 dark:text-blue-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Key Responsibilities */}
              <div className="mb-6 space-y-2.5">
                <div className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Key Contributions & Engineering Scope</div>
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
                    <ChevronRight size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Tag Row */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 dark:border-white/10">
                <span className="text-xs font-mono text-slate-500 dark:text-gray-500 mr-2">Technologies:</span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
