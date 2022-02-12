import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from './src/components/Card';
import Slider from './src/components/Slider';

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

export default function App(params) {
  return (
    <View style={styles.container}>
      <Slider items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    padding: 20,
  },
  text: {
    color: 'black',
    marginBottom: 10,
  },
});
