import React from 'react';
import { X, Download, Printer, Mail, MapPin, Github, Linkedin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, LEADERSHIP_EXPERIENCE, EDUCATION } from '../data/portfolioData';
import { playClickSound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleDownload = () => {
    playClickSound();
    // Try to download /resume.pdf or trigger print to save as PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Marthala_Nithin_Reddy_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 transition-colors duration-300">
        
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-black/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-600/30">
              MR
            </div>
            <span className="text-xs font-mono text-slate-600 dark:text-gray-400">Curriculum Vitae Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white text-xs font-medium transition-all cursor-pointer"
              title="Print Resume"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              title="Download Resume PDF"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-full glass-pill text-slate-600 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white ml-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-800 dark:text-gray-200 print:p-0 print:bg-white print:text-black">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-white/10 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">{PERSONAL_INFO.name}</h1>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1">{PERSONAL_INFO.role}</h2>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs font-mono text-slate-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-blue-500" /> {PERSONAL_INFO.location}</span>
              <span className="flex items-center gap-1.5"><Mail size={13} className="text-blue-500" /> {PERSONAL_INFO.email}</span>
              <span className="flex items-center gap-1.5"><Github size={13} className="text-blue-500" /> github.com/NithinReddy3093</span>
              <span className="flex items-center gap-1.5"><Linkedin size={13} className="text-blue-500" /> linkedin.com/in/nithin-marthala</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-2">Professional Summary</h3>
            <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
              {PERSONAL_INFO.longBio}
            </p>
          </div>

          {/* Leadership & Impact */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-3 flex items-center gap-2">
              <Award size={15} />
              Leadership & Community Impact
            </h3>
            <div className="space-y-4">
              {LEADERSHIP_EXPERIENCE.map((role) => (
                <div key={role.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{role.role} — {role.organization}</span>
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400">{role.period}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-gray-400 mb-2 font-medium">Impact: {role.metric} {role.metricLabel}</div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-gray-300 list-disc list-inside">
                    {role.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-3">Technical Proficiencies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                <span className="font-bold text-slate-950 dark:text-white">Frontend:</span> React, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                <span className="font-bold text-slate-950 dark:text-white">Backend & APIs:</span> Node.js, Express, Python, REST APIs, JWT
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                <span className="font-bold text-slate-950 dark:text-white">Cloud & DevOps:</span> Microsoft Azure, Docker, Kubernetes, Terraform, CI/CD, Git
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                <span className="font-bold text-slate-950 dark:text-white">Databases & Security:</span> MongoDB, SQL, SIEM Concepts, Microsoft Sentinel, Wireshark, Splunk
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-3 flex items-center gap-2">
              <Briefcase size={15} />
              Engineering Experience
            </h3>
            <div className="space-y-4">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{exp.role}</span>
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-400">{exp.period}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-gray-400 mb-2">{exp.company} • {exp.location}</div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-gray-300 list-disc list-inside">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-3 flex items-center gap-2">
              <GraduationCap size={15} />
              Education
            </h3>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-bold text-slate-950 dark:text-white">{edu.degree}</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-gray-400">{edu.period}</span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mb-2">{edu.institution} — {edu.location}</div>
                <p className="text-xs text-slate-600 dark:text-gray-400">{edu.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
