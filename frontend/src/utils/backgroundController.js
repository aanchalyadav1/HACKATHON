// src/utils/backgroundController.js
const PAGE_BG_MAP = {
  '/': '/br/hero_knight_bg.jpg',
  '/chat': '/br/robot_bg.jpg',
  '/dashboard': '/br/orbit_bg.jpg',
  '/about': '/br/wings_bg.jpg',
  '/login': '/br/eye_bg.jpg',
  '/register': '/br/mask_bg.jpg'
};

const PAGE_BG_OPTIONS = {
  '/': { overlayOpacity: 0.36, brightness: 0.78 },
  '/chat': { overlayOpacity: 0.48, brightness: 0.74 },
  '/dashboard': { overlayOpacity: 0.32, brightness: 0.88 },
  '/about': { overlayOpacity: 0.28, brightness: 0.9 },
  '/login': { overlayOpacity: 0.5, brightness: 0.7 },
  '/register': { overlayOpacity: 0.5, brightness: 0.7 }
};

export function setPageBackground(pathname) {
  try {
    const img = PAGE_BG_MAP[pathname] || PAGE_BG_MAP['/'];
    const opts = PAGE_BG_OPTIONS[pathname] || { overlayOpacity: 0.36, brightness: 0.9 };

    // safe path (Vite serves public assets at root)
    const url = `${img}`;

    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,${opts.overlayOpacity}), rgba(0,0,0,${opts.overlayOpacity})), url('${url}')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center top';
    document.body.style.backgroundSize = 'cover';

    document.documentElement.style.setProperty('--alis-bg-overlay-opacity', String(opts.overlayOpacity));
    document.documentElement.style.setProperty('--alis-bg-brightness', String(opts.brightness));
  } catch (e) {
    console.warn('setPageBackground error', e);
    document.body.style.backgroundImage = '';
  }
}

export function setCustomBackground(url, { overlayOpacity = 0.35, brightness = 0.92 } = {}) {
  document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url('${url}')`;
  document.documentElement.style.setProperty('--alis-bg-overlay-opacity', String(overlayOpacity));
  document.documentElement.style.setProperty('--alis-bg-brightness', String(brightness));
}

export function getBackgroundForPath(pathname) {
  return { url: PAGE_BG_MAP[pathname] || PAGE_BG_MAP['/'], opts: PAGE_BG_OPTIONS[pathname] || {} };
}
