import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {ScrollView} from 'react-native-gesture-handler';
import Card from './Card';

import {CURVE_HIGHT} from './Wave';

export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function Scroll({position, items}) {
  const scrollStyle = useAnimatedStyle(() => ({
    marginTop: CURVE_HIGHT + 100 - position.y.value,
  }));

  return (
    <Animated.ScrollView
      style={[{width: '100%'}, scrollStyle]}
      onScroll={() => console.log('Scrolling')}>
      <View style={styles.scrollContainer}>
        {items.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} />
        ))}
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
