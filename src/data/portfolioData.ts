import { Project, ExperienceItem, SkillCategory, LeadershipRole, Certification, EducationItem } from '../types';
import { FALLBACK_PROJECTS } from './projects';

export const FEATURED_PROJECTS: Project[] = FALLBACK_PROJECTS;

export const PERSONAL_INFO = {
  name: 'Marthala Nithin Reddy',
  shortName: 'Nithin Reddy',
  logoText: 'MR',
  role: 'Full Stack Developer',
  tagline: 'Software Engineer & Full Stack Developer',
  location: 'India',
  email: 'marthalanithinreddy3093@gmail.com',
  githubUrl: 'https://github.com/Nithinreddy3093',
  linkedinUrl: 'https://linkedin.com/in/nithin-marthala',
  bio: 'Building scalable, secure and visually engaging digital experiences with modern web and cloud technologies.',
  longBio: 'I am a passionate software engineer and full-stack developer based in India with deep interests in building resilient web architectures, modern cloud platforms, DevOps automation, cybersecurity engineering, and AI-powered digital products. My focus lies at the intersection of robust backend engineering, intuitive frontend interfaces, and secure infrastructure.',
  stats: [
    { value: '10', label: 'Featured Projects', icon: 'Code' },
    { value: '30+', label: 'Public Repositories', icon: 'Github' },
    { value: '100%', label: 'Commitment to Quality', icon: 'Rocket' },
  ],
  status: 'Open to Opportunities',
};

export const TECH_STACK_HERO = [
  { name: 'React', icon: '⚛️', color: '#61DAFB', category: 'Frontend' },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E', category: 'Language' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', category: 'Language' },
  { name: 'Node.js', icon: 'IS', color: '#339933', category: 'Backend' },
  { name: 'Python', icon: '🐍', color: '#3776AB', category: 'Backend/AI' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', category: 'Database' },
  { name: 'Docker', icon: '🐳', color: '#2496ED', category: 'DevOps' },
  { name: 'Git', icon: '📦', color: '#F05032', category: 'Tools' },
  { name: 'Azure', icon: '☁️', color: '#0089D6', category: 'Cloud' },
  { name: 'Kubernetes', icon: '☸️', color: '#326CE5', category: 'DevOps' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    iconName: 'Layout',
    description: 'Creating high-performance, accessible, and responsive user interfaces with modern component architectures.',
    skills: [
      { name: 'React', level: 90, icon: '⚛️', description: 'Component lifecycles, hooks, context API, state management', yearsOrProjects: 'Core Frontend' },
      { name: 'TypeScript', level: 88, icon: 'TS', description: 'Strict type safety, generics, interfaces, scalable architecture', yearsOrProjects: 'Primary Lang' },
      { name: 'JavaScript (ES6+)', level: 92, icon: 'JS', description: 'Async/await, DOM, closures, modern ES standards', yearsOrProjects: 'Foundation' },
      { name: 'Tailwind CSS', level: 94, icon: '🎨', description: 'Utility-first rapid prototyping, custom design tokens, responsive layouts', yearsOrProjects: 'Styling' },
      { name: 'HTML5 & Semantic Web', level: 95, icon: '🌐', description: 'Accessibility (a11y), SEO tags, clean document hierarchy', yearsOrProjects: 'Foundation' },
      { name: 'CSS3 / Animations', level: 88, icon: '✨', description: 'Flexbox, CSS Grid, custom properties, keyframe animations', yearsOrProjects: 'Styling' },
    ],
  },
  {
    title: 'Backend',
    iconName: 'Server',
    description: 'Designing reliable server architectures, RESTful API microservices, and asynchronous services.',
    skills: [
      { name: 'Node.js', level: 88, icon: '🟩', description: 'Non-blocking I/O event loops, stream processing, middleware pipelines', yearsOrProjects: 'Primary Backend' },
      { name: 'Express.js', level: 90, icon: '⚡', description: 'Routing, middleware chains, token validation, secure headers', yearsOrProjects: 'Framework' },
      { name: 'Python', level: 84, icon: '🐍', description: 'Data structures, scripting, automation, API integration', yearsOrProjects: 'Backend & Automation' },
      { name: 'REST APIs', level: 92, icon: '🔌', description: 'RESTful conventions, JSON schema validation, HTTP error codes, CRUD', yearsOrProjects: 'Architecture' },
    ],
  },
  {
    title: 'Databases',
    iconName: 'Database',
    description: 'Structuring schemas, optimizing queries, and handling transactional data integrity.',
    skills: [
      { name: 'MongoDB', level: 86, icon: '🍃', description: 'NoSQL aggregation pipelines, Mongoose schemas, document indexing', yearsOrProjects: 'NoSQL Database' },
      { name: 'SQL', level: 85, icon: '🗄️', description: 'Relational schema design, JOIN queries, normalization, ACID properties', yearsOrProjects: 'Relational DB' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    iconName: 'Cloud',
    description: 'Deploying scalable containerized workloads, configuring cloud infrastructure, and automating CI/CD pipelines.',
    skills: [
      { name: 'Microsoft Azure', level: 82, icon: '☁️', description: 'Azure App Services, VMs, Azure Blob Storage, Resource Groups', yearsOrProjects: 'Cloud Platform' },
      { name: 'Docker', level: 86, icon: '🐳', description: 'Containerization, multi-stage Dockerfiles, Docker Compose networking', yearsOrProjects: 'Containers' },
      { name: 'Kubernetes', level: 78, icon: '☸️', description: 'Pods, deployments, services, cluster configuration basics', yearsOrProjects: 'Orchestration' },
      { name: 'Terraform', level: 76, icon: '🏗️', description: 'Infrastructure as Code (IaC), declarative cloud provisioning', yearsOrProjects: 'IaC' },
      { name: 'CI/CD Pipelines', level: 84, icon: '🔄', description: 'GitHub Actions workflows, build-test-deploy pipelines', yearsOrProjects: 'Automation' },
      { name: 'Git & GitHub', level: 92, icon: '📦', description: 'Branch management, pull requests, semantic versioning, CI triggers', yearsOrProjects: 'VCS' },
    ],
  },
  {
    title: 'Security',
    iconName: 'ShieldCheck',
    description: 'Understanding defensive security fundamentals, network packet analysis, and security incident monitoring.',
    skills: [
      { name: 'SIEM Concepts', level: 82, icon: '🛡️', description: 'Log aggregation, correlation rules, incident response lifecycles', yearsOrProjects: 'SecOps' },
      { name: 'Microsoft Sentinel', level: 80, icon: '🛰️', description: 'Cloud-native SIEM, analytics rules, KQL queries, incident triage', yearsOrProjects: 'Cloud SIEM' },
      { name: 'Threat Detection & Analysis', level: 82, icon: '🔍', description: 'Identifying attack vectors, analyzing malicious telemetry', yearsOrProjects: 'Analysis' },
      { name: 'Wireshark', level: 80, icon: '🦈', description: 'Network protocol packet inspection, TCP/IP streams, handshake analysis', yearsOrProjects: 'Network Security' },
      { name: 'Splunk', level: 78, icon: '📊', description: 'Index creation, Search Processing Language (SPL), security dashboards', yearsOrProjects: 'Monitoring' },
      { name: 'Nmap & Burp Suite', level: 76, icon: '🎯', description: 'Port scanning, service discovery, web proxy interception', yearsOrProjects: 'Tools' },
    ],
  },
  {
    title: 'Tools & Environments',
    iconName: 'Terminal',
    description: 'Daily developer tooling, terminal mastery, and operating system configuration.',
    skills: [
      { name: 'Linux / Unix', level: 86, icon: '🐧', description: 'Shell scripting, file permissions, daemon management, SSH', yearsOrProjects: 'OS' },
      { name: 'VS Code & Tooling', level: 94, icon: '💻', description: 'Advanced extensions, remote SSH debugging, GitLens', yearsOrProjects: 'IDE' },
      { name: 'Postman & API Testing', level: 90, icon: '🚀', description: 'Endpoint verification, automated test suites, env variables', yearsOrProjects: 'API Tooling' },
      { name: 'Bash Scripting', level: 82, icon: '📜', description: 'Automation scripts, cron tasks, deployment scripts', yearsOrProjects: 'Scripting' },
    ],
  },
];

export const LEADERSHIP_EXPERIENCE: LeadershipRole[] = [
  {
    id: 'convenor-dsa',
    role: 'Convenor',
    organization: 'DSA SRMIST (Data Structures & Algorithms SRMIST)',
    period: '2023 — Present',
    metric: '500+',
    metricLabel: 'Heads, Members & Volunteers Guided',
    highlights: [
      'Led and guided 500+ committee heads, committee members, and volunteers across multiple technical wings.',
      'Coordinated large-scale technical initiatives, coding hackathons, and algorithmic masterclasses.',
      'Managed end-to-end strategic planning, cross-functional communication, and technical execution.',
      'Fostered a vibrant developer culture empowering hundreds of engineering students to master technical problem solving.',
    ],
    impactDescription: 'Spearheaded organization-wide technical direction, standardizing workshop curriculums and mentoring junior leaders in effective engineering community management.',
    skills: ['Leadership', 'Event Management', 'Technical Mentorship', 'Strategic Planning', 'Public Speaking'],
  },
  {
    id: 'committee-head-dsa',
    role: 'Committee Head',
    organization: 'DSA SRMIST',
    period: '2022 — 2023',
    metric: '+30%',
    metricLabel: 'Growth in Technical Participation',
    highlights: [
      'Increased technical workshop participation by 30% through structured outreach and revamped technical curricula.',
      'Formulated structured planning and execution pipelines for weekly coding competitions.',
      'Facilitated team coordination, task allocation, and logistical management for departmental events.',
      'Organized hands-on technical bootcamps in data structures, web development, and competitive programming.',
    ],
    impactDescription: 'Revitalized member engagement by introducing interactive live coding sessions and structured problem-solving tracks that attracted record student turnouts.',
    skills: ['Team Coordination', 'Curriculum Design', 'Workshop Facilitation', 'Operations', 'Community Growth'],
  },
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'software-engineering-fellow',
    role: 'Full Stack & Software Engineering [Practicum / Projects]',
    company: 'Independent Engineering & Academic Projects',
    location: 'India',
    period: '2023 — Present',
    status: 'Current',
    type: 'Engineering & Leadership',
    description: 'Designing and deploying scalable full-stack web applications, cloud architectures on Azure, and defensive security log analysis systems.',
    responsibilities: [
      'Engineered responsive full-stack applications using React, TypeScript, Node.js, Express, and MongoDB.',
      'Configured cloud resources and containerized services using Microsoft Azure, Docker, and CI/CD pipelines.',
      'Implemented threat detection telemetry pipelines analyzing simulated network incidents using SIEM methodologies.',
      'Created modular API architectures with JWT token authentication, rate limiting, and robust error handling.',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Azure', 'Docker', 'Git'],
    highlights: ['Built 5+ production-grade applications', 'Continuous learning across Cloud & DevOps paradigms'],
  },
  {
    id: 'technical-coordinator',
    role: 'Technical Lead & Core Organizer',
    company: 'DSA SRMIST',
    location: 'SRMIST, India',
    period: '2022 — Present',
    status: 'Current',
    type: 'Leadership & Technical Community',
    description: 'Leading technical initiatives, technical mentoring, and event infrastructure for large-scale university hackathons and algorithmic workshops.',
    responsibilities: [
      'Directed large technical teams organizing university-wide coding challenges and engineering symposiums.',
      'Authored problem sets and instructional guides covering Data Structures, Web Systems, and Cloud tools.',
      'Collaborated with university faculty and student organizations to streamline event operations.',
    ],
    technologies: ['Technical Leadership', 'Event Operations', 'Curriculum Planning', 'Mentorship'],
    highlights: ['Guided 500+ participants and members', 'Boosted engagement by 30%'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-azure',
    title: 'Microsoft Certified: Azure Cloud Fundamentals',
    issuer: 'Microsoft',
    issueDate: '2024',
    badgeText: 'Cloud Certified',
    skills: ['Azure Cloud', 'Virtual Machines', 'Blob Storage', 'Cloud Architecture'],
    description: 'Core foundational knowledge of cloud services, security, privacy, compliance, and Azure architecture.',
  },
  {
    id: 'cert-cybersec',
    title: 'Cybersecurity Fundamentals & Threat Analysis',
    issuer: 'Industry Recognized Credential',
    issueDate: '2023',
    badgeText: 'Security Specialization',
    skills: ['SIEM', 'Threat Detection', 'Wireshark', 'Network Defense'],
    description: 'Defensive security analysis, incident response concepts, protocol analysis, and SIEM monitoring frameworks.',
  },
  {
    id: 'cert-fullstack',
    title: 'Full Stack Web Development & Modern JavaScript',
    issuer: 'Technical Certification Track',
    issueDate: '2023',
    badgeText: 'Full Stack',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    description: 'Architecting end-to-end full stack web platforms, database modeling, and asynchronous backend services.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
    institution: 'SRM Institute of Science and Technology (SRMIST)',
    location: 'India',
    period: '2021 — 2025',
    grade: 'First Class with Distinction',
    description: 'Comprehensive study of computer science fundamentals, algorithms, software engineering, cloud computing, distributed systems, and computer network security.',
    highlights: [
      'Active Convenor & Leader at DSA SRMIST guiding over 500+ members and volunteers',
      'Relevant Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, Cloud Computing, Cryptography & Information Security',
      'Organized major departmental hackathons and technical symposiums',
    ],
  },
];
