import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function Input({
  placeholder,
  value,
  onChangeText,
  onChange,
  secureTextEntry,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={Styles.container}
      value={value}
      onChangeText={onChangeText}
      onChange={onChange}
      secureTextEntry={secureTextEntry}
    />
  );
}

const Styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 40,
    borderRadius: 4,
    borderColor: '#dddddd',
    marginBottom: 16,
  },
});
