import { useSyncExternalStore } from 'react';
import { usePreferences } from '../stores/preferences';
const subscribe = (callback: () => void) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
export function useMotion() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  );
  return usePreferences((state) => state.motion) && !reduced;
}
