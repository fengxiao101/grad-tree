import { useSyncExternalStore } from 'react';

// The app toggles a class on <body>, so dark mode is external state as far
// as React is concerned.
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.body, { attributeFilter: ['class'] });
  return () => obs.disconnect();
}
function getIsDark() { return document.body.classList.contains('dark-mode-active'); }
export function useDarkMode() { return useSyncExternalStore(subscribe, getIsDark); }
