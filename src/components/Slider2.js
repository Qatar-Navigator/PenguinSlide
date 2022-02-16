import MaskedView from '@react-native-community/masked-view';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {onScroll, useVector} from 'react-native-redash';
import Header from './Header';
import MomentList from './MomentList';
import PenguinSvg from './PenguinSvg';
import Wave from './Wave';

export default function Slider2(params) {
  const position = useVector(0, 0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    position.y.value = event.contentOffset.y;
  });

  return (
    // <PenguinSvg position={position} />
    <View style={styles.container}>
      <Wave position={position}>
        <Animated.ScrollView onScroll={scrollHandler}>
          <Header position={position} />
          <MomentList />
        </Animated.ScrollView>
      </Wave>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    flex: 1,
  },
});
