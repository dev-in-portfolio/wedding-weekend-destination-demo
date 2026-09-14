/**
 * Theme & Design Direction Management
 * Site 4: 5 Custom Visual Directions
 */

export const THEMES = [
  { id: 'mediterranean-minimal', label: '1. Mediterranean Minimal', shortLabel: 'Minimal' },
  { id: 'resort-cinematic', label: '2. Resort Cinematic', shortLabel: 'Cinematic' },
  { id: 'sun-washed-organic', label: '3. Sun-Washed Organic', shortLabel: 'Organic' },
  { id: 'european-editorial', label: '4. European Editorial', shortLabel: 'Editorial' },
  { id: 'night-before-after', label: '5. Night-Before-After', shortLabel: 'Weekend' }
];

const STORAGE_KEY = 'dscg_site4_style';
const DEFAULT_STYLE = 'mediterranean-minimal';

export function getInitialStyle() {
  try {
    const params = new URLSearchParams(window.location.search);
    const queryStyle = params.get('style');
    if (queryStyle && THEMES.some(t => t.id === queryStyle)) {
      return queryStyle;
    }
  } catch (e) {
    // Ignore URL parse error
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.some(t => t.id === saved)) {
      return saved;
    }
  } catch (e) {
    // Storage access blocked
  }

  return DEFAULT_STYLE;
}

export function applyStyle(styleId) {
  if (!THEMES.some(t => t.id === styleId)) {
    styleId = DEFAULT_STYLE;
  }

  document.documentElement.setAttribute('data-style', styleId);

  // Update button active and pressed states
  const buttons = document.querySelectorAll('[data-set-style]');
  buttons.forEach(btn => {
    const target = btn.getAttribute('data-set-style');
    const isActive = target === styleId;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    btn.classList.toggle('active', isActive);
  });

  // Sync dropdown selectors
  const dropdowns = document.querySelectorAll('.style-select-dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.value = styleId;
  });

  // Persist preference
  try {
    localStorage.setItem(STORAGE_KEY, styleId);
  } catch (e) {
    // Ignore
  }

  // Update query parameter
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('style', styleId);
    window.history.replaceState({}, '', url.toString());
  } catch (e) {
    // Ignore
  }
}

export function initThemeSwitcher() {
  const initial = getInitialStyle();
  applyStyle(initial);

  // Global button delegation
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-set-style]');
    if (btn) {
      e.preventDefault();
      const styleId = btn.getAttribute('data-set-style');
      applyStyle(styleId);
    }
  });

  // Global dropdown listener
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('style-select-dropdown')) {
      applyStyle(e.target.value);
    }
  });

  // Expose to global window object for automated audits
  window.switchStyle = applyStyle;
}
