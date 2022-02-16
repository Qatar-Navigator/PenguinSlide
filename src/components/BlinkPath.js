import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

export const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function BlinkPath(params) {
  const animateProps = useAnimatedProps(() => {
    const d = [`M 0 50`, `v50`, `h50`, 'Z'];
    return {
      d: d,
    };
  });

  return <Path fill="black" d="M 35 10 h 150 v 150 h -150 Z" />;
}

const styles = StyleSheet.create({
  container: {},
});
