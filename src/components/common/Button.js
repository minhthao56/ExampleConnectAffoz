import React from 'react';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Button({children, onPress}) {
  return (
    <TouchableOpacity style={Styles.button} onPress={onPress}>
      <Text style={Styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  button: {
    backgroundColor: '#facd02',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
