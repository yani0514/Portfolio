import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Preferences {
  motion: boolean;
  toggleMotion: () => void;
}
export const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      motion: true,
      toggleMotion: () => set((state) => ({ motion: !state.motion })),
    }),
    { name: 'yv-portfolio-preferences' },
  ),
);
