export type ProjectCategory = 
  | 'Full Stack'
  | 'AI / ML'
  | 'Cloud / DevOps'
  | 'Security'
  | 'Data / Analytics'
  | 'Frontend';

export interface Project {
  id: string;
  repoName: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  problemSolved: string;
  keyFeatures: string[];
  architecture: string;
  challenges: string;
  results: string;
  visualType: 'browser' | 'terminal' | 'dashboard' | 'architecture';
  githubUrl: string;
  liveUrl?: string;
  badge?: string;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  primaryLanguage?: string;
  openIssues?: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  status: 'Current' | 'Completed';
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    description: string;
    yearsOrProjects: string;
  }[];
}

export interface LeadershipRole {
  id: string;
  role: string;
  organization: string;
  period: string;
  metric: string;
  metricLabel: string;
  highlights: string[];
  impactDescription: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  badgeText: string;
  skills: string[];
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  description: string;
  highlights: string[];
}
