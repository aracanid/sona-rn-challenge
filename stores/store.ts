import { createUrlSlice, UrlSlice } from '@/features/urls/stores/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create<UrlSlice>()(
  persist(
    (...a) => ({
      ...createUrlSlice(...a),
    }),
    { name: 'store' },
  ),
);
