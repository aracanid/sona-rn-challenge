import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScannedUrl from '@/features/urls/types/ScannedUrl';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useColours } from '@/hooks/useColours';

interface SavePopupProps {
  isVisible: boolean;
  onSave: () => void;
  onDiscard: () => void;
  scannedUrl: ScannedUrl | undefined;
}

export function SavePopup({
  isVisible,
  onSave,
  onDiscard,
  scannedUrl,
}: SavePopupProps) {
  const colours = useColours();

  const animatedOpen = useAnimatedStyle(() => ({
    opacity: isVisible ? 1 : 0,
    transform: [
      {
        scale: withTiming(isVisible ? 1.2 : 1, {
          duration: 1000,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        animatedOpen,
        { backgroundColor: colours.foreground },
      ]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: colours.text }]}>
          Found a new URL!
        </Text>
        <Text style={[styles.url, { color: colours.highlight1 }]}>
          {scannedUrl?.url}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { borderColor: colours.highlight2 }]}
            onPress={onDiscard}
          >
            <Text style={[styles.buttonText, { color: colours.highlight2 }]}>
              Discard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderColor: colours.highlight1 }]}
            onPress={onSave}
          >
            <Text style={[styles.buttonText, { color: colours.highlight1 }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 0.5,
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    flex: 0.5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  url: {
    flex: 0.5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  innerContainer: {
    padding: 25,
    alignItems: 'center',
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    padding: 5,
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  enabled: {
    opacity: 100,
  },
  disabled: {
    opacity: 0,
  },
  container: {
    marginTop: '35%',
    borderRadius: 50,
    flex: 1,
    backgroundColor: 'red',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '40%',
    zIndex: 100,
    opacity: 0,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
});
