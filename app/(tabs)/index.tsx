import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { QrCodeScanner } from '@/features/urls/scan/QrCodeScanner';
import { SavePopup } from '@/features/urls/scan/SavePopup';
import { useState } from 'react';
import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { useUrlManager } from '@/features/urls/hooks/useUrlManager';

export default function TabOneScreen() {
  const [scannedUrl, setScannedUrl] = useState<ScannedUrl | undefined>();
  const { urls, saveUrl, removeUrl } = useUrlManager();

  function handleQrCodeFound(data: string) {
    const url = new URL(data);
    setScannedUrl({
      id: 1,
      createdAt: new Date(),
      name: url.hostname,
      url: url.href,
    });
  }

  function handleSaveUrl() {
    if (scannedUrl) {
      saveUrl(scannedUrl);
      setScannedUrl(undefined);
    }
    console.log(JSON.stringify(urls));
  }

  function handleDiscardUrl() {
    setScannedUrl(undefined);
    console.log('discarded url');
  }

  return (
    <View style={styles.container}>
      <SavePopup
        isVisible={!!scannedUrl}
        scannedUrl={scannedUrl}
        onSave={handleSaveUrl}
        onDiscard={handleDiscardUrl}
      />
      <Text>QR Hunter</Text>
      <QrCodeScanner onQrCodeScanned={handleQrCodeFound} />
      <View>
        <Text>You've scanned</Text>
        <Text>{urls.length}</Text>
        <Text>urls so far!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
