import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowUpRight, Github, ExternalLink, Search, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { FALLBACK_PROJECTS, fetchGithubProjects, GithubSyncInfo } from '../data/projects';
import { ProjectModal } from './ProjectModal';
import { playClickSound, playHoverSound } from '../utils/audio';

const FILTER_CATEGORIES: ('ALL' | ProjectCategory)[] = [
  'ALL',
  'FULL STACK' as ProjectCategory,
  'AI / ML' as ProjectCategory,
  'CLOUD / DEVOPS' as ProjectCategory,
  'SECURITY' as ProjectCategory,
  'DATA / ANALYTICS' as ProjectCategory,
  'FRONTEND' as ProjectCategory,
];

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [syncInfo, setSyncInfo] = useState<GithubSyncInfo>({
    synced: true,
    lastSyncTime: 'Live Synced',
    repoCount: 30,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Fetch GitHub dynamic project stats on mount with caching (prevents redundant requests)
  useEffect(() => {
    let isMounted = true;
    fetchGithubProjects(false).then((data) => {
      if (isMounted) {
        setProjects(data.projects);
        setSyncInfo(data.syncInfo);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleManualSync = async () => {
    playClickSound();
    setIsSyncing(true);
    try {
      const data = await fetchGithubProjects(true);
      setProjects(data.projects);
      setSyncInfo(data.syncInfo);
    } catch {
      // Ignore
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter & search memoization (instant, zero-lag)
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category filter matching
      const matchesCategory =
        selectedCategory === 'ALL' ||
        project.category.toUpperCase() === selectedCategory.toUpperCase();

      if (!matchesCategory) return false;

      // 2. Search query matching
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();

      const inTitle = project.title.toLowerCase().includes(query);
      const inRepo = project.repoName.toLowerCase().includes(query);
      const inDesc = project.shortDescription.toLowerCase().includes(query);
      const inCategory = project.category.toLowerCase().includes(query);
      const inTech = project.technologies.some((t) => t.toLowerCase().includes(query));

      return inTitle || inRepo || inDesc || inCategory || inTech;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Display initial 6 projects, or all 10 when expanded
  const displayedProjects = useMemo(() => {
    if (showAllProjects || searchQuery.trim() !== '' || selectedCategory !== 'ALL') {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 6);
  }, [filteredProjects, showAllProjects, searchQuery, selectedCategory]);

  const renderVisualMockup = (project: Project) => {
    switch (project.visualType) {
      case 'terminal':
        return (
          <div className="w-full h-36 rounded-xl bg-slate-950 dark:bg-black border border-slate-800 dark:border-white/10 p-3 font-mono text-[11px] text-gray-300 flex flex-col justify-between overflow-hidden select-none">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-gray-400">{project.repoName}.service</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="text-blue-400">$ {project.repoName.toLowerCase()} --cluster</div>
              <div className="text-emerald-400">✓ Microservices worker online [PORT 3000]</div>
              <div className="text-gray-400">→ Auth & Queue State: [ACTIVE 200 OK]</div>
            </div>
            <div className="text-[10px] text-blue-400/80 flex items-center justify-between pt-1 border-t border-slate-800 dark:border-white/5">
              <span>Primary: {project.primaryLanguage || 'Python'}</span>
              <span className="text-emerald-400">Production Ready</span>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="w-full h-36 rounded-xl bg-slate-950 dark:bg-black border border-blue-500/20 p-3 flex flex-col justify-between overflow-hidden select-none">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 dark:border-white/5 text-[10px] font-mono text-blue-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {project.category} Telemetry
              </span>
              <span className="text-gray-400">{project.primaryLanguage || 'AI/ML'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-center">
                <div className="text-xs font-bold text-white">99.2%</div>
                <div className="text-[8px] text-gray-400">Precision</div>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-center">
                <div className="text-xs font-bold text-emerald-400">&lt; 150ms</div>
                <div className="text-[8px] text-gray-400">Latency</div>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-center">
                <div className="text-xs font-bold text-blue-400">Active</div>
                <div className="text-[8px] text-gray-400">Pipeline</div>
              </div>
            </div>
            <div className="h-7 rounded-lg bg-blue-950/30 border border-blue-500/10 flex items-center justify-center text-[10px] font-mono text-blue-300">
              [ANALYZING REAL-TIME VECTORS]
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-36 rounded-xl bg-slate-950 dark:bg-black border border-slate-800 dark:border-white/10 p-3 flex flex-col justify-between overflow-hidden select-none">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono text-gray-400">nithinreddy/{project.repoName}</span>
            </div>
            <div className="flex items-center justify-center h-16 bg-gradient-to-br from-blue-950/30 to-indigo-950/30 rounded-lg border border-white/5">
              <div className="text-center px-2">
                <div className="text-sm font-extrabold text-white tracking-tight truncate">{project.title}</div>
                <div className="text-[10px] font-mono text-blue-400">{project.category} • Modern Stack</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-400 flex items-center justify-between">
              <span>{project.technologies[0] || 'TypeScript'}</span>
              <span className="text-blue-400">Verified GitHub Repo</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500 mb-3">
            <Sparkles size={13} />
            <span>04. PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Selected Work
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mt-2">
            A collection of systems, applications and experiments I've built.
          </p>
        </div>

        {/* GitHub Live Sync Status & Manual Refresh Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-gray-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-800 dark:text-gray-300 font-medium">GitHub Synced</span>
            <span className="text-slate-400 dark:text-gray-500">•</span>
            <span className="text-slate-600 dark:text-gray-400">{syncInfo.lastSyncTime}</span>
          </div>

          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="p-2 rounded-xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-500/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shadow-sm"
            title="Refresh GitHub Repos"
            aria-label="Refresh GitHub Repositories"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin text-blue-500' : ''} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-none shadow-sm">
          {FILTER_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toUpperCase() === cat.toUpperCase();
            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects (e.g., AI, Docker, Python)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/40 transition-all font-sans shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {displayedProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10">
          <p className="text-slate-500 dark:text-gray-400 text-sm">No matching projects found for "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="mt-3 text-xs text-blue-500 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => {
            const projectNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={project.id}
                onMouseEnter={() => playHoverSound()}
                className="group p-6 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all duration-200 shadow-md dark:shadow-2xl flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Top Row: Project Number & Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
                      {projectNumber} / 10
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600/10 dark:bg-blue-600/15 border border-blue-500/25 text-[11px] font-mono text-blue-600 dark:text-blue-400">
                      {project.category}
                    </span>
                  </div>

                  {/* Visual Mockup Card */}
                  <div
                    onClick={() => {
                      playClickSound();
                      setSelectedProject(project);
                    }}
                    className="mb-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 group-hover:border-blue-500/25 transition-all duration-200 cursor-pointer shadow-sm dark:shadow-lg"
                  >
                    {renderVisualMockup(project)}
                  </div>

                  {/* Project Name */}
                  <h3
                    onClick={() => {
                      playClickSound();
                      setSelectedProject(project);
                    }}
                    className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-500 transition-colors cursor-pointer mb-2 line-clamp-1"
                    title={project.title}
                  >
                    {project.title}
                  </h3>

                  {/* Short Summary */}
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] text-slate-700 dark:text-gray-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] text-slate-500 dark:text-gray-400 font-mono">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Controls Row */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-500/40 transition-all text-xs flex items-center gap-1"
                      title="View exact GitHub repository"
                      aria-label={`View ${project.repoName} on GitHub`}
                    >
                      <Github size={13} />
                      <span className="text-[11px] font-mono hidden sm:inline">GitHub</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-blue-600/15 dark:bg-blue-600/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:text-white hover:bg-blue-600 transition-all text-xs flex items-center gap-1"
                        title="Live Demo"
                      >
                        <ExternalLink size={13} />
                        <span className="text-[11px] font-mono">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* "View All Projects" / "Show Less" Expand Button */}
      {selectedCategory === 'ALL' && !searchQuery && projects.length > 6 && (
        <div className="mt-12 flex justify-center">
          <button
            id="view-all-projects-toggle"
            onClick={() => {
              playClickSound();
              setShowAllProjects(!showAllProjects);
            }}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-300 dark:border-white/15 hover:border-blue-500/40 text-sm font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-all shadow-md dark:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
          >
            <span>{showAllProjects ? 'Show Top 6 Projects' : 'View All Projects (10)'}</span>
            {showAllProjects ? (
              <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      )}

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
