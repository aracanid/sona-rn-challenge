import { create, StateCreator } from 'zustand';
import ScannedUrl from '@/features/urls/types/ScannedUrl';

export interface UrlSlice {
  totalUrls: () => number;
  urls: ScannedUrl[];
  addUrl: (url: ScannedUrl) => void;
  removeUrl: (id: number) => void;
}

export const createUrlSlice: StateCreator<UrlSlice, [], [], UrlSlice> = (
  set,
  get,
) => ({
  totalUrls: () => get().urls.length,
  urls: [],
  addUrl: (url) => set((state) => ({ urls: [...state.urls, url] })),
  removeUrl: (id) =>
    set((state) => ({ urls: state.urls.filter((url) => url.id !== id) })),
});
