import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera/next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useUrlManager } from '@/features/urls/hooks/useUrlManager';

interface UrlScannerProps {
  onQrCodeScanned: (data: string) => void;
}

export function QrCodeScanner({ onQrCodeScanned }: UrlScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  function handleOnBarcodeScanned(scanResult: BarcodeScanningResult) {
    return onQrCodeScanned(scanResult.data);
  }

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera permissions requested</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={handleOnBarcodeScanned}
      ></CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '100%',
  },
  camera: {
    borderRadius: 50,
    overflow: 'hidden',
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
});
