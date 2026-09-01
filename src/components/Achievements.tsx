import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { LEADERSHIP_EXPERIENCE } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500 mb-3">
          <Sparkles size={13} />
          <span>05. LEADERSHIP & IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Achievements & Leadership
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mt-3">
          Proven leadership heading student developer communities, organizing high-scale technical hackathons, and fostering engineering talent.
        </p>
      </div>

      {/* Grid of Leadership Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {LEADERSHIP_EXPERIENCE.map((role) => (
          <div
            key={role.id}
            onMouseEnter={() => playHoverSound()}
            className="p-8 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 hover:border-blue-500/40 hover:bg-blue-50/20 dark:hover:bg-white/[0.02] transition-all duration-300 shadow-md dark:shadow-2xl backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              {/* Card Header & Giant Metric */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-600/20 border border-blue-500/30 text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                    {role.organization}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-2">
                    {role.role}
                  </h3>
                  <div className="text-xs font-mono text-slate-500 dark:text-gray-400 mt-1">
                    {role.period}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight text-glow">
                    {role.metric}
                  </div>
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 max-w-[130px] leading-tight mt-0.5">
                    {role.metricLabel}
                  </div>
                </div>
              </div>

              {/* Impact Statement */}
              <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed mb-6">
                {role.impactDescription}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2.5 mb-8">
                {role.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Competencies Tags */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-1.5">
              {role.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-gray-400 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
