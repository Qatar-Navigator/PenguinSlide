import React from 'react';
import {View, StyleSheet, Dimensions, Text, Platform} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';

import Penguin from '../assets/penguin.svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export default function Header() {
  const animatedProps = useAnimatedProps(() => {
    return {
      d: [`M 0 ${HEIGHT / 2}`, `H ${WIDTH}`, `V ${HEIGHT}`, `H 0`, `Z`].join(
        ' ',
      ),
    };
  });

  const maskElement = (
    <Svg style={[StyleSheet.absoluteFill]}>
      <AnimatedPath fill="white" animatedProps={animatedProps} />
    </Svg>
  );

  return (
    <MaskedView
      style={[StyleSheet.absoluteFill, {flex: 1}]}
      maskElement={maskElement}>
      <Text>Hello </Text>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

/**
 *       { <View>
        <Penguin width={WIDTH} height={HEIGHT} />
      </View> 
    // </MaskedView>
 */
