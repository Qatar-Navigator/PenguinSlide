import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Text} from 'react-native';
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
  const up = useVector(0, 0);
  const down = useVector(0, 0);

  const isTransitioningUp = useSharedValue(false);
  const isTransitioningDown = useSharedValue(false);
  const activeSide = useSharedValue(NON);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({x, y}) => {
      if (y < HEIGHT / 2) {
        activeSide.value = UP;
      } else if (y > HEIGHT / 2) {
        activeSide.value = DOWN;
      } else {
        activeSide.value = NON;
      }
    },
    onActive: ({x, y}) => {
      down.y.value = CURVE_HIGHT - y;
      down.x.value = x;
      // console.log('Down');
    },
    onEnd: ({y, velocityX, velocityY}) => {
      const snapPoints = [HEIGHT - MIN_LEDGE, CURVE_HIGHT];
      const dest = snapPoint(y, velocityY, snapPoints);
      isTransitioningDown.value = dest === 0;
      down.y.value = withSpring(CURVE_HIGHT - dest, {
        velocity: velocityY,
        overshootClamping: isTransitioningDown.value,
        restSpeedThreshold: isTransitioningDown.value ? 100 : 0.01,
        restDisplacementThreshold: isTransitioningDown.value ? 100 : 0.01,
      });
    },
  });

  // ToDO: use this to spring back the curve.
  useEffect(() => {
    // up.y.value = withSpring(MARGIN_HIGHT - MIN_LEDGE);
    // down.y.value = withSpring(MARGIN_HIGHT - MIN_LEDGE);
  }, [down.y, up.y]);

  const upStyle = useAnimatedStyle(() => ({
    zIndex: 100,
  }));

  const scrollStyle = useAnimatedStyle(() => ({
    marginTop: CURVE_HIGHT + 100 - down.y.value,
  }));

  /**
   * In order for gesture listener to work the root should be rapped inside `PanGestureHandler`
   *  and `Animated.View` should be used
   */
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} enabled={true}>
      <Animated.View style={[StyleSheet.absoluteFill]}>
        <Penguin width={WIDTH} height={HEIGHT} />
        <Animated.View style={[StyleSheet.absoluteFill]}>
          <Animated.View style={upStyle}>
            <PenguinSvg position={down} />
          </Animated.View>
          <Wave position={down}>
            <Animated.View style={styles.body}>
              <Scroll items={items} position={down} />
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
