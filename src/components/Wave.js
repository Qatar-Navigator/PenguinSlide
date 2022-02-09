import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {clamp} from 'react-native-redash';
import constants from '../config/constants';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const MIN_LEDGE = HEIGHT;
export const MARGIN_HIGHT = MIN_LEDGE + 50;

export const CURVE_HIGHT = (HEIGHT / 2) * 1.356;
const CURVE_WIDTH = WIDTH / 2;
const CURVE_RATIO = 0.2;
const WIDTH_PADDING = 5;
const PENGUIN_WIDTH = WIDTH - WIDTH_PADDING;

export const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec2 = (x, y) => {
  'worklet';
  return {x: x, y: y};
};

const curve = (c1, c2, to) => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

export default function Wave({side, position, children, isTransitioning}) {
  const animatedProps = useAnimatedProps(() => {
    console.log('position.y.value = ', position.y.value * 3.2);
    console.log('HEIGHT = ', HEIGHT);

    // vector points
    const p1 = vec2(CURVE_WIDTH, CURVE_HIGHT - position.y.value);
    const p2 = vec2(PENGUIN_WIDTH, HEIGHT * 0.91 - position.y.value); //last point of first curve

    const cpr1 = vec2(WIDTH * 0.8, p1.y); // control point 1 for curve 1
    const cpr2 = vec2(PENGUIN_WIDTH, p1.y + p1.y * CURVE_RATIO); // control point 2 for curve 1

    const cpl1 = vec2(WIDTH * CURVE_RATIO, p1.y); // control point 1 for curve 2
    const cpl2 = vec2(5, p1.y + p1.y * CURVE_RATIO); // control point 2 for curve 2

    return {
      d: [
        `M ${p1.x} ${p1.y}`,
        `L ${p1.x} ${p1.y}`,
        curve(cpr1, cpr2, p2),
        `V ${HEIGHT} `,
        `H ${WIDTH_PADDING}`,
        `L 5 ${p2.y}`,
        curve(cpl2, cpl1, p1),
        `Z`,
      ].join(' '),
    };
  });

  const maskElement = (
    <Svg
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{rotateX: position === constants.UP ? '180deg' : '0deg'}],
        },
      ]}>
      <AnimatedPath fill="white" animatedProps={animatedProps} />
    </Svg>
  );
  return (
    <MaskedView style={[StyleSheet.absoluteFill]} maskElement={maskElement}>
      {children}
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
  },
});
