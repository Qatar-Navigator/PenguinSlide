import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useVector, snapPoint} from 'react-native-redash';

import Wave, {CURVE_HIGHT} from './Wave';
import PenguinSvg from './PenguinSvg';
import Scroll from './Scroll';

const {height: HEIGHT} = Dimensions.get('window');

const BLINK_STEP = 4;
const BLINK_MIN = 0;
const BLINK_MAX = 135;

export default gestureHandlerRootHOC(function Slider({items}) {
  const panRef = React.createRef();
  const scrollRef = React.createRef();
  const position = useVector(0, 0);
  const animatedHeight = useSharedValue(position.y.value);
  const blinkPosition = useSharedValue(BLINK_MAX);

  console.log('Animated Height:: ', animatedHeight.value);
  const isTransitioningUp = useSharedValue(false); // to decide the spring config
  const activate = useSharedValue(false); // to control the positions where gesture is allowed
  const [isUp, setIsUp] = useState(false); // to detect if the the up swipe is completed
  const activeScroll = useSharedValue(false);
  // const isAboutTo

  const scrollOffsetY = useSharedValue(0);

  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

  useEffect(() => {
    console.log('object');
  }, []);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart({y}) {
      console.log('Pan Gesture Started');
      console.log('is up? ', isUp);
      if (y > CURVE_HIGHT && !isUp) {
        activate.value = true;
        console.log('Activate Area');
      } else if (y < 200 && isUp) {
        activate.value = true;
        console.log('Activate Area');
      } else {
        activate.value = false;
        console.log('Scroll Active');
      }
    },
    onActive: ({x, velocityY, y}) => {
      if (activate.value) {
        position.y.value = CURVE_HIGHT - y;
        position.x.value = x;
        animatedHeight.value = CURVE_HIGHT - y;
        if (velocityY < 0 && blinkPosition.value > BLINK_MIN) {
          // when moving up
          blinkPosition.value = blinkPosition.value - BLINK_STEP; // close
        }
        if (velocityY > 0 && blinkPosition.value <= BLINK_MAX) {
          // when moving down
          blinkPosition.value = blinkPosition.value + BLINK_STEP; // open
        }
      } else {
        console.log('Update Scroll offset');
        // scrollOffsetY.value = scrollOffsetY.value + 100;
        // scrollRef.current.scrollTo({X: 0, y: 200, animated: true});
        // scrollRef.current.scrollTo({X: 0, y: 500, animated: true});
      }
    },
    onEnd: ({y, velocityX, velocityY}) => {
      if (activate.value) {
        const snapPoints = [0, CURVE_HIGHT];
        const dest = snapPoint(y, velocityY, snapPoints);
        isTransitioningUp.value = dest === 0;
        if (dest === 0) {
          runOnJS(setIsUp)(true);
          // clearInterval(intervalId);
        } else if (dest === CURVE_HIGHT) {
          runOnJS(setIsUp)(false);
        }
        position.y.value = withSpring(CURVE_HIGHT - dest, {
          velocity: velocityY,
          overshootClamping: isTransitioningUp.value,
          restSpeedThreshold: isTransitioningUp.value ? 100 : 0.01,
          restDisplacementThreshold: isTransitioningUp.value ? 100 : 0.01,
        });

        animatedHeight.value = withSpring(CURVE_HIGHT - dest);
        blinkPosition.value = withSpring(BLINK_MAX);
      }
    },
  });

  const upStyle = useAnimatedStyle(() => ({
    height: CURVE_HIGHT + 55 - animatedHeight.value,
    zIndex: 1,
  }));

  const headerContentStyle = useAnimatedStyle(() => ({
    backgroundColor: 'transparent',
    width: '100%',
    height: HEIGHT * 0.45 - position.y.value,
    justifyContent: 'center',
  }));

  /**
   * In order for gesture listener to work the root should be rapped inside `PanGestureHandler`
   *  and `Animated.View` should be used
   */

  // Set activeOffsetY to [0, CURVE_HIGHT] => allows only up transition
  // Set activeOffsetY to [ -CURVE_HIGHT, 0] => allows only Down transition
  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      // activeOffsetY={isUp ? [-CURVE_HIGHT, 0] : [0, CURVE_HIGHT]}
      simultaneousHandlers={scrollRef}
      ref={panRef}>
      <Animated.View style={[StyleSheet.absoluteFill]}>
        {/* <Penguin width={WIDTH} height={HEIGHT} /> */}
        <Animated.View style={[StyleSheet.absoluteFill]}>
          <Animated.View style={[{backgroundColor: 'transparent'}, upStyle]}>
            {/** Will be the container of the header */}
            {/** The hight should change when the penguin go up or down */}
            {!isUp && (
              <View style={styles.header}>
                <Animated.View style={headerContentStyle}></Animated.View>
              </View>
            )}
            {!isUp && (
              <PenguinSvg position={position} blinkPosition={blinkPosition} />
            )}
          </Animated.View>
          <Wave position={position}>
            <View style={styles.body}>
              <Scroll
                items={items}
                position={position}
                ref={scrollRef}
                simultaneousHandlers={panRef}
                offsetY={scrollOffsetY.value}
              />
            </View>
          </Wave>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  body: {
    backgroundColor: 'white',
    flex: 1,
    height: HEIGHT,
    width: '100%',
  },
  scrollContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: HEIGHT * 0.45,
    backgroundColor: 'transparent',
  },
  headerContent: {
    backgroundColor: 'transparent',
    width: '100%',
    height: HEIGHT * 0.45,
  },
});
