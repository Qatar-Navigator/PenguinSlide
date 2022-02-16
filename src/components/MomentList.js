import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Card from './Card';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const items = [
  {
    title: 'Title 1',
    description: 'Description 1',
  },
  {
    title: 'Title 2',
    description: 'Description 2',
  },
  {
    title: 'Title 3',
    description: 'Description 3',
  },
  {
    title: 'Title 4',
    description: 'Description 4',
  },
  {
    title: 'Title 5',
    description: 'Description 5',
  },
  {
    title: 'Title 6',
    description: 'Description 6',
  },
  {
    title: 'Title 7',
    description: 'Description 7',
  },
  {
    title: 'Title 8',
    description: 'Description 8',
  },
  {
    title: 'Title 9',
    description: 'Description 9',
  },
  {
    title: 'Title 10',
    description: 'Description 10',
  },
];

export default function MomentList(params) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Card key={index} title={item.title} description={item.description} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
