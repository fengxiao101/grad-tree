const RELOAD_KEY = 'cardinal-planner:stale-chunk-reload';
const RELOAD_COOLDOWN_MS = 15_000;

export function isStaleChunkError(value: unknown): boolean {
  const message = value instanceof Error
    ? value.message
    : typeof value === 'string'
      ? value
      : '';

  return /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|load failed/i.test(message);
}

export function recoverFromStaleChunk(value: unknown): boolean {
  if (!isStaleChunkError(value)) return false;

  const now = Date.now();
  const lastReload = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
  if (now - lastReload < RELOAD_COOLDOWN_MS) return false;

  sessionStorage.setItem(RELOAD_KEY, String(now));
  window.location.reload();
  return true;
}

// Vite emits this before a failed lazy import reaches React. A single refresh
// loads the newest index and its current hashed chunks after a deployment.
window.addEventListener('vite:preloadError', event => {
  const preloadEvent = event as Event & { payload?: unknown };
  if (recoverFromStaleChunk(preloadEvent.payload)) event.preventDefault();
});

// Older browsers may only expose the rejected dynamic-import promise.
window.addEventListener('unhandledrejection', event => {
  if (recoverFromStaleChunk(event.reason)) event.preventDefault();
});
