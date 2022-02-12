import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useVector, snapPoint} from 'react-native-redash';
import Svg, {Ellipse} from 'react-native-svg';

import Penguin from '../assets/penguin.svg';
import constants from '../config/constants';
import Wave, {CURVE_HIGHT, MARGIN_HIGHT, MIN_LEDGE} from './Wave';
import PenguinSvg from './PenguinSvg';
import Scroll from './Scroll';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const {UP, DOWN, NON} = constants;

export default gestureHandlerRootHOC(function Slider({items}) {
  const position = useVector(0, 0);

  const isTransitioningUp = useSharedValue(false); // to decide the spring config
  const activate = useSharedValue(false); // to control the positions where gesture is allowed
  const [isUp, setIsUp] = useState(false); // to detect if the the up swipe is completed

  const onGestureEvent = useAnimatedGestureHandler({
    onStart({y}) {
      console.log('is up? ', isUp);
      if (y > CURVE_HIGHT && !isUp) {
        activate.value = true;
        console.log('Activate Area');
      } else if (y < 100 && isUp) {
        activate.value = true;
        console.log('Activate Area');
      } else {
        activate.value = false;
        console.log('Not Activate Area');
      }
    },
    onActive: ({x, y}) => {
      if (activate.value) {
        position.y.value = CURVE_HIGHT - y;
        position.x.value = x;
      }
    },
    onEnd: ({y, velocityX, velocityY}) => {
      if (activate.value) {
        const snapPoints = [0, CURVE_HIGHT];
        const dest = snapPoint(y, velocityY, snapPoints);
        isTransitioningUp.value = dest === 0;

        if (dest === 0) {
          runOnJS(setIsUp)(true);
        } else if (dest === CURVE_HIGHT) {
          runOnJS(setIsUp)(false);
        }

        position.y.value = withSpring(CURVE_HIGHT - dest, {
          velocity: velocityY,
          overshootClamping: isTransitioningUp.value,
          restSpeedThreshold: isTransitioningUp.value ? 100 : 0.01,
          restDisplacementThreshold: isTransitioningUp.value ? 100 : 0.01,
        });
      }
    },
  });

  const upStyle = useAnimatedStyle(() => ({
    zIndex: 100,
  }));

  /**
   * In order for gesture listener to work the root should be rapped inside `PanGestureHandler`
   *  and `Animated.View` should be used
   */
  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      // Set activeOffsetY to [0, CURVE_HIGHT] => allows only up transition
      // Set activeOffsetY to [ -CURVE_HIGHT, 0] => allows only Down transition
      activeOffsetY={isUp ? [-CURVE_HIGHT, 0] : [0, CURVE_HIGHT]}>
      <Animated.View style={[StyleSheet.absoluteFill]}>
        <Penguin width={WIDTH} height={HEIGHT} />
        <Animated.View style={[StyleSheet.absoluteFill]}>
          <Animated.View style={upStyle}>
            <PenguinSvg position={position} />
          </Animated.View>
          <Wave position={position}>
            <Animated.View style={styles.body}>
              <Scroll items={items} position={position} />
            </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});
