import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { useStore } from '@/stores/store';

interface UrlManagerProps {
  save: () => void;
  remove: () => void;
  urls: ScannedUrl[];
}
export function useUrlManager() {
  const urls = useStore((state) => state.urls);
  const saveUrlToStore = useStore((state) => state.addUrl);
  const removeUrlFromStore = useStore((state) => state.removeUrl);

  function saveUrl(scannedUrl: ScannedUrl) {
    const id = urls.length + 1;
    const urlWithId = { ...scannedUrl, id };
    saveUrlToStore(urlWithId);
  }

  function removeUrl(id: number) {
    removeUrlFromStore(id);
    console.log('url removed');
  }

  return {
    saveUrl,
    removeUrl,
    urls,
  };
}
