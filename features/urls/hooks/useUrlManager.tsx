import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { useStore } from '@/stores/store';

interface UrlManager {
  scanUrl: (data: string) => ScannedUrl | null;
  saveUrl: (scannedUrl: ScannedUrl) => void;
  removeUrl: (id: number) => void;
  urls: ScannedUrl[];
}

export function useUrlManager(): UrlManager {
  const urls = useStore((state) => state.urls);
  const saveUrlToStore = useStore((state) => state.addUrl);
  const removeUrlFromStore = useStore((state) => state.removeUrl);

  function scanUrl(data: string): ScannedUrl | null {
    try {
      const url = new URL(data);
      const name = url.hostname.split('.')[1];
      const verifiedUrl = new URL(data);

      return {
        id: 1,
        createdAt: new Date(),
        name: url.hostname,
        url: url.href,
      };
    } catch (e) {
      return null;
    }
  }

  function saveUrl(scannedUrl: ScannedUrl): void {
    const id = urls.length + 1;
    const urlWithId = { ...scannedUrl, id };
    saveUrlToStore(urlWithId);
  }

  function removeUrl(id: number): void {
    removeUrlFromStore(id);
  }

  return {
    scanUrl,
    saveUrl,
    removeUrl,
    urls,
  };
}
