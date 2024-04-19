import ScannedUrl from '@/features/urls/types/ScannedUrl';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  GestureHandlerRootView,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

interface ScannedUrlItemProps {
  item: ScannedUrl;
  onDelete: (id: number) => void;
}

const LIST_ITEM_HEIGHT = 70;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

export function ScannedUrlListItem({ item, onDelete }: ScannedUrlItemProps) {
  function handleOnPress() {
    WebBrowser.openBrowserAsync(item.url);
  }

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

  const onTap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    })
    .maxDistance(1)
    .onTouchesUp(handleOnPress)
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
    .blocksExternalGesture(onTap);

  return (
    <Animated.View style={[styles.container, animatedDismissStyle]}>
      <Animated.View style={[styles.iconContainer, animatedOpacityStyle]}>
        <FontAwesome5
          name={'trash-alt'}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={'red'}
        />
      </Animated.View>
      <GestureDetector gesture={onTap}>
        <GestureDetector gesture={onPan}>
          <Animated.View
            style={[styles.url, animatedSlideTransformStyle, animatedBounce]}
          >
            <Text>{item.url}</Text>
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
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  urlText: {
    fontSize: 16,
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
