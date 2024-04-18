import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScannedUrl from '@/features/urls/types/ScannedUrl';

interface SavePopupProps {
  visible: boolean;
  onSave: () => void;
  onDiscard: () => void;
  scannedUrl: ScannedUrl | undefined;
}

export function SavePopup({
  visible,
  onSave,
  onDiscard,
  scannedUrl,
}: SavePopupProps) {
  return (
    <View
      style={
        visible
          ? [styles.enabled, styles.container]
          : [styles.disabled, styles.container]
      }
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Found a new URL!</Text>
        <Text style={styles.url}>{scannedUrl?.url}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onDiscard}>
            <Text>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
  },
  url: {
    flex: 1,
    fontSize: 20,
  },
  innerContainer: {
    padding: 25,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    flex: 0.5,
    paddingHorizontal: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  enabled: {
    opacity: 100,
  },
  disabled: {
    opacity: 0,
  },
  container: {
    borderRadius: 50,
    flex: 1,
    backgroundColor: 'red',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '50%',
    zIndex: 100,
  },
});
