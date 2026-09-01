import React from 'react';
import { Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';
import { playHoverSound } from '../utils/audio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500 mb-3">
          <Sparkles size={13} />
          <span>07. ACADEMIC FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Education
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mt-3">
          Academic foundation in Computer Science and Engineering at SRM Institute of Science and Technology.
        </p>
      </div>

      {/* Education Cards */}
      <div className="space-y-6">
        {EDUCATION.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => playHoverSound()}
            className="p-8 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 hover:border-blue-500/40 hover:bg-blue-50/20 dark:hover:bg-white/[0.02] transition-all duration-300 shadow-md dark:shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    {item.grade || 'Degree'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mt-1">
                  {item.degree}
                </h3>
                <div className="text-sm font-semibold text-slate-700 dark:text-gray-300 mt-1 flex items-center gap-2">
                  <span>{item.institution}</span>
                  <span className="text-slate-400 dark:text-gray-600">•</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400 flex items-center gap-1">
                    <MapPin size={12} /> {item.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-gray-400 bg-slate-50 dark:bg-black/40 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/5 w-fit">
                <Calendar size={13} className="text-blue-500 dark:text-blue-400" />
                <span>{item.period}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="space-y-2.5">
              <div className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Key Academic Highlights & Coursework</div>
              {item.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
