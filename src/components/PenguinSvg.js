import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, {Ellipse} from 'react-native-svg';
// import BlinkPath from './BlinkPath';
import PenguinNosePath from './PenguinNosePath';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const CURVE_HIGHT = (HEIGHT / 2) * 1.356;
export const CURVE_WIDTH = WIDTH / 2;

const eayRX = WIDTH * 0.12;
const eayRy = HEIGHT * 0.074;

const innerEayRX = WIDTH * 0.055;
const innerEayRY = HEIGHT * 0.039;

const EAY_MARGIN_X = 75;
const EAY_MARGIN_Y = 105;
const INNER_EAY_MARGIN_X = 67;
const INNER_EAY_MARGIN_Y = 95;

export const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

const BLINK_STEP = 4;
const BLINK_MIN = 0;
const BLINK_MAX = 135;
// var intervalId;

export default function PenguinSvg({position, blinkPosition}) {
  console.log('Width:', WIDTH, 'Height: ', HEIGHT);
  // right eay
  const rightWhite = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH + EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - EAY_MARGIN_Y - position.y.value}`,
      rx: `${eayRX}`,
      ry: `${eayRy}`,
    };
  });
  const rightIris = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH + INNER_EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - INNER_EAY_MARGIN_Y - position.y.value}`,
      rx: `${innerEayRX}`,
      ry: `${innerEayRY}`,
    };
  });

  // left eay
  const leftWhite = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH - EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - EAY_MARGIN_Y - position.y.value}`,
      rx: `${eayRX}`,
      ry: `${eayRy}`,
    };
  });
  const leftIris = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH - INNER_EAY_MARGIN_X}`,
      cy: `${CURVE_HIGHT - INNER_EAY_MARGIN_Y - position.y.value}`,
      rx: `${innerEayRX}`,
      ry: `${innerEayRY}`,
    };
  });

  const rightEyelids = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH + EAY_MARGIN_X}`,
      cy: `${
        CURVE_HIGHT - EAY_MARGIN_Y - blinkPosition.value - position.y.value
      }`,
      rx: `${eayRX + 50}`,
      ry: `${eayRy + 10}`,
    };
  });
  const leftEyelids = useAnimatedProps(() => {
    return {
      cx: `${CURVE_WIDTH - EAY_MARGIN_X}`,
      cy: `${
        CURVE_HIGHT - EAY_MARGIN_Y - blinkPosition.value - position.y.value
      }`,
      rx: `${eayRX + 50}`,
      ry: `${eayRy + 10}`,
    };
  });

  const blink = () => {
    blinkPosition.value = withSpring(
      blinkPosition.value ? BLINK_MIN : BLINK_MAX,
      {
        // velocity: 100,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    );
    console.log('Blinking');
  };

  useEffect(() => {
    blink();
    setTimeout(blink, 500);
    var intervalId = setInterval(() => {
      blink();
      setTimeout(blink, 500);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Svg style={{backgroundColor: 'transparent'}}>
      <AnimatedEllipse animatedProps={rightWhite} fill="white" />
      <AnimatedEllipse animatedProps={rightEyelids} fill="black" />
      <AnimatedEllipse animatedProps={rightIris} fill="black" />
      <AnimatedEllipse animatedProps={leftWhite} fill="white" />
      <AnimatedEllipse animatedProps={leftEyelids} fill="black" />
      <AnimatedEllipse animatedProps={leftIris} fill="black" />
      <PenguinNosePath position={position} />
      {/* <BlinkPath /> */}
    </Svg>
  );
}
