import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Box, GitBranch, Cpu } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { GITHUB_USERNAME } from '../data/projects';
import { DeveloperWorkspace3D } from './DeveloperWorkspace3D';

interface HeroProps {
  onExploreClick: () => void;
  onOpenResume: () => void;
  theme?: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, theme = 'dark' }) => {
  const [repoCount, setRepoCount] = useState<number | string>(30);

  // Fetch actual public repository count from GitHub
  useEffect(() => {
    let isMounted = true;
    async function fetchRepoCount() {
      try {
        const cached = sessionStorage.getItem('gh_repo_count_hero');
        if (cached) {
          setRepoCount(parseInt(cached, 10));
          return;
        }

        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.public_repos === 'number' && isMounted) {
            setRepoCount(data.public_repos);
            sessionStorage.setItem('gh_repo_count_hero', data.public_repos.toString());
          }
        }
      } catch {
        // Safe fallback if offline or rate limited
        if (isMounted) setRepoCount(30);
      }
    }

    fetchRepoCount();
    return () => {
      isMounted = false;
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen pt-24 pb-12 sm:pt-28 lg:pt-32 lg:pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-10 xl:pl-28 overflow-hidden"
    >
      {/* Subtle Restrained Ambient Glow Flares */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-cyan-600/5 blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ======================================================= */}
          {/* LEFT COLUMN: Clean Typography, Role, Bio, CTAs, Stats  */}
          {/* ======================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">

            {/* 👋 Hello, I'm Pill Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium w-fit mb-5 sm:mb-6 shadow-sm transition-colors ${
              isDark
                ? 'bg-[#12141c]/90 border-white/10 text-gray-200'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <span className="text-base">👋</span>
              <span>Hello, I'm</span>
            </div>

            {/* Prominent Display Heading */}
            <h1 className={`text-4xl sm:text-6xl lg:text-[66px] font-extrabold leading-[1.08] tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Marthala <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-gray-400">
                Nithin Reddy
              </span>
            </h1>

            {/* Subtitle Role */}
            <h2 className={`text-xl sm:text-2xl font-bold mb-4 tracking-tight ${
              isDark ? 'text-[#8ba3c7]' : 'text-blue-600'
            }`}>
              Full Stack Developer
            </h2>

            {/* Bio Description */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-normal ${
              isDark ? 'text-gray-400' : 'text-slate-600'
            }`}>
              I build scalable digital products, AI-powered applications, and cloud-native systems with a focus on performance, usability, and clean engineering.
            </p>

            {/* CTAs: Explore My Work → & View GitHub ↗ */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                id="hero-explore-work-btn"
                onClick={() => {
                  playClickSound();
                  onExploreClick();
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm sm:text-base shadow-xl hover:bg-gray-100 active:scale-95 transition-all cursor-pointer min-h-[44px]"
              >
                <span>Explore My Work</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>

              <a
                id="hero-github-link"
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border text-sm sm:text-base font-semibold transition-all cursor-pointer active:scale-95 min-h-[44px] ${
                  isDark
                    ? 'bg-[#12141c]/90 border-white/15 text-white hover:bg-white/10 hover:border-white/30'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <span>View GitHub</span>
                <ExternalLink size={15} className="text-gray-400" />
              </a>
            </div>

            {/* Bottom 3-Stat Container Card */}
            <div className={`p-4 sm:p-5 rounded-2xl border max-w-lg backdrop-blur-xl ${
              isDark
                ? 'bg-[#0f1118]/85 border-white/10 shadow-lg shadow-black/40'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-white/10">
                {/* Stat 1: 10 Featured Projects */}
                <div className="flex items-center gap-2.5 pl-1 first:pl-0">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-white/5 border-white/10 text-blue-400' : 'bg-white border-slate-200 text-blue-600'
                  }`}>
                    <Box size={17} />
                  </div>
                  <div>
                    <div className={`text-base sm:text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      10
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight">
                      Featured Projects
                    </div>
                  </div>
                </div>

                {/* Stat 2: Actual Public Repositories */}
                <div className="flex items-center gap-2.5 pl-3 sm:pl-4">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-white border-slate-200 text-emerald-600'
                  }`}>
                    <GitBranch size={17} />
                  </div>
                  <div>
                    <div className={`text-base sm:text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {repoCount}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight">
                      Public Repositories
                    </div>
                  </div>
                </div>

                {/* Stat 3: AI • Cloud • Full Stack */}
                <div className="flex items-center gap-2.5 pl-3 sm:pl-4">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-white/5 border-white/10 text-cyan-400' : 'bg-white border-slate-200 text-cyan-600'
                  }`}>
                    <Cpu size={17} />
                  </div>
                  <div>
                    <div className={`text-xs sm:text-sm font-bold leading-tight uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Full Stack
                    </div>
                    <div className="text-[10px] sm:text-xs text-cyan-400 font-medium leading-tight">
                      AI • Cloud Native
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN: Full Real Three.js 3D Model Workspace     */}
          {/* ======================================================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center w-full min-h-[380px] xs:min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] xl:min-h-[600px]">
            {/* Ambient Cyan/Blue Neon Glow Underlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] sm:w-[75%] lg:w-[88%] aspect-[4/3] rounded-full bg-cyan-500/10 blur-[60px] sm:blur-[90px] lg:blur-[110px] opacity-75" />
              <div className="w-[60%] sm:w-[50%] lg:w-[65%] aspect-[4/3] rounded-full bg-blue-600/10 blur-[50px] sm:blur-[80px] lg:blur-[100px] opacity-65" />
            </div>

            {/* Interactive Real 3D Workspace Scene */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              <DeveloperWorkspace3D theme={theme} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
