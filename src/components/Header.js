import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useVector} from 'react-native-redash';
import PenguinSvg from './PenguinSvg';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default function Header({position}) {
  const animatedStyle = useAnimatedStyle(() => ({
    height: HEIGHT * 0.75 - position.y.value,
    // backgroundColor: 'black',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // zIndex: 1,
  }));

  return (
    <Animated.View style={[animatedStyle]}>
      <PenguinSvg position={position} />
    </Animated.View>
  );
}
