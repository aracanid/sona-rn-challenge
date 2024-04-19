import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { Dimensions, StyleSheet, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureType,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColours } from '@/hooks/useColours';
import { Ref } from 'react';
import { GestureRef } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

interface ScannedUrlItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  item: ScannedUrl;
  onDelete: (id: number) => void;
  scrollRef: Ref<null>;
}

const LIST_ITEM_HEIGHT = 70;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

export function ScannedUrlListItem({
  item,
  onDelete,
  scrollRef,
}: ScannedUrlItemProps) {
  const colours = useColours();

  const pressed = useSharedValue(false);
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const animatedBounce = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(pressed.value ? 1.2 : 1) }],
  }));

  const animatedSlideTransformStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const animatedOpacityStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return { opacity };
  });

  const animatedDismissStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const onTap = Gesture.LongPress()
    .onStart(() => {
      pressed.value = true;
    })
    .onEnd(() => {
      pressed.value = false;
      handleOnPress();
    })
    .maxDistance(1)
    .minDuration(200)
    .runOnJS(true);

  const onPan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDelete) {
            runOnJS(onDelete)(item.id);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    })
    .blocksExternalGesture(onTap)
    .failOffsetY([-10000, 10000]);

  function handleOnPress() {
    WebBrowser.openBrowserAsync(item.url);
  }

  return (
    <Animated.View style={[styles.container, animatedDismissStyle]}>
      <Animated.View style={[styles.iconContainer, animatedOpacityStyle]}>
        <FontAwesome5
          name={'trash-alt'}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={colours.highlight2}
        />
      </Animated.View>
      <GestureDetector gesture={onTap}>
        <GestureDetector gesture={onPan}>
          <Animated.View
            style={[
              styles.url,
              { backgroundColor: colours.foreground },
              animatedSlideTransformStyle,
              animatedBounce,
            ]}
          >
            <Text
              numberOfLines={1}
              style={[styles.urlText, { color: colours.highlight1 }]}
            >
              {item.name}
            </Text>
          </Animated.View>
        </GestureDetector>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  url: {
    padding: 10,
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  urlText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
