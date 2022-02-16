import React from 'react';
import {Dimensions, View} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

// import {CURVE_HIGHT} from './Wave';
import {relativeCurve, vec2} from '../vector';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const CURVE_HIGHT = (HEIGHT / 2) * 1.356;

export const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function PenguinNosePath({position}) {
  const animatedProps = useAnimatedProps(() => {
    //M 225 615
    const m = vec2((WIDTH / 2) * 1.1, CURVE_HIGHT * 1.09 - position.y.value);

    //c -10.5575 3.0202 -21.7766 3.0278 -32.3417 0.0302
    const c1 = relativeCurve(
      vec2(-10.5575, 3.0202),
      vec2(-21.7766, 3.0278),
      vec2(-32.3417, 0.0302),
    );

    //c -23.368 -6.6226 -63.9803 -22.7443 -65.5906 -55.0406
    const c2 = relativeCurve(
      vec2(-23.368, -6.6226),
      vec2(-63.9803, -22.7443),
      vec2(-65.5906, -55.0406),
    );

    //c -1.5158 -30.361 81.7652 -27.1669 81.7652 -27.1669
    const c3 = relativeCurve(
      vec2(-1.5158, -30.361),
      vec2(81.7652, -27.1669),
      vec2(81.7652, -27.1669),
    );

    //h -0.5519
    const h = -0.5519;

    //c 0 0 83.2772 -3.1979 81.7652 27.1669
    const c4 = relativeCurve(
      vec2(0, 0),
      vec2(83.2772, -3.1979),
      vec2(81.7652, 27.1669),
    );

    //c -1.6141 32.2472 -41.8219 48.3651 -65.0462 55.0103
    const c5 = relativeCurve(
      vec2(-1.6141, 32.2472),
      vec2(-41.8219, 48.3651),
      vec2(-65.0462, 55.0103),
    );

    const d = [
      `M ${m.x} ${m.y}`,
      `${c1}`,
      `${c2}`,
      `${c3}`,
      `h ${h}`,
      `${c4}`,
      `${c5}`,
      'Z',
    ].join(' ');

    return {
      d: d,
    };
  });

  return <AnimatedPath fill="#FFC629" animatedProps={animatedProps} />;
}

//M 225 615 c -10.5575 3.0202 -21.7766 3.0278 -32.3417 0.0302 c -23.368 -6.6226 -63.9803 -22.7443 -65.5906 -55.0406 c -1.5158 -30.361 81.7652 -27.1669 81.7652 -27.1669 h -0.5519 c 0 0 83.2772 -3.1979 81.7652 27.1669 c -1.6141 32.2472 -41.8219 48.3651 -65.0462 55.0103 z

// "M 44.23 217.4 C 16.3 225.39 -13.38 225.41 -41.33 217.48C -103.15 199.96 -210.59 157.31 -214.85 71.87C -218.86 -8.45 1.46 0 1.46 0 H 0 C 0 0 220.31 -8.46 216.31 71.87C 212.04 157.18 105.67 199.82 44.23 217.4 Z"

//d="M59.82	230.38 C57.11	231.41	54.23	231.41	51.51	230.39 C45.50	228.13	35.06	222.62	34.65	211.59 C34.26	201.22	55.67	202.31	55.67	202.31 H55.53 C55.53	202.31	76.93	201.21	76.54	211.59 C76.13	222.60	65.79	228.11	59.82	230.38"
