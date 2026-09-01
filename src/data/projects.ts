import { Project, ProjectCategory } from '../types';
import { FALLBACK_PROJECTS } from './fallbackProjects';

export { FALLBACK_PROJECTS };
export const GITHUB_USERNAME = 'Nithinreddy3093';

export interface GithubSyncInfo {
  synced: boolean;
  lastSyncTime: string;
  repoCount: number;
  source?: 'github' | 'sessionStorage' | 'localStorage' | 'fallback';
}

export interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
  created_at: string;
  fork: boolean;
  visibility?: string;
}

const CACHE_KEY = 'gh_projects_session_cache_v3';
const CACHE_TIME_KEY = 'gh_projects_session_cache_time_v3';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// In-memory runtime cache for the active browser session
let inMemoryCache: { projects: Project[]; syncInfo: GithubSyncInfo; timestamp: number } | null = null;

/**
 * Determine category heuristically for newly discovered GitHub repos
 */
function inferCategory(repo: GitHubApiRepo): ProjectCategory {
  const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')} ${repo.language || ''}`.toLowerCase();
  
  if (text.includes('ai') || text.includes('ml') || text.includes('learning') || text.includes('genkit') || text.includes('gemini') || text.includes('model') || text.includes('xgboost')) {
    return 'AI / ML';
  }
  if (text.includes('security') || text.includes('malware') || text.includes('guardian') || text.includes('siem') || text.includes('token') || text.includes('auth') || text.includes('jwt')) {
    return 'Security';
  }
  if (text.includes('microservice') || text.includes('docker') || text.includes('kubernetes') || text.includes('devops') || text.includes('rabbitmq') || text.includes('helm') || text.includes('cloud')) {
    return 'Cloud / DevOps';
  }
  if (text.includes('analytics') || text.includes('dashboard') || text.includes('stock') || text.includes('trading') || text.includes('sales') || text.includes('pandas') || text.includes('data')) {
    return 'Data / Analytics';
  }
  if (text.includes('react') || text.includes('ui') || text.includes('frontend') || text.includes('css') || text.includes('next') || text.includes('web')) {
    return 'Frontend';
  }
  return 'Full Stack';
}

/**
 * Infer visual mockup type based on technologies and category
 */
function inferVisualType(category: ProjectCategory, language?: string | null): 'browser' | 'terminal' | 'dashboard' | 'architecture' {
  if (category === 'Cloud / DevOps') return 'terminal';
  if (category === 'Data / Analytics' || category === 'Security') return 'dashboard';
  if (language === 'Python' || language === 'Shell') return 'terminal';
  return 'browser';
}

/**
 * Reads cached GitHub project data from sessionStorage (preferred) or localStorage with TTL check.
 */
function readStorageCache(): { projects: Project[]; syncInfo: GithubSyncInfo } | null {
  try {
    // 1. Check in-memory cache first
    if (inMemoryCache && Date.now() - inMemoryCache.timestamp < CACHE_TTL_MS) {
      return {
        projects: inMemoryCache.projects,
        syncInfo: {
          ...inMemoryCache.syncInfo,
          source: 'sessionStorage',
        },
      };
    }

    // 2. Check sessionStorage
    let raw = sessionStorage.getItem(CACHE_KEY);
    let rawTime = sessionStorage.getItem(CACHE_TIME_KEY);

    // 3. Fallback to localStorage if sessionStorage is empty
    if (!raw || !rawTime) {
      raw = localStorage.getItem(CACHE_KEY);
      rawTime = localStorage.getItem(CACHE_TIME_KEY);
    }

    if (raw && rawTime) {
      const parsedTime = parseInt(rawTime, 10);
      const age = Date.now() - parsedTime;
      if (age < CACHE_TTL_MS) {
        const parsed = JSON.parse(raw) as { projects: Project[]; syncInfo: GithubSyncInfo };
        if (Array.isArray(parsed.projects) && parsed.projects.length >= 10) {
          const minutesAgo = Math.floor(age / 60000);
          const timeLabel = minutesAgo <= 0 ? 'Just now' : `${minutesAgo}m ago`;
          
          const result = {
            projects: parsed.projects,
            syncInfo: {
              ...parsed.syncInfo,
              synced: true,
              lastSyncTime: timeLabel,
              source: 'sessionStorage' as const,
            },
          };
          // Store in memory
          inMemoryCache = { ...result, timestamp: parsedTime };
          return result;
        }
      }
    }
  } catch {
    // Storage quota or parsing error ignored
  }
  return null;
}

/**
 * Saves project data to sessionStorage, localStorage, and in-memory cache.
 */
function writeStorageCache(data: { projects: Project[]; syncInfo: GithubSyncInfo }) {
  try {
    const now = Date.now();
    const serialized = JSON.stringify(data);
    
    // Save to in-memory
    inMemoryCache = { ...data, timestamp: now };

    // Save to sessionStorage
    sessionStorage.setItem(CACHE_KEY, serialized);
    sessionStorage.setItem(CACHE_TIME_KEY, now.toString());

    // Also persist to localStorage for cross-tab persistence
    localStorage.setItem(CACHE_KEY, serialized);
    localStorage.setItem(CACHE_TIME_KEY, now.toString());
  } catch {
    // Storage full or private mode
  }
}

/**
 * Fetches public repositories for 'Nithinreddy3093' from the GitHub REST API.
 * Uses sessionStorage / in-memory caching to avoid redundant network roundtrips.
 * Reverts seamlessly to `FALLBACK_PROJECTS` if offline, blocked, or rate-limited.
 */
export async function fetchGithubProjects(forceRefresh = false): Promise<{ projects: Project[]; syncInfo: GithubSyncInfo }> {
  const defaultFallbackInfo: GithubSyncInfo = {
    synced: true,
    lastSyncTime: 'Offline / Fallback Data',
    repoCount: FALLBACK_PROJECTS.length,
    source: 'fallback',
  };

  // 1. Check cache unless explicitly force-refreshing
  if (!forceRefresh) {
    const cached = readStorageCache();
    if (cached) {
      return cached;
    }
  }

  // 2. Fetch from GitHub API with an abort controller timeout (4.5s)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`GitHub API returned status ${response.status}. Using fallback dataset.`);
      return { projects: FALLBACK_PROJECTS, syncInfo: defaultFallbackInfo };
    }

    const repos: GitHubApiRepo[] = await response.json();
    if (!Array.isArray(repos)) {
      return { projects: FALLBACK_PROJECTS, syncInfo: defaultFallbackInfo };
    }

    // 3. Merge verified detailed projects with live GitHub stats
    const updatedProjects: Project[] = FALLBACK_PROJECTS.map((fallbackProj) => {
      const matching = repos.find(
        (r) => r.name.toLowerCase() === fallbackProj.repoName.toLowerCase()
      );

      if (matching) {
        return {
          ...fallbackProj,
          stars: matching.stargazers_count ?? fallbackProj.stars,
          forks: matching.forks_count ?? fallbackProj.forks,
          openIssues: matching.open_issues_count,
          liveUrl: matching.homepage && matching.homepage.trim() !== '' ? matching.homepage : fallbackProj.liveUrl,
          primaryLanguage: matching.language || fallbackProj.primaryLanguage,
          updatedAt: matching.pushed_at
            ? new Date(matching.pushed_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : fallbackProj.updatedAt,
        };
      }
      return fallbackProj;
    });

    const syncInfo: GithubSyncInfo = {
      synced: true,
      lastSyncTime: 'Just now',
      repoCount: repos.length > 0 ? repos.length : FALLBACK_PROJECTS.length,
      source: 'github',
    };

    const finalResult = {
      projects: updatedProjects,
      syncInfo,
    };

    // 4. Save to sessionStorage and localStorage cache
    writeStorageCache(finalResult);

    return finalResult;
  } catch (error) {
    console.warn('GitHub API request failed or timed out. Falling back to local dataset.', error);
    return {
      projects: FALLBACK_PROJECTS,
      syncInfo: defaultFallbackInfo,
    };
  }
}
