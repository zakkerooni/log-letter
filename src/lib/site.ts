import bundled from '../copy/site.json';

export type Site = typeof bundled;

const REPO = 'zakkerooni/log-letter';
const PATH = 'src/copy/site.json';
const BRANCH = 'main';
const API_URL = `https://api.github.com/repos/${REPO}/contents/${PATH}?ref=${BRANCH}`;

export async function getSite({ fresh = false }: { fresh?: boolean } = {}): Promise<Site> {
  if (import.meta.env.DEV) return bundled as Site;

  try {
    const init: RequestInit = {
      headers: {
        Accept: 'application/vnd.github.raw+json',
        'User-Agent': 'log-letter-site',
      },
    };
    if (fresh) {
      init.cache = 'no-store';
    } else {
      // @ts-expect-error Cloudflare-specific fetch options
      init.cf = { cacheTtl: 30, cacheEverything: true };
    }
    const res = await fetch(API_URL, init);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return (await res.json()) as Site;
  } catch {
    return bundled as Site;
  }
}
