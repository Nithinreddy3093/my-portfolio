import React, { useState } from 'react';
import { X, Github, ExternalLink, Sparkles, CheckCircle2, Cpu, AlertCircle, TrendingUp, Star, GitFork, Calendar, Code } from 'lucide-react';
import { Project } from '../types';
import { playClickSound } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'challenges'>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-8 lg:p-10 animate-in zoom-in-95 duration-150 transition-colors duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:border-blue-500/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
          aria-label="Close Project Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-blue-600/15 dark:bg-blue-600/20 border border-blue-500/30 text-xs font-mono text-blue-600 dark:text-blue-400">
              {project.category}
            </span>
            {project.badge && (
              <span className="px-3 py-0.5 rounded-full bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/30 text-xs font-mono text-purple-600 dark:text-purple-400">
                {project.badge}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-gray-400">
              {project.primaryLanguage || 'TypeScript'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {project.title}
          </h2>

          <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* GitHub Metadata Quick Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Star size={13} className="text-amber-500" />
              <span>{project.stars ?? 0} Stars</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork size={13} className="text-blue-500" />
              <span>{project.forks ?? 0} Forks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-emerald-500" />
              <span>{project.updatedAt || 'Active'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-gray-500">
              <Code size={13} />
              <span>Repo: {project.repoName}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('overview');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            Overview & Features
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('architecture');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            Architecture & Pipeline
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('challenges');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'challenges'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            Challenges & Outcomes
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-gray-400 mb-2">Problem Statement</h4>
                <p className="text-sm text-slate-800 dark:text-gray-200 leading-relaxed">{project.problemSolved}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-500" />
                  Key Features & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-gray-400 mb-2">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-600 dark:text-blue-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-950 dark:bg-[#080a0f] border border-blue-500/20 font-mono text-xs text-blue-300">
                <div className="flex items-center gap-2 mb-3 text-white font-bold">
                  <Cpu size={16} className="text-blue-400" />
                  <span>System Architecture Diagram</span>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 leading-relaxed text-gray-300">
                  {project.architecture}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-gray-400 mb-2">Technical Implementation Depth</h4>
                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">{project.fullDescription}</p>
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                  <AlertCircle size={15} />
                  Engineering Challenges Overcome
                </h4>
                <p className="text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">{project.challenges}</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <TrendingUp size={15} />
                  Measured Results & Benchmark
                </h4>
                <p className="text-sm text-emerald-900 dark:text-emerald-200/90 leading-relaxed">{project.results}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold transition-all border border-slate-200 dark:border-white/10"
            >
              <Github size={16} />
              <span>View Source on GitHub</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-600/30"
              >
                <ExternalLink size={16} />
                <span>Live Showcase</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white text-xs sm:text-sm font-medium cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
