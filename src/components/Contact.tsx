import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Sparkles, CheckCircle2, Copy, Check, ArrowUpRight, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound, playSuccessSound } from '../utils/audio';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please enter a message of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    playClickSound();

    // Simulate sending client message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccessSound();

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#3b82f6', '#60a5fa', '#ffffff', '#93c5fd'],
        });
      } catch {
        // Ignore confetti fallback
      }
    }, 900);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:pl-28 max-w-7xl mx-auto">
      {/* Container matching theme */}
      <div className="relative rounded-[28px] sm:rounded-[40px] bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 p-6 sm:p-12 lg:p-16 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300">
        
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">
          
          {/* Left Column: Direct Links & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-blue-500">
              <Sparkles size={13} />
              <span>08. GET IN TOUCH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Let's Build Something Great.
            </h2>

            <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Have an idea, opportunity, or project in mind? Let's connect. Whether you're hiring for a software engineering role, discussing cloud infrastructure, or exploring collaboration, my inbox is always open.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-600/30"
              >
                <Mail size={16} />
                <span>Email Me</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-pill hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white text-xs sm:text-sm font-medium border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all"
              >
                <Linkedin size={16} className="text-blue-500" />
                <span>LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-pill hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white text-xs sm:text-sm font-medium border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all"
              >
                <Github size={16} />
                <span>GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Copy Email Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-gray-400">Direct Email Address</div>
                  <div className="text-sm font-mono text-slate-900 dark:text-white select-all">{PERSONAL_INFO.email}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-2 rounded-xl glass-pill hover:bg-slate-200 dark:hover:bg-white/10 text-xs text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copy to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl backdrop-blur-xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">Message Received!</h3>
                  <p className="text-sm text-slate-700 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out, <strong className="text-slate-950 dark:text-white">{name}</strong>. I've received your note and will get back to you promptly at <span className="text-blue-500 font-mono">{email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl glass-pill hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-semibold text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/5 mb-4">
                    <span className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                      <MessageSquare size={16} className="text-blue-500" />
                      Send a Direct Message
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-gray-500">Fast Response</span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-300 animate-in fade-in">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-slate-600 dark:text-gray-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-slate-600 dark:text-gray-400 mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-600 dark:text-gray-400 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project, opportunity, or question..."
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
