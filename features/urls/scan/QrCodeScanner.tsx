import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera/next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    flex: 1,
  },
  camera: {
    borderRadius: 50,
    overflow: 'hidden',
    width: '80%',
    height: '50%',
    position: 'absolute',
  },
});
