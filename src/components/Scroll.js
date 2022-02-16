import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import Card from './Card';

import {CURVE_HIGHT} from './Wave';

export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default React.forwardRef(function Scroll(
  {position, items, offsetY, simultaneousHandlers},
  ref,
) {
  const scrollStyle = useAnimatedStyle(() => ({
    marginTop: CURVE_HIGHT + 100 - position.y.value,
  }));

  const onScroll = () => {
    console.log('Trying to Scroll');
  };

  return (
    <NativeViewGestureHandler
      ref={ref}
      simultaneousHandlers={simultaneousHandlers}>
      <Animated.ScrollView
        style={[styles.scrollView, scrollStyle]}
        onScroll={onScroll}>
        <View style={styles.scrollContainer}>
          {items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </NativeViewGestureHandler>
  );
});

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: 'white',
  },
});
