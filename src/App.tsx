import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SideNav } from './components/SideNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Sync theme with HTML document element dataset and classes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // High-performance IntersectionObserver for ScrollSpy (zero scroll-event lag)
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'certifications', 'education', 'contact'];
    const visibilityMap = new Map<string, number>();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        visibilityMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      let bestSection = 'hero';
      let highestRatio = 0;

      visibilityMap.forEach((ratio, id) => {
        if (ratio > highestRatio) {
          highestRatio = ratio;
          bestSection = id;
        }
      });

      if (highestRatio > 0.05) {
        setActiveSection(bestSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-5% 0px -25% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen relative selection:bg-blue-600 selection:text-white overflow-x-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0A] text-[#f1f5f9]' : 'bg-[#f8fafc] text-[#0f172a]'
    }`}>
      {/* Top 1px Sentinel for Navbar IntersectionObserver (Eliminating window.onscroll) */}
      <div id="top-sentinel" className="absolute top-0 left-0 w-full h-[10px] pointer-events-none" />

      {/* Smooth Trailing Desktop Custom Cursor (Zero-rerender RAF + Direct DOM transforms) */}
      <CustomCursor />

      {/* Top Sticky Glass Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenResume={() => setResumeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Left Floating Dark Glass Rail (Desktop) */}
      <SideNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenResume={() => setResumeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* 1. Hero / Workstation */}
        <Hero
          onExploreClick={() => scrollToSection('projects')}
          onOpenResume={() => setResumeOpen(true)}
          theme={theme}
        />

        {/* 2. About Me */}
        <About />

        {/* 3. Skills & Technologies Ecosystem */}
        <Skills />

        {/* 4. Selected Work (Top 10 GitHub Projects) */}
        <Projects />

        {/* 5. Experience Timeline */}
        <Experience />

        {/* 6. Achievements & Leadership */}
        <Achievements />

        {/* 7. Certifications */}
        <Certifications />

        {/* 8. Education */}
        <Education />

        {/* 9. Contact / Let's Build Something Great */}
        <Contact />
      </main>

      {/* 10. Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Resume Viewer / Download Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
