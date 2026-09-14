/**
 * Main Application Entry Point
 * Site 4: Wedding Weekend / Destination Demo
 */

import { initThemeSwitcher } from './theme.js';
import { initNavigation } from './navigation.js';
import { initModals } from './modals.js';
import { initRsvp } from './rsvp.js';
import { initEnhancements } from './enhancements.js';

function startApp() {
  initThemeSwitcher();
  initNavigation();
  initModals();
  initRsvp();
  initEnhancements();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
