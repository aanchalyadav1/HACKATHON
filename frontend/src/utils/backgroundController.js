// src/utils/backgroundController.js
// Centralised page → background mapping and helpers for applying backgrounds.
// Usage: import { setPageBackground } from './utils/backgroundController';
// In App.jsx you already call setPageBackground(location.pathname)

const PAGE_BG_MAP = {
  '/': '/br/hero_knight_bg.jpg',
  '/chat': '/br/robot_bg.jpg',
  '/dashboard': '/br/orbit_bg.jpg',
  '/about': '/br/wings_bg.jpg',
  '/login': '/br/eye_bg.jpg',
  '/register': '/br/mask_bg.jpg'
};

// Optional per-page brightness/overlay tuning (values are CSS-friendly)
const PAGE_BG_OPTIONS = {
  '/': { overlayOpacity: 0.36, brightness: 0.92 },
  '/chat': { overlayOpacity: 0.42, brightness: 0.88 },
  '/dashboard': { overlayOpacity: 0.28, brightness: 0.95 },
  '/about': { overlayOpacity: 0.22, brightness: 0.98 },
  '/login': { overlayOpacity: 0.46, brightness: 0.85 },
  '/register': { overlayOpacity: 0.44, brightness: 0.86 }
};

// Apply the background for the given path
export function setPageBackground(pathname) {
  try {
    const img = PAGE_BG_MAP[pathname] || PAGE_BG_MAP['/'];
    const opts = PAGE_BG_OPTIONS[pathname] || { overlayOpacity: 0.34, brightness: 0.92 };

    // Set the body background image (Vite public/ files are served from root)
    document.body.style.backgroundImage = `url("${img}")`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center top';
    document.body.style.backgroundSize = 'cover';

    // CSS variables used by index.css to control overlay and tint
    document.documentElement.style.setProperty('--alis-bg-overlay-opacity', String(opts.overlayOpacity));
    document.documentElement.style.setProperty('--alis-bg-brightness', String(opts.brightness));
  } catch (e) {
    // fail-safe: remove background
    console.warn('setPageBackground error', e);
    document.body.style.backgroundImage = '';
    document.documentElement.style.removeProperty('--alis-bg-overlay-opacity');
    document.documentElement.style.removeProperty('--alis-bg-brightness');
  }
}

// Small helper to manually set an arbitrary background (useful for demos)
export function setCustomBackground(url, { overlayOpacity = 0.35, brightness = 0.92 } = {}) {
  document.body.style.backgroundImage = `url("${url}")`;
  document.documentElement.style.setProperty('--alis-bg-overlay-opacity', String(overlayOpacity));
  document.documentElement.style.setProperty('--alis-bg-brightness', String(brightness));
}

// Expose the mapping if you need it elsewhere
export function getBackgroundForPath(pathname) {
  return { url: PAGE_BG_MAP[pathname] || PAGE_BG_MAP['/'], opts: PAGE_BG_OPTIONS[pathname] || {} };
}
