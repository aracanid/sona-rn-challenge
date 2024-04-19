import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { QrCodeScanner } from '@/features/urls/scan/QrCodeScanner';
import { SavePopup } from '@/features/urls/scan/SavePopup';
import React, { useState } from 'react';
import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { useUrlManager } from '@/features/urls/hooks/useUrlManager';
import { useColours } from '@/hooks/useColours';

export default function ScanUrlScreen() {
  const colours = useColours();
  const [scannedUrl, setScannedUrl] = useState<ScannedUrl | undefined>();
  const [error, setError] = useState(true);
  const { urls, saveUrl, scanUrl } = useUrlManager();

  function handleQrCodeFound(data: string) {
    const possibleUrl = scanUrl(data);

    if (possibleUrl) {
      setScannedUrl(possibleUrl);
    }
  }

  function handleSaveUrl() {
    if (scannedUrl) {
      saveUrl(scannedUrl);
      setScannedUrl(undefined);
    }
  }

  function handleDiscardUrl() {
    setScannedUrl(undefined);
  }

  return (
    <View style={[styles.container, { backgroundColor: colours.background }]}>
      <SavePopup
        isVisible={!!scannedUrl}
        scannedUrl={scannedUrl}
        onSave={handleSaveUrl}
        onDiscard={handleDiscardUrl}
      />
      <View style={styles.header}>
        <Text style={styles.title}>URL Hunter</Text>
      </View>
      <View style={styles.camera}>
        <QrCodeScanner onQrCodeScanned={handleQrCodeFound} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>You've scanned</Text>
        <Text style={[styles.footerUrlsText, { color: colours.highlight1 }]}>
          {urls.length}
        </Text>
        <Text style={styles.footerText}>urls so far!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flex: 0.5,
  },
  camera: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 3,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 30,
  },
  footerUrlsText: {
    textAlign: 'center',
    fontSize: 50,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
