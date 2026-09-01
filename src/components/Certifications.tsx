import React from 'react';
import { Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500 mb-3">
          <Sparkles size={13} />
          <span>06. VERIFIED CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Certifications
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mt-3">
          Industry-aligned certifications demonstrating competencies across cloud architecture, defensive security, and full-stack development.
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            onMouseEnter={() => playHoverSound()}
            className="group p-6 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 hover:border-blue-500/40 hover:bg-blue-50/20 dark:hover:bg-white/[0.02] transition-all duration-300 shadow-md dark:shadow-2xl backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  {cert.badgeText}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-gray-500">{cert.issueDate}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-500 transition-colors mb-2">
                {cert.title}
              </h3>

              <div className="text-xs font-semibold text-slate-500 dark:text-gray-400 mb-4">
                Issuer: <span className="text-slate-800 dark:text-gray-200">{cert.issuer}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-mono text-slate-600 dark:text-gray-400"
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
