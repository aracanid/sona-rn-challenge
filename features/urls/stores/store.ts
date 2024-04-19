import { create, StateCreator } from 'zustand';
import ScannedUrl from '@/features/urls/types/ScannedUrl';

export interface UrlSlice {
  urlCount: number;
  urls: ScannedUrl[];
  addUrl: (url: ScannedUrl) => void;
  removeUrl: (id: number) => void;
}

export const createUrlSlice: StateCreator<UrlSlice, [], [], UrlSlice> = (
  set,
  get,
) => ({
  urlCount: 0,
  urls: [],
  addUrl: (url) =>
    set((state) => {
      state.urlCount = state.urlCount++;
      return { urls: [...state.urls, url] };
    }),
  removeUrl: (id) =>
    set((state) => ({ urls: state.urls.filter((url) => url.id !== id) })),
});
