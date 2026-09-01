import React, { useState } from 'react';
import { Terminal, Shield, Cloud, Cpu, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

const CORE_PILLARS = [
  {
    icon: Code2,
    title: 'Full Stack Engineering',
    description: 'Developing end-to-end web applications with React, TypeScript, Node.js, and clean RESTful API contracts.',
    border: 'border-blue-500/30',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps Automation',
    description: 'Deploying containerized microservices via Docker, automating CI/CD pipelines, and provisioning Azure resources with Terraform.',
    border: 'border-sky-500/30',
  },
  {
    icon: Shield,
    title: 'Cybersecurity & SIEM Analysis',
    description: 'Monitoring defensive telemetry, threat vector correlation with Microsoft Sentinel, and network packet analysis.',
    border: 'border-indigo-500/30',
  },
  {
    icon: Cpu,
    title: 'AI Systems & Modern Web',
    description: 'Integrating intelligent AI APIs, creative 3D WebGL experiences, and performance-optimized frontends.',
    border: 'border-purple-500/30',
  },
];

const JOURNEY_MILESTONES = [
  {
    year: '2021 — 2022',
    title: 'Core Foundations & Programming',
    description: 'Mastered Data Structures & Algorithms, Object-Oriented Programming, and Linux fundamentals at SRMIST.',
  },
  {
    year: '2022 — 2023',
    title: 'Full Stack & Community Leadership',
    description: 'Built production web apps, assumed leadership as Committee Head at DSA SRMIST, increasing workshop engagement by 30%.',
  },
  {
    year: '2023 — Present',
    title: 'Cloud, SIEM & Convenor Leadership',
    description: 'Appointed Convenor of DSA SRMIST guiding 500+ heads and members; engineered Cloud & SIEM telemetry projects.',
  },
];

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'journey'>('philosophy');

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500 mb-3">
          <Sparkles size={13} />
          <span>01. ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Engineering with Purpose & Precision.
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mt-3">
          A balance of technical rigor, architectural clarity, and leadership in software development.
        </p>
      </div>

      {/* Main Grid: Left Personal Narrative & Right Architecture Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Bio & Core Values */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Software Engineer & Community Builder
            </h3>

            <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
              I am <strong className="text-slate-950 dark:text-white font-semibold">Marthala Nithin Reddy</strong>, a software engineer based in India with a strong background in full-stack web platforms, cloud computing, and cybersecurity telemetry.
            </p>

            <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
              Beyond pure coding, I serve as the <strong className="text-slate-950 dark:text-white">Convenor at DSA SRMIST</strong>, guiding over 500+ committee heads and student developers. I believe great software is built on resilient architecture, accessible design, and continuous collaborative learning.
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-medium">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>Modern React & TypeScript</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-medium">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>Microservices & REST APIs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-medium">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>Microsoft Azure & Docker</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300 font-medium">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                <span>SIEM & Sentinel Telemetry</span>
              </div>
            </div>
          </div>

          {/* Interactive Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CORE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  onMouseEnter={() => playHoverSound()}
                  className={`p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:${pillar.border} hover:border-blue-400/50 shadow-md dark:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
                >
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-white/5 w-fit mb-3 text-blue-600 dark:text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white mb-1.5">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Development Timeline & Visualizer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-colors duration-300">
            {/* Tab switch */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/10">
              <span className="text-sm font-bold text-slate-950 dark:text-white">Development Journey</span>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTab('philosophy');
                  }}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    activeTab === 'philosophy'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Highlights
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setActiveTab('journey');
                  }}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    activeTab === 'journey'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Timeline
                </button>
              </div>
            </div>

            {activeTab === 'philosophy' ? (
              <div className="space-y-4">
                {/* Code Terminal Visualizer Card */}
                <div className="rounded-2xl bg-slate-950 dark:bg-black border border-slate-800 dark:border-white/10 p-4 font-mono text-xs text-gray-300 shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 dark:border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-gray-500">engineer.profile.json</span>
                  </div>

                  <div className="space-y-1 text-[12px] leading-relaxed">
                    <div><span className="text-purple-400">const</span> <span className="text-blue-400">engineer</span> = &#123;</div>
                    <div className="pl-4"><span className="text-sky-300">name</span>: <span className="text-emerald-300">"Marthala Nithin Reddy"</span>,</div>
                    <div className="pl-4"><span className="text-sky-300">role</span>: <span className="text-emerald-300">"Full Stack Developer"</span>,</div>
                    <div className="pl-4"><span className="text-sky-300">leadership</span>: <span className="text-emerald-300">"Convenor @ DSA SRMIST"</span>,</div>
                    <div className="pl-4"><span className="text-sky-300">specialties</span>: [</div>
                    <div className="pl-8 text-amber-300">"Full Stack", "Cloud / Azure", "DevOps", "SIEM"</div>
                    <div className="pl-4">],</div>
                    <div className="pl-4"><span className="text-sky-300">passion</span>: <span className="text-emerald-300">"100% Scalable & Clean Code"</span></div>
                    <div>&#125;;</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-300 leading-relaxed flex items-start gap-3">
                  <Terminal size={18} className="shrink-0 text-blue-500 dark:text-blue-400 mt-0.5" />
                  <span>
                    Focusing on building dependable production architectures that integrate intuitive UI design with robust, secure backend foundations.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-white/10 pl-6">
                {JOURNEY_MILESTONES.map((milestone) => (
                  <div key={milestone.year} className="relative group">
                    <span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#0A0A0A]" />
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">{milestone.year}</span>
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white mt-0.5">{milestone.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 leading-relaxed">{milestone.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
