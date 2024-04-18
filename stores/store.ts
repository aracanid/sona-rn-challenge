import { createUrlSlice, UrlSlice } from '@/features/urls/stores/store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create<UrlSlice>()(
  persist(
    (...a) => ({
      ...createUrlSlice(...a),
    }),
    { name: 'store', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
