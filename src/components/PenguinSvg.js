import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import Svg, {Ellipse, Path} from 'react-native-svg';
import PenguinNosePath from './PenguinNosePath';
import Wave, {CURVE_WIDTH, CURVE_HIGHT} from './Wave';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const eayRX = WIDTH * 0.12;
const eayRy = HEIGHT * 0.074;

const innerEayRX = WIDTH * 0.055;
const innerEayRY = HEIGHT * 0.039;

const EAY_MARGIN_X = 75;
const EAY_MARGIN_Y = 105;
const INNER_EAY_MARGIN_X = 67;
const INNER_EAY_MARGIN_Y = 95;

export const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

const vec2 = (x, y) => {
  'worklet';
  return {x: x, y: y};
};

const curve = (c1, c2, to) => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

export default function PenguinSvg({position}) {
  console.log('With:', WIDTH, 'Height: ', HEIGHT);
  // right eay
  const animatedProps1 = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH + EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - EAY_MARGIN_Y - position.y.value}`,
      rx: `${eayRX}`,
      ry: `${eayRy}`,
    };
  });
  const animatedProps2 = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH + INNER_EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - INNER_EAY_MARGIN_Y - position.y.value}`,
      rx: `${innerEayRX}`,
      ry: `${innerEayRY}`,
    };
  });

  // left eay
  const animatedProps3 = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH - EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - EAY_MARGIN_Y - position.y.value}`,
      rx: `${eayRX}`,
      ry: `${eayRy}`,
    };
  });
  const animatedProps4 = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH - INNER_EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - INNER_EAY_MARGIN_Y - position.y.value}`,
      rx: `${innerEayRX}`,
      ry: `${innerEayRY}`,
    };
  });

  return (
    <Svg>
      <AnimatedEllipse animatedProps={animatedProps1} fill="white" />
      <AnimatedEllipse animatedProps={animatedProps2} fill="black" />
      <AnimatedEllipse animatedProps={animatedProps3} fill="white" />
      <AnimatedEllipse animatedProps={animatedProps4} fill="black" />
      <PenguinNosePath position={position} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {},
});
