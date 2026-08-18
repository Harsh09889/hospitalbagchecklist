export type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme';

export const THEME_COLORS: Record<Theme, string> = {
  light: '#f7f5ee',
  dark: '#1a1916',
};

export const THEME_CHANGE_EVENT = 'theme-change';

export function getStoredTheme(): Theme | null {
  if (typeof localStorage === 'undefined') return null;
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(stored?: Theme | null): Theme {
  return stored ?? getSystemTheme();
}

export function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function updateThemeColorMeta(theme: Theme) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = THEME_COLORS[theme];
}

export function applyTheme(theme: Theme, persist = false) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  updateThemeColorMeta(theme);
  if (persist) localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
}

export function toggleTheme(): Theme {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
  return next;
}

/** Inline-safe bootstrap — keep in sync with this module. */
export function initThemeFromStorage() {
  const stored = getStoredTheme();
  applyTheme(resolveTheme(stored));
}
