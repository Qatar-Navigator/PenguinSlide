import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function Card({title, description}) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    padding: 20,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    marginBottom: 10,
  },
});
