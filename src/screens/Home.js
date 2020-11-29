import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function Home() {
  const currentUser = useSelector(state => state.currentUser);

  return (
    <View style={styles.container}>
      <Text>{`Welcome to ${currentUser.data.name}`}</Text>
      <Text>{`${currentUser.data.email}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
